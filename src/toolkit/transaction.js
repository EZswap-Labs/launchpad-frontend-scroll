import { ethers, utils } from 'ethers';
import { toast } from 'react-toastify';
import ERC1155Token from '../ABI/ERC1155Token.json';
import Factory from '../ABI/Factory.json';

const factoryAddress = '0x37e80d168E67578AD330a44E3b6dEaBdfC22F5b2';

export const creatContractAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(factoryAddress, Factory, signer);
  let erc1155 = await factory.createERC1155Token('https://api.frank.hk/api/nft/demo/1155/marvel/{id}.json');
  erc1155 = await erc1155.wait();
  const erc1155Address = (await erc1155.events.filter((item) => item.event === 'createERC1155'))?.[0]?.args?.[0];
  console.log('erc1155Address', erc1155Address);
  return erc1155Address;
};

export const mintNFT = async ({
  erc1155Address, userAddress, count = 100, tokenId = 1,
}) => {
  if (!userAddress) {
    return;
  }
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(factoryAddress, Factory, signer);
  // const value = { value: utils?.parseEther('0.01') };
  const mintTx = await factory.mint(
    erc1155Address,
    tokenId,
    count,
    userAddress,
  );
  await mintTx.wait();
  toast.success('Mint successfully');
  // return erc1155Address;
};

// export const getNftBalance = async (userAddress) => {
//   const provider = new ethers.providers.Web3Provider(window?.ethereum);
//   const signer = provider.getSigner();
//   const erc1155Contract = new ethers.Contract(erc1155Address, ERC1155Token).connect(signer);
//   console.log('nft balance', await erc1155Contract.balanceOf(userAddress, 1));
//   // return erc1155Address;
// };
