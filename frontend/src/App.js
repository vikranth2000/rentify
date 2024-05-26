import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import PropertyListScreen from './components/PropertyListScreen';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/" element={<PropertyListScreen />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;