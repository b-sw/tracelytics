import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';

axios.defaults.baseURL = 'https://tracelytics.toadres.pl/api/';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
