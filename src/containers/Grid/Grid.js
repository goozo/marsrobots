import React, { Component }  from 'react';
import { connect } from 'react-redux';

export class Grid extends Component {

  getRobotDirectionInDegrees(direction){
    switch(direction){
      case 'N': 
        return '270';
      case 'E': 
        return '0';
      case 'S': 
        return '90';
      case 'W': 
        return '180';
      default:
        return '0';
    }
  }

  render(){ 
    const { grid } = this.props;

    if(!grid || !grid.arrays){
      return null;
    }

    const gridElements =  grid.arrays.map((x,xCoord) => {
      return (<div 
        key={xCoord} 
        style={{width: '50px', display:'inline-block'}}
        className="grid-column">
          { 
            [...x].reverse().map((y , yCoord) => {
              return (<div 
                key={yCoord} 
                style={{postion: 'relative', width: '50px', height: '50px', background:'#A00', border:'1px solid #fff'}}
                className="grid-square">
                { y.robotsAtPosition ? y.robotsAtPosition.map((robot,i) => {
                    return (
                      <div
                        key={i}
                        className="robot"
                        style={{
                          width: '50px',
                          height: '50px',
                          position: 'absolute',
                          backgroundImage: robot.lostAtLocation ? 'url("/static/images/marsroverLost.svg")' : 'url("/static/images/marsrover.svg")',
                          transform: 'rotate(' + this.getRobotDirectionInDegrees(robot.direction) + 'deg)'
                        }}
                      >
                      </div>
                    )
                  }) : null 
                }
              </div>)
            })
          } 
      </div>);
    });
    
    return (
      <div className="grid" style={{display:'inline-block'}}>
        { gridElements }
      </div>
    );
  }
}

const mapStateToProps = ({ grid }) => {
  return {
    grid
  };
};

export default connect(mapStateToProps)(Grid);