import React from "react";
import PlayerDistributionList from "../PlayerDistributionList/PlayerDistributionList";
import "../index.css"

export default ({ close, attendingPlayers }) => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header"> Teams Distribution </div>
        <div className="content">
        <PlayerDistributionList attendingPlayers={attendingPlayers}/>
        </div>
    </div>
);