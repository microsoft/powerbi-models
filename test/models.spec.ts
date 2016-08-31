import * as models from '../src/models';

describe('Unit | models.dashboard', function () {

    function testForExpectedMessage(errors: models.IError[], message: string) {
      expect(errors).toBeDefined();
      let flag = false;
      errors.forEach(error => {
        if (error.message === message) {
            flag = true;
        }
      });
	  
	  expect(flag).toBe(true);
    }
  
  describe('validateLoad', function () {

    const accessTokenRequiredMessage = models.dashboard.loadSchema.properties.accessToken.messages.required;
    const accessTokenInvalidTypeMessage = models.dashboard.loadSchema.properties.accessToken.invalidMessage;
    const idRequiredMessage = models.dashboard.loadSchema.properties.id.messages.required;
    const idInvalidTypeMessage = models.dashboard.loadSchema.properties.id.invalidMessage;

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
        // Arrange
        const testData = {
            load: {
            }
        };

        // Act
        const errors = models.dashboard.validateLoad(testData.load);

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
        const errors = models.dashboard.validateLoad(testData.load);

        // Assert
        testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, function () {
        // Arrange
        const testData = {
            load: {
                accessToken: '123'
            }
        };

        // Act
        const errors = models.dashboard.validateLoad(testData.load);

        // Assert
        testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, function () {
        // Arrange
        const testData = {
           load: {
               id: 1
           }
        };

        // Act
        const errors = models.dashboard.validateLoad(testData.load);

        // Assert
        testForExpectedMessage(errors, idInvalidTypeMessage);
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
        const errors = models.dashboard.validateLoad(testData.load);

        // Assert
        expect(errors).toBeUndefined();
     });
  });
});

