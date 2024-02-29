import React from 'react';
import TextSharing from './TextSharing';
import Messaging from './Messaging';

const App = () => {
    return (
        <div className='flex'>
            <TextSharing className='w-4/5' />
            <Messaging className='w-1/5' />
        </div>
    );
}

export default App;
