export interface ITechnicalDetails {
  requestId?: string;
}

export interface IError {
  message: string;
  detailedMessage?: string;
  errorCode?: string;
  technicalDetails?: ITechnicalDetails;
}

export interface IValidationError {
  path?: string;
  keyword?: string;
  message?: string;
}

export interface IValidator {
  validate(input: any, path?: string, fieldName?: string): IValidationError[];
}

// TODO : DElete validator class
export class Validator {
  /**
   * Takes in schema and returns function which can be used to validate the schema with better semantics around exposing errors
   */
  public static validate(schema: any, options?: any) {
    return (x: any): IError[] => {
      // const validate = jsen(schema, options);
      const validate = null;
      const isValid = validate(x);

      if (isValid) {
        return undefined;
      }
      else {
        return validate.errors
          .map(Validator.normalizeError);
      }
    };
  }

  public static normalizeError(error: IValidationError): IError {
    let message = error.message;
    if (!message) {
      message = `${error.path} is invalid. Not meeting ${error.keyword} constraint`;
    }

    return {
      message
    };
  }
}
