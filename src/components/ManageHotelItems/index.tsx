import {
  Check,
  ChevronRight,
  Edit2,
  PlusCircle,
  Trash2,
  X,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface IHotelItem {
  id: string;
  title: string;
}

const ManageHotelItems = ({
  items,
  setItems,
  title,
  placeholder,
}: {
  items: IHotelItem[];
  setItems: Dispatch<SetStateAction<IHotelItem[]>>;
  title: string;
  placeholder: string;
}) => {
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<IHotelItem>({
    id: '',
    title: '',
  });

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: uuidv4(), title: newItem.trim() }]);
      setNewItem('');
    }
  };

  const startEditing = (id: string, title: string) => {
    setEditingItem({ id, title });
  };

  const saveEdit = () => {
    setItems(
      items.map((item) =>
        item.id === editingItem.id
          ? { ...item, title: editingItem.title }
          : item,
      ),
    );
    setEditingItem({ id: '', title: '' });
  };

  const cancelEdit = () => {
    setEditingItem({ id: '', title: '' });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[600px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium text-gray-800">{title}</h1>
        <Button
          onClick={addItem}
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full"
        >
          <PlusCircle className="h-6 w-6 text-green-500" />
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      {items.length > 0 && (
        <ReactSortable list={items} setList={setItems}>
          {items.map((item, idx) => (
            <div
              key={`${idx}-${item.id}`}
              className="cursor-grab w-full h-[55px] mb-2 p-2 border-solid border-[1px] border-gray-300 rounded-md my-3 flex justify-between items-center"
            >
              {editingItem.id === item.id ? (
                <>
                  <ChevronRight />
                  <Input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({
                        id: item.id,
                        title: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        saveEdit();
                      }
                    }}
                    className="border-0 text-xl mr-3 text-gray-900 py-[10px] focus-visible:ring-0 focus-visible:ring-offset-0"
                    autoFocus
                  />
                </>
              ) : (
                <span className="text-xl text-gray-900 py-[10px] pl-2">
                  {item.title}
                </span>
              )}
              <div className="flex gap-2">
                {editingItem.id === item.id ? (
                  <>
                    <Button
                      onClick={saveEdit}
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="rounded-full"
                    >
                      <Check className="h-5 w-5 text-green-500" />
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        startEditing(item.id, item.title);
                      }}
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="rounded-full"
                    >
                      <Edit2 className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                      onClick={() => deleteItem(item.id)}
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="rounded-full"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </ReactSortable>
      )}
    </div>
  );
};

export default ManageHotelItems;
