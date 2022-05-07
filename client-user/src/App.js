import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home';
import GamePage from './pages/game';
import AdminPage from './pages/admin';

import Layout from './components/layout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/admin" element={<AdminPage />}></Route>
                    <Route
                        path="/game/:canvasId"
                        element={<GamePage />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
