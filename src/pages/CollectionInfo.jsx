import { useEffect, useState } from 'react';
import {
  Grid, Container, Typography, Box,
} from '@mui/material';
import { queryCollections } from '../service/collection';

export default function CollectionInfo() {
  const [collection, setCollection] = useState({});
  useEffect(() => {
    const cid = window?.location?.hash?.split('?cid=')?.[1];
    if (cid) {
      queryCollections({ id: cid }).then((res) => {
        setCollection(res?.[0] || {});
      });
    }
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
        sx={{ width: '100%' }}
      >
        <Grid container>
          <Grid item xs={5}>
            <Box sx={{
              p: 1, background: '#fff', display: 'flex', justifyContent: 'center', minHeight: 400,
            }}
            >
              <Box
                component="img"
                src={collection?.imgUrl}
                alt="test"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 400,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ p: 4, border: '1px solid #fff', ml: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>{collection?.collectionName}</Typography>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                my: 2,
              }}
              >
                <Box
                  component="img"
                  src={collection?.userAccount?.userLogo}
                  alt="test"
                  sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{
                    textAlign: 'left',
                    ml: 2,
                  }}
                >
                  {collection?.userAccount?.userName || 'userName'}
                </Typography>
              </Box>
              <Typography variant="body1" component="p" gutterBottom sx={{ textAlign: 'left' }}>
                9999 Minted
              </Typography>
              <Typography variant="body1" component="p" gutterBottom sx={{ textAlign: 'left' }}>
                {collection?.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
