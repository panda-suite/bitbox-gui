const { BCH, HttpProvider } = require('bchjs');

const httpBlockchainProvider = new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
const httpWalletProvider = new HttpProvider('http://localhost:48333', 'regtest', 'regtest');
const bch = new BCH(httpBlockchainProvider, httpWalletProvider);

export const getBlocks = async () => {
    let lastHash = await bch.rpc.getbestblockhash();

    const blocks = [];

    while (lastHash) {
        const block = await bch.rpc.getblock(lastHash, true, true);

        blocks.push(block);

        lastHash = block.previousblockhash;
    }

    return blocks;
};

export const rpc = bch.rpc;
