let API_URL = "http://localhost:3001"

export default class ApiService{
    static getFixtures(){
        return fetch(`${API_URL}/api/fixtures`)
        .then(response => response.json())
        .catch(error => this.handleError(error))
    }

    static handleError(error) {
        console.error(error);
      }
}