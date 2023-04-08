import { useEffect, useState } from 'react';
import {
  Grid, Container, Typography, Box, TextField, Button,
} from '@mui/material';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { queryCollections } from '../service/collection';
import { mintNFT } from '../toolkit/transaction';
import { CollectionStatusMap } from '../config/constant';

const isShowMintBtn = (collection) => {
  const { publicStartTime, publicEndTime, status } = collection;
  if (status === CollectionStatusMap?.Draft) {
    return 'Status: Draft';
  }
  const now = Date.now();
  if (now >= publicStartTime && now <= publicEndTime) {
    return 'minting';
  }
  if (now < publicStartTime) {
    return `Start at: ${dayjs(publicStartTime).format('lll')}`;
  }
  if (now > publicEndTime) {
    return `Ended at: ${dayjs(publicEndTime).format('lll')}`;
  }
  return '';
};

export default function CollectionInfo() {
  const [collection, setCollection] = useState({});
  const [mintCount, setMintCount] = useState(0);
  const account = useAccount();

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
                {collection?.userAccount?.userLogo ? (
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
                ) : (
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#eee',
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
                  }}
                >
                  {collection?.userAccount?.userName || 'userName'}
                </Typography>
              </Box>
              {/* <Typography variant="body1" component="p" gutterBottom sx={{ textAlign: 'left' }}>
                9999 Minted
              </Typography> */}
              <Typography variant="body1" component="p" gutterBottom sx={{ textAlign: 'left' }}>
                {collection?.description}
              </Typography>
              {isShowMintBtn(collection) === 'minting' ? (
                <Box sx={{
                  mt: 4,
                }}
                >
                  <TextField
                    label="Mint Count"
                    value={mintCount}
                    onChange={(e) => {
                      setMintCount(e?.target?.value);
                    }}
                    type="number"
                    variant="outlined"
                    sx={{ mr: 2, width: 200 }}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      background: '#fff',
                      fontFamily: 'Georgia',
                      color: '#000',
                      mt: 2,
                      '&:hover': {
                        background: '#fff',
                      },
                    }}
                    onClick={() => {
                      if (mintCount <= 0) {
                        toast.warning('please fill mint count');
                        return;
                      }
                      if (!collection?.contractAddress) {
                        toast.warning('contractAddress Not yet deployed');
                        return;
                      }
                      mintNFT({
                        erc1155Address: collection?.contractAddress,
                        userAddress: account?.address,
                        count: mintCount,
                        tokenId: 1,
                      });
                    }}
                  >
                    Mint
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    mt: 2,
                    fontFamily: 'Georgia',
                    fontSize: 20,
                  }}
                >
                  {isShowMintBtn(collection)}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
