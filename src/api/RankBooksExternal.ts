import { supabase } from '@/db/supabase';
import { Book } from '@/models/Book';

const fieldsBooks = [
  'title',
  'subtitle',
  'cover_i',
  'author_name',
  'first_publish_year',
  'ratings_average',
  'ratings_count',
];

export const searchRankedBooks = async (name: string): Promise<Book[]> => {
  const booksFound: Book[] = [];
  const {
    data: books,
    count,
    error,
  } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .ilike('title', `%${name}%`);

  if (error) {
    throw new Error('Failed to fetch ranked books');
  }

  if ((!books || books.length === 0) && count === 0) {
    const externalBooks = await searchExternalBooks(name);
    booksFound.push(...externalBooks);
    await supabase.from('books').insert(booksFound);
  } else {
    booksFound.push(...books);
  }

  return booksFound;
};

export const getAllBooks = async (offset: number): Promise<Book[]> => {
  const PAGE_COUNT = 20;
  const from = offset * PAGE_COUNT;
  const to = from + PAGE_COUNT - 1;
  const { data: books, error } = await supabase
    .from('books')
    .select()
    .range(from, to);
  if (error) {
    throw new Error('Failed to fetch all books');
  }
  return books;
};

const searchExternalBooks = async (name: string): Promise<Book[]> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${name}&fields=${fieldsBooks.join(',')}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch ranked books');
  }
  const data = await response.json();
  const booksFetched = await Promise.all(
    data.docs.map(async (book) => {
      const descriptionByKey = await fetch(
        `https://openlibrary.org/works/${data.book.key}.json?fields=description`,
      );
      const descriptionData = (await descriptionByKey.json()) as {
        description: string;
      };
      return {
        id: book.key,
        title: book.title,
        author: book.author_name?.[0] || 'Unknown',
        publishedDate: book.first_publish_year?.toString() || 'Unknown',
        description: descriptionData.description || 'No description available',
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/128x192.png?text=No+Cover',
        ratings: {
          average: book.ratings_average || 0,
          count: book.ratings_count || 0,
        },
      };
    }),
  );
  return booksFetched;
};
