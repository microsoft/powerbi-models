// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { IValidationError, IValidator } from './validator';

export class AnyOfValidator implements IValidator {
    public constructor(private validators: IValidator[]) { }

    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        let valid: boolean = false;
        for (const validator of this.validators) {
            const errors = validator.validate(input, path, field);
            if (!errors) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            return [{
                message: field + " property is invalid",
                path: (path ? path + "." : "") + field,
                keyword: "invalid"
            }];
        }

        return null;
    }
}
