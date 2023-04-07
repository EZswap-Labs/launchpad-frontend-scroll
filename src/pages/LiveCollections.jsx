import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { queryCollections } from '../service/collection';
import { CollectionStatus } from '../config/constant';

export default function MyCollections() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    queryCollections({}).then((res) => {
      setCollections(res);
    });
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
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{ width: '100%', mt: 8 }}
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
          Live Collection on Artez
        </Typography>
        <Grid
          container
          sx={{
            minHeight: '500px',
          }}
        >
          {collections?.map((c) => (
            <Grid item xs={4} key={c?.id}>
              <Box
                sx={{
                  background: '#fff',
                  mr: 2,
                  mt: 2,
                  p: 2,
                  cursor: 'pointer',
                  minHeight: '300px',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/collectionInfo?cid=${c?.id}`);
                }}
              >
                <Box sx={{
                  position: 'relative',
                }}
                >
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#eee',
                    minHeight: '200px',
                  }}
                  >
                    <Box
                      component="img"
                      src={c?.imgUrl}
                      alt="imgUrl"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Typography sx={{
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    p: 1,
                    fontSize: 20,
                    background: 'rgba(255,255,255,0.3)',
                    width: '100%',
                  }}
                  >
                    {c?.collectionName}
                  </Typography>
                </Box>
                <Box sx={{ px: 1, mt: 2 }}>
                  <Typography>
                    Status:
                    {' '}
                    {CollectionStatus[(c?.status || 1)]}
                  </Typography>
                  {/* <Typography>09/10/2000</Typography> */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
