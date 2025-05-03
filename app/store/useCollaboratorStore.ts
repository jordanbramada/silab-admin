import { create } from "zustand";
import {
  IAddCollaboratorRequestBody,
  IGetCollaboratorsResponseBody,
} from "../interfaces/collaborator/collaborator.interface";
import {
  getClassCollaborators,
  postCollaborators,
} from "../services/collaborator/api";

type CollaboratorState = GlobalState & {
  collaboratorsData: IGetCollaboratorsResponseBody[];
};

type CollaboratorActions = {
  getClassCollaborators: (id: string) => Promise<void>;
  addClassCollaborators: (body: IAddCollaboratorRequestBody) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  collaboratorsData: [],
};

const useCollaboratorStore = create<CollaboratorState & CollaboratorActions>(
  (set, get) => ({
    ...initialState,

    addClassCollaborators: async (body) => {
      set({ isLoading: true, error: null });

      try {
        const res = await postCollaborators(body);

        if (!res.status) {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    getClassCollaborators: async (id) => {
      set({ isLoading: true, error: null });

      try {
        const res = await getClassCollaborators(id);

        if (res.status && res.data) {
          set({ collaboratorsData: res.data });
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

export default useCollaboratorStore;
