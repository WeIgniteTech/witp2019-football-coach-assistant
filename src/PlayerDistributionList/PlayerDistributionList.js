import React from 'react'
import Board from 'react-trello'


let buttonStyle = {
    height: 50,
    width: 150,
    cursor: 'default',
    color: '#0000ff',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#a28f27',
    borderColor: '#796b1d',
    fontSize: '10px',
    lineHeight: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #ab9a3c',
    userSelect: 'RED',
    margin: '10px'
};

var playerCards=new Array();
const CustomCard = props => {
    return (
        <div>
            <header
                style={{
                    borderBottom: '1px solid #eee', paddingBottom: 6, marginBottom: 10,
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    color: props.cardColor
                }}
            >
                <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.name}</div>
                <div style={{fontSize: 11}}>{props.dueOn}</div>
            </header>
            <div style={{fontSize: 12, color: '#BD3B36'}}>
                <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>{props.subTitle}</div>
                <div style={{padding: '5px 0px'}}><i>{props.body}</i></div>
                <div style={{
                    marginTop: 10,
                    textAlign: 'center',
                    color: props.cardColor,
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    {props.escalationText}
                </div>
            </div>
        </div>
    )
}
export default class PlayerDistributionList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                lanes: [
                    {
                        id: 'lane1',
                        title: 'Attending Players',
                        cards: this.getAttendingPlayerCards(this.props.attendingPlayers)
                    }
                ]
            }

        };
    }

    getAttendingPlayerCards(attendingPlayers) {
        var attendingPlayerCards = [];
        const cardColor = '#BD3B36',
            cardStyle = {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15};
        console.log(attendingPlayers);
        Array.from(attendingPlayers).map(player => {
            attendingPlayerCards.push({id: player, title: player, cardColor: cardColor, cardStyle: cardStyle})
        });
        console.log("attending players", attendingPlayerCards);
        return attendingPlayerCards;
    }

    getTeamLines(lineNumber, players){
       var lines= ({id:'line'+lineNumber, tittle:'line'+lineNumber, cards:this.getPlayerCards(players)})
        return lines;
    }

    getPlayerCards(players){
        var attendingPlayerCards = [];
        const cardColor = '#BD3B36',
            cardStyle = {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15};
        console.log(players);
        players.map(player => {
            attendingPlayerCards.push({id: player, title: player, cardColor: cardColor, cardStyle: cardStyle})
        });
        console.log("attending players", attendingPlayerCards);
        return attendingPlayerCards;
    }

    distributePlayers(e, teamSize) {
     // Depending on the Team Size , set number of lines .
        console.log("in distributePlayers ");
        var attendingPlayers2=Array.from(this.props.attendingPlayers);
        var selectedPlayers = new Array();
        var lines= new Array();
        var alreadySelectedPlayers= new Array();
        var numberOfLines =Math.floor(attendingPlayers2.length/teamSize)
        console.log("numberofLines", numberOfLines);
        if(numberOfLines>=0){
            console.log("numberofLines greater than zero", numberOfLines);
            var selectedPlayers2 = this.getRandom(attendingPlayers2, teamSize, alreadySelectedPlayers);
           Array.prototype.push.apply(alreadySelectedPlayers,selectedPlayers2);
            console.log("selectedPlayers", selectedPlayers2)
            lines.push(this.getTeamLines(numberOfLines,selectedPlayers2));
            while (numberOfLines--){
                console.log("in While loop", numberOfLines);
                var remainingPlayers =new Array();
                attendingPlayers2.map(player=> {
                    if(!alreadySelectedPlayers.includes(player)){
                        remainingPlayers.push(player)
                    }
                })
                var choosenPlayers = this.getRandom(remainingPlayers,teamSize, alreadySelectedPlayers);
                Array.prototype.push.apply(alreadySelectedPlayers,choosenPlayers);
                lines.push( this.getTeamLines(numberOfLines,choosenPlayers));

            }
        }
        this.setState({
            data:{lanes:lines}
        })

    }
    getRandom(attendingPlayers, teamSize, alreadySelectedPlayers) {
        var result = new Set();
        while(teamSize--){

            var randomItem = attendingPlayers[Math.floor(Math.random()*attendingPlayers.length)];
            if(alreadySelectedPlayers.includes(randomItem)){
                teamSize++;
            }else{
            result.add(randomItem);
            }
        }
         console.log("Random players", result);
        return Array.from(result);
    }
    render() {
        return (
            <div>
                <div className="btn-group">
                    <button type="button" key="3"  onClick={event => this.distributePlayers(event, 3)} className="btn btn-default" style={buttonStyle}>3 member Teams
                    </button>
                    <button type="button" key="5" className="btn btn-default" style={buttonStyle} onClick={event => this.distributePlayers(event, 5)}>5 Member Teams
                    </button>
                </div>
                <Board data={this.state.data} customCardLayout>
                    <CustomCard/>
                </Board>
            </div>
        )
    }
}