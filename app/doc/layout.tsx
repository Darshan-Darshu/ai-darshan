import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import { ReactNode } from "react";

function DocumentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  );
}
export default DocumentLayout;
