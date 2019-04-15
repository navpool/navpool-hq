import React, {Component} from 'react';

class StatusBar extends Component {
  className() {
    return "status status-"+this.props.level;
  }

  render() {
    return (
      <div className={this.className()}>
          Votes counted for block 10,258 of 20,160 in the 151st block cycle.<br/>
          There are 9,902 blocks remaining.
      </div>
    )
  }
}

export default StatusBar;