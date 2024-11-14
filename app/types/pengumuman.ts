import { AnnouncementTypeEnum } from "./announcement";

export type Pengumuman = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  type: AnnouncementTypeEnum;
  author: string;
};
