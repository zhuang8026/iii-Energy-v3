import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './App.jsx';
import '@/plugins/i18n'; // 引入 i18n 配置

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
);
