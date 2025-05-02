import { create } from "zustand";
import {
  getAllRegisteredStudent,
  getAllSubjects,
  getUnpaidStudents,
} from "../services/subject/api";

type DashboardState = GlobalState & {
  totalSubject: number | null;
  totalRegisteredStudent: number | null;
  totalUnpaidStudent: number | null;
};

type DashboardActions = {
  getTotalSubject: () => Promise<void>;
  getTotalRegisteredStudent: () => Promise<void>;
  getTotalUnpaidStudent: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  totalSubject: null,
  totalRegisteredStudent: null,
  totalUnpaidStudent: null,
};

const useDashboardStore = create<DashboardState & DashboardActions>(
  (set, get) => ({
    ...initialState,

    getTotalRegisteredStudent: async () => {
      set({ isLoading: false, error: null });

      try {
        const res = await getAllSubjects();

        if (res.status && res.data) {
          set({ totalSubject: res.data.length });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    getTotalSubject: async () => {
      set({ isLoading: false, error: null });

      try {
        const res = await getAllRegisteredStudent();

        if (res.status && res.data) {
          set({ totalRegisteredStudent: res.data.length });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    getTotalUnpaidStudent: async () => {
      set({ isLoading: false, error: null });

      try {
        const res = await getUnpaidStudents();

        if (res.status && res.data) {
          set({ totalUnpaidStudent: res.data.length });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useDashboardStore;
