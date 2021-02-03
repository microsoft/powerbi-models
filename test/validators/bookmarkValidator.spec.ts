// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    CaptureBookmarkOptionsValidator,
    CaptureBookmarkRequestValidator
} from '../../src/validators/models/bookmarkValidator';
import { Validators } from '../../src/validators/core/validator';

describe('bookmarkValidator', () => {
    let booleanValidatorSpy: jasmine.Spy;
    let fieldRequiredValidatorSpy: jasmine.Spy;
    let captureBookmarkOptionsValidatorSpy: jasmine.Spy;

    beforeEach(() => {
        booleanValidatorSpy = spyOn(Validators.booleanValidator, "validate").and.callThrough();
        fieldRequiredValidatorSpy = spyOn(Validators.fieldRequiredValidator, "validate").and.callThrough();
        captureBookmarkOptionsValidatorSpy = spyOn(Validators.captureBookmarkOptionsValidator, "validate").and.callThrough();
    });

    describe('CaptureBookmarkOptionsValidator', () => {
        let validator: CaptureBookmarkOptionsValidator;

        beforeEach(() => {
            validator = new CaptureBookmarkOptionsValidator();
        });

        it('should validate that "personalizeVisuals" is boolean and not required', () => {
            const dummyValue = "dummyValue";
            validator.validate({ personalizeVisuals: dummyValue });
            expect(booleanValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'personalizeVisuals');
            expect(fieldRequiredValidatorSpy).not.toHaveBeenCalledWith(dummyValue, undefined, 'personalizeVisuals');
        });

        it('should validate that "allPages" is boolean and not required', () => {
            const dummyValue = "dummyValue";
            validator.validate({ allPages: dummyValue });
            expect(booleanValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'allPages');
            expect(fieldRequiredValidatorSpy).not.toHaveBeenCalledWith(dummyValue, undefined, 'allPages');
        });
    });

    describe('CaptureBookmarkRequestValidator', () => {
        let validator: CaptureBookmarkRequestValidator;

        beforeEach(() => {
            validator = new CaptureBookmarkRequestValidator();
        });

        it('should validate that "options" is valid capture options and required', () => {
            const dummyValue = "dummyValue";
            validator.validate({ options: dummyValue });
            expect(captureBookmarkOptionsValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'options');
            expect(fieldRequiredValidatorSpy).toHaveBeenCalledWith(dummyValue, undefined, 'options');
        });
    });
});
