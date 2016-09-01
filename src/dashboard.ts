import * as util from './util';

declare var require: Function;

/* tslint:disable:no-var-requires */
export const loadSchema = require('./schemas/loadDashboard.json');
/* tslint:enable:no-var-requires */

export interface ILoadConfiguration {
    accessToken: string;
    id: string;
}

export const validateLoad = util.validate(loadSchema);
