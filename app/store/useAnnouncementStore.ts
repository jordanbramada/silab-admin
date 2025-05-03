import { create } from "zustand";
import {
  IAddAnnouncementRequestBody,
  IGetAllAnnouncementsResponseBody,
} from "../interfaces/announcement/announcement.interface";
import {
  getAllAnnouncements,
  getAnnouncementById,
  postAnnouncement,
} from "../services/announcement/api";

type AnnouncementState = GlobalState & {
  announcementsData: IGetAllAnnouncementsResponseBody[];
  announcementData: IGetAllAnnouncementsResponseBody | null;
};

type AnnouncementActions = {
  addAnnouncement: (body: IAddAnnouncementRequestBody) => Promise<void>;
  getAllAnnouncements: () => Promise<void>;
  getAnnouncementById: (id: string) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  announcementsData: [],
  announcementData: null,
};

const useAnnouncementStore = create<AnnouncementState & AnnouncementActions>(
  (set, get) => ({
    ...initialState,

    addAnnouncement: async (body) => {
      set({ isLoading: true, error: null });

      try {
        const res = await postAnnouncement(body);

        if (!res.status) {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    getAllAnnouncements: async () => {
      set({ isLoading: true, error: null });

      try {
        const res = await getAllAnnouncements();

        if (res.status && res.data) {
          set({ announcementsData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },

    getAnnouncementById: async (id) => {
      set({ isLoading: true, error: null });

      try {
        const res = await getAnnouncementById(id);

        if (res.status && res.data) {
          set({ announcementData: res.data });
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

export default useAnnouncementStore;
