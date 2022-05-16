// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Validators } from '../../src/validators/core/validator';

describe('slicerValidator', () => {

    it('validate slicer state with hierarchy filters', () => {
        const slicerJSONInput = {
            filters: [
                {
                    $schema: "http://powerbi.com/product/schema#hierarchy",
                    target: [
                        {
                            table: "t1",
                            column: "c1"
                        },
                        {
                            table: "t1",
                            column: "c2"
                        }
                    ],
                    filterType: 9,
                    hierarchyData: [
                        {
                            value: "c1 v11",
                            operator: "Selected",
                            children: [
                                {
                                    value: "c2 v12",
                                    operator: "NotSelected",
                                }
                            ]
                        },
                        {
                            value: "c1 v21",
                            children: [
                                {
                                    value: "c2 v22",
                                    operator: "Selected",
                                }
                            ]
                        },
                    ]
                }
            ],
            targets: [
                {
                    table: "t1",
                    column: "c1"
                },
                {
                    table: "t1",
                    column: "c2"
                },
                {
                    table: "t1",
                    column: "c3"
                }
            ]
        };

        const errors = Validators.slicerStateValidator.validate(slicerJSONInput);
        expect(errors).toBeFalsy();
    });

    it('validate invalid slicer when hierarchy filters value is an object', () => {
        const slicerJSONInput = {
            filters: [
                {
                    $schema: "http://powerbi.com/product/schema#hierarchy",
                    target: [
                        {
                            table: "t1",
                            column: "c1"
                        },
                        {
                            table: "t1",
                            column: "c2"
                        }
                    ],
                    filterType: 9,
                    hierarchyData: [
                        {
                            value: "c1 v11",
                            operator: "Selected",
                            children: [
                                {
                                    value: { value: "c2 v11" },
                                    operator: "NotSelected",
                                }
                            ]
                        }
                    ]
                }
            ],
            targets: [
                {
                    table: "t1",
                    column: "c1"
                },
                {
                    table: "t1",
                    column: "c2"
                }
            ]
        };

        const errors = Validators.slicerStateValidator.validate(slicerJSONInput);
        expect(errors[0].message).toEqual('filters property is invalid');
    });

    it('validate invalid slicer when hierarchy filters keyValues is not an array', () => {
        const slicerJSONInput = {
            filters: [
                {
                    $schema: "http://powerbi.com/product/schema#hierarchy",
                    target: [
                        {
                            table: "t1",
                            column: "c1"
                        },
                        {
                            table: "t1",
                            column: "c2"
                        }
                    ],
                    filterType: 9,
                    hierarchyData: [
                        {
                            keyValues: "c1 v11",
                            operator: "Selected",
                            children: [
                                {
                                    value: "c2 v11",
                                    operator: "NotSelected",
                                }
                            ]
                        }
                    ]
                }
            ],
            targets: [
                {
                    table: "t1",
                    column: "c1"
                },
                {
                    table: "t1",
                    column: "c2"
                }
            ]
        };

        const errors = Validators.slicerStateValidator.validate(slicerJSONInput);
        expect(errors[0].message).toEqual('filters property is invalid');
    });
});
