import React from 'react';
import logo from './BlueLogo.svg';
import Frontpage from './Frontpage/Frontpage';
import ApiPlayerResourceProvider from './ApiPlayerResourceProvider/ApiPlayerResourceProvider';

function App() {
    return (
            <div>
                <Frontpage logo={logo}/>
            </div>
    );
}

export default App;
