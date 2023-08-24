import { Mood } from './mood';

export type User = {
  uid: string;
  displayName: string;
  moods: Mood[] | undefined;
};
