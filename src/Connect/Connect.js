import { React, useEffect, useState } from 'react';

const Connect = (Url) => {
    const [DataList, setDataList] = useState([])
    useEffect(() => {

        fetch(Url)
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
                setDataList(json);
            })
            .catch(console.log);
    }, []);

    return DataList
}

export default Connect