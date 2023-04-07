import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Link } from '@mui/material';
// import Router from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Link from '../src/components/Link';
// import { useLocalStorage } from '../src/hooks/useStorage';

export default function Home() {
  // const [userInfo, setUserInfo, removeUserInfo] = useLocalStorage('userInfo', {});
  const [userInfo, setUserInfo] = useState({ id: '' });
  useEffect(() => {
    const userString = localStorage.getItem('userInfo');
    const info = JSON.parse(userString);
    setUserInfo(info);
  }, []);
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          height: 200,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'Georgia',
            fontSize: 60,
          }}
        >
          Create your Own Open Edition with Artez
        </Typography>
        <Link
          href="/#/signup"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontFamily: 'Georgia',
              fontSize: 32,
              background: '#fff',
              color: '#000',
              borderRadius: '50px',
              px: 4,
              my: 4,
              '&:hover': {
                background: '#fff',
                color: '#000',
              },
            }}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 40 }} />}
            onClick={() => {
            // Router.push(userInfo?.id ? '/myCollections' : '/signup');
            }}
          >
            Get Started
          </Button>
        </Link>

        <Box>
          <Link
            href="/#/livecollections"
            color="secondary"
            sx={{
              display: 'inline-block',
              mt: 2,
              fontFamily: 'Georgia',
              color: '#000',
              fontSize: 20,
              textDecoration: 'none',
              borderBottom: '1px solid black',
            }}
          >
            View Live Collections on Artez
            <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
