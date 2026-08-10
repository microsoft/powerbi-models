// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ReportCreateFromDefinitionValidator } from '../../src/validators/models/reportCreateValidator';

describe('reportCreateFromDefinitionValidator', () => {
    let validator: ReportCreateFromDefinitionValidator;

    beforeEach(() => {
        validator = new ReportCreateFromDefinitionValidator();
    });

    it('should return errors when "reportDefinition" is missing', () => {
        const errors = validator.validate({
            accessToken: 'token',
            datasetId: 'dataset-id'
        });

        expect(errors).toBeTruthy();
    });

    it('should return errors when "reportDefinition" is invalid', () => {
        const errors = validator.validate({
            accessToken: 'token',
            datasetId: 'dataset-id',
            reportDefinition: {
                definition: { pages: [] }
            }
        });

        expect(errors).toBeTruthy();
    });

    it('should pass for a valid create-from-definition configuration', () => {
        const errors = validator.validate({
            accessToken: 'token',
            datasetId: 'dataset-id',
            reportDefinition: {
                definition: 'serialized-definition'
            }
        });

        expect(errors).toBeNull();
    });
});
