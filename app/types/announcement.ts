export enum AnnouncementTypeEnum {
  "asprak",
  "praktikum",
  "inhal",
  "pengumuman",
}

export type Announcement = {
  title: string;
  type: AnnouncementTypeEnum;
  desc: string;
  detail: string | null;
  posterUrl: string | null;
  postDate: string;
  dueDate: string;
};
