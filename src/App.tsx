import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather';
import {Provider} from "react-redux";
import {store} from "./features/store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Weather />
        </Provider>
    </div>
  );
}

export default App;
