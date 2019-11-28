import * as models from '../src/models';
import { IFilter, ITarget } from '../src/models';

describe('Unit | Models', function () {
  function testForExpectedMessage(errors: models.IError[], message: string) {
    expect(errors).toBeDefined();
    const atLeastOneMessageMatches = errors
      .some(error => error.message === message);

    expect(atLeastOneMessageMatches).toBe(true);
  }

  describe('validateReportLoad', function () {
    const accessTokenRequiredMessage = "accessToken is required";
    const accessTokenInvalidTypeMessage = "accessToken must be a string";
    const datasetIdInvalidTypeMessage = "datasetId must be a string";
    const datasetIdRequiredMessage = "datasetId is required";
    const idRequiredMessage = "id is required";
    const idInvalidTypeMessage = "id must be a string";
    const filtersInvalidMessage = "filters property is invalid";
    const pageNameInvalidTypeMessage = "pageName must be a string";
    const permissionsInvalidMessage = "permissions property is invalid";
    const permissionsInvalidTypeMessage = "permissions must be a number";
    const viewModeInvalidMessage = "viewMode property is invalid";
    const viewModeInvalidTypeMessage = "viewMode must be a number";

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

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
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken"
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken",
          id: 1
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

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
      const errors = models.validateReportLoad(testData.load);
      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${filtersInvalidMessage}' if filters is not a valid array of IFilter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filters: { x: 1 }
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, filtersInvalidMessage);
    });

    it(`should return errors if filters is array, but item is not a valid IFilter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filters: [
            { x: 1 }
          ]
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      expect(errors.length > 0).toBe(true);
    });

    it(`should return errors if filters is array, but not all items are valid IFIlter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filters: [
            new models.BasicFilter({ table: "fakeTable", column: "fakeColumn" }, "In", ["A"]).toJSON(),
            { x: 1 }
          ]
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });

    it(`should return undefined if filters is valid array of IFIlter`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          filters: [
            new models.BasicFilter({ table: "fakeTable", column: "fakeColumn" }, "In", ["A"]).toJSON(),
            new models.RelativeDateFilter({ table: "fakeTable", column: "fakeColumn" },
             models.RelativeDateOperators.InLast, 3, models.RelativeDateFilterTimeUnit.CalendarMonths, true).toJSON()
          ]
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
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
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, pageNameInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${permissionsInvalidTypeMessage}' if permissions is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          permissions: "SomeString"
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, permissionsInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${permissionsInvalidMessage}' if permissions is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          permissions: 5
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, permissionsInvalidMessage);
    });

    it(`should return errors with one containing message '${viewModeInvalidTypeMessage}' if viewMode is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          viewMode: "ViewModeString"
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, viewModeInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${viewModeInvalidMessage}' if viewMode is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          viewMode: 5
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, viewModeInvalidMessage);
    });

    it(`should return undefined if id, accessToken are provided and datasetBinding is valid`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          datasetBinding: {
            datasetId: "fakeDatasetId"
          }
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);
      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${datasetIdRequiredMessage}' if datasetId doesn't exists`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          datasetBinding: {
          }
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);
      // Assert
      testForExpectedMessage(errors, datasetIdRequiredMessage);
    });

    it(`should return errors with one containing message '${datasetIdInvalidTypeMessage}' if datasetId is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          datasetBinding: {
            datasetId: 1
          }
        }
      };

      // Act
      const errors = models.validateReportLoad(testData.load);
      // Assert
      testForExpectedMessage(errors, datasetIdInvalidTypeMessage);
    });
  });

  describe('validateCreateReport', function () {
    const accessTokenRequiredMessage = "accessToken is required";
    const accessTokenInvalidTypeMessage = "accessToken must be a string";
    const datasetIdRequiredMessage = "datasetId is required";
    const datasetIdInvalidTypeMessage = "datasetId must be a string";

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateCreateReport(testData.load);

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
      const errors = models.validateCreateReport(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${datasetIdRequiredMessage}' if datasetId is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken"
        }
      };

      // Act
      const errors = models.validateCreateReport(testData.load);

      // Assert
      testForExpectedMessage(errors, datasetIdRequiredMessage);
    });

    it(`should return errors with one containing message '${datasetIdInvalidTypeMessage}' if datasetId is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken",
          datasetId: 1
        }
      };

      // Act
      const errors = models.validateCreateReport(testData.load);

      // Assert
      testForExpectedMessage(errors, datasetIdInvalidTypeMessage);
    });

    it(`should return undefined if datasetId and accessToken are provided`, function () {
      // Arrange
      const testData = {
        load: {
          datasetId: 'fakeId',
          accessToken: 'fakeAccessToken'
        }
      };

      // Act
      const errors = models.validateCreateReport(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateDashboardLoad', function () {
    const accessTokenRequiredMessage = "accessToken is required";
    const accessTokenInvalidTypeMessage = "accessToken must be a string";
    const idRequiredMessage = "id is required";
    const idInvalidTypeMessage = "id must be a string";
    const pageViewInvalidMessage = "pageView must be a string with one of the following values: \"actualSize\", \"fitToWidth\", \"oneColumn\"";
    const pageViewInvalidTypeMessage = "pageView must be a string";
    const embedUrlInvalidTypeMessage = "embedUrl must be a string";

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

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
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken"
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 1
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

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
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if id and accessToken and pageView are provided`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          pageView: 'actualSize',
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${pageViewInvalidTypeMessage}' if pageView is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'id',
          pageView: 2,
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, pageViewInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${pageViewInvalidMessage}' if pageView is not a valid string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'id',
          pageView: 'pageView',
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, pageViewInvalidMessage);
    });

    it(`should return errors with one containing message '${embedUrlInvalidTypeMessage}' if embedUrl is not a valid string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'id',
          embedUrl: 1,
        }
      };

      // Act
      const errors = models.validateDashboardLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, embedUrlInvalidTypeMessage);
    });
  });

  describe('validateTileLoad', function () {
    const accessTokenRequiredMessage = "accessToken is required";
    const accessTokenInvalidTypeMessage = "accessToken must be a string";
    const idRequiredMessage = "id is required";
    const idInvalidTypeMessage = "id must be a string";
    const dashboardIdRequiredMessage = "dashboardId is required";
    const dashboardIdInvalidTypeMessage = "dashboardId must be a string";
    const widthITypeMessage = "width must be a number";
    const heightITypeMessage = "height must be a number";

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

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
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken"
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idRequiredMessage);
    });

    it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 1
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, idInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${dashboardIdRequiredMessage}' if dashboard id is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken",
          id: "fakeId"
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, dashboardIdRequiredMessage);
    });

    it(`should return errors with one containing message '${dashboardIdInvalidTypeMessage}' if dashboard id is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'fakeId',
          dashboardId: 1
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, dashboardIdInvalidTypeMessage);
    });

    it(`should return undefined if id, dashboardId and accessToken are provided`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          accessToken: 'fakeAccessToken',
          dashboardId: 'fakeDashboardId'
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if id, dashboardId, height, width, tokenType, filter and accessToken are provided`, function () {
      // Arrange
      const testData = {
        load: {
          id: 'fakeId',
          dashboardId: 'fakeDashboardId',
          height: 1,
          width: 2,
          tokenType: 0,
          accessToken: 'fakeAccessToken',
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${widthITypeMessage}' if width is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'fakeId',
          dashboardId: 'fakeDashboardId',
          width: 'two',
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, widthITypeMessage);
    });

    it(`should return errors with one containing message '${heightITypeMessage}' if height is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          id: 'fakeId',
          dashboardId: 'fakeDashboardId',
          height: '2',
        }
      };

      // Act
      const errors = models.validateTileLoad(testData.load);

      // Assert
      testForExpectedMessage(errors, heightITypeMessage);
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
      const errors = models.validateFilter(malformedFilter);
      const errors1 = models.validateFilter(malformedFilter1);
      const errors2 = models.validateFilter(malformedFilter2);

      // Assert
      expect(errors).toBeDefined();
      expect(errors1).toBeDefined();
      expect(errors2).toBeDefined();
    });

    it("should return undefined if object is valid basic filter schema", function () {
      // Arrange
      const expectedFilter: models.IBasicFilter = {
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
        ],
        filterType: models.FilterType.Basic
      };
      // Act
      const filter = new models.BasicFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid basic filter schema with operator All", function () {
      // Arrange
      const expectedFilter: models.IBasicFilter = {
        $schema: "http://powerbi.com/product/schema#advanced",
        target: {
          table: "a",
          column: "b"
        },
        operator: <any>"All",
        values: [],
        filterType: models.FilterType.Basic
      };

      // Act
      const filter = new models.BasicFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid relativeDate filter schema", function () {
      // Arrange
      const expectedFilter: models.IRelativeDateFilter = {
        $schema: "http://powerbi.com/product/schema#relativeDate",
        target: {
          table: "a",
          column: "b"
        },
        operator: models.RelativeDateOperators.InLast,
        timeUnitsCount: 11,
        timeUnitType: models.RelativeDateFilterTimeUnit.Years,
        includeToday: false,
        filterType: models.FilterType.RelativeDate
      };

      // Act
      const filter = new models.RelativeDateFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.timeUnitsCount,
        expectedFilter.timeUnitType,
        expectedFilter.includeToday);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid topN filter schema", function () {
      // Arrange
      const expectedFilter: models.ITopNFilter = {
        $schema: "http://powerbi.com/product/schema#topN",
        target: {
          table: "a",
          column: "b"
        },
        operator: "Top",
        itemCount: 2,
        filterType: models.FilterType.TopN,
        orderBy: {
          table: "a",
          column: "b"
        }
      };

      // Act
      const filter = new models.TopNFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.itemCount,
        <ITarget>expectedFilter.orderBy);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid notSupported filter schema", function () {
      // Arrange
      const expectedFilter: models.INotSupportedFilter = {
        $schema: "http://powerbi.com/product/schema#notSupported",
        target: {
          table: "a",
          column: "b"
        },
        message: "not supported",
        notSupportedTypeName: "not supported type",
        filterType: models.FilterType.Unknown
      };

      // Act
      const filter = new models.NotSupportedFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.message,
        expectedFilter.notSupportedTypeName);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid include/exclude filter schema", function () {
      // Arrange
      const expectedFilter: models.IIncludeExcludeFilter = {
        $schema: "http://powerbi.com/product/schema#includeExclude",
        target: {
          table: "a",
          column: "b"
        },
        values: [1,2],
        isExclude: true,
        filterType: models.FilterType.IncludeExclude
      };

      // Act
      const filter = new models.IncludeExcludeFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.isExclude,
        expectedFilter.values);

      // Assert
      expect(models.validateFilter(filter.toJSON())).toBeUndefined();
    });

    it("should return undefined if object is valid advanced filter schema", function () {
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
            value: true,
            operator: "Is"
          },
          {
            value: 1,
            operator: "Is"
          }
        ],
        filterType: models.FilterType.Advanced
      };

      const filter = new models.AdvancedFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions.slice(0, 2));

      const filter2 = new models.AdvancedFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions.slice(1, 3));

      // Act
      const errors = models.validateFilter(filter.toJSON());
      const errors2 = models.validateFilter(filter2.toJSON());

      // Assert
      expect(errors).toBeUndefined();
      expect(errors2).toBeUndefined();
    });
  });

  describe('validateSettings', function () {
    const filterPaneEnabledInvalidTypeMessage = "filterPaneEnabled must be a boolean";
    const navContentPaneEnabledInvalidTypeMessage = "navContentPaneEnabled must be a boolean";
    const bookmarksPaneEnabledInvalidTypeMessage = "bookmarksPaneEnabled must be a boolean";
    const useCustomSaveAsDialogInvalidTypeMessage = "useCustomSaveAsDialog must be a boolean";
    const extensionsInvalidMessage = "extensions property is invalid";
    const commandsInvalidMessage = "commands property is invalid";
    const layoutTypeInvalidTypeMessage = "layoutType must be a number";
    const layoutTypeInvalidMessage = "layoutType property is invalid";
    const customLayoutInvalidMessage = "customLayout must be an object";
    const hyperlinkClickBehaviorInvalidTypeMessage = "hyperlinkClickBehavior must be a number";
    const hyperlinkClickBehaviorInvalidMessage = "hyperlinkClickBehavior property is invalid";
    const modeInvalidMessage = "mode property is invalid";

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

    it(`should return errors with one containing message '${bookmarksPaneEnabledInvalidTypeMessage}' if bookmarksPaneEnabled is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          bookmarksPaneEnabled: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, bookmarksPaneEnabledInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${useCustomSaveAsDialogInvalidTypeMessage}' if useCustomSaveAsDialog is not a boolean`, function () {
      // Arrange
      const testData = {
        settings: {
          useCustomSaveAsDialog: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, useCustomSaveAsDialogInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${extensionsInvalidMessage}' if extensions array is invalid`, function () {
      // Arrange
      const testData = {
        settings: {
          extensions: [1]
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, extensionsInvalidMessage);
    });

    it(`should return errors with one containing message '${commandsInvalidMessage}' if commands array is invalid`, function () {
      // Arrange
      const testData = {
        settings: {
          commands: [1]
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, commandsInvalidMessage);
    });

    it(`should return errors with one containing message '${layoutTypeInvalidTypeMessage}' if layoutType is not a number`, function () {
      // Arrange
      const testData = {
        settings: {
          layoutType: true
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, layoutTypeInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${layoutTypeInvalidMessage}' if layoutType is not valid`, function () {
      // Arrange
      const testData = {
        settings: {
          layoutType: 4
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, layoutTypeInvalidMessage);
    });

    it(`should return errors with one containing message '${hyperlinkClickBehaviorInvalidTypeMessage}' if hyperlinkClickBehavior is not a number`, function () {
      // Arrange
      const testData = {
        settings: {
          hyperlinkClickBehavior: true
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, hyperlinkClickBehaviorInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${hyperlinkClickBehaviorInvalidMessage}' if hyperlinkClickBehavior is not valid`, function () {
      // Arrange
      const testData = {
        settings: {
          hyperlinkClickBehavior: 3
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, hyperlinkClickBehaviorInvalidMessage);
    });

    it(`should return errors with one containing message '${customLayoutInvalidMessage}' if customLayout type is not valid`, function () {
      // Arrange
      const testData = {
        settings: {
          customLayout: 1
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, customLayoutInvalidMessage);
    });

    it(`should return errors with one containing message '${modeInvalidMessage}' if customLayout type is not valid`, function () {
      // Arrange
      const testData = {
        settings: {
          navContentPaneEnabled: false,
          filterPaneEnabled: false,
          useCustomSaveAsDialog: false,
          extensions: [{command: {name: "name", extend: {}, title: "title"}}],
          commands: [{exportData: {displayOption: models.CommandDisplayOption.Enabled}}],
          layoutType: 0,
          customLayout: {
            pagesLayout: {
              "aaaa": {
                visualsLayout: {
                  "bbbb": {
                    x: 10,
                    y: 10,
                    z: 10,
                    width: 300,
                    height: 300,
                    displayState: {
                        mode: 3
                    }
                  }
                }
              }
            }
          }
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      testForExpectedMessage(errors, modeInvalidMessage);
    });

    it(`should return undefined if settings is valid (empty)`, function () {
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

    it(`should return undefined if settings is valid`, function () {
      // Arrange
      const testData = {
        settings: {
          navContentPaneEnabled: false,
          filterPaneEnabled: false,
          useCustomSaveAsDialog: false,
          extensions: [{command: {name: "name", extend: {}, title: "title"}}],
          commands: [{exportData: {displayOption: models.CommandDisplayOption.Enabled}}],
          layoutType: 0,
          customLayout: {}
        }
      };

      // Act
      const errors = models.validateSettings(testData.settings);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validate Extensions', function () {
    const commandNameInvalidTypeMessage = "name must be a string";
    const commandNameRequiredMessage = "name is required";
    const menuLocationInvalidMessage = "menuLocation property is invalid";
    const selectorInvalidTypeMessage = "selector property is invalid";

    it(`should return errors with one containing message '${commandNameInvalidTypeMessage}' if command name is not a string`, function () {
      // Arrange
      const testData = {
        extensions: {
          command: {
            name: true,
            title: "title",
            extend: {}
          }
        }
      };

      // Act
      const errors = models.validateExtension(testData.extensions);

      // Assert
      testForExpectedMessage(errors, commandNameInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${commandNameRequiredMessage}' if command name is not provided`, function () {
      // Arrange
      const testData = {
        extensions: {
          command: {
            title: "title",
            extend: {}
          }
        }
      };

      // Act
      const errors = models.validateExtension(testData.extensions);

      // Assert
      testForExpectedMessage(errors, commandNameRequiredMessage);
    });

    it(`should return undefined if extensions is valid`, function () {
      // Arrange
      const testData = {
        command: {
            name: "extension command",
            title: "Extend commands",
            icon: "base64Icon",
            extend: {
                visualContextMenu: {
                    title: "Extend context menu",
                    menuLocation: models.MenuLocation.Top,
                }
            }
        }
      };

      // Act
      const errors = models.validateExtension(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${menuLocationInvalidMessage}' if menu location is invalid`, function () {
      // Arrange
      const testData = {
        command: {
          name: "extension command",
          title: "Extend commands",
          icon: "base64Icon",
          extend: {
              visualContextMenu: {
                  title: "Extend context menu",
                  menuLocation: 3,
              }
          }
        }
      };

      // Act
      const errors = models.validateExtension(testData);

      // Assert
      testForExpectedMessage(errors, menuLocationInvalidMessage);
    });

    it(`should return undefined if extensions is valid with selector`, function () {
      // Arrange
      const testData = {
        command: {
            name: "extension command",
            title: "Extend commands",
            icon: "base64Icon",
            selector: {
              visualName: 'fakeId',
            },
            extend: {
                visualContextMenu: {
                    title: "Extend context menu",
                    menuLocation: models.MenuLocation.Top,
                }
            }
        }
      };

      // Act
      const errors = models.validateExtension(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${selectorInvalidTypeMessage}' if selector is invalid`, function () {
      // Arrange
      const testData = {
        command: {
            name: "extension command",
            title: "Extend commands",
            icon: "base64Icon",
            selector: 11,
            extend: {
            }
        }
      };

      // Act
      const errors = models.validateExtension(testData);

      // Assert
      testForExpectedMessage(errors, selectorInvalidTypeMessage);
    });
  });

  describe('validateCustomPageSize', function () {
    const typeRequiredMessage = "type is required";
    const typeInvalidTypedMessage = "type must be a number";
    const typeInvalidMessage = "type property is invalid";
    const widthInvalidTypeMessage = "width must be a number";
    const heightInvalidTypeMessage = "height must be a number";

    it(`should return errors with one containing message '${typeRequiredMessage}' if type field is not provided`, function () {
      // Arrange
      const testData = {
        pagesize: {
          width: 200,
          height: 100
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      testForExpectedMessage(errors, typeRequiredMessage);
    });

    it(`should return errors with one containing message '${typeInvalidTypedMessage}' if type is not a number`, function () {
      // Arrange
      const testData = {
        pagesize: {
          type: "typeString"
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      testForExpectedMessage(errors, typeInvalidTypedMessage);
    });

    it(`should return errors with one containing message '${typeInvalidMessage}' if type is invalid value`, function () {
      // Arrange
      const testData = {
        pagesize: {
          type: 7
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      testForExpectedMessage(errors, typeInvalidMessage);
    });

    it(`should return errors with one containing message '${widthInvalidTypeMessage}' if width field is not a number`, function () {
      // Arrange
      const testData = {
        pagesize: {
          type: 0,
          width: "width",
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      testForExpectedMessage(errors, widthInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${heightInvalidTypeMessage}' if height field is not a number`, function () {
      // Arrange
      const testData = {
        pagesize: {
          type: 0,
          width: 100,
          height: "height"
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      testForExpectedMessage(errors, heightInvalidTypeMessage);
    });

    it(`should return undefined if custom page size is valid`, function () {
      // Arrange
      const testData = {
        pagesize: {
          type: 0,
          height: 100
        }
      };

      // Act
      const errors = models.validateCustomPageSize(testData.pagesize);

      // Assert
      expect(errors).toBeUndefined();
    });

  });

  describe('validatePage', function () {
    const pageNameInvalidTypeMessage = "name must be a string";
    const pageNameRequiredMessage = "name is required";

    it(`should return errors with one containing message '${pageNameInvalidTypeMessage}' if name field is not a string`, function () {
      // Arrange
      const testData = {
        page: {
          name: true
        }
      };

      // Act
      const errors = models.validatePage(testData.page);

      // Assert
      testForExpectedMessage(errors, pageNameInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${pageNameRequiredMessage}' if page name is not provided`, function () {
      // Arrange
      const testData = {
        page: {
        }
      };

      // Act
      const errors = models.validatePage(testData.page);

      // Assert
      testForExpectedMessage(errors, pageNameRequiredMessage);
    });

    it(`should return undefined if page is valid`, function () {
      // Arrange
      const testData = {
        page: {
          name: "name"
        }
      };

      // Act
      const errors = models.validatePage(testData.page);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateSaveAsParameters', function () {
    const saveasNameInvalidTypeMessage = "name must be a string";
    const saveasNameRequiredMessage = "name is required";

    it(`should return errors with one containing message '${saveasNameInvalidTypeMessage}' if name field is not a string`, function () {
      // Arrange
      const testData = {
        saveas: {
          name: true
        }
      };

      // Act
      const errors = models.validateSaveAsParameters(testData.saveas);

      // Assert
      testForExpectedMessage(errors, saveasNameInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${saveasNameRequiredMessage}' if Save As name is not provided`, function () {
      // Arrange
      const testData = {
        saveas: {
        }
      };

      // Act
      const errors = models.validateSaveAsParameters(testData.saveas);

      // Assert
      testForExpectedMessage(errors, saveasNameRequiredMessage);
    });

    it(`should return undefined if Save As parameters are valid`, function () {
      // Arrange
      const testData = {
        saveas: {
          name: "name"
        }
      };

      // Act
      const errors = models.validateSaveAsParameters(testData.saveas);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateLoadQnaConfiguration', function () {
    const accessTokenRequiredMessage = "accessToken is required";
    const accessTokenInvalidTypeMessage = "accessToken must be a string";
    const datasetIdsRequiredMessage = "datasetIds is required";
    const datasetIdsInvalidTypeMessage = "datasetIds must be an array of strings";
    const questionInvalidTypeMessage = "question must be a string";
    const viewModeInvalidTypeMessage = "viewMode must be a number";
    const viewModeInvalidMessage = "viewMode property is invalid";
    const settingsInvalidTypeMessage = "settings must be an object";
    const settingsFilterPaneInvalidTypeMessage = "filterPaneEnabled must be a boolean";
    const tokenTypeInvalidTypeMessage = "tokenType must be a number";
    const tokenTypeInvalidMessage = "tokenType property is invalid";

    it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"]
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenRequiredMessage);
    });

    it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 1,
          datasetIds: ["1"]
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${datasetIdsRequiredMessage}' if datasetIds is not defined`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken"
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, datasetIdsRequiredMessage);
    });

    it(`should return errors with one containing message '${datasetIdsInvalidTypeMessage}' if datasetIds is not a string array`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: "fakeToken",
          datasetIds: [1]
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, datasetIdsInvalidTypeMessage);
    });

    it(`should return undefined if datasetIds and accessToken are provided`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken'
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);
      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${questionInvalidTypeMessage}' if question is not a string`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          question: 1
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, questionInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${viewModeInvalidTypeMessage}' if viewMode is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          viewMode: "ViewModeString"
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, viewModeInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${viewModeInvalidMessage}' if viewMode is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          viewMode: 5
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, viewModeInvalidMessage);
    });

    it(`should return errors with one containing message '${tokenTypeInvalidTypeMessage}' if tokenType is not a number`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          tokenType: "TokenTypeString"
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, tokenTypeInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${tokenTypeInvalidMessage}' if tokenType is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          tokenType: 5
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, tokenTypeInvalidMessage);
    });

    it(`should return errors with one containing message '${settingsFilterPaneInvalidTypeMessage}' if settings is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          settings: {
            filterPaneEnabled: "filterPaneEnabledString"
          }
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, settingsFilterPaneInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${settingsInvalidTypeMessage}' if settings is invalid`, function () {
      // Arrange
      const testData = {
        load: {
          datasetIds: ["1"],
          accessToken: 'fakeAccessToken',
          settings: true
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);

      // Assert
      testForExpectedMessage(errors, settingsInvalidTypeMessage);
    });

    it(`should return undefined if load qna configuration is valid`, function () {
      // Arrange
      const testData = {
        load: {
          accessToken: 'fakeAccessToken',
          datasetIds: ["1","2"],
          question: "fakeQuestion",
          viewMode: 1,
          settings: {
            filterPaneEnabled: true
          },
          tokenType: 0
        }
      };

      // Act
      const errors = models.validateLoadQnaConfiguration(testData.load);
      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateQnaInterpretInputData', function () {
    const datasetIdsInvalidTypeMessage = "datasetIds must be an array of strings";
    const questionRequiredMessage = "question is required";
    const questionInvalidTypeMessage = "question must be a string";

    it(`should return errors with one containing message '${datasetIdsInvalidTypeMessage}' if datasetIds field is not an array of strings`, function () {
      // Arrange
      const testData = {
        interpret: {
          question: "questionString",
          datasetIds: true
        }
      };

      // Act
      const errors = models.validateQnaInterpretInputData(testData.interpret);

      // Assert
      testForExpectedMessage(errors, datasetIdsInvalidTypeMessage);
    });

    it(`should return errors with one containing message '${questionRequiredMessage}' if question is not provided`, function () {
      // Arrange
      const testData = {
        interpret: {
        }
      };

      // Act
      const errors = models.validateQnaInterpretInputData(testData.interpret);

      // Assert
      testForExpectedMessage(errors, questionRequiredMessage);
    });

    it(`should return errors with one containing message '${questionInvalidTypeMessage}' if question is not a string`, function () {
      // Arrange
      const testData = {
        interpret: {
          question: false
        }
      };

      // Act
      const errors = models.validateQnaInterpretInputData(testData.interpret);

      // Assert
      testForExpectedMessage(errors, questionInvalidTypeMessage);
    });

    it(`should return undefined if qna interpret input is valid`, function () {
      // Arrange
      const testData = {
        interpret: {
          question: "questionString",
          datasetIds: ["1","2"]
        }
      };

      // Act
      const errors = models.validateQnaInterpretInputData(testData.interpret);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateCustomTheme', function() {
    const themeInvalidMessage = "themeJson must be an object";
    const themeName = "Theme 1";

    it(`should return errors with one containing message '${themeInvalidMessage}' if theme type is not valid`, function () {
      // Arrange
      const testData = {
          theme: {
              themeJson: 1
          }
      };

      // Act
      const errors = models.validateCustomTheme(testData.theme);

      // Assert
      testForExpectedMessage(errors, themeInvalidMessage);
    });

    it(`should not return errors if theme type is valid`, function () {
      // Arrange
      const testData = {
          theme: {
              themeJson: {name: themeName}
          }
      };

      // Act
      const errors = models.validateCustomTheme(testData.theme);

      // Assert
      expect(errors).toBeUndefined();
    });
  });

  describe('validateSlicers', function() {
    const selectorRequiredMessage = "selector is required";
    const stateRequiredMessage = "state is required";
    const stateInvalidTypeMessage = "state must be an object";
    const invalidSelectorMessage = "selector property is invalid";
    const slicerTargetSchema = "http://powerbi.com/product/schema#slicerTargetSelector";
    const filters: IFilter[] = [];

    it(`should return undefined if selector and state are valid`, function () {
      // Arrange
      const testData = {
        selector: {
          $schema: "http://powerbi.com/product/schema#visualSelector",
          visualName: 'fakeId',
        },
        state: {
          filters: filters
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if target selector and state are valid`, function () {
      // Arrange
      const testData = {
        selector: {
          $schema: slicerTargetSchema,
          target: {
            table: "a",
            column: "b"
          },
        },
        state: {
          filters: filters
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return errors with one containing message '${selectorRequiredMessage}' if selector is undefined`, function () {
      // Arrange
      const testData = {
        state: {
          filters: filters
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      testForExpectedMessage(errors, selectorRequiredMessage);
    });

    it(`should return errors with one containing message '${stateRequiredMessage}' if state is undefined`, function () {
      // Arrange
      const testData = {
        selector: {
          visualName: 'fakeId',
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      testForExpectedMessage(errors, stateRequiredMessage);
    });

    it(`should return errors with one containing message '${invalidSelectorMessage}' if selector is of invalid type`, function () {
      // Arrange
      const testData = {
        selector: 11,
        state: {
          filters: filters
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      testForExpectedMessage(errors, invalidSelectorMessage);
    });

    it(`should return errors with one containing message '${invalidSelectorMessage}' if target slicer selector is invalid`, function () {
      // Arrange
      const testData = {
        selector: {
          $schema: slicerTargetSchema,
          target: {
            table: "a"
          },
        },
        state: {
          filters: filters
        }
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      testForExpectedMessage(errors, invalidSelectorMessage);
    });

    it(`should return errors with one containing message '${stateInvalidTypeMessage}' if state is invalid`, function () {
      // Arrange
      const testData = {
        selector: {
          visualName: 'fakeId',
        },
        state: 11
      };

      // Act
      const errors = models.validateSlicer(testData);

      // Assert
      testForExpectedMessage(errors, stateInvalidTypeMessage);
    });
  });

  describe('validateVisualHeader', function() {
    const settingsRequiredMessage = "settings is required";
    const invalidSelectorMessage = "selector property is invalid";

    it(`should return undefined if settings and selector are valid`, function () {
      // Arrange
      const testData = {
        settings: {
          show: false
        },
        selector: {
          visualName: 'fakeId',
        }
      };

      // Act
      const errors = models.validateVisualHeader(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if settings and visual type selector are valid`, function () {
      // Arrange
      const testData = {
        settings: {
          show: false
        },
        selector: {
          $schema: 'http://powerbi.com/product/schema#visualTypeSelector',
          visualType: 'fakeType',
        }
      };

      // Act
      const errors = models.validateVisualHeader(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if settings is valid and selector is undefined`, function () {
      // Arrange
      const testData = {
        settings: {
          show: false
        }
      };

      // Act
      const errors = models.validateVisualHeader(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return error if settings is undefined`, function () {
      // Arrange
      const testData = {
      };

      // Act
      const errors = models.validateVisualHeader(testData);

      // Assert
      testForExpectedMessage(errors, settingsRequiredMessage);
    });

    it(`should return error if selector is invalid`, function () {
      // Arrange
      const testData = {
        settings: {
          show: false
        },
        selector: {
          visualName: 123,
        }
      };

      // Act
      const errors = models.validateVisualHeader(testData);

      // Assert
      testForExpectedMessage(errors, invalidSelectorMessage);
    });
  });

  describe('validateCommandsSettings', function() {
    const invalidSelectorMessage = "selector property is invalid";
    const displayOptionRequiredMessage = "displayOption is required";
    const invalidDisplayOptionMessage = "displayOption property is invalid";

    it(`should return undefined if displayOption and selector are valid`, function () {
      // Arrange
      const testData = {
          exportData: {
            displayOption: models.CommandDisplayOption.Enabled,
            selector: {
              visualName: 'fakeId',
            }
          }
        };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if displayOptions are valid`, function () {
      // Arrange
      const singleCommandSettings =  { displayOption: models.CommandDisplayOption.Enabled };
      const testData = {
          copy: singleCommandSettings,
          drill: singleCommandSettings,
          drillthrough: singleCommandSettings,
          expandCollapse: singleCommandSettings,
          exportData: singleCommandSettings,
          includeExclude: singleCommandSettings,
          removeVisual: singleCommandSettings,
          search: singleCommandSettings,
          seeData: singleCommandSettings,
          sort: singleCommandSettings,
          spotlight: singleCommandSettings,
        };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if displayOption and visual type selector are valid`, function () {
      const testData = {
          exportData: {
            displayOption: models.CommandDisplayOption.Disabled,
            selector: {
              $schema: 'http://powerbi.com/product/schema#visualTypeSelector',
              visualType: 'fakeType',
            },
          },
          seeData: {
            displayOption: models.CommandDisplayOption.Disabled,
            selector: {
              $schema: "http://powerbi.com/product/schema#visualSelector",
              visualName: 'fakeName',
            },
          }
        };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return undefined if displayOption is valid and selector is undefined`, function () {
      // Arrange
      const testData = {
          exportData: {
            displayOption: models.CommandDisplayOption.Hidden,
          },
          seeData: {
            displayOption: models.CommandDisplayOption.Disabled,
          }
        };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      expect(errors).toBeUndefined();
    });

    it(`should return error if displayOption is undefined`, function () {
      // Arrange
      const testData = {
        exportData: {}
      };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      testForExpectedMessage(errors, displayOptionRequiredMessage);
    });

    it(`should return error if selector is invalid`, function () {
      // Arrange
      const testData = {
          exportData: {
            displayOption: models.CommandDisplayOption.Disabled,
            selector: {
              visualName: 123,
            }
          }
        };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      testForExpectedMessage(errors, invalidSelectorMessage);
    });

    it(`should return error if displayOption is invalid`, function () {
      // Arrange
      const testData = {
        exportData: {
          displayOption: 5,
        }
      };

      // Act
      const errors = models.validateCommandsSettings(testData);

      // Assert
      testForExpectedMessage(errors, invalidDisplayOptionMessage);
    });
  });
});

describe("Unit | Filters", function () {
  describe("BasicFilter", function () {
    it("should accept values as separate arguments", function () {
      // Arrange

      // Act
      const basicFilter = new models.BasicFilter({ table: "t", column: "c" }, "In", 1, 2);

      // Assert
      expect(basicFilter.values).toEqual([1, 2]);
    });

    it("should accept values as an array", function () {
      // Arrange
      const values = [1, 2];

      // Act
      const basicFilter = new models.BasicFilter({ table: "t", column: "c" }, "In", values);

      // Assert
      expect(basicFilter.values).toEqual(values);
    });

    it("should accept values as an array of tuples", function () {
      // Arrange
      const values = [1, 2];
      const keyValues = [[1, 2], [3,4]];

      // Act
      const basicFilterOnColumn = new models.BasicFilterWithKeys({ table: "t", column: "c" , keys: ["1", "2"]}, "In", values, keyValues);
      const basicFilterOnHierarchy = new models.BasicFilterWithKeys({ table: "t", hierarchy: "c" , hierarchyLevel: "level", keys: ["1", "2"]}, "In", values, keyValues);

      // Assert
      expect(basicFilterOnColumn.values).toEqual(values);
      expect(basicFilterOnHierarchy.values).toEqual(values);
    });

    it("should throw an exception when values are an array of tuples, but tuples length is different than keys length", function () {
      // Arrange
      const values = [1, 2];
      const keyValues = [[1, 2], [3,4]];

      // Act
      const attemptToCreateFilterOnColumn = () => {
        return new models.BasicFilterWithKeys({ table: "t", column: "c" , keys: ["1"]}, "In", values, keyValues);
      };
            // Act
      const attemptToCreateFilterOnHierarchy = () => {
        return new models.BasicFilterWithKeys({ table: "t", hierarchy: "c" , hierarchyLevel: "level", keys: ["1"]}, "In", values, keyValues);
      };
      expect(attemptToCreateFilterOnColumn).toThrowError();
      expect(attemptToCreateFilterOnHierarchy).toThrowError();
    });

    it("should return valid json format when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.IBasicFilter = {
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
        ],
        filterType: models.FilterType.Basic,
        requiresSingleSelect: false
      };

      // Act
      const filter = new models.BasicFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.values);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });

    it("can be constructed using either array form or individual arguments", function () {
      // Arrange
      const expectedFilter: models.IBasicFilter = {
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
        ],
        filterType: models.FilterType.Basic
      };

      // Act
      const filter1 = new models.BasicFilter(<models.IFilterTarget>expectedFilter.target, expectedFilter.operator, expectedFilter.values);
      const filter2 = new models.BasicFilter(<models.IFilterTarget>expectedFilter.target, expectedFilter.operator, ...expectedFilter.values);

      // Assert
      expect(filter1.toJSON()).toEqual(filter2.toJSON());
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

    it("should throw an error if more than two conditions are provided", function () {
      // Arrange
      const conditions: models.IAdvancedFilterCondition[] = [
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
        return new models.AdvancedFilter({ table: "Table", column: "c" }, "And", ...conditions);
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
        ],
        filterType: models.FilterType.Advanced
      };

      // Act
      const filter = new models.AdvancedFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.logicalOperator,
        ...expectedFilter.conditions);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });

    it("can be constructed using either array form or individual arguments", function () {
      // Arrange
      const expectedFilter: models.IAdvancedFilter = {
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
        ],
        filterType: models.FilterType.Advanced
      };

      // Act
      const filter1 = new models.AdvancedFilter(<models.IFilterTarget>expectedFilter.target, expectedFilter.logicalOperator, expectedFilter.conditions);
      const filter2 = new models.AdvancedFilter(<models.IFilterTarget>expectedFilter.target, expectedFilter.logicalOperator, ...expectedFilter.conditions);

      // Assert
      expect(filter1.toJSON()).toEqual(filter2.toJSON());
    });
  });

  describe("RelativeDateFilter", function () {
    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.IRelativeDateFilter = {
        $schema: "http://powerbi.com/product/schema#relativeDate",
        target: {
          table: "a",
          column: "b"
        },
        filterType: models.FilterType.RelativeDate,
        operator: models.RelativeDateOperators.InLast,
        timeUnitsCount: 11,
        timeUnitType: models.RelativeDateFilterTimeUnit.Years,
        includeToday: false,
      };

      // Act
      const filter = new models.RelativeDateFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.timeUnitsCount,
        expectedFilter.timeUnitType,
        expectedFilter.includeToday);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
  });

  describe("notSupportedFilterFilter", function () {
    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.INotSupportedFilter = {
        $schema: "http://powerbi.com/product/schema#notSupported",
        target: null,
        filterType: models.FilterType.Unknown,
        message: 'filter is not supported',
        notSupportedTypeName: 'new filter name'
      };

      // Act
      const filter = new models.NotSupportedFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.message,
        expectedFilter.notSupportedTypeName);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
  });

  describe("topNFilter", function () {
    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.ITopNFilter = {
        $schema: "http://powerbi.com/product/schema#topN",
        target: {
          table: "a",
          column: "b",
        },
        filterType: models.FilterType.TopN,
        operator: "Top",
        itemCount: 3,
        orderBy: {
          table: "a",
          column: "b"
        }
      };

      // Act
      const filter = new models.TopNFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.operator,
        expectedFilter.itemCount,
        <ITarget>expectedFilter.orderBy);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
  });

  describe("includeExcludeFilter", function () {
    it("should output the correct json when toJSON is called", function () {
      // Arrange
      const expectedFilter: models.IIncludeExcludeFilter = {
        $schema: "http://powerbi.com/product/schema#includeExclude",
        target: {
          table: "a",
          column: "b"
        },
        filterType: models.FilterType.IncludeExclude,
        isExclude: false,
        values: [1,2,3],
      };

      // Act
      const filter = new models.IncludeExcludeFilter(
        <models.IFilterTarget>expectedFilter.target,
        expectedFilter.isExclude,
        expectedFilter.values);

      // Assert
      expect(filter.toJSON()).toEqual(expectedFilter);
    });
  });

  describe('determine types', function () {
    it('filter object should be constructed with the correct filterType', function () {
      // Arrange
      const testData = {
        basicFilter: new models.BasicFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
        basicFilterWithKeysOnColumn: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2",2]]),
        basicFilterWithKeysOnHierarchy: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2",2]]),
        advancedFilter: new models.AdvancedFilter({ table: "a", column: "b" }, "And",
          { operator: "Contains", value: "x" },
          { operator: "Contains", value: "x" }
        ),
        relativeDateFilter: new models.RelativeDateFilter({ table: "a", column: "b" }, models.RelativeDateOperators.InLast,
        3, models.RelativeDateFilterTimeUnit.CalendarMonths, true),
        topNFilter: new models.TopNFilter({ table: "a", column: "b" }, "Top", 4, { table: "a", column: "b" }),
        includeExclude: new models.IncludeExcludeFilter({ table: "a", column: "b" }, true, [1,2])
      };

      // Act

      // Assert
      expect(models.getFilterType(testData.basicFilter.toJSON())).toBe(models.FilterType.Basic);
      expect(models.getFilterType(testData.basicFilterWithKeysOnColumn.toJSON())).toBe(models.FilterType.Basic);
      expect(models.getFilterType(testData.basicFilterWithKeysOnHierarchy.toJSON())).toBe(models.FilterType.Basic);
      expect(models.getFilterType(testData.advancedFilter.toJSON())).toBe(models.FilterType.Advanced);
      expect(models.getFilterType(testData.relativeDateFilter.toJSON())).toBe(models.FilterType.RelativeDate);
      expect(models.getFilterType(testData.topNFilter.toJSON())).toBe(models.FilterType.TopN);
      expect(models.getFilterType(testData.includeExclude.toJSON())).toBe(models.FilterType.IncludeExclude);
    });

    it('isFilterKeyColumnsTarget should return the correct response', function () {
      // Arrange
      let filterKeyColumnsTarget = { table: "a", column: "b", keys: ["key1"] };
      let filterColumnTarget = { table: "a", column: "b"};

      // Assert
      expect(models.isFilterKeyColumnsTarget(filterKeyColumnsTarget)).toBeTruthy();
      expect(models.isFilterKeyColumnsTarget(filterColumnTarget)).toBeFalsy();
    });

    it('isBasicFilterWithKeys should return the correct response', function () {
      // Arrange
      const testData = {
        basicFilter: new models.BasicFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
        basicFilterWithKeys: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2",2]]),
      };

      // Assert
      expect(models.isBasicFilterWithKeys(testData.basicFilter.toJSON())).toBeFalsy();
      expect(models.isBasicFilterWithKeys(testData.basicFilterWithKeys.toJSON())).toBeTruthy();
    });
  });
});
