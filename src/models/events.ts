import * as common from './common';
import * as filters from './filters';

export interface IQnaVisualRenderedEvent {
  utterance: string;
  normalizedUtterance?: string;
}

export interface IVisualCustomCommandEvent {
  visualName: string;
  command: string;
}

export interface ISelection {
  visual: common.IVisual;
  page: common.IPage;
  report: common.IReport;
  dataPoints: filters.IIdentityValue<filters.IEqualsDataReference>[];
  regions: filters.IIdentityValue<filters.IEqualsDataReference | filters.IBetweenDataReference>[];
  filters: filters.IFilter[];
}
