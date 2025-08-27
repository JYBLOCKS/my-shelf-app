
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  cover: string;
  ratings: {
    average: number;
    count: number;
  };
  comments: Comment[];
  favorites: Favorite[];
}

export interface Favorite {
  userId: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  rating: number;
  createdAt: string;
}

