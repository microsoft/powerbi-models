// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class ReportCreateValidator extends ObjectValidator {
    protected getFields(): IFieldValidatorsPair[] {
        return [
            {
                field: "accessToken",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "datasetId",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [Validators.stringValidator]
            },
            {
                field: "tokenType",
                validators: [Validators.tokenTypeValidator]
            },
            {
                field: "theme",
                validators: [Validators.customThemeValidator]
            },
        ];
    }

    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const multipleFieldsValidator = new MultipleFieldsValidator(this.getFields());
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class ReportCreateFromDefinitionValidator extends ReportCreateValidator {
    protected getFields(): IFieldValidatorsPair[] {
        return [
            ...super.getFields(),
            {
                field: "reportDefinition",
                validators: [Validators.fieldRequiredValidator, Validators.reportDefinitionValidator]
            },
        ];
    }
}
