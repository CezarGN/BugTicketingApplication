const apiUrl = "http://localhost:9009/bugTicketApplication"; 
const authUrl = apiUrl + "/auth";
const sign_in_Url = authUrl + "/sign_in"
const sign_up_Url = authUrl + "/sign_up"
const adminUrl = apiUrl + "/admin"
const getProjectsUrl = adminUrl + "/get_projects"
const getDevelopersUrl = adminUrl + "/get_developers"
const createProjectUrl = adminUrl + "/create_project"
const deleteProjectUrl = adminUrl + "/delete_project"
const updateProjectUrl = adminUrl + "/update_project"

const enviroment = {
    apiUrl: apiUrl,
    authUrl: authUrl,
    sign_in_Url : sign_in_Url,
    sign_up_Url : sign_up_Url,
    getProjectsUrl : getProjectsUrl,
    getDevelopersUrl : getDevelopersUrl,
    createProjectUrl : createProjectUrl,
    deleteProjectUrl : deleteProjectUrl,
    updateProjectUrl : updateProjectUrl
}

export default enviroment