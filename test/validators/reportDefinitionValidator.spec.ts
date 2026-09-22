// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ReportDefinitionValidator } from '../../src/validators/models/reportDefinitionValidator';
import { Validators } from '../../src/validators/core/validator';

describe('reportDefinitionValidator', () => {
    let fieldRequiredValidatorSpy: jasmine.Spy;
    let validator: ReportDefinitionValidator;

    beforeEach(() => {
        fieldRequiredValidatorSpy = spyOn(Validators.fieldRequiredValidator, "validate").and.callThrough();
        validator = new ReportDefinitionValidator();
    });

    it('should return null when input is null', () => {
        expect(validator.validate(null)).toBeNull();
    });

    it('should validate that "definition" is required', () => {
        const dummyValue = 'serialized-definition';
        validator.validate({ definition: dummyValue });
        expect(fieldRequiredValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'definition');
    });

    it('should return errors when "definition" is missing', () => {
        const errors = validator.validate({});
        expect(errors).toBeTruthy();
    });

    it('should return errors when "definition" is not a string', () => {
        const errors = validator.validate({ definition: { pages: [] } });
        expect(errors).toBeTruthy();
    });

    it('should pass for a well-formed report definition', () => {
        const errors = validator.validate({ definition: 'serialized-definition' });
        expect(errors).toBeNull();
    });
});
