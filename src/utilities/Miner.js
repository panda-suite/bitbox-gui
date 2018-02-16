import BitcoinCash from './BitcoinCash'
import Bitcoin from 'bitcoinjs-lib';
import Block from '../models/Block';


class Miner {
  constructor(blockchain, utxoSet, network) {
    this.blockchain = blockchain;
    this.utxoSet = utxoSet;
    this.network = network;
  }

  pushGenesisTx(rawHex) {
    let t = BitcoinCash.transaction();
    let decodedTx = t.fromHex(rawHex);
    let a = BitcoinCash.address();

    decodedTx.outs.forEach((output, index) => {
      let outputPubKey = a.fromOutputScript(output.script, Bitcoin.networks[this.network]);
      this.utxoSet.addUtxo(outputPubKey, output.value);
    })

    this.mineBlock([{
      rawHex: rawHex,
      timestamp: Date.now()
    }], 0);
  }

  mineBlock(transactions, index) {
    this.blockchain.addBlock(new Block({
      transactions: transactions,
      index: index
    }));
  }
}

export default Miner;
