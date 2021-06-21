// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator, StringValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class PageSizeValidator extends ObjectValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "type",
                validators: [Validators.fieldRequiredValidator, Validators.pageSizeTypeValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class CustomPageSizeValidator extends PageSizeValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "width",
                validators: [Validators.numberValidator]
            },
            {
                field: "height",
                validators: [Validators.numberValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class PageValidator extends ObjectValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "name",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class PageViewFieldValidator extends StringValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }
        const possibleValues = ["actualSize", "fitToWidth", "oneColumn"];
        if (possibleValues.indexOf(input) < 0) {
            return [{
                message: "pageView must be a string with one of the following values: \"actualSize\", \"fitToWidth\", \"oneColumn\""
            }];
        }
        return null;
    }
}
