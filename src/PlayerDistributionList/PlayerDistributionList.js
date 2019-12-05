import React from 'react'
import Board from 'react-trello'

let teamNames= ['Black Eagles',
    'Banana Slugs',
    'Preachers',
    'Fighting Cardinals',
    'The Predators',
    'Razorbacks',
    'Rebels',
    'Fighting Crusaders'];

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
                        id: 'Attending Players',
                        title: 'Attending Players',
                        cards: this.getAttendingPlayerCards(this.props.attendingPlayers)
                    }
                ]
            },
            errorMsg: ""

        };
    }

    getAttendingPlayerCards(attendingPlayers) {
        var attendingPlayerCards = [];
        const cardColor = '#BD3B36',
            cardStyle = {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15};
        Array.from(attendingPlayers).map(player => {
            attendingPlayerCards.push({id: player, title: player, cardColor: cardColor, cardStyle: cardStyle})
        });
        return attendingPlayerCards;
    }

    getTeamLines(lineNumber, players) {
        var lines = ({id: 'Team' + lineNumber, title: lineNumber, cards: this.getPlayerCards(players)});
        return lines;
    }

    getPlayerCards(players) {
        var attendingPlayerCards = [];
        const cardColor = '#BD3B36',
            cardStyle = {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15};
        players.map(player => {
            attendingPlayerCards.push({id: player, title: player, cardColor: cardColor, cardStyle: cardStyle})
        });
        return attendingPlayerCards;
    }

    getRandomTeamNames(numberOfTeams){
        let result=new Set();
        while (numberOfTeams) {
            let randomItem = teamNames[Math.floor(Math.random() * teamNames.length)];
            if (!result.has(randomItem)) {
                console.log("itemFound", randomItem)
                numberOfTeams = numberOfTeams - 1;
                result.add(randomItem);
            }
        }
        return Array.from(result);
    }

    distributePlayers(e, teamSize) {
        this.setState({errorMsg: null});
        let attendingPlayers = Array.from(this.props.attendingPlayers);
        let lanes = [];
        let numberOfLines = Math.floor(attendingPlayers.length / teamSize);
        console.log("", numberOfLines);
        let alreadySelectedPlayers = new Set();
        // Choose players in random depending on the team size
        let selectedPlayers = this.getRandom(attendingPlayers, teamSize);

        if (selectedPlayers.length == 0) {
            this.setState({errorMsg: 'Chosen Team size ' + teamSize + ', is more than attending Players ' + attendingPlayers.length,
                data: {
                    lanes: [
                        {
                            id: 'Attending Players',
                            title: 'Attending Players',
                            cards: this.getAttendingPlayerCards(attendingPlayers)
                        }
                    ]
                }});
            return;
        }

        //This Step will help us to identify remaining players, after the first selection .
        selectedPlayers.map(player => {
            alreadySelectedPlayers.add(player)
        });

        let teamNames= this.getRandomTeamNames(numberOfLines);
        lanes.push(this.getTeamLines(teamNames[0], selectedPlayers));

        if(attendingPlayers.length-selectedPlayers.length < teamSize){
            console.log('in If condition for remaining players ')
            var remainingPlayers=[];
            attendingPlayers.map(player => {
                if (!alreadySelectedPlayers.has(player)) {
                    remainingPlayers.push(player)
                }

            })
            lanes.push(this.getTeamLines('Remaining Players', remainingPlayers));
        }
        numberOfLines = numberOfLines - 1;
       while (numberOfLines > 0) {
           let teamName= teamNames[numberOfLines];
           console.log("in While loop", numberOfLines);
            let remainingPlayers = [];
             //Find remaining players, based on based on the attending players , and already selected players.
            attendingPlayers.map(player => {
                if (!alreadySelectedPlayers.has(player)) {
                    remainingPlayers.push(player)
                }
            })
             if(remainingPlayers.length!==0 && teamSize > remainingPlayers.length){
                 // Remaining players won't able to form a team on their own . These are left as unselected Players
                 lanes.push(this.getTeamLines('Remaining Players', remainingPlayers));
                 break;
             }
            let chosenPlayers = this.getRandom(remainingPlayers, teamSize);

            chosenPlayers.map(player => {
                alreadySelectedPlayers.add(player)
            });

           lanes.push(this.getTeamLines(teamName, chosenPlayers));
           console.log("lines", lanes);
           numberOfLines = numberOfLines - 1;
        }
        console.log(lanes);
        this.setState({
            data: {lanes: lanes}
        })

    }

    getRandom(attendingPlayers, teamSize) {
        var result = new Set();
        if (teamSize > attendingPlayers.length) {
            return [];
        }
        while (teamSize) {
            var randomItem = attendingPlayers[Math.floor(Math.random() * attendingPlayers.length)];
            console.log("random Item", randomItem)
            if (!result.has(randomItem)) {
                console.log("itemFound", randomItem)
                teamSize = teamSize - 1;
                result.add(randomItem);
            }
        }
        return Array.from(result);
    }


    render() {
        return (
            <div>
                <div className="btn-group">
                    <button type="button" key="3" onClick={event => this.distributePlayers(event, 3)}
                            className="btn btn-default" style={buttonStyle}>3 member Teams
                    </button>
                    <button type="button" key="5" className="btn btn-default" style={buttonStyle}
                            onClick={event => this.distributePlayers(event, 5)}>5 Member Teams
                    </button>
                </div>
                <div>{this.state.errorMsg ? <span
                    style={{fontSize: 14, fontWeight: 'bold', color: 'RED'}}>{this.state.errorMsg}</span> : null}</div>
                <Board data={this.state.data} customCardLayout>
                    <CustomCard/>
                </Board>
            </div>
        )
    }
}