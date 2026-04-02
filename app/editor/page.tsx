import EditorPanel from "@/components/custom/EditorPanel";

export default async function EditorPage() {

  return (

    <div className='max-w-450 mx-auto p-4'>
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
        <EditorPanel />
        {/* <OutputPanel /> */}
      </div>
    </div>
  );
}
