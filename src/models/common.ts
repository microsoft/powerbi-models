export interface IReport {
  id: string;
  displayName: string;
}

export interface IPage {
  name: string;
  displayName: string;
  isActive?: boolean;
}

export interface IVisual {
  name: string;
  title: string;
  type: string;
}

export enum Permissions {
  Read = 0,
  ReadWrite = 1,
  Copy = 2,
  Create = 4,
  All = 7
}

export enum ViewMode {
  View,
  Edit
}

export enum TokenType {
  Aad,
  Embed
}

export type PageView = "fitToWidth" | "oneColumn" | "actualSize";
