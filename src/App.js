import React from 'react';
import logo from './logo.svg';
import Frontpage from './Frontpage/Frontpage';
import ApiDateResourceProvider from './ApiDateResourceProvider/ApiDateResourceProvider';

function App() {
  return (
    <div>
        <ApiDateResourceProvider>
          <Frontpage logo={logo}/>
        </ApiDateResourceProvider>
    </div>
  );
}

export default App;
