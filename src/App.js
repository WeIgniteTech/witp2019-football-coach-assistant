import React from 'react';
import logo from './BlueLogo.svg';
import Frontpage from './Frontpage/Frontpage';
import ApiPlayerResourceProvider from './ApiPlayerResourceProvider/ApiPlayerResourceProvider';

function App() {
  return (
    <div>
        <ApiPlayerResourceProvider>
          <Frontpage logo={logo}/>
        </ApiPlayerResourceProvider>
    </div>
  );
}

export default App;
