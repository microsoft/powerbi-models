import * as jsen from 'jsen';

interface IValidationError {
  path: string;
  keyword: string;
  message: string;
}

export interface IError {
  message: string;
}

function normalizeError(error: IValidationError): IError {
  if (!error.message) {
    error.message = `${error.path} is invalid. Not meeting ${error.keyword} constraint`;
  }

  delete error.path;
  delete error.keyword;

  return error;
}

/**
 * Takes in schema and returns function which can be used to validate the schema with better semantics around exposing errors
 */
export function validate(schema: any, options?: any) {
  return (x: any): IError[] => {
    const validate = jsen(schema, options);
    const isValid = validate(x);

    if (isValid) {
      return undefined;
    }
    else {
      return validate.errors
        .map(normalizeError);
    }
  };
}
