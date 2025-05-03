import { create } from "zustand";
import { IGetUserResponseBody } from "../interfaces/user/user.interface";
import { getAsisten, getDosen } from "../services/user/api";

type AsistenState = GlobalState & {
  asistenData: IGetUserResponseBody[];
  query: string | undefined;
};

type AsistenActions = {
  setQuery: (query: string) => void;
  getAsisten: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  asistenData: [],
  query: undefined,
};

const useAsistenStore = create<AsistenState & AsistenActions>((set, get) => ({
  ...initialState,

  setQuery: (query) => set({ query }),

  getAsisten: async () => {
    const { query } = get();

    set({ isLoading: true, error: null });

    try {
      const res = await getAsisten(query);

      if (res.status && res.data) {
        set({ asistenData: res.data });
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

export default useAsistenStore;
