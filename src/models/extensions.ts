export type Extensions = IExtension[];

export interface IExtension {
    command?: ICommandExtension;
}

export interface IExtensionItem {
    name: string;
    extend: IExtensionPoints;
}

export interface ICommandExtension extends IExtensionItem {
    title: string;
    icon?: string;
}

// TODO: ExtensionPoints should extend _.Dictionary<ExtensionPoint>. This will need to add lodash to the project.
export interface IExtensionPoints {
  visualContextMenu?: IMenuExtension;
  visualOptionsMenu?: IMenuExtension;
}

export interface IExtensionPoint {
}

export interface IMenuExtension extends IExtensionPoint {
    title?: string;
    icon?: string;
}
