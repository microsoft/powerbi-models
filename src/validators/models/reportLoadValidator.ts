// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class ReportLoadValidator extends ObjectValidator {
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
                validators: [Validators.settingsValidator]
            },
            {
                field: "pageName",
                validators: [Validators.stringValidator]
            },
            {
                field: "filters",
                validators: [Validators.reportLoadFiltersValidator]
            },
            {
                field: "permissions",
                validators: [Validators.permissionsValidator]
            },
            {
                field: "viewMode",
                validators: [Validators.viewModeValidator]
            },
            {
                field: "tokenType",
                validators: [Validators.tokenTypeValidator]
            },
            {
                field: "bookmark",
                validators: [Validators.applyBookmarkValidator]
            },
            {
                field: "theme",
                validators: [Validators.customThemeValidator]
            },
            {
                field: "embedUrl",
                validators: [Validators.stringValidator]
            },
            {
                field: "datasetBinding",
                validators: [Validators.datasetBindingValidator]
            },
            {
                field: "contrastMode",
                validators: [Validators.contrastModeValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
