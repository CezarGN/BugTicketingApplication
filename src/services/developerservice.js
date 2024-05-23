import { json } from "react-router-dom";
import enviroment from "../enviroment";

class DeveloperService {
    token = localStorage.getItem('access_token')
    developer_id = localStorage.getItem('developer_id')
    getDeveloperProject(userId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${this.token}`
          }};
          console.log(`${enviroment.getDeveloperProjectUrl}/${userId}`)
          return fetch(`${enviroment.getDeveloperProjectUrl}/${userId}`, requestOptions)
          .then(response => {
            if(!response.ok){
                throw new Error('Project could not be retrieved from the database')
            }
            return response.json();
          })
          .then  (
            data => {
            return data;
        }
      )
      .catch(error =>
        {
            console.error("There was a problem with the fetch operation", error);
            throw error;
        }
    )
    }

    addBug(projectId, bugName, bugDescription){
      
      const requestBody = {
        name: bugName,
        description: bugDescription,
        developer: this.developer_id,
        status: 'OPEN'
      };
      console.log(JSON.stringify(requestBody))
      console.log(`${enviroment.getDeveloperProjectUrl}/${projectId}`)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.token}`
      },
      body : JSON.stringify(requestBody)
      }
      return fetch(`${enviroment.addBugUrl}/${projectId}`, requestOptions)
      .then(response => {
        if(!response.ok){
            throw new Error('Bug could not be added to the database')
        }
        return response.json();
      })
      .then  (
        data => {
        return data;
    }
  )
  .catch(error =>
    {
        console.error("There was a problem with the fetch operation", error);
        throw error;
    }
    )
  }

  getBugById(bugId){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${this.token}`
    }
    }
    return fetch(`${enviroment.getBugByIdUrlUrl}/${bugId}`, requestOptions)
    .then(response => {
      if(!response.ok){
          throw new Error('Bug could not be found in the database')
      }
      return response.json();
    })
    .then  (
      data => {
      return data;
  }
)
.catch(error =>
  {
      console.error("There was a problem with the fetch operation", error);
      throw error;
  }
  )
  }
} 
export default DeveloperService