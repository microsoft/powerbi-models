export enum PageSizeType {
  Widescreen,
  Standard,
  Cortana,
  Letter,
  Custom
}

export enum DisplayOption {
  FitToPage,
  FitToWidth,
  ActualSize
}

export interface IPageSize {
  type: PageSizeType;
}

export interface ICustomPageSize extends IPageSize {
  width?: number;
  height?: number;
}

export interface ICustomLayout {
  pageSize?: IPageSize;
  displayOption?: DisplayOption;
}
