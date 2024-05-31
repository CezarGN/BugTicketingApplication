
class DeveloperBugService {
    createBug(projectId, bugName, bugDescription) {
        const requestBody = {
            name: bugName,
            description: bugDescription,
            developer: this.developer_id,
            status: 'OPEN'
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(requestBody)
        }
        return fetch(`${enviroment.createBugUrl}/${projectId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bug could not be added to the database')
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

    getBugById(bugId) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        }
        return fetch(`${enviroment.getBugByIdUrl}/${bugId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bug could not be found in the database')
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

    updateBug(bugId, updatedBug) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(updatedBug)
        }
        return fetch(`${enviroment.updateBugUrl}/${bugId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bug could not be updated');
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
    getBugs(userId, projectId, page, size) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        }
        return fetch(`${enviroment.getBugsUrl}/${userId}/${projectId}?page=${page}&size=${size}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bugs could not be found in the database')
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
export default DeveloperBugService