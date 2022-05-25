// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, IValidator, Validators } from '../core/validator';

export class PaginatedReportLoadValidator extends ObjectValidator {
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
                field: "accessToken",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "id",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [Validators.stringValidator]
            },
            {
                field: "settings",
                validators: [Validators.paginatedReportsettingsValidator]
            },
            {
                field: "tokenType",
                validators: [Validators.tokenTypeValidator]
            },
            {
                field: "embedUrl",
                validators: [Validators.stringValidator]
            },
            {
                field: "type",
                validators: [Validators.stringValidator]
            },
            {
                field: "parameterValues",
                validators: [Validators.parameterValuesArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class ReportParameterFieldsValidator implements IValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const fields: IFieldValidatorsPair[] = [
            {
                field: "name",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "value",
                validators: [Validators.stringValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
