import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  src: string;
  price: string;
}

interface FoodStore {
  items: FoodItem[];
  addItem: (item: FoodItem) => void;
  updateItem: (item: FoodItem) => void;
  deleteItem: (id: number) => void;
}

const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "food-store",
      getStorage: () => localStorage,
    }
  )
);

export default useFoodStore;
