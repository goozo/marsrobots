import React, { Component }  from 'react';
import { connect } from 'react-redux'; 
import { sendCommandValueChange } from 'actions';

export class RobotCommand extends Component {
  handleCommandChange(e){
    this.props.sendCommandValueChange(e.target.value.toUpperCase());
  }
  render(){ 
    const { commandValue } = this.props;

    return (
      <div>
        <textarea 
          value={commandValue.value}
          onChange={(e) => this.handleCommandChange(e)}
          style={{
            width:'100%',
            height:'200px',
            background: 'black',
            color:'#0f0',
            fontSize:'18px'
          }}/>
      </div>
    );
  }
}

const mapStateToProps = ({ commandValue }) => {
  return {
    commandValue
  }
};

export default connect(mapStateToProps, { sendCommandValueChange })(RobotCommand);