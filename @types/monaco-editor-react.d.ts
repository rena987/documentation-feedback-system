declare module '@monaco-editor/react' {
  import * as monaco from 'monaco-editor';
  import * as React from 'react';

  export type Monaco = typeof monaco;

  export type MonacoEditorProps = {
    width?: string | number;
    height?: string | number;
    value?: string;
    defaultValue?: string;
    language?: string;
    theme?: string;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    editorDidMount?: (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
    editorWillMount?: (monaco: Monaco) => void;
    onChange?: (value: string, event: monaco.editor.IModelContentChangedEvent) => void;
    onValidate?: (markers: monaco.editor.IMarkerData[]) => void;
  };

  export default class MonacoEditor extends React.Component<MonacoEditorProps, {}> {
    constructor(props: MonacoEditorProps);
  }
}
