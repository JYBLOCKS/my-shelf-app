import { Book } from '@/models/Book';
import { User } from '@/models/User';
import { Favorite, FavoriteBorder, ForumRounded } from '@mui/icons-material';
import { Card, IconButton, Rating, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const BookCard = ({ book, currentUser }: { book: Book; currentUser: User }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    book?.favorites?.some((fav) => fav.userId === currentUser.id) || false,
  );
  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };
  const handleGoTo = () => {
    navigate(`/books/${book.id}`);
  };
  return (
    <Card
      sx={{
        borderRadius: 2,
        width: { xs: '47.5%', md: 240 },
        position: 'relative',
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 0,
      }}
    >
      <IconButton
        aria-label="add to favorites"
        onClick={handleFavoriteToggle}
        sx={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 8,
          right: 8,
          boxShadow: 10,
          ':hover': { backgroundColor: 'white', filter: 'brightness(90%)' },
          zIndex: 1000,
        }}
      >
        {isFavorite ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder color="primary" />
        )}
      </IconButton>
      <img
        src={book?.cover}
        alt={book?.title}
        onClick={handleGoTo}
        style={{
          width: '100%',
          borderRadius: '4px 4px 0 0',
          cursor: 'pointer',
        }}
      />
      <Stack p={1}>
        <Typography
          variant="h6"
          onClick={handleGoTo}
          sx={{ cursor: 'pointer' }}
        >
          {book?.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {book?.author}
        </Typography>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'end'}
        >
          <Stack direction="column" spacing={1} my={2}>
            <Typography variant="body2" color="text.secondary">
              {t('book.yourRating')}
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={book?.ratings?.average}
              precision={0.5}
            />
          </Stack>

          <Stack
            direction={'column'}
            alignItems="center"
            my={2}
          >
            <ForumRounded color="primary" />
            <Typography variant="body2" fontWeight={'bold'}>
              {book?.comments?.length}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default BookCard;
