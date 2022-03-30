import './App.css';
import { useMemo } from 'react';
import * as anchor from '@project-serum/anchor';

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

import { ThemeProvider, createTheme } from '@material-ui/core';
import Redeemer from './Redeemer';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const frcntProgramID = new anchor.web3.PublicKey('FrctRs3dZ7E234V5DMJLMUvnPkjANWQoaZDRm9rebjC2');
const frcntAccount = new anchor.web3.PublicKey('7295DAevXpceVy4yCccsdpCmewB27cgEvwWtT4eJ6T5h');
const donationAddress = new anchor.web3.PublicKey('BMNtP4gNVk4qDyxGUfj9YDn7DhRnzDX2vAq3yPhBo5Hu');
const connection = new anchor.web3.Connection(rpcHost
  ? rpcHost
  : anchor.web3.clusterApiUrl('devnet'));


const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Redeemer
              connection={connection}
              rpcHost={rpcHost}
              frcntrProgramId={frcntProgramID}
              frcntrAccount={frcntAccount}
              donationAddress={donationAddress}
            />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
