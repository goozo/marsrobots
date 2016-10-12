import React, { Component }  from 'react';
import { RobotCommand, Grid } from 'containers';

class App extends Component {
  render(){ 
    return (
      <div>
        <RobotCommand />
        <Grid />
      </div>
    );
  }
}

export default App;