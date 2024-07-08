import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app'

import './bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//const swapi = new SwapiService();

// swapi.getAllPerson()
//     .then(people => {
//         people.forEach(p => console.log(p.name))
//     })
//     .catch(err => console.log(err.message))

// swapi.getAllStarships()
//     .then(planets => {
//         planets.forEach(p => console.log(p.name))
//     })
//     .catch(err => console.log(err.message))

// swapi.getPerson(2)
//     .then(person => console.log(person.name))
//     .catch(err => console.log(err.message))

