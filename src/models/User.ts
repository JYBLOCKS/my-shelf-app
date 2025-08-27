import { Book } from './Book';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  ranks: Book[];
  favorites: Book[];
  wishlist: Book[];
}
