import { LexicalComposer } from "@lexical/react/LexicalComposer";

// import { isDevPlayground } from "./appSettings";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
// import logo from './images/logo.svg';
import PlaygroundNodes from "./nodes/PlaygroundNodes";
// import { TableContext } from "./plugins/TablePlugin";
// import TestRecorderPlugin from "./plugins/TestRecorderPlugin";
// import TypingPerfPlugin from "./plugins/TypingPerfPlugin";
// import Settings from "./Settings";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

import "./setupEnv";
import "./index.css";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting."
);

function App({ handleEditorChange, initialHtml }: any): JSX.Element {
  const {
    settings: { isCollab, emptyEditor },
  } = useSettings();

  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? undefined : "",
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <SharedAutocompleteContext>
          <div className="editor-shell border border-t-0 rounded-xl mx-auto">
            <Editor
              initialHtml={initialHtml}
              handleEditorChange={handleEditorChange}
            />
          </div>
          {/* <Settings /> */}
        </SharedAutocompleteContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PlaygroundApp({
  handleEditorChange,
  initialHtml,
}: any): JSX.Element {
  return (
    <SettingsContext>
      <App handleEditorChange={handleEditorChange} initialHtml={initialHtml} />
    </SettingsContext>
  );
}