describe('Unit | models.report', function () {
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
    const accessTokenRequiredMessage = models.report.loadSchema.properties.accessToken.messages.required;
    const accessTokenInvalidTypeMessage = models.report.loadSchema.properties.accessToken.messages.type;
    const idRequiredMessage = models.report.loadSchema.properties.id.messages.required;
    const idInvalidTypeMessage = models.report.loadSchema.properties.id.messages.type;
    const filtersInvalidMessage = models.report.loadSchema.properties.filters.invalidMessage;
    const pageNameInvalidTypeMessage = models.report.loadSchema.properties.pageName.messages.type;

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.report.validateLoad(testData.load);

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
      const errors = models.report.validateLoad(testData.load);

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
      const errors = models.report.validateLoad(testData.load);

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
      const errors = models.report.validateLoad(testData.load);

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
      const errors = models.report.validateLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${filtersInvalidMessage}' if filters is not a valid array of basicFilter or advancedFilter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filters: { x: 1 }
        }
      };

      // Act
      const errors = models.report.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, filtersInvalidMessage);
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
      const errors = models.report.validateLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, pageNameInvalidTypeMessage);
    });
  });

  describe('validateFilter', function () {
    it("should return errors if object does not validate against schema", function () {
      // Arrange
      const malformedFilter: any = {
        target: {
          table: "c",
          column: "d"
        }
      };
      const malformedFilter1: any = {
        filter: {
          entity: "c",
          property: "d"
        }
      };
      const malformedFilter2: any = {
        target: {
          table: 'a',
          column: 'b'
        },
        logicalOperator: 'And',
        conditions: [
          {
            value: { x: 1 },
            operator: 'condition1'
          }
        ]
      };

      // Act
      const errors = models.report.validateFilter(malformedFilter);
      const errors1 = models.report.validateFilter(malformedFilter1);
      const errors2 = models.report.validateFilter(malformedFilter2);

      // Assert
      expect(errors).toBeDefined();
      expect(errors1).toBeDefined();
      expect(errors2).toBeDefined();
    });

    it("should return undefined if object is valid basic filter schema", function () {
      // Arrange
      const expectedFilter: models.report.IBasicFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        operator: <any>"x",
        values: [
          "a",
          100,
          false
        ]
      };

      // Act
      const filter = new models.report.BasicFilter(
        expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);

      // Assert
      expect(models.report.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid advanced filter schema", function () {
      // Arrange
      const expectedFilter: models.report.IAdvancedFilter = {
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
            value: true,
            operator: "Is"
          },
          {
            value: 1,
            operator: "Is"
          }
        ]
      };

      const filter = new models.report.AdvancedFilter(
        expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions.slice(0, 2));

      const filter2 = new models.report.AdvancedFilter(
        expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions.slice(1, 3));

      // Act
      const errors = models.report.validateFilter(filter.toJSON());
      const errors2 = models.report.validateFilter(filter2.toJSON());

      // Assert
      expect(errors).toBeUndefined();
      expect(errors2).toBeUndefined();
    });
  });

  describe('validateSettings', function () {
    const filterPaneEnabledInvalidTypeMessage = models.report.settingsSchema.properties.filterPaneEnabled.messages.type;
    const navContentPaneEnabledInvalidTypeMessage = models.report.settingsSchema.properties.navContentPaneEnabled.messages.type;

    it(`should return errors with one containing message '${filterPaneEnabledInvalidTypeMessage}' if filterPaneEnabled is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          filterPaneEnabled: 1
        }
      };

      // Act
      const errors = models.report.validateSettings(testData.settings);

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
      const errors = models.report.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, navContentPaneEnabledInvalidTypeMessage);
    });

    it(`should return undefined if settings is valid`, function () {
      // Arrange
      const testData = {
        settings: {
        }
      };

      // Act
      const errors = models.report.validateSettings(testData.settings);

      // Assert
      expect(errors).toBeUndefined();
    });
  });
});

describe("Unit | Filters", function () {
  describe("BasicFilter", function () {
    it("should accept values as separate arguments", function () {
      // Arrange

      // Act
      const basicFilter = new models.report.BasicFilter({ table: "t", column: "c" }, "In", 1, 2);

      // Assert
      expect(basicFilter.values).toEqual([1, 2]);
    });

    it("should accept values as an array", function () {
      // Arrange
      const values = [1, 2];

      // Act
      const basicFilter = new models.report.BasicFilter({ table: "t", column: "c" }, "In", values);

      // Assert
      expect(basicFilter.values).toEqual(values);
    });

    it("should return valid json format when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.report.IBasicFilter = {
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
      const filter = new models.report.BasicFilter(
        expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });

    it("can be constructed using either array form or individual arguments", function () {
      // Arrange
      const expectedFilter: models.report.IBasicFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        operator: <any>"x",
        values: [
          "a",
          100,
          false
        ]
      };

      // Act
      const filter1 = new models.report.BasicFilter(expectedFilter.target, expectedFilter.operator, expectedFilter.values);
      const filter2 = new models.report.BasicFilter(expectedFilter.target, expectedFilter.operator, ...expectedFilter.values);

      // Assert
      expect(filter1.toJSON()).toEqual(filter2.toJSON());
    });
  });

  describe("AdvancedFilter", function () {
    it("should throw an error if logical operator is not a non-empty string", function () {
      // Arrange
      const condition: models.report.IAdvancedFilterCondition = {
        value: "a",
        operator: "LessThan"
      };

      // Act
      const attemptToCreateFilter = () => {
        return new models.report.AdvancedFilter({ table: "t", column: "c" }, <any>1, condition);
      };

      // Assert
      expect(attemptToCreateFilter).toThrowError();
    });

    it("should throw an error if more than two conditions are provided", function () {
      // Arrange
      const conditions: models.report.IAdvancedFilterCondition[] = [
        {
          value: "a",
          operator: "LessThan"
        },
        {
          value: "b",
          operator: "LessThan"
        },
        {
          value: "c",
          operator: "LessThan"
        }
      ];

      // Act
      const attemptToCreateFilter = () => {
        return new models.report.AdvancedFilter({ table: "Table", column: "c" }, "And", ...conditions);
      };

      // Assert
      expect(attemptToCreateFilter).toThrowError();
    });

    it("should throw an error if logical operator is not And when only 1 condition is provided", function () {
      // Arrange

      // Act
      const attemptToCreateFilter = () => {
        return new models.AdvancedFilter({ table: "Table", column: "c" }, "Or", { value: "a", operator: "Contains" });
      };

      // Assert
      expect(attemptToCreateFilter).toThrowError();
    });

    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.report.IAdvancedFilter = {
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
      const filter = new models.report.AdvancedFilter(
        expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });

    it("can be constructed using either array form or individual arguments", function () {
      // Arrange
      const expectedFilter: models.report.IAdvancedFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        logicalOperator: "Or",
        conditions: [
          {
            value: "v1",
            operator: "Contains"
          },
          {
            value: "v2",
            operator: "Contains"
          }
        ]
      };

      // Act
      const filter1 = new models.report.AdvancedFilter(expectedFilter.target, expectedFilter.logicalOperator, expectedFilter.conditions);
      const filter2 = new models.report.AdvancedFilter(expectedFilter.target, expectedFilter.logicalOperator, ...expectedFilter.conditions);

      // Assert
      expect(filter1.toJSON()).toEqual(filter2.toJSON());
    });
  });

  describe('determine filter type', function () {
    it('getFilterType should return type of filter given a filter object', function () {
      // Arrange
      const testData = {
        basicFilter: new models.report.BasicFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
        advancedFilter: new models.report.AdvancedFilter({ table: "a", column: "b" }, "And",
          { operator: "Contains", value: "x" },
          { operator: "Contains", value: "x" }
        ),
        nonFilter: <models.report.IFilter>{}
      };

      // Act

      // Assert
      expect(models.report.getFilterType(testData.basicFilter.toJSON())).toBe(models.report.FilterType.Basic);
      expect(models.report.getFilterType(testData.advancedFilter.toJSON())).toBe(models.report.FilterType.Advanced);
      expect(models.report.getFilterType(testData.nonFilter)).toBe(models.report.FilterType.Unknown);
    });
  });
});
