// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class LoadQnaValidator extends ObjectValidator {
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
                field: "datasetIds",
                validators: [Validators.fieldRequiredValidator, Validators.stringArrayValidator]
            },
            {
                field: "question",
                validators: [Validators.stringValidator]
            },
            {
                field: "viewMode",
                validators: [Validators.viewModeValidator]
            },
            {
                field: "settings",
                validators: [Validators.qnaSettingValidator]
            },
            {
                field: "tokenType",
                validators: [Validators.tokenTypeValidator]
            },
            {
                field: "groupId",
                validators: [Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class QnaSettingsValidator extends ObjectValidator {
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
                field: "hideErrors",
                validators: [Validators.booleanValidator]
            },
            {
                field: "panes",
                validators: [Validators.qnaPanesValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class QnaInterpretInputDataValidator extends ObjectValidator {
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
                field: "datasetIds",
                validators: [Validators.stringArrayValidator]
            },
            {
                field: "question",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
