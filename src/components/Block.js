import React, { Component } from 'react';
import moment from 'moment';
import {
  Redirect,
  withRouter
} from 'react-router-dom';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  handleRedirect() {
    this.setState({
      redirect: true
    });
  }

  render() {
    const block = this.props.block;
    const date = new Date(block.time * 1000);

    if(this.state.redirect) {
      return (<Redirect to={{
        pathname: `/blocks/${block.height}`
      }} />)
    }

    return (
      <tr className="Block" onClick={this.handleRedirect.bind(this)}>
        <td className='important'><span className='subheader'>HEIGHT</span> <br />{block.height}</td>
        <td><span className='subheader'>MINED ON</span> <br />{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td><span className='subheader'>HASH</span> <br />{block.hash}</td>
        <td><span className='subheader'>TX COUNT</span> <br />{block.tx.length}</td>
      </tr>
    );
  }
}

export default withRouter(Block);
