import * as React from 'react';
import { useEffect, useState } from 'react';


const defaultPlayerResource = [];
export const PlayerResourceContext = React.createContext(
    defaultPlayerResource
    );

const ApiPlayerResourceProvider = (props) => {
    const [playerResourceState, setPlayerResourceState] = useState([...defaultPlayerResource]);

    useEffect(() => {
        fetch('http://localhost:3000/api/players')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log('Got following JSON: ', json);
                setPlayerResourceState(json);
            })
            .catch(console.log);
    },[]);

    return (
        <PlayerResourceContext.Provider value={playerResourceState}>
            {props.children}
        </PlayerResourceContext.Provider>
    );
};

export default ApiPlayerResourceProvider;
