import enviroment from '../enviroment';
import Cookies from 'universal-cookie';

class AuthService{
  
login(username, password) {

    const requestBody = {
        username: username,
        password: password
      };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };
    
      return fetch(enviroment.sign_in_Url, requestOptions)
      .then(response => {
        if(!response.ok){
            throw new Error('Login could not be done')
        }
        return response.json();
      })
      .then(
        data => {
            const cookieBody ={
              token : data.token,
              role : data.role,
              id : data.id
            }
            localStorage.setItem("access_token", data.token)
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

    getToken() {
        return localStorage.getItem('access_token')
    }
}

export default AuthService