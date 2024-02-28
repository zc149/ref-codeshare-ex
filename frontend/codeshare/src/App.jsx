import React from 'react';
import Messaging from './Messaging'; 
import TextSharing from './TextSharing';

const App = () => {
    return (
        <div className="app-container" style={{ display: 'flex' }}>
            <div style={{ flex: 3 }}>
                <TextSharing />
            </div>
            <div style={{ flex: 1 }}>
                <Messaging />
            </div>
        </div>
    );
}

export default App;
