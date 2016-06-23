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
  });

  describe('validateSettings', function () {
    const filterInvalidMessage = models.settingsSchema.properties.filter.invalidMessage;
    const filterPaneEnabledInvalidTypeMessage = models.settingsSchema.properties.filterPaneEnabled.messages.type;
    const pageNavigationEnabledInvalidTypeMessage = models.settingsSchema.properties.pageNavigationEnabled.messages.type;
    const pageNameInvalidTypeMessage = models.settingsSchema.properties.pageName.messages.type;

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

    it(`should return errors with one containing message '${pageNavigationEnabledInvalidTypeMessage}' if pageNavigationEnabled is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          pageNavigationEnabled: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, pageNavigationEnabledInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${pageNameInvalidTypeMessage}' if pageName is not a string`, function () {
      // Arrange
      const testData = {
        settings: {
          pageName: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, pageNameInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${filterInvalidMessage}' if filter is not a valid valueFilter or advancedFilter`, function () {
      // Arrange
      const testData = {
        settings: {
          filter: { x: 1 }
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, filterInvalidMessage);
    });
  });
});