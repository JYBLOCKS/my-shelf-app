import { BookCard } from '@/components/cards';
import { Book } from '@/models/Book';
import { User } from '@/models/User';
import { ArrowUpwardRounded } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// Extra para suavizar scroll

export default function VirtualizedList({
  currentUser,
  books,
}: {
  currentUser: User;
  books: Book[];
}) {
  const itemsPerPage = 20;
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const [scrollToTop, setScrollToTop] = useState(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const height = document.documentElement.offsetHeight;
    if (windowHeight + scrollTop + 1 >= height) {
      setScrollToTop(scrollTop);
      setDisplayedItems((prev) => prev + itemsPerPage);
    }
    if (scrollTop === 0) {
      setScrollToTop(scrollTop);
      setDisplayedItems(itemsPerPage);
    }
  };

  const visibleItems = books.slice(0, displayedItems);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap={2} position={'relative'}>
      {visibleItems.map((item) => (
        <BookCard key={item.id} book={item} currentUser={currentUser} />
      ))}
      {scrollToTop > 1000 && (
        <IconButton
          onClick={() => handleGoToTop()}
          sx={{
            position: 'fixed',
            bottom: '50%',
            right: 16,
            backgroundColor: 'rgba(82, 82, 82, 0.7)',
            backdropFilter: 'blur(4px)',
            ':hover': { backgroundColor: 'rgba(82, 82, 82, 0.9)' },
            animation: 'pulse 2s ease-out infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1.1)',
              },
              '50%': {
                transform: 'scale(1.2)',
              },
              '100%': {
                transform: 'scale(1.3)',
              },
            },
          }}
        >
          <ArrowUpwardRounded sx={{ color: 'white' }} fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
}
