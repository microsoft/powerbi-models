// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class SettingsValidator extends ObjectValidator {
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
                field: "filterPaneEnabled",
                validators: [Validators.booleanValidator]
            },
            {
                field: "navContentPaneEnabled",
                validators: [Validators.booleanValidator]
            },
            {
                field: "bookmarksPaneEnabled",
                validators: [Validators.booleanValidator]
            },
            {
                field: "useCustomSaveAsDialog",
                validators: [Validators.booleanValidator]
            },
            {
                field: "extensions",
                validators: [Validators.extensionsValidator]
            },
            {
                field: "layoutType",
                validators: [Validators.layoutTypeValidator]
            },
            {
                field: "customLayout",
                validators: [Validators.customLayoutValidator]
            },
            {
                field: "background",
                validators: [Validators.backgroundValidator]
            },
            {
                field: "visualSettings",
                validators: [Validators.visualSettingsValidator]
            },
            {
                field: "hideErrors",
                validators: [Validators.booleanValidator]
            },
            {
                field: "commands",
                validators: [Validators.commandsSettingsArrayValidator]
            },
            {
                field: "hyperlinkClickBehavior",
                validators: [Validators.hyperlinkClickBehaviorValidator]
            },
            {
                field: "bars",
                validators: [Validators.reportBarsValidator]
            },
            {
                field: "panes",
                validators: [Validators.reportPanesValidator]
            },
            {
                field: "personalBookmarksEnabled",
                validators: [Validators.booleanValidator]
            },
            {
                field: "persistentFiltersEnabled",
                validators: [Validators.booleanValidator]
            },
            {
                field: "visualRenderedEvents",
                validators: [Validators.booleanValidator]
            },
            {
                field: "authoringHintsEnabled",
                validators: [Validators.booleanValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
