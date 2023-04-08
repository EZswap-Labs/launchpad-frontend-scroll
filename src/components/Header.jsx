import { useEffect } from 'react';
import {
  Typography, Box, Button, Link,
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { signIn } from '../service/account';
import { creatContractAddress, mintNFT, getNftBalance } from '../toolkit/transaction';

function Header() {
  const account = useAccount();
  useEffect(() => {
    if (!account?.address) {
      if (window?.location?.hash === '#/myCollections') {
        window.location.replace('/#/signup');
      }
      return;
    }
    const userString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userString);
    if (userInfo?.walletAddress === account?.address) {
      if (window?.location?.hash === '#/signup') {
        window.location.replace('/#/myCollections');
      }
    } else {
      signIn({ walletAddress: account?.address }).then((res) => {
        if (account?.address === res?.walletAddress) {
          localStorage.setItem('userInfo', JSON.stringify(res));
          window.location.replace('/#/myCollections');
          window.location.reload();
        }
      });
    }
  }, [account?.address]);
  return (
    <Box
      className="connect-btn"
      sx={{
        background: 'url(watercolour.png) no-repeat',
        backgroundSize: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 999,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        px: 4,
        py: 2,
        '.connect-button': {
          button: {
            background: '#000 !important',
            fontFamily: 'Georgia',
          },
        },
      }}
    >
      <Box>
        <Link
          href="/"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              background: 'rgba(0,0,0,0)',
              borderRadius: '50px',
              fontFamily: 'Georgia',
              color: '#000',
              mr: 4,
              '&:hover': {
                background: 'rgba(0,0,0,0)',
              },
            }}
            onClick={() => {
            // Router.push('/');
            }}
          >
            Art EZ
          </Button>
        </Link>
        <Link
          href="/#/livecollections"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              background: 'rgba(0,0,0,0)',
              borderRadius: '50px',
              fontFamily: 'Georgia',
              color: '#000',
              mr: 4,
              '&:hover': {
                background: 'rgba(0,0,0,0)',
              },
            }}
            onClick={() => {
            // Router.push('/collections');
            }}
          >
            Live Collections
          </Button>
        </Link>
        <Link
          href="/#/myCollections"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              background: 'rgba(0,0,0,0)',
              borderRadius: '50px',
              fontFamily: 'Georgia',
              color: '#000',
              mr: 4,
              '&:hover': {
                background: 'rgba(0,0,0,0)',
              },
            }}
            onClick={() => {
            // Router.push('/myCollections');
            }}
          >
            My Collections
          </Button>
        </Link>
      </Box>
      <Box className="connect-button" sx={{ mr: 10 }}>
        <ConnectButton label="Wallet" showBalance={false} />
      </Box>
    </Box>
  );
}

export default Header;
