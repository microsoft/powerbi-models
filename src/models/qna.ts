import * as common from './common';

export interface IQnaSettings {
  filterPaneEnabled?: boolean;
}

export interface ILoadQnaConfiguration {
  accessToken: string;
  datasetIds: string[];
  utterance?: string;
  viewMode?: QnAMode;
  settings?: IQnaSettings;
  tokenType?: common.TokenType;
}

export enum QnAMode {
  Interactive,
  NonInteractive,
}

export interface IQnaInterpretInputData {
  utterance: string;
  datasetIds?: string[];
}
