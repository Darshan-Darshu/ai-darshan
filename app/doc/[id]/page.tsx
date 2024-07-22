import Document from "@/components/Document";

function DocumentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main className='flex flex-col flex-1 min-h-screen'>
      <Document id={id} />
    </main>
  );
}
export default DocumentPage;
