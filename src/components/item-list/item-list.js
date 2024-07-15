import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {

    state = {
        peopleList: null
    }

    swapi = new SwapiService();

    componentDidMount() {
        this.swapi.getAllPeople()
            .then(list => {
                this.setState({
                    peopleList: list
                })
            })
    }

    renderItems(arr) {
        return arr.map(({ id, name }) => {
            return(
                <li className='list-group-item' key={id} onClick={ () => this.props.onItemSelected(id) }>
                    {name}
                </li>
            )
        })
    }

    render() {
        const { peopleList } = this.state;

        if(!peopleList) return <Spinner />;

        const characters = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                {characters}
            </ul>
        );
    }
}