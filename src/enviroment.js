const apiUrl = "http://localhost:9009/bugTicketApplication"; 
const authUrl = apiUrl + "/auth";
const sign_in_Url = authUrl + "/sign_in"
const sign_up_Url = authUrl + "/sign_up"
const adminUrl = apiUrl + "/admin"
const developerUrl = apiUrl + "/developer"
const getProjectsUrl = adminUrl + "/get_projects"
const getDevelopersUrl = adminUrl + "/get_developers"
const createProjectUrl = adminUrl + "/create_project"
const deleteProjectUrl = adminUrl + "/delete_project"
const updateProjectUrl = adminUrl + "/update_project"
const getIdleDevelopersUrl = adminUrl + "/get_idle_developers"
const updateDeveloperUrl = adminUrl + "/update_developer"
const deleteDeveloperUrl = adminUrl + "/delete_developer"
const getDeveloperProjectUrl = developerUrl + "/get_developer_project"
const addBugUrl = developerUrl + "/add_bug"

const enviroment = {
    apiUrl: apiUrl,
    authUrl: authUrl,
    sign_in_Url : sign_in_Url,
    sign_up_Url : sign_up_Url,
    getProjectsUrl : getProjectsUrl,
    getDevelopersUrl : getDevelopersUrl,
    createProjectUrl : createProjectUrl,
    deleteProjectUrl : deleteProjectUrl,
    updateProjectUrl : updateProjectUrl,
    getIdleDevelopersUrl : getIdleDevelopersUrl,
    updateDeveloperUrl : updateDeveloperUrl,
    deleteDeveloperUrl : deleteDeveloperUrl,
    getDeveloperProjectUrl : getDeveloperProjectUrl,
    addBugUrl : addBugUrl
}

export default enviroment