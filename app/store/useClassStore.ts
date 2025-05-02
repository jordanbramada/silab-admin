import { create } from "zustand";
import {
  IGetClassByIdResponseBody,
  IGetClassResponseBody,
} from "../interfaces/class/class.interface";
import { getAllClass, getClassById } from "../services/class/api";

type ClassState = GlobalState & {
  classesData: IGetClassResponseBody[];
  classData?: IGetClassByIdResponseBody | null;
};

type ClassActions = {
  getAllClass: () => Promise<void>;
  getClassById: (id: string) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  classesData: [],
  classData: null,
};

const useClassStore = create<ClassState & ClassActions>((set, get) => ({
  ...initialState,

  getAllClass: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllClass();

      if (res.status && res.data) {
        set({ classesData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  getClassById: async (id: string) => {
    set({ isLoading: true });

    try {
      const res = await getClassById(id);

      if (res.status && res.data) {
        set({ classData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useClassStore;
