import enviroment from "../enviroment";

class DeveloperService {
    getDeveloperProject(userId) {
        const token = localStorage.getItem('access_token')
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`
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

    addBug(projectId, newBug){
      const token = localStorage.getItem('access_token')
      const newBug = {
        name: bugName,
        description: bugDescription,
        developer: { id: developerId },
        status: 'OPEN'
      };
      
    }
} 
export default DeveloperService