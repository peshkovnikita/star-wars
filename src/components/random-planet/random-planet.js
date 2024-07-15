import React, { Component } from 'react';
import './random-planet.css';
import SwapiService from "../../services/swapi";
import Spinner from "../spinner/spinner";

export default class RandomPlanet extends Component {

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        setInterval(this.updatePlanet, 10_000)
    }

    swapi = new SwapiService();

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 3;

        this.swapi.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { planet, loading, error } = this.state;
        return (
            <div className='random-planet jumbotron rounded'>
                { error ? <ErrorMessage /> : loading ? <Spinner /> : <PlanetCard planet={ planet }/> }
                <button type="button" onClick={() => console.log(this.state)} style={{ width: 60, height: 30 }}>state</button>
            </div>
        );
    }
}

const PlanetCard = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet
    return(
        <>
            <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='planet img'/>
            <div>
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{ rotationPeriod }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{ diameter }</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

const ErrorMessage = () => {
    return(
        <div style={{ color: 'red', width: '100%', display: 'grid', placeItems: 'center' }}>
            <span>Something went wrong</span>
        </div>
    );
}