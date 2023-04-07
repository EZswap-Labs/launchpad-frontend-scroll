import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { ToastContainer } from 'react-toastify';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  mainnet, polygon, goerli, scrollTestnet,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  createBrowserRouter, RouterProvider, Route, Routes, createHashRouter,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import BuyFromPool from './pages/BuyFromPool';
import { Box } from '@mui/material';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import watercolour from './assets/imgs/watercolour.png';
import Header from './components/Header';
import MyCollections from './pages/MyCollections';
import LiveCollections from './pages/LiveCollections';
import CreateCollection from './pages/CreateCollection';
import EditCollection from './pages/EditCollection';
import CollectionInfo from './pages/CollectionInfo';
import CustomAvatar from './components/CustomAvatar';

const { chains, provider } = configureChains(
  [scrollTestnet],
  // [mainnet, polygon, goerli],
  [
    alchemyProvider({ apiKey: 'eeb2JnW2JdlOkqPH6NZVhVpRSXKaSW8D' }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/mycollections',
    element: <MyCollections />,
  },
  {
    path: '/livecollections',
    element: <LiveCollections />,
  },
  {
    path: '/createCollection',
    element: <CreateCollection />,
  },
  {
    path: '/editCollection',
    element: <EditCollection />,
  },
  {
    path: '/collectionInfo',
    element: <CollectionInfo />,
  },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} avatar={CustomAvatar} theme={darkTheme()}>
        <Box sx={{
          background: `url(${watercolour}) no-repeat`,
          backgroundSize: '100% 100%',
        }}
        >
          <Header />
          <RouterProvider router={router} />
        </Box>
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
