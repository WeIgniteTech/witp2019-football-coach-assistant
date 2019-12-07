import React from 'react'
import Board from 'react-trello'
import '../index.css'

let teamNames = [{
    name: "Black Eagles",
    color: "#FF0000",
    cardColor: "#FFB3B3"
},
    {
        name: "Banana Slugs",
        color: "#FFA500",
        cardColor: "#FFE4B3"
    },
    {
        name: "Preachers",
        color: "#4d3319",
        cardColor: "#ecd9c6"
    },
    {
        name: "Fighting Cardinals",
        color: "#660029",
        cardColor: "#ff80b3"
    },
    {
        name: "The Predators",
        color: "#0000FF",
        cardColor: "#B3B3FF"
    },
    {
        name: "Razorbacks",
        color: "#800080",
        cardColor: "#FFB3FF"
    },
    {
        name: "Rebels",
        color: "#A52A2A",
        cardColor: "#EFC2C2"
    },
    {
        name: "Fighting Crusaders",
        color: "#4B0082",
        cardColor: "#DFB3FF"
    }];

let remainingPlayersTeamDetails =
    {
        name: "Remaining Players",
        color: "#008000",
        cardColor: "#B3FFB3"
    }
let attendingPlayersTeamDetails =
    {
        name: "Attending Players",
        color: "#003380",
        cardColor: "#80b3ff"
    }

let buttonStyle = {
    height: 50,
    width: 150,
    cursor: 'default',
    color: '#FFFFFF',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#1a1300',
    borderColor: '#796b1d',
    fontSize: '10px',
    lineHeight: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #ab9a3c',
    userSelect: 'RED',
    margin: '10px'
};
let boardStyle = {
    width: 95 + '%',
    backgroundColor: 'white',
    height: 90 + '%'


}
export default class PlayerDistributionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                lanes: [
                    this.getTeamLines(attendingPlayersTeamDetails, Array.from(this.props.attendingPlayers))
                ]
            },
            errorMsg: ""

        };
    }

    getTeamLines(teamDetails, players) {
        var lines = ({
            id: 'Team' + teamDetails.name,
            title: teamDetails.name,
            cards: this.getPlayerCards(players, teamDetails.cardColor),
            style: {backgroundColor: teamDetails.color, color: '#FFFFFF', textAlign: 'center'}
        });
        return lines;
    }

    getPlayerCards(players, cardBackGroundColor) {
        var attendingPlayerCards = [];
        players.map(player => {
            attendingPlayerCards.push({
                id: player,
                title: player,
                style: {
                    borderRadius: 6,
                    boxShadow: '0 0 6px 1px #BD3B36',
                    marginBottom: 15,
                    backgroundColor: cardBackGroundColor
                }
            })
        });
        return attendingPlayerCards;
    }

    getRandomTeamNames(numberOfTeams) {
        let result = new Set();
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
            this.setState({
                errorMsg: 'Chosen Team size ' + teamSize + ', is more than attending Players ' + attendingPlayers.length,
                data: {
                    lanes: [
                        this.getTeamLines(attendingPlayersTeamDetails, attendingPlayers)
                    ]
                }
            });
            return;
        }

        //This Step will help us to identify remaining players, after the first selection .
        selectedPlayers.map(player => {
            alreadySelectedPlayers.add(player)
        });

        let teamNames = this.getRandomTeamNames(numberOfLines);
        lanes.push(this.getTeamLines(teamNames[0], selectedPlayers));

        numberOfLines = numberOfLines - 1;
        while (numberOfLines > 0) {
            let teamName = teamNames[numberOfLines];
            console.log("in While loop", numberOfLines);
            let remainingPlayers = [];
            //Find remaining players, based on based on the attending players , and already selected players.
            attendingPlayers.map(player => {
                if (!alreadySelectedPlayers.has(player)) {
                    remainingPlayers.push(player)
                }
            })
            let chosenPlayers = this.getRandom(remainingPlayers, teamSize);
            if (chosenPlayers.length > 0) {
                chosenPlayers.map(player => {
                    alreadySelectedPlayers.add(player)
                });
                lanes.push(this.getTeamLines(teamName, chosenPlayers));
            }
            console.log("lines", lanes);
            numberOfLines = numberOfLines - 1;
        }
        console.log(lanes);
        if (attendingPlayers.length > selectedPlayers.length) {
            console.log('in If condition for remaining players ')
            var remainingPlayers = [];
            attendingPlayers.map(player => {
                if (!alreadySelectedPlayers.has(player)) {
                    remainingPlayers.push(player)
                }

            })
            lanes.push(this.getTeamLines(remainingPlayersTeamDetails, remainingPlayers));
        }
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
                <Board data={this.state.data} draggable style={boardStyle}/>
            </div>
        )
    }
}