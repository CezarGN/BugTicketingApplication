import { json } from "react-router-dom";
import enviroment from "../../enviroment";

class DeveloperProjectService {
  token = localStorage.getItem('access_token')
  developer_id = localStorage.getItem('developer_id')

  getDeveloperProject(userId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    };

    return fetch(`${enviroment.getDeveloperProjectUrl}/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Project could not be retrieved from the database')
        }
        return response.json();
      })
      .then(
        data => {
          return data;
        }
      )
      .catch(error => {
        console.error("There was a problem with the fetch operation", error);
        throw error;
      }
      )
  }

  getDevelopersOnProject(projectId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    return fetch(`${enviroment.getDevelopersOnProjectUrl}/${projectId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Developers could not be found in the database')
        }
        return response.json();
      })
      .then(
        data => {
          return data;
        }
      )
      .catch(error => {
        console.error("There was a problem with the fetch operation", error);
        throw error;
      }
      )
  }
}
export default DeveloperProjectService