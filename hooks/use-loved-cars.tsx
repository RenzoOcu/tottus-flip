import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "./use-toast";
import { product } from "@prisma/client";

interface UseLovedCarsType {
  lovedItems: product[];
  addLoveItem: (data: product) => void;
  removeLovedItem: (id: string) => void;
}

export const useLovedCars = create(
  persist<UseLovedCarsType>(
    (set, get) => ({
      lovedItems: [],
      addLoveItem: (data: product) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(
          (item) => item.id === data.id
        );

        if (existingItem) {
          return toast({
            title: "la fruta o la verdura ya esta en favoritos 💔",
          });
        }

        set({
          lovedItems: [...get().lovedItems, data],
        });

        toast({
          title: "producto añadido ",
        });
      },

      removeLovedItem: (id: string) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)],
        });
        toast({
          title: "El producto se ha eliminado de la lista ",
        });
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);