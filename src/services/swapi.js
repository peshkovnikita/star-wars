export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);
        if(!response.ok) throw new Error(`Could not fetch ${response.status}`);
        const body = await response.json();

        return body;
    }

    async getAllPeople() {
        const res = await this.getResource('/people');
        return res.results.map(this._transformPersonData);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPersonData(person)
    }

    async getAllPlanets() {
        const res = await this.getResource('/planets');
        return res.results.map(this._transformPlanetData);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanetData(planet);
    }

    async getAllStarships() {
        const res = await this.getResource('/starships');
        return res.results.map(this._transformStarshipData);
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarshipData(starship);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanetData = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarshipData = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }

    _transformPersonData = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}