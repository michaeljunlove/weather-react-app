import React from 'react';
// 不能用BrowserRouter.https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
import { HashRouter } from 'react-router-dom';

import './App.css';
import Routes from './Routes';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes />
            </HashRouter>
        </div>
    );
}

export default App;
