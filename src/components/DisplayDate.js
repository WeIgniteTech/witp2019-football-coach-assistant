import React, { useContext } from 'react';
import { DateResourceContext } from '../ApiDateResourceProvider/ApiDateResourceProvider';

const DisplayDate = (props) =>  {
    const dateResource = useContext(DateResourceContext);
    console.log('Attempt to display: ', dateResource);
    return (
        <p>Today is: {dateResource.today}</p>
    );
}

export default DisplayDate;