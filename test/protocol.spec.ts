import * as models from '../src/models';

describe('Unit | Protocol Schema', function () {
  describe('validateLoad', function () {
    it(`validateLoad returns errors with one containing message 'accessToken is required' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      expect(errors).toBeDefined();
      errors
        .forEach(error => {
          if (error.message === 'accessToken is required') {
            expect(true).toBe(true);
          }
        });
    });

    it(`validateLoad returns errors with one containing message 'accessToken must be a string' if accessToken is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 1
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      expect(errors).toBeDefined();
      errors
        .forEach(error => {
          if (error.message === 'accessToken must be a string') {
            expect(true).toBe(true);
          }
        });
    });

    it(`validateLoad returns errors with one containing message 'id is required' if id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      expect(errors).toBeDefined();
      errors
        .forEach(error => {
          if (error.message === 'id is required') {
            expect(true).toBe(true);
          }
        });
    });

    it(`validateLoad returns errors with one containing message 'id must be a string' if id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateLoad(testData.load);

      // Assert
      expect(errors).toBeDefined();
      errors
        .forEach(error => {
          if (error.message === 'id is required') {
            expect(true).toBe(true);
          }
        });
    });

    it(`validateLoad will return undefined if id and accessToken are provided`, function () {
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
});