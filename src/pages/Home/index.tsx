import { Hero, NavBar, VirtualizedList } from '@/components/ui';
import { useDebouncedSearch } from '@/hooks/useDebounceSearch';
import { booksMocks } from '@/mocks/books';
import { Book } from '@/models/Book';
import { User } from '@/models/User';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Home = () => {
  const currentUser: User = JSON.parse(localStorage.getItem('user') || '{}');
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebouncedSearch(books, searchTerm, 30);

  useEffect(() => {
    // Fetch books based on searchTerm
    setLoading(true);
    const fetchBooks = async () => {
      //const response = await searchRankedBooks(searchTerm);
      setBooks(booksMocks);
      setLoading(false);
    };
    fetchBooks();
    return () => {
      setBooks([]);
      setSearchTerm('');
      setLoading(false);
    };
  }, []);

  return (
    <Box mb={4}>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Hero />
      <Box mt={4} width={{ xs: '95%', md: '80%' }} mx="auto">
        {loading && (
          <Typography variant="h6" textAlign="center" color="secondary">
            Loading...
          </Typography>
        )}
        {debouncedSearchTerm.length > 0 ? (
          <VirtualizedList
            currentUser={currentUser}
            books={debouncedSearchTerm}
          />
        ) : (
          <Typography variant="h3" textAlign="center" color="error">
            No books found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
