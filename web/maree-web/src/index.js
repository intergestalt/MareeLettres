import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/general/Container/App';
import registerServiceWorker from './registerServiceWorker';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';

ReactDOM.render(<I18nextProvider i18n={ i18n }><App /></I18nextProvider>, document.getElementById('root'));
registerServiceWorker();
