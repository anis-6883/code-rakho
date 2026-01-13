import EditorPanel from "@/components/custom/EditorPanel";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-[1800px] mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <EditorPanel />
          {/* <OutputPanel /> */}
        </div>
      </div>
    </div>
  );
}
