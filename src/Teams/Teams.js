import * as React from 'react';

const Teams = (ListOfPlayers, NumberOfPlayers) => {

    let randList = [...ListOfPlayers];
    let ListOfTeams = [];
    let TeamPlayers = [];
    let index = 0;
    let NumberOfTeams = Math.floor(ListOfPlayers.length / NumberOfPlayers);
    let OverPLayers = ListOfPlayers.length % NumberOfPlayers;

    const randomiseArray = (randList) => {
        randList.sort(function compare(a, b) { return Math.floor(Math.random() * (3)) - 1 })
        randList.reverse()
        randList.sort(function compare(a, b) { return Math.floor(Math.random() * (3)) - 1 })
        return randList
    }

    randList = randomiseArray(randList)

    for (let i = 0; i < NumberOfTeams; i++) {
        for (let p = 0; p < NumberOfPlayers; p++) {
            if (index < randList.length) {
                TeamPlayers.push(randList[index]);
                index = index + 1;
            }
        }
        ListOfTeams.push(TeamPlayers);
        TeamPlayers = [];

    }

    for (let i = 0; i < OverPLayers; i++) {
        TeamPlayers.push(randList[index]);
        index = index + 1;
    }

    if (TeamPlayers.length > 0)
        ListOfTeams.push(TeamPlayers)
    return ListOfTeams;
}
export default Teams