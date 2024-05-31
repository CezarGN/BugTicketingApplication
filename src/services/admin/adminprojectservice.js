import TokenService from "../auth/tokenservice";

class AdminProjectService {
    tokenService = new TokenService();
    getProjects(name, page, size) {
        const token = this.tokenService.getAccessToken()
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const url = `${enviroment.getProjectsUrl}?name=${encodeURIComponent(name)}&page=${page}&size=${size}`
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Projects could not be retrieved from the database')
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
    createProject(name, description, developers, projectTemplateKey) {

        const token = this.tokenService.getAccessToken();
        const requestBody = {
            name: name,
            description: description,
            developers: developers,
            projectTemplateKey: projectTemplateKey
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        };
        console.log(JSON.stringify(requestBody));

        return fetch(enviroment.createProjectUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('The project could not be created')
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

    async deleteProject(projectId) {
        try {
            const token = this.tokenService.getAccessToken();
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


    updateProject(projectId, name, description, developers) {
        const token = this.tokenService.getAccessToken();
        const requestBody = {
            name: name,
            description: description,
            developers: developers
        }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        };

        return fetch(`${enviroment.updateProjectUrl}/${projectId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('The project could not be created')
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
} export default AdminProjectService