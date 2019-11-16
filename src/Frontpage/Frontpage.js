import * as React from 'react';
import './Frontpage.css';
import DisplayDate from '../DisplayDate/DisplayDate'
import CanClass from '../CanvasClass/CanClass';

const Frontpage = (props) => {
  const players= [
    {name: 'Thomas'},
    {name: 'Boushra'},
    {name: 'Gayathri'},
    {name: 'Tahir'},
    {name: 'Vinh'},
    {name: 'Ingar'},
    {name: 'Mary'},
    {name: 'Irlend'},
    {name: 'Maha'},
    {name: 'Yusuf'}
  ]
    
  const showPlayer = () =>{
    let i=0
    let index=0
    let canvas_list=players.map(player=><CanClass playerName={player.name} key={player.name}/>)
    let players_show_list=[]
    //console.log(players.length)
    
    if(players.length%3===0){
      while(i<(players.length/3))
      {console.log(players.length)
        players_show_list.push(<tr key={i}><td>{canvas_list[index]}</td><td>{canvas_list[index+1]}</td><td>{canvas_list[index+2]}</td></tr>)
        index=index+3
        i=i+1
      }
    }
    
    else if(players.length%3===1){
      while(i<(players.length/3))
      {
        players_show_list.push(<tr key={i}><td>{canvas_list[index]}</td><td>{canvas_list[index+1]}</td><td>{canvas_list[index+2]}</td></tr>)
        index=index+3
        i++
      }
        players_show_list.push(<tr key={i}><td>{canvas_list[index]}</td></tr>)
    }
    else
    {    while(i<(players.length/3))
      {
        players_show_list.push(<tr key={i}><td>{canvas_list[index]}</td><td>{canvas_list[index+1]}</td><td>{canvas_list[index+2]}</td></tr>)
        index=index+3
        i++
      }
      players_show_list.push(<tr key={i}><td>{canvas_list[index]}</td><td>{canvas_list[index+1]}</td></tr>)
   }

    return(
    <tbody>
      {players_show_list}
    </tbody>
    )
  }
    return (
        <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
          <DisplayDate/>
        </header>
        <div className="Canvas-Styling">
          <table cellPadding="0">
          {showPlayer()}
          </table>
          </div>
        
      </div>
    );
};

export default Frontpage;
