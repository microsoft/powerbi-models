// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Validators } from '../src/validators/core/validator';
import * as models from '../src/models';
import { IFilter, ITarget, IQuickCreateConfiguration } from '../src/models';

describe('Unit | Models', () => {
    function testForExpectedMessage(errors: models.IError[], message: string): void {
        expect(errors).toBeDefined();
        const atLeastOneMessageMatches = errors
            .some((error) => error.message === message);

        expect(atLeastOneMessageMatches).toBe(true);
    }

    describe('validateReportLoad', () => {
        const accessTokenRequiredMessage = "accessToken is required";
        const accessTokenInvalidTypeMessage = "accessToken must be a string";
        const datasetIdInvalidTypeMessage = "datasetId must be a string";
        const datasetIdRequiredMessage = "datasetId is required";
        const idRequiredMessage = "id is required";
        const idInvalidTypeMessage = "id must be a string";
        const pageNameInvalidTypeMessage = "pageName must be a string";
        const permissionsInvalidMessage = "permissions property is invalid";
        const permissionsInvalidTypeMessage = "permissions must be a number";
        const viewModeInvalidMessage = "viewMode property is invalid";
        const viewModeInvalidTypeMessage = "viewMode must be a number";

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
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

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
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

        it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, () => {
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

        it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, () => {
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

        it(`should return undefined if id and accessToken are provided`, () => {
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

        it(`should return errors if filters is array, but item is not a valid IFilter`, () => {
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

        it(`should return errors if filters is array, but not all items are valid IFIlter`, () => {
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

        it(`should return undefined if filters is valid array of IFIlter`, () => {
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

        it(`should return errors with one containing message '${pageNameInvalidTypeMessage}' if pageName is not a string`, () => {
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

        it(`should return errors with one containing message '${permissionsInvalidTypeMessage}' if permissions is not a number`, () => {
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

        it(`should return errors with one containing message '${permissionsInvalidMessage}' if permissions is invalid`, () => {
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

        it(`should return errors with one containing message '${viewModeInvalidTypeMessage}' if viewMode is not a number`, () => {
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

        it(`should return errors with one containing message '${viewModeInvalidMessage}' if viewMode is invalid`, () => {
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

        it(`should return undefined if id, accessToken are provided and datasetBinding is valid`, () => {
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

        it(`should return errors with one containing message '${datasetIdRequiredMessage}' if datasetId doesn't exists`, () => {
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

        it(`should return errors with one containing message '${datasetIdInvalidTypeMessage}' if datasetId is not a string`, () => {
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

    describe('validateCreateReport', () => {
        const accessTokenRequiredMessage = "accessToken is required";
        const accessTokenInvalidTypeMessage = "accessToken must be a string";
        const datasetIdRequiredMessage = "datasetId is required";
        const datasetIdInvalidTypeMessage = "datasetId must be a string";

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
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

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
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

        it(`should return errors with one containing message '${datasetIdRequiredMessage}' if datasetId is not defined`, () => {
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

        it(`should return errors with one containing message '${datasetIdInvalidTypeMessage}' if datasetId is not a string`, () => {
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

        it(`should return undefined if datasetId and accessToken are provided`, () => {
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

    describe('validateQuickCreate', () => {
        const accessTokenRequiredMessage = "accessToken is required";
        const accessTokenInvalidTypeMessage = "accessToken must be a string";
        const rawDataInvalidMessage = "data property is invalid";
        const rawDataNoSchemaErrorMessage = "tableSchemaList cannot be empty when data is provided";
        const rawDataAndMashupMissingErrorMessage = "At least one of data or mashupDocument must be provided";
        const datasourceConfigNoMeshupErrorMessage = "mashupDocument cannot be empty when datasourceConnectionConfig is presented";

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
            // Arrange
            const testData = {
                load: {
                }
            };

            // Act
            const errors = models.validateQuickCreate(testData.load);

            // Assert
            testForExpectedMessage(errors, accessTokenRequiredMessage);
        });

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
            // Arrange
            const testData = {
                load: {
                    accessToken: 1
                }
            };

            // Act
            const errors = models.validateQuickCreate(testData.load);

            // Assert
            testForExpectedMessage(errors, accessTokenInvalidTypeMessage);
        });

        describe('datasetCreateConfig', () => {
            it(`happy path`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            mashupDocument: "document",
                            datasourceConnectionConfig: {
                                credentialType: models.CredentialType.Anonymous
                            },
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                expect(errors).toBeUndefined();
            });

            it(`should fail when datasourceConnectionConfig has unsupported dataCacheMode`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            datasourceConnectionConfig: {
                                dataCacheMode: 3
                            },
                            mashupDocument: "document",
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                testForExpectedMessage(errors, "dataCacheMode property is invalid");
            });

            it(`should fail when datasourceConnectionConfig has unsupported credential type`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            datasourceConnectionConfig: {
                                credentials: {
                                    credentialType: 5
                                }
                            },
                            mashupDocument: "document",
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                testForExpectedMessage(errors, "credentialType property is invalid");
            });

            it(`dataset with raw data`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            tableSchemaList: [{
                                name: "Table",
                                columns: [{
                                    name: "fieldname",
                                    dataType: models.DataType.Int32,
                                }]
                            }],
                            data: [{
                                name: "Table",
                                rows: [['test','1']]
                            }],
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                expect(errors).toBeUndefined();
            });

            it(`dataset with raw data without schema`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            data: [{
                                name: "Table",
                                rows: [['test','1']]
                            }],
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                testForExpectedMessage(errors, rawDataNoSchemaErrorMessage);
            });

            it(`should fail when raw data has invalid fields`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            data: [{
                                name: "Table",
                                rows: [['test', 20]]
                            }],
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                testForExpectedMessage(errors, rawDataInvalidMessage);
            });

            it(`should fail when raw data has invalid schema`, () => {
                // Arrange
                const testData = {
                    load: {
                        accessToken: "fakeToken",
                        datasetCreateConfig: {
                            locale: "en_US",
                            data: [{
                                name: "Table",
                                rows: ['test']
                            }],
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData.load);

                // Assert
                testForExpectedMessage(errors, rawDataInvalidMessage);
            });

            it(`dataset with table schema`, () => {
                // Arrange
                const testData: IQuickCreateConfiguration = {
                    accessToken: "fakeToken",
                    datasetCreateConfig: {
                        locale: "en_US",
                        mashupDocument: "testdoc",
                        tableSchemaList: [{
                            name: "Table",
                            columns: [{
                                name: "fieldname",
                                displayName: "displayName",
                                dataType: models.DataType.Int32,
                            }]
                        }]
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData);

                // Assert
                expect(errors).toBeUndefined();
            });

            it(`dataset with no mashup no raw data`, () => {
                // Arrange
                const testData: IQuickCreateConfiguration = {
                    accessToken: "fakeToken",
                    datasetCreateConfig: {
                        locale: "en_US"
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData);

                // Assert
                testForExpectedMessage(errors, rawDataAndMashupMissingErrorMessage);
            });

            it(`dataset with datasourceConfig no mashup`, () => {
                // Arrange
                const testData: IQuickCreateConfiguration = {
                    accessToken: "fakeToken",
                    datasetCreateConfig: {
                        locale: "en_US",
                        datasourceConnectionConfig: {
                            credentials: {
                                credentialType: models.CredentialType.Anonymous
                            }
                        }
                    }
                };

                // Act
                const errors = models.validateQuickCreate(testData);

                // Assert
                testForExpectedMessage(errors, datasourceConfigNoMeshupErrorMessage);
            });
        });
    });

    describe('validatePaginatedReportLoad', () => {
        const testData: any = {
            accessToken: "token",
            id: "reportid",
        };
        it(`happy path`, () => {
            testData.settings = { commands: { parameterPanel: { enabled: true, expanded: true } } };
            const errors = models.validatePaginatedReportLoad(testData);
            expect(errors).toBeUndefined();
        });
        it(`happy path with parameterValues`, () => {
            testData.parameterValues =  [{ name: 'dummy name', value: 'dummy value' }];
            const errors = models.validatePaginatedReportLoad(testData);
            expect(errors).toBeUndefined();
        });
        it('should fail if "parameterValues" is not an array', () => {
            testData.parameterValues = 'object';
            const errors = models.validatePaginatedReportLoad(testData);
            testForExpectedMessage(errors, 'parameterValues property is invalid');
        });
        it('should fail if name field is not a string', () => {
            testData.parameterValues = [
                {
                    name: {},
                    value: 'dummy value'
                }
            ];
            const errors = models.validatePaginatedReportLoad(testData);
            testForExpectedMessage(errors, 'parameterValues property is invalid');
        });
        it('should fail if value field is not a string or null', () => {
            testData.parameterValues = [
                {
                    name: 'dummy name',
                    value: 'dummy value'
                },
                {
                    name: 'dummy name 2',
                    value: null
                },
                {
                    name: 'dummy name 3',
                    value: 3
                }
            ];
            const errors = models.validatePaginatedReportLoad(testData);
            testForExpectedMessage(errors, 'parameterValues property is invalid');
        });
    });

    describe('validateDashboardLoad', () => {
        const accessTokenRequiredMessage = "accessToken is required";
        const accessTokenInvalidTypeMessage = "accessToken must be a string";
        const idRequiredMessage = "id is required";
        const idInvalidTypeMessage = "id must be a string";
        const pageViewInvalidMessage = "pageView must be a string with one of the following values: \"actualSize\", \"fitToWidth\", \"oneColumn\"";
        const pageViewInvalidTypeMessage = "pageView must be a string";
        const embedUrlInvalidTypeMessage = "embedUrl must be a string";

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
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

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
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

        it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, () => {
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

        it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, () => {
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

        it(`should return undefined if id and accessToken are provided`, () => {
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

        it(`should return undefined if id and accessToken and pageView are provided`, () => {
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

        it(`should return errors with one containing message '${pageViewInvalidTypeMessage}' if pageView is not a string`, () => {
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

        it(`should return errors with one containing message '${pageViewInvalidMessage}' if pageView is not a valid string`, () => {
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

        it(`should return errors with one containing message '${embedUrlInvalidTypeMessage}' if embedUrl is not a valid string`, () => {
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

    describe('validateTileLoad', () => {
        const accessTokenRequiredMessage = "accessToken is required";
        const accessTokenInvalidTypeMessage = "accessToken must be a string";
        const idRequiredMessage = "id is required";
        const idInvalidTypeMessage = "id must be a string";
        const dashboardIdRequiredMessage = "dashboardId is required";
        const dashboardIdInvalidTypeMessage = "dashboardId must be a string";
        const widthITypeMessage = "width must be a number";
        const heightITypeMessage = "height must be a number";

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
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

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
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

        it(`should return errors with one containing message '${idRequiredMessage}' if id is not defined`, () => {
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

        it(`should return errors with one containing message '${idInvalidTypeMessage}' if id is not a string`, () => {
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

        it(`should return errors with one containing message '${dashboardIdRequiredMessage}' if dashboard id is not defined`, () => {
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

        it(`should return errors with one containing message '${dashboardIdInvalidTypeMessage}' if dashboard id is not a string`, () => {
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

        it(`should return undefined if id, dashboardId and accessToken are provided`, () => {
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

        it(`should return undefined if id, dashboardId, height, width, tokenType, filter and accessToken are provided`, () => {
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

        it(`should return errors with one containing message '${widthITypeMessage}' if width is not a number`, () => {
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

        it(`should return errors with one containing message '${heightITypeMessage}' if height is not a number`, () => {
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

    describe('validateFilter', () => {
        it("should return errors if object does not validate against schema", () => {
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

        it("should return undefined if object is valid basic filter schema", () => {
            // Arrange
            const expectedFilter: models.IBasicFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "a",
                    column: "b"
                },
                operator: "x" as any,
                values: [
                    "a",
                    100,
                    false
                ],
                filterType: models.FilterType.Basic
            };
            // Act
            const filter = new models.BasicFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.values);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid basic filter schema with operator All", () => {
            // Arrange
            const expectedFilter: models.IBasicFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "a",
                    column: "b"
                },
                operator: "All" as any,
                values: [],
                filterType: models.FilterType.Basic
            };

            // Act
            const filter = new models.BasicFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.values);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid relativeDate filter schema", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.timeUnitsCount,
                expectedFilter.timeUnitType,
                expectedFilter.includeToday);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid relativeTime filter schema", () => {
            // Arrange
            const expectedFilter: models.IRelativeTimeFilter = {
                $schema: "http://powerbi.com/product/schema#relativeTime",
                target: {
                    table: "a",
                    column: "b"
                },
                operator: models.RelativeDateOperators.InLast,
                timeUnitsCount: 11,
                timeUnitType: models.RelativeDateFilterTimeUnit.Hours,
                filterType: models.FilterType.RelativeTime
            };

            // Act
            const filter = new models.RelativeTimeFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.timeUnitsCount,
                expectedFilter.timeUnitType);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid topN filter schema", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.itemCount,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                expectedFilter.orderBy as ITarget);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid notSupported filter schema", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.message,
                expectedFilter.notSupportedTypeName);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid include/exclude filter schema", () => {
            // Arrange
            const expectedFilter: models.IIncludeExcludeFilter = {
                $schema: "http://powerbi.com/product/schema#includeExclude",
                target: {
                    table: "a",
                    column: "b"
                },
                values: [1, 2],
                isExclude: true,
                filterType: models.FilterType.IncludeExclude
            };

            // Act
            const filter = new models.IncludeExcludeFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.isExclude,
                expectedFilter.values);

            // Assert
            expect(models.validateFilter(filter.toJSON())).toBeUndefined();
        });

        it("should return undefined if object is valid advanced filter schema", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.logicalOperator,
                ...expectedFilter.conditions.slice(0, 2));

            const filter2 = new models.AdvancedFilter(
                expectedFilter.target as models.IFilterTarget,
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

    describe('validateUpdateFiltersRequest', () => {
        const operations = [
            models.FiltersOperations.Add,
            models.FiltersOperations.Replace,
            models.FiltersOperations.ReplaceAll,
        ];

        for (const operation of operations) {
            it(`should return undefined for request with ${models.FiltersOperations[operation]} operation and empty filters array`, () => {
                const request: models.IUpdateFiltersRequest = {
                    filtersOperation: operation,
                    filters: []
                };
                expect(models.validateUpdateFiltersRequest(request)).toBeUndefined();
            });

            it(`should return errors for request with ${models.FiltersOperations[operation]} operation and without filters`, () => {
                const request: models.IUpdateFiltersRequest = {
                    filtersOperation: operation,
                };
                expect(models.validateUpdateFiltersRequest(request)).toBeDefined();
            });

            it(`should return errors for request with ${models.FiltersOperations[operation]} operation and filter that does not validate against schema`, () => {
                const malformedFilters: any[] = [
                    {
                        target: {
                            table: "c",
                            column: "d"
                        }
                    },
                    {
                        filter: {
                            entity: "c",
                            property: "d"
                        }
                    },
                    {
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
                    }
                ];

                for (const malformedFilter of malformedFilters) {
                    const request: models.IUpdateFiltersRequest = {
                        filtersOperation: operation,
                        filters: [malformedFilter]
                    };
                    expect(models.validateUpdateFiltersRequest(request)).toBeDefined();
                }
            });

            it(`should return undefined for request with ${models.FiltersOperations[operation]} operation and valid filters`, () => {
                const filters: IFilter[] = [
                    {
                        $schema: "http://powerbi.com/product/schema#advanced",
                        target: {
                            table: "a",
                            column: "b"
                        },
                        operator: "x" as any,
                        values: [
                            "a",
                            100,
                            false
                        ],
                        filterType: models.FilterType.Basic
                    } as IFilter,
                    {
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
                    } as IFilter,
                    {
                        $schema: "http://powerbi.com/product/schema#relativeTime",
                        target: {
                            table: "a",
                            column: "b"
                        },
                        operator: models.RelativeDateOperators.InLast,
                        timeUnitsCount: 11,
                        timeUnitType: models.RelativeDateFilterTimeUnit.Hours,
                        filterType: models.FilterType.RelativeTime
                    } as IFilter,
                    {
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
                    } as IFilter,
                    {
                        $schema: "http://powerbi.com/product/schema#notSupported",
                        target: {
                            table: "a",
                            column: "b"
                        },
                        message: "not supported",
                        notSupportedTypeName: "not supported type",
                        filterType: models.FilterType.Unknown
                    } as IFilter,
                    {
                        $schema: "http://powerbi.com/product/schema#includeExclude",
                        target: {
                            table: "a",
                            column: "b"
                        },
                        values: [1, 2],
                        isExclude: true,
                        filterType: models.FilterType.IncludeExclude
                    } as IFilter,
                    {
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
                    } as IFilter,
                ];

                const request: models.IUpdateFiltersRequest = {
                    filtersOperation: operation,
                    filters: filters as any
                };
                expect(models.validateUpdateFiltersRequest(request)).toBeUndefined();
            });
        }

        it(`should return errors for request with RemoveAll operation and filters array`, () => {
            const request: models.IUpdateFiltersRequest = {
                filtersOperation: models.FiltersOperations.RemoveAll,
                filters: []
            };
            expect(models.validateUpdateFiltersRequest(request)).toBeDefined();
        });

        it(`should return undefined for request with RemoveAll operation and without filters`, () => {
            const request: models.IUpdateFiltersRequest = {
                filtersOperation: models.FiltersOperations.RemoveAll,
            };
            expect(models.validateUpdateFiltersRequest(request)).toBeUndefined();
        });
    });

    describe('validateSettings', () => {
        const filterPaneEnabledInvalidTypeMessage = "filterPaneEnabled must be a boolean";
        const navContentPaneEnabledInvalidTypeMessage = "navContentPaneEnabled must be a boolean";
        const positionInvalidTypeMessage = "position must be a number";
        const positionInvalidValueMessage = "position property is invalid";
        const bookmarksPaneEnabledInvalidTypeMessage = "bookmarksPaneEnabled must be a boolean";
        const useCustomSaveAsDialogInvalidTypeMessage = "useCustomSaveAsDialog must be a boolean";
        const persistentFiltersEnabledInvalidTypeMessage = "persistentFiltersEnabled must be a boolean";
        const personalBookmarksEnabledInvalidTypeMessage = "personalBookmarksEnabled must be a boolean";
        const extensionsInvalidMessage = "extensions property is invalid";
        const commandsInvalidMessage = "commands property is invalid";
        const layoutTypeInvalidTypeMessage = "layoutType must be a number";
        const layoutTypeInvalidMessage = "layoutType property is invalid";
        const customLayoutInvalidMessage = "customLayout must be an object";
        const hyperlinkClickBehaviorInvalidTypeMessage = "hyperlinkClickBehavior must be a number";
        const hyperlinkClickBehaviorInvalidMessage = "hyperlinkClickBehavior property is invalid";
        const modeInvalidMessage = "mode property is invalid";

        it(`should return errors with one containing message '${filterPaneEnabledInvalidTypeMessage}' if filterPaneEnabled is not a boolean`, () => {
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

        it(`should return errors with one containing message '${positionInvalidTypeMessage}' if position is not a number`, () => {
            // Arrange
            const testData = {
                settings: {
                    panes: {
                        pageNavigation: {
                            position: "bottom"
                        }
                    }
                }
            };

            // Act
            const errors = models.validateSettings(testData.settings);

            // Assert
            testForExpectedMessage(errors, positionInvalidTypeMessage);
        });

        it(`should return errors with one containing message '${positionInvalidValueMessage}' if position is not a valid value`, () => {
            // Arrange
            const testData = {
                settings: {
                    panes: {
                        pageNavigation: {
                            position: 15
                        }
                    }
                }
            };

            // Act
            const errors = models.validateSettings(testData.settings);

            // Assert
            testForExpectedMessage(errors, positionInvalidValueMessage);
        });

        it(`should return errors with one containing message '${navContentPaneEnabledInvalidTypeMessage}' if navContentPaneEnabled is not a boolean`, () => {
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

        it(`should return errors with one containing message '${bookmarksPaneEnabledInvalidTypeMessage}' if bookmarksPaneEnabled is not a boolean`, () => {
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

        it(`should return errors with one containing message '${useCustomSaveAsDialogInvalidTypeMessage}' if useCustomSaveAsDialog is not a boolean`, () => {
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

        it(`should return errors with one containing message '${persistentFiltersEnabledInvalidTypeMessage}' if persistentFiltersEnabled is not a boolean`, () => {
            // Arrange
            const testData = {
                settings: {
                    persistentFiltersEnabled: 1
                }
            };

            // Act
            const errors = models.validateSettings(testData.settings);

            // Assert
            testForExpectedMessage(errors, persistentFiltersEnabledInvalidTypeMessage);
        });

        it(`should return errors with one containing message '${personalBookmarksEnabledInvalidTypeMessage}' if personalBookmarksEnabled is not a boolean`, () => {
            // Arrange
            const testData = {
                settings: {
                    personalBookmarksEnabled: 1
                }
            };

            // Act
            const errors = models.validateSettings(testData.settings);

            // Assert
            testForExpectedMessage(errors, personalBookmarksEnabledInvalidTypeMessage);
        });

        it(`should return errors with one containing message '${extensionsInvalidMessage}' if extensions array is invalid`, () => {
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

        it(`should return errors with one containing message '${commandsInvalidMessage}' if commands array is invalid`, () => {
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

        it(`should return errors with one containing message '${layoutTypeInvalidTypeMessage}' if layoutType is not a number`, () => {
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

        it(`should return errors with one containing message '${layoutTypeInvalidMessage}' if layoutType is not valid`, () => {
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

        it(`should return errors with one containing message '${hyperlinkClickBehaviorInvalidTypeMessage}' if hyperlinkClickBehavior is not a number`, () => {
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

        it(`should return errors with one containing message '${hyperlinkClickBehaviorInvalidMessage}' if hyperlinkClickBehavior is not valid`, () => {
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

        it(`should return errors with one containing message '${customLayoutInvalidMessage}' if customLayout type is not valid`, () => {
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

        it(`should return errors with one containing message '${modeInvalidMessage}' if customLayout type is not valid`, () => {
            // Arrange
            const testData = {
                settings: {
                    navContentPaneEnabled: false,
                    filterPaneEnabled: false,
                    useCustomSaveAsDialog: false,
                    persistentFiltersEnabled: false,
                    extensions: [{ command: { name: "name", extend: {}, title: "title" } }],
                    commands: [{ exportData: { displayOption: models.CommandDisplayOption.Enabled } }],
                    layoutType: 0,
                    customLayout: {
                        pagesLayout: {
                            aaaa: {
                                visualsLayout: {
                                    bbbb: {
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

        it(`should return undefined if settings is valid (empty)`, () => {
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

        it(`should return undefined if settings is valid`, () => {
            // Arrange
            const testData = {
                settings: {
                    navContentPaneEnabled: false,
                    filterPaneEnabled: false,
                    useCustomSaveAsDialog: false,
                    persistentFiltersEnabled: false,
                    extensions: [{ command: { name: "name", extend: {}, title: "title" } }],
                    commands: [{ exportData: { displayOption: models.CommandDisplayOption.Enabled } }],
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

    describe('validatePanes', () => {
        const paneInvalidTypeMessage = "panes must be an object";
        const fieldsPaneInvalidTypeMessage = "fields must be an object";
        const filtersPaneInvalidTypeMessage = "filters must be an object";
        const bookmarksPaneInvalidTypeMessage = "bookmarks must be an object";
        const selectionPaneInvalidTypeMessage = "selection must be an object";
        const syncSlicersPaneInvalidTypeMessage = "syncSlicers must be an object";
        const pageNavigationPaneInvalidTypeMessage = "pageNavigation must be an object";
        const visualizationsPaneInvalidTypeMessage = "visualizations must be an object";

        const visibleInvalidTypeMessage = "visible must be a boolean";
        const expandedInvalidTypeMessage = "expanded must be a boolean";

        it(`should return errors with one containing message '${paneInvalidTypeMessage}' if pane is not a pane object`, () => {
            // Arrange
            const testData = {
                settings: {
                    panes: 1
                }
            };

            // Act
            const errors = models.validateSettings(testData.settings);

            // Assert
            testForExpectedMessage(errors, paneInvalidTypeMessage);
        });

        describe('validateBookmarksPane', () => {
            it(`should return errors with one containing message '${bookmarksPaneInvalidTypeMessage}' if bookmarks pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        bookmarks: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, bookmarksPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${visibleInvalidTypeMessage}' if visible is not a boolean in bookmarks`, () => {
                // Arrange
                const testData = {
                    panes: {
                        bookmarks: {
                            visible: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visibleInvalidTypeMessage);
            });
        });

        describe('validateFieldsPane', () => {
            it(`should return errors with one containing message '${fieldsPaneInvalidTypeMessage}' if fields pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        fields: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, fieldsPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${expandedInvalidTypeMessage}' if expanded is not a boolean in fields`, () => {
                // Arrange
                const testData = {
                    panes: {
                        fields: {
                            expanded: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, expandedInvalidTypeMessage);
            });
        });

        describe('validateFiltersPane', () => {
            it(`should return errors with one containing message '${filtersPaneInvalidTypeMessage}' if filters pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        filters: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, filtersPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing '${visibleInvalidTypeMessage}' if visible is not a boolean in filters`, () => {
                // Arrange
                const testData = {
                    panes: {
                        filters: {
                            visible: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visibleInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${expandedInvalidTypeMessage}' if expanded is not a boolean in filters`, () => {
                // Arrange
                const testData = {
                    panes: {
                        filters: {
                            visible: true,
                            expanded: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, expandedInvalidTypeMessage);
            });
        });

        describe('validatePageNavigationPane', () => {
            it(`should return errors with one containing message '${pageNavigationPaneInvalidTypeMessage}' if pageNavigation pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        pageNavigation: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, pageNavigationPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${visibleInvalidTypeMessage}' if visible is not a boolean in pageNavigation`, () => {
                // Arrange
                const testData = {
                    panes: {
                        pageNavigation: {
                            visible: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visibleInvalidTypeMessage);
            });
        });

        describe('validateSelectionPane', () => {
            it(`should return errors with one containing message '${selectionPaneInvalidTypeMessage}' if selection pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        selection: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, selectionPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${visibleInvalidTypeMessage}' if visible is not a boolean in selection`, () => {
                // Arrange
                const testData = {
                    panes: {
                        selection: {
                            visible: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visibleInvalidTypeMessage);
            });
        });

        describe('validateSyncSlicersPane', () => {
            it(`should return errors with one containing message '${syncSlicersPaneInvalidTypeMessage}' if sync slicers pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        syncSlicers: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, syncSlicersPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${visibleInvalidTypeMessage}' if visible is not a boolean in sync slicers`, () => {
                // Arrange
                const testData = {
                    panes: {
                        syncSlicers: {
                            visible: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visibleInvalidTypeMessage);
            });
        });

        describe('validateVisualizationsPane', () => {
            it(`should return errors with one containing message '${visualizationsPaneInvalidTypeMessage}' if visualizations pane is not an object`, () => {
                // Arrange
                const testData = {
                    panes: {
                        visualizations: 5
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, visualizationsPaneInvalidTypeMessage);
            });

            it(`should return errors with one containing message '${expandedInvalidTypeMessage}' if expanded is not a boolean in visualizations`, () => {
                // Arrange
                const testData = {
                    panes: {
                        visualizations: {
                            expanded: 1
                        }
                    }
                };

                // Act
                const errors = models.validatePanes(testData.panes);

                // Assert
                testForExpectedMessage(errors, expandedInvalidTypeMessage);
            });
        });
    });

    describe('validate Extensions', () => {
        const commandNameInvalidTypeMessage = "name must be a string";
        const commandNameRequiredMessage = "name is required";
        const selectorInvalidTypeMessage = "selector property is invalid";
        const visualContextMenuInvalidMessage = "visualContextMenu property is invalid";

        it(`should return errors with one containing message '${commandNameInvalidTypeMessage}' if command name is not a string`, () => {
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

        it(`should return errors with one containing message '${commandNameRequiredMessage}' if command name is not provided`, () => {
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

        it(`should return undefined if extensions is valid`, () => {
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

        it(`should return errors with one containing message '${visualContextMenuInvalidMessage}' if menu location for context menu is invalid`, () => {
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
            testForExpectedMessage(errors, visualContextMenuInvalidMessage);
        });

        it(`should return errors with one containing message '${visualContextMenuInvalidMessage}' if having both menu location and group name`, () => {
            // Arrange
            const testData = {
                command: {
                    name: "extension command",
                    title: "Extend commands",
                    icon: "base64Icon",
                    extend: {
                        visualContextMenu: {
                            title: "Extend context menu",
                            menuLocation: 1,
                            groupName: "group name"
                        }
                    }
                }
            };

            // Act
            const errors = models.validateExtension(testData);

            // Assert
            testForExpectedMessage(errors, visualContextMenuInvalidMessage);
        });

        it(`should return undefined if extensions is valid with selector`, () => {
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

        it(`should return errors with one containing message '${selectorInvalidTypeMessage}' if selector is invalid`, () => {
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

    describe('validateMenuGroupExtension', () => {
        const nameInvalidTypeMessage = "name must be a string";
        const nameRequiredMessage = "name is required";
        const titleInvalidTypeMessage = "title must be a string";
        const titleRequiredMessage = "title is required";
        const menuLocationInvalidMessage = "menuLocation property is invalid";

        it(`should return errors with one containing message '${nameInvalidTypeMessage}' if group name is not a string`, () => {
            // Arrange
            const testData = {
                name: true,
                title: "title",
                menuLocation: models.MenuLocation.Top
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            testForExpectedMessage(errors, nameInvalidTypeMessage);
        });

        it(`should return errors with one containing message '${nameRequiredMessage}' if group name is not provided`, () => {
            // Arrange
            const testData = {
                title: "title",
                menuLocation: models.MenuLocation.Top
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            testForExpectedMessage(errors, nameRequiredMessage);
        });

        it(`should return errors with one containing message '${titleInvalidTypeMessage}' if group title is not a string`, () => {
            // Arrange
            const testData = {
                name: "name",
                title: true,
                menuLocation: models.MenuLocation.Top
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            testForExpectedMessage(errors, titleInvalidTypeMessage);
        });

        it(`should return errors with one containing message '${titleRequiredMessage}' if group title is not provided`, () => {
            // Arrange
            const testData = {
                name: "name",
                menuLocation: models.MenuLocation.Top
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            testForExpectedMessage(errors, titleRequiredMessage);
        });

        it(`should return undefined if group is valid`, () => {
            // Arrange
            const testData = {
                name: "name",
                title: "title",
                menuLocation: models.MenuLocation.Top,
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            expect(errors).toBeUndefined();
        });

        it(`should return errors with one containing message '${menuLocationInvalidMessage}' if menu location is invalid`, () => {
            // Arrange
            const testData = {
                name: "name",
                title: "title",
                menuLocation: 3,
            };

            // Act
            const errors = models.validateMenuGroupExtension(testData);

            // Assert
            testForExpectedMessage(errors, menuLocationInvalidMessage);
        });
    });

    describe('validateCustomPageSize', () => {
        const typeRequiredMessage = "type is required";
        const typeInvalidTypedMessage = "type must be a number";
        const typeInvalidMessage = "type property is invalid";
        const widthInvalidTypeMessage = "width must be a number";
        const heightInvalidTypeMessage = "height must be a number";

        it(`should return errors with one containing message '${typeRequiredMessage}' if type field is not provided`, () => {
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

        it(`should return errors with one containing message '${typeInvalidTypedMessage}' if type is not a number`, () => {
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

        it(`should return errors with one containing message '${typeInvalidMessage}' if type is invalid value`, () => {
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

        it(`should return errors with one containing message '${widthInvalidTypeMessage}' if width field is not a number`, () => {
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

        it(`should return errors with one containing message '${heightInvalidTypeMessage}' if height field is not a number`, () => {
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

        it(`should return undefined if custom page size is valid`, () => {
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

    describe('validatePage', () => {
        const pageNameInvalidTypeMessage = "name must be a string";
        const pageNameRequiredMessage = "name is required";

        it(`should return errors with one containing message '${pageNameInvalidTypeMessage}' if name field is not a string`, () => {
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

        it(`should return errors with one containing message '${pageNameRequiredMessage}' if page name is not provided`, () => {
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

        it(`should return undefined if page is valid`, () => {
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

    describe('validateSaveAsParameters', () => {
        const saveasNameInvalidTypeMessage = "name must be a string";
        const saveasNameRequiredMessage = "name is required";

        it(`should return errors with one containing message '${saveasNameInvalidTypeMessage}' if name field is not a string`, () => {
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

        it(`should return errors with one containing message '${saveasNameRequiredMessage}' if Save As name is not provided`, () => {
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

        it(`should return undefined if Save As parameters are valid`, () => {
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

    describe('validateLoadQnaConfiguration', () => {
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

        it(`should return errors with one containing message '${accessTokenRequiredMessage}' if accessToken is not defined`, () => {
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

        it(`should return errors with one containing message '${accessTokenInvalidTypeMessage}' if accessToken is not a string`, () => {
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

        it(`should return errors with one containing message '${datasetIdsRequiredMessage}' if datasetIds is not defined`, () => {
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

        it(`should return errors with one containing message '${datasetIdsInvalidTypeMessage}' if datasetIds is not a string array`, () => {
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

        it(`should return undefined if datasetIds and accessToken are provided`, () => {
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

        it(`should return errors with one containing message '${questionInvalidTypeMessage}' if question is not a string`, () => {
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

        it(`should return errors with one containing message '${viewModeInvalidTypeMessage}' if viewMode is not a number`, () => {
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

        it(`should return errors with one containing message '${viewModeInvalidMessage}' if viewMode is invalid`, () => {
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

        it(`should return errors with one containing message '${tokenTypeInvalidTypeMessage}' if tokenType is not a number`, () => {
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

        it(`should return errors with one containing message '${tokenTypeInvalidMessage}' if tokenType is invalid`, () => {
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

        it(`should return errors with one containing message '${settingsFilterPaneInvalidTypeMessage}' if settings is invalid`, () => {
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

        it(`should return errors with one containing message '${settingsInvalidTypeMessage}' if settings is invalid`, () => {
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

        it(`should return undefined if load qna configuration is valid`, () => {
            // Arrange
            const testData = {
                load: {
                    accessToken: 'fakeAccessToken',
                    datasetIds: ["1", "2"],
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

    describe('validateQnaInterpretInputData', () => {
        const datasetIdsInvalidTypeMessage = "datasetIds must be an array of strings";
        const questionRequiredMessage = "question is required";
        const questionInvalidTypeMessage = "question must be a string";

        it(`should return errors with one containing message '${datasetIdsInvalidTypeMessage}' if datasetIds field is not an array of strings`, () => {
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

        it(`should return errors with one containing message '${questionRequiredMessage}' if question is not provided`, () => {
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

        it(`should return errors with one containing message '${questionInvalidTypeMessage}' if question is not a string`, () => {
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

        it(`should return undefined if qna interpret input is valid`, () => {
            // Arrange
            const testData = {
                interpret: {
                    question: "questionString",
                    datasetIds: ["1", "2"]
                }
            };

            // Act
            const errors = models.validateQnaInterpretInputData(testData.interpret);

            // Assert
            expect(errors).toBeUndefined();
        });
    });

    describe('validateCustomTheme', () => {
        const themeInvalidMessage = "themeJson must be an object";
        const themeName = "Theme 1";

        it(`should return errors with one containing message '${themeInvalidMessage}' if theme type is not valid`, () => {
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

        it(`should not return errors if theme type is valid`, () => {
            // Arrange
            const testData = {
                theme: {
                    themeJson: { name: themeName }
                }
            };

            // Act
            const errors = models.validateCustomTheme(testData.theme);

            // Assert
            expect(errors).toBeUndefined();
        });
    });

    describe('validateSlicers', () => {
        const selectorRequiredMessage = "selector is required";
        const stateRequiredMessage = "state is required";
        const stateInvalidTypeMessage = "state must be an object";
        const invalidSelectorMessage = "selector property is invalid";
        const slicerTargetSchema = "http://powerbi.com/product/schema#slicerTargetSelector";
        const filters: IFilter[] = [];

        it(`should return undefined if selector and state are valid`, () => {
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

        it(`should return undefined if target selector and state are valid`, () => {
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

        it(`should return errors with one containing message '${selectorRequiredMessage}' if selector is undefined`, () => {
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

        it(`should return errors with one containing message '${stateRequiredMessage}' if state is undefined`, () => {
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

        it(`should return errors with one containing message '${invalidSelectorMessage}' if selector is of invalid type`, () => {
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

        it(`should return errors with one containing message '${invalidSelectorMessage}' if target slicer selector is invalid`, () => {
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

        it(`should return errors with one containing message '${stateInvalidTypeMessage}' if state is invalid`, () => {
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

    describe('validateVisualHeader', () => {
        const settingsRequiredMessage = "settings is required";
        const invalidSelectorMessage = "selector property is invalid";

        it(`should return undefined if settings and selector are valid`, () => {
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

        it(`should return undefined if settings and visual type selector are valid`, () => {
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

        it(`should return undefined if settings is valid and selector is undefined`, () => {
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

        it(`should return error if settings is undefined`, () => {
            // Arrange
            const testData = {
            };

            // Act
            const errors = models.validateVisualHeader(testData);

            // Assert
            testForExpectedMessage(errors, settingsRequiredMessage);
        });

        it(`should return error if selector is invalid`, () => {
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

    describe('validateCommandsSettings', () => {
        const invalidSelectorMessage = "selector property is invalid";
        const displayOptionRequiredMessage = "displayOption is required";
        const invalidDisplayOptionMessage = "displayOption property is invalid";

        it(`should return undefined if displayOption and selector are valid`, () => {
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

        it(`should return undefined if displayOptions are valid`, () => {
            // Arrange
            const singleCommandSettings = { displayOption: models.CommandDisplayOption.Enabled };
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

        it(`should return undefined if displayOption and visual type selector are valid`, () => {
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

        it(`should return undefined if displayOption is valid and selector is undefined`, () => {
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

        it(`should return error if displayOption is undefined`, () => {
            // Arrange
            const testData = {
                exportData: {}
            };

            // Act
            const errors = models.validateCommandsSettings(testData);

            // Assert
            testForExpectedMessage(errors, displayOptionRequiredMessage);
        });

        it(`should return error if selector is invalid`, () => {
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

        it(`should return error if displayOption is invalid`, () => {
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

    describe('validateCaptureBookmarkRequest', () => {
        it('should call Validators.captureBookmarkRequestValidator.validate', () => {
            const request: models.ICaptureBookmarkRequest = {
                options: {}
            };

            const validateSpy = spyOn(Validators.captureBookmarkRequestValidator, "validate");

            models.validateCaptureBookmarkRequest(request);

            expect(validateSpy).toHaveBeenCalledTimes(1);
            expect(validateSpy).toHaveBeenCalledWith(request);
        });

        it(`happy path`, () => {
            const request: models.ICaptureBookmarkRequest = {
                options: {
                    personalizeVisuals: false,
                    allPages: true
                }
            };
            expect(models.validateCaptureBookmarkRequest(request)).toBeUndefined();
        });
    });
});

describe("Unit | Filters", () => {
    describe("BasicFilter", () => {
        it("should accept values as separate arguments", () => {
            // Arrange

            // Act
            const basicFilter = new models.BasicFilter({ table: "t", column: "c" }, "In", 1, 2);

            // Assert
            expect(basicFilter.values).toEqual([1, 2]);
        });

        it("should accept values as an array", () => {
            // Arrange
            const values = [1, 2];

            // Act
            const basicFilter = new models.BasicFilter({ table: "t", column: "c" }, "In", values);

            // Assert
            expect(basicFilter.values).toEqual(values);
        });

        it("should accept values as an array of tuples", () => {
            // Arrange
            const values = [1, 2];
            const keyValues = [[1, 2], [3, 4]];

            // Act
            const basicFilterOnColumn = new models.BasicFilterWithKeys({ table: "t", column: "c", keys: ["1", "2"] }, "In", values, keyValues);
            const basicFilterOnHierarchy = new models.BasicFilterWithKeys({ table: "t", hierarchy: "c", hierarchyLevel: "level", keys: ["1", "2"] }, "In", values, keyValues);

            // Assert
            expect(basicFilterOnColumn.values).toEqual(values);
            expect(basicFilterOnHierarchy.values).toEqual(values);
        });

        it("should throw an exception when values are an array of tuples, but tuples length is different than keys length", () => {
            // Arrange
            const values = [1, 2];
            const keyValues = [[1, 2], [3, 4]];

            // Act
            const attemptToCreateFilterOnColumn = (): models.BasicFilterWithKeys => {
                return new models.BasicFilterWithKeys({ table: "t", column: "c", keys: ["1"] }, "In", values, keyValues);
            };
            // Act
            const attemptToCreateFilterOnHierarchy = (): models.BasicFilterWithKeys => {
                return new models.BasicFilterWithKeys({ table: "t", hierarchy: "c", hierarchyLevel: "level", keys: ["1"] }, "In", values, keyValues);
            };
            expect(attemptToCreateFilterOnColumn).toThrowError();
            expect(attemptToCreateFilterOnHierarchy).toThrowError();
        });

        it("should return valid json format when toJSON is called", () => {
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
                requireSingleSelection: false
            };

            // Act
            const filter = new models.BasicFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.values);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });

        it("can be constructed using either array form or individual arguments", () => {
            // Arrange
            const expectedFilter: models.IBasicFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "a",
                    column: "b"
                },
                operator: "x" as any,
                values: [
                    "a",
                    100,
                    false
                ],
                filterType: models.FilterType.Basic
            };

            // Act
            const filter1 = new models.BasicFilter(expectedFilter.target as models.IFilterTarget, expectedFilter.operator, expectedFilter.values);
            const filter2 = new models.BasicFilter(expectedFilter.target as models.IFilterTarget, expectedFilter.operator, ...expectedFilter.values);

            // Assert
            expect(filter1.toJSON()).toEqual(filter2.toJSON());
        });
    });

    describe("AdvancedFilter", () => {
        it("should throw an error if logical operator is not a non-empty string", () => {
            // Arrange
            const condition: models.IAdvancedFilterCondition = {
                value: "a",
                operator: "LessThan"
            };

            // Act
            const attemptToCreateFilter = (): models.AdvancedFilter => {
                return new models.AdvancedFilter({ table: "t", column: "c" }, 1 as any, condition);
            };

            // Assert
            expect(attemptToCreateFilter).toThrowError();
        });

        it("should throw an error if more than two conditions are provided", () => {
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
            const attemptToCreateFilter = (): models.AdvancedFilter => {
                return new models.AdvancedFilter({ table: "Table", column: "c" }, "And", ...conditions);
            };

            // Assert
            expect(attemptToCreateFilter).toThrowError();
        });

        it("should throw an error if logical operator is not And when only 1 condition is provided", () => {
            // Arrange

            // Act
            const attemptToCreateFilter = (): models.AdvancedFilter => {
                return new models.AdvancedFilter({ table: "Table", column: "c" }, "Or", { value: "a", operator: "Contains" });
            };

            // Assert
            expect(attemptToCreateFilter).toThrowError();
        });

        it("should output the correct json when toJSON is called", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.logicalOperator,
                ...expectedFilter.conditions);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });

        it("should output the correct json when toJSON is called for empty advanced filter", () => {
            // Arrange
            const expectedFilter: models.IAdvancedFilter = {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "a",
                    column: "b"
                },
                conditions: [],
                logicalOperator: "And",
                filterType: models.FilterType.Advanced
            };

            // Act
            const filter = new models.AdvancedFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.logicalOperator);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });

        it("can be constructed using either array form or individual arguments", () => {
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
            const filter1 = new models.AdvancedFilter(expectedFilter.target as models.IFilterTarget, expectedFilter.logicalOperator, expectedFilter.conditions);
            const filter2 = new models.AdvancedFilter(expectedFilter.target as models.IFilterTarget, expectedFilter.logicalOperator, ...expectedFilter.conditions);

            // Assert
            expect(filter1.toJSON()).toEqual(filter2.toJSON());
        });
    });

    describe("RelativeDateFilter", () => {
        it("should output the correct json when toJSON is called", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.timeUnitsCount,
                expectedFilter.timeUnitType,
                expectedFilter.includeToday);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });
    });

    describe("RelativeTimeFilter", () => {
        it("should output the correct json when toJSON is called", () => {
            // Arrange
            const expectedFilter: models.IRelativeTimeFilter = {
                $schema: "http://powerbi.com/product/schema#relativeTime",
                target: {
                    table: "a",
                    column: "b"
                },
                filterType: models.FilterType.RelativeTime,
                operator: models.RelativeDateOperators.InLast,
                timeUnitsCount: 11,
                timeUnitType: models.RelativeDateFilterTimeUnit.Minutes,
            };

            // Act
            const filter = new models.RelativeTimeFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.timeUnitsCount,
                expectedFilter.timeUnitType);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });
    });

    describe("notSupportedFilterFilter", () => {
        it("should output the correct json when toJSON is called", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.message,
                expectedFilter.notSupportedTypeName);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });
    });

    describe("topNFilter", () => {
        it("should output the correct json when toJSON is called", () => {
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
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.operator,
                expectedFilter.itemCount,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                expectedFilter.orderBy as ITarget);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });
    });

    describe("includeExcludeFilter", () => {
        it("should output the correct json when toJSON is called", () => {
            // Arrange
            const expectedFilter: models.IIncludeExcludeFilter = {
                $schema: "http://powerbi.com/product/schema#includeExclude",
                target: {
                    table: "a",
                    column: "b"
                },
                filterType: models.FilterType.IncludeExclude,
                isExclude: false,
                values: [1, 2, 3],
            };

            // Act
            const filter = new models.IncludeExcludeFilter(
                expectedFilter.target as models.IFilterTarget,
                expectedFilter.isExclude,
                expectedFilter.values);

            // Assert
            expect(filter.toJSON()).toEqual(expectedFilter);
        });
    });

    describe('determine types', () => {
        it('filter object should be constructed with the correct filterType', () => {
            // Arrange
            const testData = {
                basicFilter: new models.BasicFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
                basicFilterWithKeysOnColumn: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2", 2]]),
                basicFilterWithKeysOnHierarchy: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2", 2]]),
                advancedFilter: new models.AdvancedFilter({ table: "a", column: "b" }, "And",
                    { operator: "Contains", value: "x" },
                    { operator: "Contains", value: "x" }
                ),
                relativeDateFilter: new models.RelativeDateFilter({ table: "a", column: "b" }, models.RelativeDateOperators.InLast,
                    3, models.RelativeDateFilterTimeUnit.CalendarMonths, true),
                relativeTimeFilter: new models.RelativeTimeFilter({ table: "a", column: "b" }, models.RelativeDateOperators.InLast,
                    3, models.RelativeDateFilterTimeUnit.Hours),
                topNFilter: new models.TopNFilter({ table: "a", column: "b" }, "Top", 4, { table: "a", column: "b" }),
                includeExclude: new models.IncludeExcludeFilter({ table: "a", column: "b" }, true, [1, 2])
            };

            // Act

            // Assert
            expect(models.getFilterType(testData.basicFilter.toJSON())).toBe(models.FilterType.Basic);
            expect(models.getFilterType(testData.basicFilterWithKeysOnColumn.toJSON())).toBe(models.FilterType.Basic);
            expect(models.getFilterType(testData.basicFilterWithKeysOnHierarchy.toJSON())).toBe(models.FilterType.Basic);
            expect(models.getFilterType(testData.advancedFilter.toJSON())).toBe(models.FilterType.Advanced);
            expect(models.getFilterType(testData.relativeDateFilter.toJSON())).toBe(models.FilterType.RelativeDate);
            expect(models.getFilterType(testData.relativeTimeFilter.toJSON())).toBe(models.FilterType.RelativeTime);
            expect(models.getFilterType(testData.topNFilter.toJSON())).toBe(models.FilterType.TopN);
            expect(models.getFilterType(testData.includeExclude.toJSON())).toBe(models.FilterType.IncludeExclude);
        });

        it('isFilterKeyColumnsTarget should return the correct response', () => {
            // Arrange
            const filterKeyColumnsTarget = { table: "a", column: "b", keys: ["key1"] };
            const filterColumnTarget = { table: "a", column: "b" };

            // Assert
            expect(models.isFilterKeyColumnsTarget(filterKeyColumnsTarget)).toBeTruthy();
            expect(models.isFilterKeyColumnsTarget(filterColumnTarget)).toBeFalsy();
        });

        it('isBasicFilterWithKeys should return the correct response', () => {
            // Arrange
            const testData = {
                basicFilter: new models.BasicFilter({ table: "a", column: "b" }, "In", ["x", "y"]),
                basicFilterWithKeys: new models.BasicFilterWithKeys({ table: "a", column: "b", keys: ["1", "2"] }, "In", ["x1", 1], [["x1", 1], ["y2", 2]]),
            };

            // Assert
            expect(models.isBasicFilterWithKeys(testData.basicFilter.toJSON())).toBeFalsy();
            expect(models.isBasicFilterWithKeys(testData.basicFilterWithKeys.toJSON())).toBeTruthy();
        });
    });
});
