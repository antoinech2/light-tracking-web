const API_URL = "http://localhost:3001"

export default class ApiService{

    static getFixtures(){
        return fetch(`${API_URL}/api/fixtures`)
        .then(response => response.json())
        .catch(error => this.handleError(error))
    }

    static getRoom(){
        return fetch(`${API_URL}/api/room`)
        .then(response => response.json())
        .catch(error => this.handleError(error))
    }

    static setTracking(coords, modificationId, modificationFixture){
        let request = modificationFixture ? {coords, modificationFixtureId : modificationId, modificationFixtureValue : modificationFixture} : {coords}
        return fetch(`${API_URL}/api/track`, {
            method : 'POST',
            body: JSON.stringify(request),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .catch(error => this.handleError(error))
    }

    static updateFixture(fixture){
        const id = fixture.id
        delete fixture.id
        return fetch(`${API_URL}/api/fixture/${id}`, {
            method: 'PUT',
            body: JSON.stringify(fixture),
            headers: { 'Content-Type': 'application/json'}
          })
          .then(response => response.json())
          .catch(error => this.handleError(error));    
    }

    static deleteFixture(id){
        return fetch(`${API_URL}/api/fixture/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
          })
          .then(response => response.json())
          .catch(error => this.handleError(error));    
    }

    static handleError(error) {
        console.error(`Error while communicating with API : ${error}`);
      }
}