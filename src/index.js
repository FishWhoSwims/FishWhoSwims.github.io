import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import Background from './background.jpg'

// const styles = {
//   root: {
//     backgroundImage: "url('./background.jpg')"
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
