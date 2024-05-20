import enviroment from '../enviroment';

class AdminService {

    getProjects(){
        const token = localStorage.getItem('access_token')
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`
          }};

          return fetch(enviroment.getProjectsUrl, requestOptions)
          .then(response => {
            if(!response.ok){
                throw new Error('Projects could not be retrieved from the database')
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

    addUser(username, password, seniority, role){
        const token = localStorage.getItem('access_token')
        const requestBody = {
            username : username,
            password : password,
            seniority : seniority,
            role : role
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(requestBody)};
        console.log(JSON.stringify(requestBody));

          return fetch(enviroment.sign_up_Url, requestOptions)
          .then(response => {
            if(!response.ok){
                throw new Error('The user could not be created')
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

    getDevelopers(){
        const token = localStorage.getItem('access_token')
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`
          }};

          return fetch(enviroment.getDevelopersUrl, requestOptions)
          .then(response => {
            if(!response.ok){
                throw new Error('Developers could not be retrieved from the database')
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

    createProject(name, description, developers){
       
       const token = localStorage.getItem('access_token'); 
        const requestBody = {
            name : name,
            description : description,
            developers : developers
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(requestBody)};
        console.log(JSON.stringify(requestBody));

        return fetch(enviroment.createProjectUrl, requestOptions)
        .then(response => {
          if(!response.ok){
              throw new Error('The project could not be created')
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

  async deleteProject(projectId) {
    try {
      const token = localStorage.getItem('access_token');
      console.log(`${enviroment.deleteProjectUrl}/${projectId}`);
  
      const requestOptions = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
  
      const response = await fetch(`${enviroment.deleteProjectUrl}/${projectId}`, {
        method: 'DELETE',
        headers: requestOptions
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
  
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error.message);
      throw new Error('Failed to delete project: ' + error.message);
    }
  }
  

  updateProject(projectId, name, description, developers){
      const token = localStorage.getItem('access_token')
      const requestBody = {
        name : name,
        description : description,
        developers : developers
    }
    const reqbody = JSON.stringify(requestBody)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${token}`
    },
    body : reqbody 
    };
    const response = fetch(`${enviroment.updateProjectUrl}/${projectId}`, {
      method: 'PUT',
      headers : requestOptions
    });
    return response
        .then(response => {
          if(!response.ok){
              throw new Error('The project could not be updated')
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

export default AdminService