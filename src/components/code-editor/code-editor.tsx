import { FC, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import _ from 'lodash';

const OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver constructor
// @ts-ignore
window.ResizeObserver = function(callback: any) {
    const wrappedCallback = (entries: any, observer: any) => {
        window.requestAnimationFrame(() => {
            callback(entries, observer);
        });
    };

    // Create an instance of the original ResizeObserver
    // with the wrapped callback
    return new OriginalResizeObserver(wrappedCallback);
};

// Copy over static methods, if any
for (let staticMethod in OriginalResizeObserver) {
    if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
        // @ts-ignore
        window.ResizeObserver[staticMethod] =
            // @ts-ignore
            OriginalResizeObserver[staticMethod];
    }
}

type CodeEditorProps = {
    minimapEnabled?: boolean;
    value?: string;
    onChange?: (text?: string) => void;
};
export const CodeEditor: FC<CodeEditorProps> = ({
                                                    minimapEnabled = false,
                                                    value,
                                                    onChange,
                                                }) => {
    const [editor, setEditor] = useState<any>();
    const monacoEditorRef = useRef<any>();

    const handleEditorInit = () => {
        const editorInstance = monaco.editor.create(monacoEditorRef.current, {
            overviewRulerBorder: false,
            minimap: {
                enabled: minimapEnabled,
            },
            automaticLayout: true,
        });
        editorInstance.onDidChangeModelContent((e) => {
            onChange?.(editorInstance.getValue());
        });
        setEditor(editorInstance);
    };


    useEffect(() => {
        if (editor && !_.isEqual(value, editor.getValue())) {
            editor.setValue(value || '');
        }
    }, [editor, value]);

    useEffect(() => {
        if (!editor && !monacoEditorRef.current.innerHTML) {
            handleEditorInit();
        }

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, []);

    return <div style={{ height: '100%' }} ref={monacoEditorRef} />;
};
