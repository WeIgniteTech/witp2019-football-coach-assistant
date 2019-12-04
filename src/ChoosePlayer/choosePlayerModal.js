import React from "react";

export default ({ close, attendingPlayers }) => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header"> Player teams  </div>
        <div className="content">
        Here comes the play select modal<br/>
            {attendingPlayers}
        </div>
    </div>
);