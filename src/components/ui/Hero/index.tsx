import bgImage from '@/assets/books-collection.jpg';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { t } from 'i18next';

function Hero() {
  return (
    <Stack
      width={{ xs: "95%", md: "80%" }}
      height="13rem"
      m="auto"
      mt={4}
      borderRadius="8px"
      position="relative"
    >
      <img
        width="100%"
        height="100%"
        src={bgImage}
        alt="Welcome to My Shelf"
        style={{
          objectFit: 'cover',
          borderRadius: '20px',
          boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.2)',
          filter: 'brightness(0.4)',
        }}
      />

      <Stack
        textAlign={'center'}
        width={'100%'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h3" fontWeight={'bold'} color="white" mb={2}>
          {t('hero.title')}
        </Typography>
        <Typography variant="h6" color="white">
          {t('hero.description')}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Hero;
