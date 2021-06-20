// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    PaginatedReportCommandsValidator
} from '../../src/validators/models/commandsSettingsValidator';
import { Validators } from '../../src/validators/core/validator';

describe('commandsValidator', () => {
    let fieldRequiredValidatorSpy: jasmine.Spy;
    let parametersPanelValidatorSpy: jasmine.Spy;

    beforeEach(() => {
        fieldRequiredValidatorSpy = spyOn(Validators.fieldRequiredValidator, "validate").and.callThrough();
        parametersPanelValidatorSpy = spyOn(Validators.parametersPanelValidator, "validate").and.callThrough();
    });

    describe('PaginatedReportCommandsValidator', () => {
        let validator: PaginatedReportCommandsValidator;

        beforeEach(() => {
            validator = new PaginatedReportCommandsValidator();
        });

        it('should fail if "parameterPanel" is not an object', () => {
            const dummyValue = "dummyValue";
            validator.validate({ parameterPanel: dummyValue });
            expect(parametersPanelValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'parameterPanel');
            expect(fieldRequiredValidatorSpy).not.toHaveBeenCalledWith(dummyValue, undefined, 'parameterPanel');
        });

        it('should validate "parameterPanel" with parametersPanelValidator', () => {
            let result = validator.validate({ parameterPanel: { enabled: true } });
            expect(result).toBeNull();
            expect(parametersPanelValidatorSpy).toHaveBeenCalledWith({ enabled: true }, undefined, 'parameterPanel');
        });
    });
});
