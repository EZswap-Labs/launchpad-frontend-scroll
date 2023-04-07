import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { queryCollections, updateCollection } from '../service/collection';
import { CollectionStatus, CollectionStatusMap } from '../config/constant';
import CustomizedMenus from '../components/CustomizedMenus';
import ResponsiveDialog from '../components/ResponsiveDialog';

export default function MyCollections() {
  const account = useAccount();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);
  const [seletedId, setSeletedId] = useState(-1);
  const [option, setOption] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('userInfo');
    const info = JSON.parse(userString);
    if (info?.walletAddress === account?.address) {
      // logined get List
      setUserInfo(info);
      queryCollections({ userId: info?.id }).then((res) => {
        setCollections(res);
      });
    } else {
      navigate('/signup');
    }
  }, []);
  useEffect(() => {
    if (seletedId && seletedId !== -1 && option === 'delete') {
      setOpen(true);
    } else {
      setOpen(false);
    }
    if (seletedId && seletedId !== -1 && option === 'edit') {
      console.log('edit', seletedId);
      navigate(`/editCollection?cid=${seletedId}`);
    }
  }, [seletedId]);

  const handleDelete = async () => {
    if (seletedId && seletedId !== -1) {
      try {
        const res = await updateCollection({
          id: seletedId,
          status: CollectionStatusMap?.Deleted,
        });
        if (res === 'success') {
          toast.success('Collection Deleted');
          setCollections(collections.filter((item) => (item.id !== seletedId)));
          setSeletedId(-1);
        }
      } catch (error) {
        console.log('error');
      }
    }
  };

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
      {userInfo ? (
        <Box
          sx={{ width: '100%' }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            my: 2,
          }}
          >
            {userInfo?.userLogo ? (
              <Box
                component="img"
                src={userInfo?.userLogo}
                alt="userLogo"
                sx={{
                  width: '114px',
                  height: '114px',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '114px',
                  height: '114px',
                  borderRadius: '50%',
                  background: '#ddd',
                }}
              />
            )}

            <Typography
              variant="body1"
              component="p"
              gutterBottom
              sx={{
                textAlign: 'left',
                ml: 2,
                fontSize: '30px',
              }}
            >
              {userInfo?.userName}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            my: 2,
          }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>Your open edition collections</Typography>
            <Button
              sx={{
                background: '#000',
                color: '#fff',
                mr: 2,
                '&:hover': {
                  backgroundColor: '#000',
                  color: '#fff',
                },
              }}
              onClick={() => {
                navigate('/createCollection');
              }}
            >
              Create New
            </Button>
          </Box>
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
                    borderRadius: '8px',
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
                      borderRadius: '8px',
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
                    <Box sx={{
                      position: 'absolute',
                      top: 2,
                      right: 4,
                    }}
                    >
                      <CustomizedMenus
                        id={c?.id}
                        setSeletedId={setSeletedId}
                        setOption={setOption}
                      />
                    </Box>
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
      ) : null}
      <ResponsiveDialog setOpen={setOpen} open={open} handleComfirm={handleDelete} />
    </Container>
  );
}
