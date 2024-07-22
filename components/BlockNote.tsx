import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

type Props = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: Boolean;
};

function BlockNote({ doc, provider, darkMode }: Props) {
  return <div>BlockNote</div>;
}
export default BlockNote;
