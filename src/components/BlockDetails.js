import React, { Component } from 'react';
import BitcoinCash from '../utilities/BitcoinCash'
import {
  withRouter,
  Redirect
} from 'react-router-dom';

import Bitcoin from 'bitcoinjs-lib';
import moment from 'moment';
import underscore from 'underscore';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';

class BlockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleRedirect() {
    this.setState({
      redirect: true
    })
  }

  handlexTransactionDetails(transaction) {
    this.setState({
      transaction: transaction,
      redirect: true
    })
  }

  calculateOutputs(tx) {
    let sum = 0;

    for (let index = 0; index < tx.vout.length; index++) {
      sum += tx.vout[index].value;
    }

    return sum;
  }

  render() {
    const blockId = this.props.match.params.block_id

    let block = underscore.findWhere(this.props.blockchain.chain, {
      height: +blockId
    });

    if (this.state.redirect && this.state.transaction) {
      return (<Redirect to={{
        pathname: `/blocks/${blockId}/transactions/${this.state.transaction.txid}`
      }} />)
    } else if (this.state.redirect) {
      return (<Redirect to={{
        pathname: `/blocks`
      }} />)
    }

    let txs = [];
    block.tx.forEach((tx, idx) => {
      let ins = [];
      let outs = [];

      tx.vin.forEach((input, index) => {
        ins.push(
            <li key={index}>
              <pre>
                <code>
                {JSON.stringify(input, null, 2)}
                </code>
              </pre>
            </li>
        );
      });

      tx.vout.forEach((output, index) => {
        outs.push(
        <li key={index}>
            <pre>
              <code>
                {JSON.stringify(output, null, 2)}
              </code>
            </pre>
          </li>
        );
      })

      /**
       * <td>VALUE <br />{this.calculateOutputs(tx)} BCH</td>
       */

        txs.push(
        <tbody key={idx} className="txSummary" onClick={this.handlexTransactionDetails.bind(this, tx)}>
          <tr className="tableFormatting">
            <td><span className='subheader'>TX HASH</span> <br />{tx.txid}</td>
            <td></td>
            <td></td>
            <td className="label coinbase">COINBASE</td>
          </tr>
          <tr>
            <td>INPUTS <br /><ul>{ins}</ul></td>
            <td>OUTPUTS <br /><ul>{outs}</ul></td>
            
            <td>DATE <br />{moment(tx.time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</td>
          </tr>
        </tbody>
      );
    });

    return (
      <div className="WrapperBlockDetails">
        <table className="pure-table DetailsHeader">
          <tbody>
            <tr className="">
              <td className='important nextPage' onClick={this.handleRedirect.bind(this)}><FontAwesomeIcon icon={faArrowLeft} /> <span className='subheader'>BACK</span></td>
              <td className='important'>BLOCK {block.height}</td>
            </tr>
          </tbody>
        </table>
        <table className="pure-table tableFormatting">
          <tbody>
            <tr>
              <td><span className='subheader'>BLOCK HASH</span> <br />{block.header}</td>
            </tr>
            <tr>
              <td>HASHPREVBLOCK <br />{block.previousblockhash}</td>
              <td>MINED ON <br />{moment(block.time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>TX COUNT <br />{block.tx.length}</td>
              <td>DIFFICULTY <br />0</td>
              <td>NONCE <br />0</td>
            </tr>
          </tbody>
        </table>
        <table className="pure-table tableFormatting nextPage">
          {txs}
        </table>
      </div>
    );
  }
}

export default withRouter(BlockDetails);
