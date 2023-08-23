import { Mood } from './mood';

export interface User {
  uid: string;
  displayName: string;
  profilePicture: string;
  email: string;
  moods: Mood[];
}
