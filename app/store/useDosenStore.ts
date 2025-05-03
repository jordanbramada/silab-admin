import { create } from "zustand";
import { IGetUserResponseBody } from "../interfaces/user/user.interface";
import { getDosen } from "../services/user/api";

type DosenState = GlobalState & {
  dosenData: IGetUserResponseBody[];
};

type DosenActions = {
  getDosen: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  dosenData: [],
};

const useDosenStore = create<DosenState & DosenActions>((set, get) => ({
  ...initialState,

  getDosen: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getDosen();

      if (res.status && res.data) {
        set({ dosenData: res.data });
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

export default useDosenStore;
