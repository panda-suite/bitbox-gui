import {
  CREATE_BLOCKCHAIN,
  ADD_BLOCK,
  SYNC_BLOCKCHAIN
} from '../actions/BlockchainActions';
import Blockchain from '../models/Blockchain';

export default function convert(state = null, action) {
  switch (action.type) {
    case CREATE_BLOCKCHAIN:
      return Object.assign({}, state, new Blockchain())

    case ADD_BLOCK:
      return Object.assign({}, state, action.chain)

    case SYNC_BLOCKCHAIN:
      return Object.assign({}, state, action.chain)

    default:
      return state
  }
}
