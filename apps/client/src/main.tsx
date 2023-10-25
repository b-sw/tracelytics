import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
