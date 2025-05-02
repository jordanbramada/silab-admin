import { error } from "console";
import { IGetSubjectResponseBody } from "../interfaces/subject/subject.interface";
import { create } from "zustand";
import { getAllSubjects } from "../services/subject/api";

type SubjectState = GlobalState & {
  subjectsData: IGetSubjectResponseBody[];
};

type SubjectActions = {
  getAllSubjects: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  subjectsData: [],
};

const useSubjectStore = create<SubjectState & SubjectActions>((set, get) => ({
  ...initialState,

  getAllSubjects: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllSubjects();

      if (res.data && res.status) {
        set({ subjectsData: res.data });
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

export default useSubjectStore;
