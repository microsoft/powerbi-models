// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class DatasetBindingValidator extends ObjectValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }

        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        if (!input["datasetId"] && !input["paginatedReportBindings"]) {
            return [{
                message: "datasetBinding cannot be empty",
                path: (path ? path + "." : "") + field,
                keyword: "invalid"
            }];
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "datasetId",
                validators: [Validators.stringValidator]
            },
            {
                field: "paginatedReportBindings",
                validators: [Validators.paginatedReportDatasetBindingArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
