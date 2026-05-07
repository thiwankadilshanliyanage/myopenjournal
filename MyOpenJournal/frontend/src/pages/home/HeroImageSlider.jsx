import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200',
    title: 'Japan Lifestyle',
    text: 'Stories about daily life, travel, culture, and personal growth.'
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200',
    title: 'Calm Reading',
    text: 'A peaceful place to read meaningful thoughts and experiences.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
    title: 'Tech & Ideas',
    text: 'Write, learn, and share ideas with a modern blog experience.'
  }
];

export default function HeroImageSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, md: 380 },
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 22px 70px rgba(0,0,0,0.22)'
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.title}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: active === index ? 1 : 0,
            transition: 'opacity 900ms ease'
          }}
        >
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: active === index ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 3500ms ease'
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.68))'
            }}
          />

          <Stack
            spacing={1}
            sx={{
              position: 'absolute',
              left: { xs: 20, md: 28 },
              right: { xs: 20, md: 28 },
              bottom: { xs: 20, md: 28 },
              color: '#fff'
            }}
          >
            <Typography variant="h5" fontWeight={900}>
              {slide.title}
            </Typography>
            <Typography sx={{ opacity: 0.92, lineHeight: 1.7 }}>
              {slide.text}
            </Typography>
          </Stack>
        </Box>
      ))}

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          right: 22,
          top: 22
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActive(index)}
            sx={{
              width: active === index ? 26 : 8,
              height: 8,
              borderRadius: 99,
              bgcolor: active === index ? '#fff' : 'rgba(255,255,255,0.55)',
              cursor: 'pointer',
              transition: 'all 250ms ease'
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}