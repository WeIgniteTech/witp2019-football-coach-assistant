import React from 'react'

class CanClass extends React.Component {
    componentDidMount() {
      const canvas = this.refs.canvas
      const ctx = canvas.getContext("2d")
      const img = this.refs.image
      ctx.fillStyle = "#3ab2d6";
      ctx.fillRect(0,0,200,90)
      ctx.fillStyle = "#c4d7dd";
      ctx.font = "20px Courier"
      ctx.fillText(this.props.playerName, 50, 50)
      
    }
    render() {
        
      return(
        <div>
          <canvas ref="canvas" width={200} height={100}/>
          
        </div>
      )
    }
  }
  export default CanClass