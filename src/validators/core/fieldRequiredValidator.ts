// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { IValidationError, IValidator } from './validator';

export class FieldRequiredValidator implements IValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return [{
                message: field + " is required",
                path: (path ? path + "." : "") + field,
                keyword: "required"
            }];
        }
        return null;
    }
}
