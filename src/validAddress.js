const { Web3 } = require("web3");

const isValidWalletAddress = (walletAddress) => {
  try {
    const web3 = new Web3();
    web3.utils.toChecksumAddress(walletAddress);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { isValidWalletAddress };
