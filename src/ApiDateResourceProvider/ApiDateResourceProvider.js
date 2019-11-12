import * as React from 'react';
import { useEffect, useState } from 'react';


const defaultDateResource = {today: 'NO DATA'};
export const DateResourceContext = React.createContext(defaultDateResource);

const ApiDateResourceProvider = (props) => {
    const [dateResourceState, setDateResourceState] = useState(
        defaultDateResource
    );

    useEffect(() => {
        fetch('/api/now')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => {
                setDateResourceState(json);
                console.log('Got following JSON: ', json);
            })
            .catch(console.log);
    }, [setDateResourceState]);

    return (
        <DateResourceContext.Provider value={dateResourceState}>
            {props.children}
        </DateResourceContext.Provider>
    );
};

export default ApiDateResourceProvider;
