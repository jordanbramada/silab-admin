export enum AnnouncementTypeEnum {
  "Assistant",
  "Practicum",
  "Inhall",
  "Basic",
}

export type Announcement = {
  type: AnnouncementTypeEnum;
  title: string;
  body: string;
};
