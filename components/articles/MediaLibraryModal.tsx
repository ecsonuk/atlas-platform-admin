"use client";

interface Props {
  open: boolean;
  mediaLibrary: any[];
  onClose: () => void;
  onSelect: (media: any) => void;
}

export default function MediaLibraryModal({
  open,
  mediaLibrary,
  onClose,
  onSelect,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="max-h-[80vh] w-[1000px] overflow-auto rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Media Library
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">

          {mediaLibrary.map((media) => (

            <div
              key={media.id}
              className="cursor-pointer rounded-lg border p-2 hover:border-blue-600"
              onClick={() => onSelect(media)}
            >

              <img
                src={`http://localhost:3000/${media.filePath}`}
                alt={media.title ?? media.originalName}
                className="h-36 w-full rounded object-cover"
              />

              <div className="mt-2 truncate text-sm">
                {media.title ?? media.originalName}
              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}
