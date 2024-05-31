import enviroment from '../../enviroment';
import TokenService from '../auth/tokenservice';

class AdminDeveloperService {
  tokenService = new TokenService();
  createUser(username, password, seniority, role) {
    const token = this.tokenService.getAccessToken();
    const requestBody = {
      username: username,
      password: password,
      seniority: seniority,
      role: role
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    };

    return fetch(enviroment.sign_up_Url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('The user could not be created')
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

  updateUser(userId, username, seniority, role) {
    const token = this.tokenService.getAccessToken();
    const requestBody = {
      appUser: {
        username: username,
        role: role
      },
      seniority: seniority,
    }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    };
    console.log(JSON.stringify(requestBody));

    return fetch(`${enviroment.updateDeveloperUrl}/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('The user could not be updated')
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

  async deleteUser(userId) {
    try {
      const token = this.tokenService.getAccessToken();
      console.log(`${enviroment.deleteDeveloperUrl}/${userId}`);

      const requestOptions = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`${enviroment.deleteDeveloperUrl}/${userId}`, {
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

  getDevelopers(username, seniority, page, size) {
    const token = this.tokenService.getAccessToken();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const upperCaseSeniority = seniority ? seniority.toUpperCase() : "";
    const url = `${enviroment.getDevelopersUrl}?username=${encodeURIComponent(username)}&seniority=${encodeURIComponent(upperCaseSeniority)}&page=${page}&size=${size}`;
    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Developers could not be retrieved from the database');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation", error);
        throw error;
      });
  }


  getIdleDevelopers(page, size) {
    const token = this.tokenService.getAccessToken();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    return fetch(`${enviroment.getIdleDevelopersUrl}?page=${page}&size=${size}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Developers could not be retrieved from the database')
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

  getDevelopersOnProjectAndIdle(page, size, projectId) {
    const token = this.tokenService.getAccessToken();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return fetch(`${enviroment.getDevelopersOnProjectAndIdleUrl}/${projectId}?page=${page}&size=${size}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Developers could not be retrieved from the database')
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

export default AdminDeveloperService
