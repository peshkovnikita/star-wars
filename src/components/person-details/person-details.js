import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi";

export default class PersonDetails extends Component {
    state = {
        person: null
    }

    swapi = new SwapiService();

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        const { personId } = this.props;
        if (!personId) return;

        this.swapi.getPerson(personId)
            .then(person => {
                this.setState({ person })
            })
    }

    render() {
        if(!this.state.person) {
            return <div className="person-details card"><span>Choose a character from the list</span></div>;
        }

        const { id, name, gender, birthYear, eyeColor } = this.state.person

        return (
            <div className="person-details card" style={{ marginTop: `0!important` }}>
                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt='person img'/>
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}