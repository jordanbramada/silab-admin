import { AnnouncementTypeEnum } from "./announcement";

export type Pengumuman = {
  desc: string;
  detail?: string | null;
  dueDate: string;
  id: string;
  isPosted: boolean;
  postDate: string;
  posterUrl?: string | null;
  title: string;
  type: AnnouncementTypeEnum;
};
