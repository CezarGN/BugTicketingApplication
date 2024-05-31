import jwtDecode from 'jwt-decode';

class TokenService {
    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    getUserId() {
        return localStorage.getItem('user_id');
    }

    getUserRole() {
        return localStorage.getItem('user_role');
    }

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    }

    setUserId(id) {
        localStorage.setItem('user_id', id)
    }

    setUserRole(role) {
        return localStorage.setItem('user_role', role);
    }

    isTokenExpired() {
        token = localStorage.getItem('access_token');
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Failed to decode JWT token:", error);
            return true;
        }
    }

    removeAccessToken() {
        localStorage.removeItem('access_token');
    }

    removeUserId() {
        localStorage.removeItem('user_id');
    }

    removeUserRole() {
        localStorage.removeUserRole('user_role');
    }
}
export default TokenService