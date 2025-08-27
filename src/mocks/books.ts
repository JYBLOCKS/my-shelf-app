import { Book } from '../models/Book';

export const booksMocks: Book[] = Array.from({ length: 1000 }).map(
  (_, index) => ({
    title: `Book Title ${index + 1}`,
    author: `Author Name ${index + 1}`,
    description: `Book Description ${index + 1}`,
    ratings: { average: 4.5, count: 100 },
    cover:
      'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_267,h_300/https://fossefit.com/wp-content/uploads/2024/10/6226836-copia2-267x300.jpg',
    publishedDate: '2023',
    id: `${index + 1}`,
    comments: [
      {
        id: `${index + 1}-1`,
        userId: 'user1',
        content: 'Great book!',
        rating: 5,
        createdAt: '2023-10-01',
      },
      {
        id: `${index + 1}-2`,
        userId: 'user2',
        content: 'Very informative.',
        rating: 4,
        createdAt: '2023-10-02',
      },
    ],
    favorites: [
      {
        userId: 'user1',
      },
    ],
  }),
);
