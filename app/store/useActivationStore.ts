import { create } from "zustand";
import { IGetActivationResponseBody } from "../interfaces/activation/activation.interface";
import { getAllActivation } from "../services/activation/api";

type ActivationState = GlobalState & {
  activationData: IGetActivationResponseBody[];
  status: string;
  name: string;
};

type ActivationActions = {
  getAllActivations: () => Promise<void>;
  setStatusQuery: (query: string | undefined) => void;
  setNameQuery: (query: string) => void;
  reset: () => void;
};

const initialState = {
  isLoading: false,
  error: null,
  activationData: [],
  status: "",
  name: "",
};

const useActivationStore = create<ActivationState & ActivationActions>(
  (set, get) => ({
    ...initialState,

    setStatusQuery: (query) => {
      set({ status: query, activationData: [] });
      get().getAllActivations();
    },

    setNameQuery: (query) => {
      set({ name: query, activationData: [] });
      get().getAllActivations();
    },

    getAllActivations: async () => {
      const { status, name } = get();

      set({ isLoading: true, error: null });

      try {
        const res = await getAllActivation(status, name);

        if (res.data && res.status) {
          set({ activationData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    reset: () => {
      set({ ...initialState });
    },
  }),
);

export default useActivationStore;
