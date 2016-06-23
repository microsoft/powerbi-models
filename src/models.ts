declare var require: Function;

export const settingsSchema = require('./schemas/settings.json');
export const loadSchema = require('./schemas/load.json');
export const pageTargetSchema = require('./schemas/pageTarget.json');
export const visualTargetSchema = require('./schemas/visualTarget.json');
export const pageSchema = require('./schemas/page.json');

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
  if(!error.message) {
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
  return (x: any): any[] => {
    const validate = jsen(schema, options);
    const isValid = validate(x);

    if(isValid) {
      return undefined;
    }
    else {
      return validate.errors
        .map(normalizeError);
    }
  }
}


export interface ISettings {
  filter?: any;
  filterPaneEnabled?: boolean;
  pageName?: string;
  pageNavigationEnabled?: boolean;
}

export const validateSettings = validate(settingsSchema);

/**
 * TODO: Consider adding type: "report" | "tile" property to indicate what type of object to embed
 * 
 * This would align with goal of having single embed page which adapts to the thing being embedded
 * instead of having M x N embed pages where M is type of object (report, tile) and N is authorization
 * type (PaaS, SaaS, Anonymous)
 */
export interface ILoadConfiguration {
  accessToken: string;
  id: string;
  settings?: ISettings;
}

export const validateLoad = validate(loadSchema, {
  schemas: {
    settings: settingsSchema
  }
});

export interface IPageTarget {
  type: "page";
  name: string;
}

export const validatePageTarget = validate(pageTargetSchema);

export interface IVisualTarget {
  type: "visual";
  id: string;
}

export const validateVisualTarget = validate(visualTargetSchema);

export interface IPage {
  name: string;
  displayName: string;
}

export const validatePage = validate(pageSchema);
