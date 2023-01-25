// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class DatasetCreateConfigValidator extends ObjectValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }

        let errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "locale",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "mashupDocument",
                validators: [Validators.stringValidator]
            },
            {
                field: "datasourceConnectionConfig",
                validators: [Validators.datasourceConnectionConfigValidator]
            },
            {
                field: "tableSchemaList",
                validators: [Validators.tableSchemaListValidator]
            },
            {
                field: "data",
                validators: [Validators.tableDataArrayValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        errors = multipleFieldsValidator.validate(input, path, field);

        if (errors){
            return errors;
        }

        if (input["datasourceConnectionConfig"] && input["mashupDocument"] == null) {
            return [{
                message: "mashupDocument cannot be empty when datasourceConnectionConfig is presented"
            }];
        }

        if (input["data"] && input["tableSchemaList"] == null) {
            return [{
                message: "tableSchemaList cannot be empty when data is provided"
            }];
        }

        if (input["data"] == null && input["mashupDocument"] == null) {
            return [{
                message: "At least one of data or mashupDocument must be provided"
            }];
        }
    }
}

export class DatasourceConnectionConfigValidator extends ObjectValidator {
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
                field: "dataCacheMode",
                validators: [Validators.dataCacheModeValidator]
            },
            {
                field: "credentials",
                validators: [Validators.credentialsValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class CredentialsValidator extends ObjectValidator {
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
                field: "credentialType",
                validators: [Validators.credentialTypeValidator]
            },
            {
                field: "credentialDetails",
                validators: [Validators.credentialDetailsValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class ColumnSchemaValidator extends ObjectValidator {
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
            },
            {
                field: "displayName",
                validators: [Validators.stringValidator]
            },
            {
                field: "dataType",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class TableSchemaValidator extends ObjectValidator {
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
            },
            {
                field: "columns",
                validators: [Validators.fieldRequiredValidator, Validators.columnSchemaArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class TableDataValidator extends ObjectValidator {
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
            },
            {
                field: "rows",
                validators: [Validators.fieldRequiredValidator, Validators.rawDataValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
