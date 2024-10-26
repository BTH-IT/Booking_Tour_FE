import { Trash2, Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { ITourFile } from 'file';

const ManageTourImages = ({
  files,
  setFiles,
  title,
}: {
  files: ITourFile[];
  setFiles: Dispatch<SetStateAction<ITourFile[]>>;
  title: string;
}) => {
  const [editId, setEditId] = useState(-1);

  const addFile = (newFiles: FileList | null) => {
    if (!newFiles || files.length >= 5) {
      return;
    }

    Array.from(newFiles).forEach((f: File, idx) => {
      if (idx > 4) {
        return;
      }
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, { id: idx, data: f }];
        return updatedFiles;
      });
    });
  };

  const editFile = (newFiles: FileList | null) => {
    if (!newFiles) {
      return;
    }

    Array.from(newFiles).forEach((f: File) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.map((file) => {
          if (file.id === editId) {
            return { id: file.id, data: f };
          }
          return file;
        });
        return updatedFiles;
      });
    });
  };

  const deleteFile = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="w-[1000px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-8 items-center">
          <h1 className="w-full text-xl font-medium text-gray-800">{title}</h1>
          <div className="w-full flex items-center">
            <Input
              accept="image/*"
              type="file"
              multiple
              onChange={(event) => addFile(event.target.files ?? null)}
              onClick={(event) => (event.currentTarget.value = '')}
              className="add_image hidden"
            />
            <Input
              accept="image/*"
              type="file"
              onChange={(event) => editFile(event.target.files ?? null)}
              onClick={(event) => (event.currentTarget.value = '')}
              className="edit_image hidden"
            />
            <Button
              onClick={() =>
                (
                  document.querySelector('.add_image') as HTMLInputElement
                )?.click()
              }
              type="button"
              className="flex gap-3 items-center justify-center rounded-md text-xl py-7"
              disabled={files.length >= 5}
            >
              Upload Images
              <Upload className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setFiles([]);
              setEditId(-1);
            }}
            variant="destructive"
            type="button"
            className="flex gap-3 items-center justify-center rounded-md text-xl py-7"
            disabled={files.length === 0}
          >
            Clear
            <Trash2 className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="min-h-[192px]">
        {files.length > 0 && (
          <ReactSortable
            list={files}
            setList={setFiles}
            className="flex gap-3 w-full"
          >
            {files.map((file, idx) => (
              <div
                key={`${idx}`}
                className="cursor-grab flex flex-col w-[200px] h-fit mb-2 py-5 border-solid border-[1px] border-gray-300 rounded-md my-3"
              >
                <div className="w-[190px] h-[100px]">
                  {file.data ? (
                    <img
                      src={URL.createObjectURL(file.data)}
                      alt="image"
                      className="rounded-md object-contain w-full h-full px-2"
                    />
                  ) : (
                    <>
                      {file.url ? (
                        <img
                          src={file.url}
                          alt="image"
                          className="rounded-md object-contain w-full h-full px-2"
                        />
                      ) : (
                        <img
                          src="error-image.png"
                          alt="image"
                          className="rounded-md object-contain"
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-3 px-2 pt-5">
                  <Button
                    onClick={() => {
                      setEditId(editId === file.id ? -1 : file.id);
                      (
                        document.querySelector(
                          '.edit_image',
                        ) as HTMLInputElement
                      )?.click();
                    }}
                    variant="primary"
                    type="button"
                    className="w-[50%] rounded-md"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteFile(file.id)}
                    variant="destructive"
                    type="button"
                    className="w-[50%] rounded-md"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  );
};

export default ManageTourImages;
