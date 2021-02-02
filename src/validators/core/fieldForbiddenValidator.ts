// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { IValidationError, IValidator } from './validator';

export class FieldForbiddenValidator implements IValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input !== undefined) {
            return [{
                message: field + " is forbidden",
                path: (path ? path + "." : "") + field,
                keyword: "forbidden"
            }];
        }
        return null;
    }
}
