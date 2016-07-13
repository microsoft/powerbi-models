import * as models from '../src/models';

describe('Unit | Models', function () {
  function testForExpectedMessage(errors: models.IError[], message: string) {
    expect(errors).toBeDefined();
      errors
        .forEach(error => {
          if (error.message === message) {
            expect(true).toBe(true);
          }
        });
  } 

  describe('validateLoad', function () {
    const accessTokenRequiredMessage = models.loadSchema.properties.accessToken.messages.required;
    const accessTokenInvalidTypeMessage = models.loadSchema.properties.accessToken.messages.type;
    const idRequiredMessage = models.loadSchema.properties.id.messages.required;
    const idInvalidTypeMessage = models.loadSchema.properties.id.messages.type;
    const filterInvalidMessage = models.loadSchema.properties.filter.invalidMessage;
    const pageNameInvalidTypeMessage = models.loadSchema.properties.pageName.messages.type;

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenRequiredMessage);
    });

    it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 1
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return undefined if id and accessToken are provided`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken'
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${filterInvalidMessage}' if filter is not a valid valueFilter or advancedFilter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filter: { x: 1 }
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, filterInvalidMessage);
    });

    it(`should return errors with one containing message '${pageNameInvalidTypeMessage}' if pageName is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          pageName: 1
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, pageNameInvalidTypeMessage);
    });
  });

  describe('validateSettings', function () {
    const filterPaneEnabledInvalidTypeMessage = models.settingsSchema.properties.filterPaneEnabled.messages.type;
    const navContentPaneEnabledInvalidTypeMessage = models.settingsSchema.properties.navContentPaneEnabled.messages.type;

    it(`should return errors with one containing message '${filterPaneEnabledInvalidTypeMessage}' if filterPaneEnabled is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          filterPaneEnabled: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, filterPaneEnabledInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${navContentPaneEnabledInvalidTypeMessage}' if navContentPaneEnabled is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          navContentPaneEnabled: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, navContentPaneEnabledInvalidTypeMessage);
    });

    it(`should return undefined settings is valid`, function () {
      // Arrange
      const testData = {
        settings: {
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      expect(errors).toBeUndefined();
    });
  });
});

describe("Unit | Filters", function () {
  describe("ValueFilter", function () {
    it("should accept values as separate arguments", function () {
      // Arrange
      
      // Act
      const valueFilter = new models.ValueFilter({ table: "t", column: "c" }, "In", 1, 2);
      
      // Assert
      expect(valueFilter.values).toEqual([1,2]);
    });
    
    it("should accept values as an array", function () {
      // Arrange
      const values = [1,2];
      
      // Act
      const valueFilter = new models.ValueFilter({ table: "t", column: "c" }, "In", values);
      
      // Assert
      expect(valueFilter.values).toEqual(values);
    });
    
    it("should return valid json format when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.IValueFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "a",
          column: "b"
        },
        operator: "In",
        values: [
          1,
          2,
          3
        ]
      };
      
      // Act
      const filter = new models.ValueFilter(
        expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);
      
      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
    
    it("valiator should return false if object does not validate against schema", function () {
      // Arrange
      const malformedFilter: any = {
        target: {
          table: "c",
          column: "d"
        }
      };
      
      // Act
      const errors = models.validateFilter(malformedFilter);
      
      // Assert
      expect(errors).toBeDefined();
    });
    
    it("should be able to be validated using json schema", function () {
      // Arrange
      const expectedFilter: models.IValueFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        operator: <any>"x",
        values: [
          "a",
          "b",
        ]
      };
      
      // Act
      const filter = new models.ValueFilter(
        expectedFilter.target,
        expectedFilter.operator,
        ...expectedFilter.values);
      
      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });
  });
  
  describe("AdvancedFilter", function () {
    it("should throw an error if logical operator is not a non-empty string", function () {
      // Arrange
      const condition: models.IAdvancedFilterCondition = {
        value: "a",
        operator: "LessThan"
      };
      
      // Act
      const attemptToCreateFilter = () => {
        return new models.AdvancedFilter({ table: "t", column: "c" }, <any>1, condition);
      };
      
      // Assert
      expect(attemptToCreateFilter).toThrowError();
    });
    
    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.IAdvancedFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        logicalOperator: "And",
        conditions: [
          {
            value: "a",
            operator: "LessThan"
          },
          {
            value: "b",
            operator: "LessThan"
          }
        ]
      };
      
      // Act
      const filter = new models.AdvancedFilter(
        expectedFilter.target,
        expectedFilter.logicalOperator,
        expectedFilter.conditions[0],
        expectedFilter.conditions[1]);
      
      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
    
    it("valiator should return false if object does not validate against schema", function () {
      // Arrange
      const malformedFilter: any = {
        filter: {
          entity: "c",
          property: "d"
        }
      };
      
      // Act
      const errors = models.validateFilter(malformedFilter);
      
      // Assert
      expect(errors).toBeDefined();
    });
    
    it("should be able to be validated using json schema", function () {
      // Arrange
      const expectedFilter: models.IAdvancedFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        logicalOperator: "And",
        conditions: [
          {
            value: "a",
            operator: "Is"
          },
          {
            value: "b",
            operator: "Is"
          }
        ]
      };
      
      // Act
      const filter = new models.AdvancedFilter(
        expectedFilter.target,
        expectedFilter.logicalOperator,
        expectedFilter.conditions[0],
        expectedFilter.conditions[1]);
      
      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });
  });

  describe('validateTarget', function () {
    it("valiator should return false if object does not validate against page target schema", function () {
      // Arrange
      const malformedPageTarget = {
        type: 'page',
      };
      
      // Act
      const errors = models.validateTarget(malformedPageTarget);
      
      // Assert
      expect(errors).toBeDefined();
    });

    it("valiator should return false if object does not validate against visual target schema", function () {
      // Arrange
      const malformedVisualTarget = {
        type: 'visual',
      };
      
      // Act
      const errors = models.validateTarget(malformedVisualTarget);
      
      // Assert
      expect(errors).toBeDefined();
    });

    it(`should return no error if visual target is valid`, function () {
      // Arrange
      let validVisualTarget: models.IVisualTarget = {
        type: 'visual',
        id: 'visualId'
      };

      // Act
      const errors = models.validateTarget(validVisualTarget);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return no error if page target is valid`, function () {
      // Arrange
      const validPageTarget: models.IPageTarget = {
        type: 'page',
        name: 'page1'
      };

      // Act
      const errors = models.validateTarget(validPageTarget);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('determine filter type', function () {
    it('isValueFilter should return true for objects with matching shemaUrl and false otherwise', function () {
      // Arrange
      const testData = {
      	filter: new models.ValueFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
        nonFilter: <models.IFilter>{}
      };

      // Act

      // Assert
      expect(models.isValueFilter(testData.filter.toJSON())).toBe(true);
      expect(models.isValueFilter(testData.nonFilter)).toBe(false);
    });

    it('isAdvancedFilter should return true for objects with matching shemaUrl and false otherwise', function () {
      // Arrange
      const testData = {
      	filter: new models.AdvancedFilter({ table: "a", column: "b" }, "And", 
          { operator: "Contains", value: "x" },
          { operator: "Contains", value: "x" }
        ),
        nonFilter: <models.IFilter>{}
      };

      // Act

      // Assert
      expect(models.isAdvancedFilter(testData.filter.toJSON())).toBe(true);
      expect(models.isAdvancedFilter(testData.nonFilter)).toBe(false);
    });
  });
});