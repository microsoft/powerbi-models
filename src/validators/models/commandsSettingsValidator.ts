// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class CommandsSettingsValidator extends ObjectValidator {
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
                field: "copy",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "drill",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "drillthrough",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "expandCollapse",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "exportData",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "includeExclude",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "removeVisual",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "search",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "seeData",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "sort",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "spotlight",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "insightsAnalysis",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "addComment",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "groupVisualContainers",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "summarize",
                validators: [Validators.singleCommandSettingsValidator]
            },
            {
                field: "clearSelection",
                validators: [Validators.singleCommandSettingsValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class SingleCommandSettingsValidator extends ObjectValidator {
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
                field: "displayOption",
                validators: [Validators.fieldRequiredValidator, Validators.commandDisplayOptionValidator]
            },
            {
                field: "selector",
                validators: [Validators.visualCommandSelectorValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class PaginatedReportCommandsValidator extends ObjectValidator {
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
                field: "parameterPanel",
                validators: [Validators.parametersPanelValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
