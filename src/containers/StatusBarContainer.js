import { connect } from 'react-redux'
import StatusBar from '../components/StatusBar'
import {
  addBlock
} from '../actions/BlockchainActions';

import {
  updateStore
} from '../actions/ConfigurationActions';

import {
  updateAccount
} from '../actions/WalletActions';

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    configuration: state.configuration,
    blockchain: state.blockchain
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBlock: (chain) => {
      dispatch(addBlock(chain))
    },
    updateStore: () => {
      dispatch(updateStore())
    },
    updateAccount: (account) => {
      dispatch(updateAccount(account))
    }
  }
}
 
const StatusBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBar)
 
export default StatusBarContainer
