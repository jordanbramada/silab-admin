import { create } from "zustand";
import {
  IAddClassMeetingRequestBody,
  IGetAllClassMeetingResponseBody,
} from "../interfaces/meeting/meeting.interface";
import { getMeetings, postMeeting } from "../services/meeting/api";

type MeetingState = GlobalState & {
  meetingsData: IGetAllClassMeetingResponseBody[];
  message: string | null;
};

type MeetingActions = {
  getMeetings: (classId: string) => Promise<void>;
  addMeeting: (body: IAddClassMeetingRequestBody) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  meetingsData: [],
  message: null,
};

const useMeetingStore = create<MeetingState & MeetingActions>((set, get) => ({
  ...initialState,

  getMeetings: async (classId) => {
    set({ isLoading: true });

    try {
      const res = await getMeetings(classId);

      if (res.status && res.data) {
        set({ meetingsData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  addMeeting: async (body) => {
    set({ isLoading: true, error: null });

    try {
      const res = await postMeeting(body);

      if (res.status) {
        set({ message: res.message });
      } else {
        set({ error: res.message });
      }
    } catch {
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMeetingStore;
