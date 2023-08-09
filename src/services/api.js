let API_URL = "http://localhost:3001"

export default class ApiService{
    static pingServer(){
        return fetch(`${API_URL}`)
        .then(response => true)
        .catch(error => false)        
    }

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

    static setTracking(coords){
        return fetch(`${API_URL}/api/track`, {
            method : 'POST',
            body: JSON.stringify(coords),
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