// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class PaginatedReportDatasetBindingValidator extends ObjectValidator {
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
                field: "sourceDatasetId",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "targetDatasetId",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
