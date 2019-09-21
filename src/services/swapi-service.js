// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';


// ReactDOM.render(<App />, document.getElementById('root'));


// serviceWorker.unregister();

// export default class swapiService {
   
//     async getResource(url) {

//         const urlBase = 'https://swapi.co/api/';

//         const res = await fetch(url);

//         if (!res.ok) {

//             throw new Error(`No existe la persona por este url ${url}  ${res.status}`);
//         }

//         return await res.json();
//     }

//     async getAllPeople() {
//         const res = await this.getResource(`https://swapi.co/api/people`).then(body => {console.log(body)})
//         return res.results;
//     }

//     async getAllStarships() {
//         const res = await this.getResource(`https://swapi.co/api/starships/`).then(body => {console.log(body)})
//         return res.results;
//     }

//     async getAllPlanets() {
//         const res = await this.getResource(`https://swapi.co/api/planets/`).then(body => {console.log(body)})
//         return res.results;
//     }

//     async getPerson(id) {
//         const res = await this.getResource(`https://swapi.co/api/people/${id}`).then(body => {console.log(body)})
//         return res;
//     }

//     getPlanet(id) {
//         return this.getResource(`/planets/${id}/`);
//       }

//     // async getPlanet(id) {
//     //     const res = await this.getResource(`https://swapi.co/api/planets/${id}`).then(body => {console.log(body)})
//     //     return res;
//     // }

//     async getStarship(id) {
//         const res = await this.getResource(`https://swapi.co/api/starships/${id}`).then(body => {console.log(body)})
//         return res;
//     }
// }


// const swapi = new swapiService();
// swapi.getPerson('5');
// swapi.getAllPeople();

export default class SwapiService {

    _apiBase = 'https://swapi.co/api';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    }
  
    async getAllPeople() {
      const res = await this.getResource(`/people/`);
      return res.results.map(this.transformPerson);
    }
  
    async getPerson(id) {
      const person =  await this.getResource(`/people/${id}/`);
      return this.transformPerson(person);
    }
  
    async getAllPlanets() {
      const res = await this.getResource(`/planets/`);
      return res.results.map(this.transformPlanet);
    }
  
    async getPlanet(id) {
      const planet = await this.getResource(`/planets/${id}/`);
      return this.transformPlanet(planet);
    
    }
  
    async getAllStarships() {
      const res = await this.getResource(`/starships/`);
      return res.results;
    }
  
    getStarship(id) {
      const starship = this.getResource(`/starships/${id}/`);
      return this.transformStarship(starship);
    }

    extractId(item) {
        const idRegex = /\/([0-9]*)\/$/;
        return item.url.match(idRegex)[1];
    }

    transformPlanet(planet) {

        return {  
            id: this.extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    transformPerson(person) {

        return {  
            id: this.extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }

    transformStarship(starship) {

        return {  
            id: this.extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
        
    }
}

