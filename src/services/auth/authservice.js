import enviroment from '../../enviroment';
import Cookies from 'universal-cookie';
import TokenService from './tokenservice';
import { Toll } from '@mui/icons-material';

class AuthService {

  tokenService = new TokenService();

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
        if (!response.ok) {
          throw new Error('Login could not be done')
        }
        return response.json();
      })
      .then(
        data => {
          console.log(data.id);
          this.tokenService.setAccessToken(data.token)
          this.tokenService.setUserId(data.id)
          this.tokenService.setUserRole(data.role)
          return data;
        }
      )
      .catch(error => {
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