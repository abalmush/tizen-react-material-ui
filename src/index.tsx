import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import tizenhwkey from './helpers/tizenhwkey';

window.onload = function () {
    tizenhwkey();
    ReactDOM.render(<App />, document.getElementById('root'));
};
