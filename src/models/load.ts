import * as common from './common';
import * as filters from './filters';
import * as extensions from './extensions';
import * as customLayout from './customLayout';

export interface IReportLoadConfiguration {
  accessToken: string;
  id: string;
  settings?: ISettings;
  pageName?: string;
  filters?: filters.ReportLevelFilters[];
  permissions?: common.Permissions;
  viewMode?: common.ViewMode;
  tokenType?: common.TokenType;
}

export interface IReportCreateConfiguration {
  accessToken: string;
  datasetId: string;
  settings?: ISettings;
  tokenType?: common.TokenType;
}

export interface IDashboardLoadConfiguration {
  accessToken: string;
  id: string;
  pageView?: common.PageView;
  tokenType?: common.TokenType;
}

export interface ITileLoadConfiguration {
  accessToken: string;
  id: string;
  dashboardId: string;
  tokenType?: common.TokenType;
  width?: number;
  height?: number;
}

export interface ISettings {
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
  useCustomSaveAsDialog?: boolean;
  extensions?: extensions.Extensions;
  customLayout?: customLayout.ICustomLayout;
}

export interface ISaveAsParameters {
  name: string;
}
