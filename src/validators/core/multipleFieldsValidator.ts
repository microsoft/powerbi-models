// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { IValidationError, IValidator } from './validator';

export interface IFieldValidatorsPair {
    field: string;
    validators: IValidator[];
}

export class MultipleFieldsValidator implements IValidator {
    public constructor(private fieldValidatorsPairs: IFieldValidatorsPair[]) { }

    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (!this.fieldValidatorsPairs) {
            return null;
        }

        const fieldsPath = path ? path + "." + field : field;

        for (const fieldValidators of this.fieldValidatorsPairs) {
            for (const validator of fieldValidators.validators) {
                const errors = validator.validate(input[fieldValidators.field], fieldsPath, fieldValidators.field);
                if (errors) {
                    return errors;
                }
            }
        }

        return null;
    }
}
