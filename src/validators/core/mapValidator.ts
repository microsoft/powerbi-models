// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { ObjectValidator } from './typeValidator';
import { IValidationError, IValidator } from './validator';

export class MapValidator extends ObjectValidator {
    public constructor(private keyValidators: IValidator[], private valueValidators: IValidator[]) {
        super();
    }

    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        let errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                const fieldsPath = (path ? path + "." : "") + field + "." + key;
                for (const keyValidator of this.keyValidators) {
                    errors = keyValidator.validate(key, fieldsPath, field);
                    if (errors) {
                        return errors;
                    }
                }
                for (const valueValidator of this.valueValidators) {
                    errors = valueValidator.validate(input[key], fieldsPath, field);
                    if (errors) {
                        return errors;
                    }
                }
            }
        }
        return null;
    }
}
