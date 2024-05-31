const apiUrl = "http://localhost:9009/bugTicketApplication"; 
const authUrl = apiUrl + "/auth";
const sign_in_Url = authUrl + "/sign_in"
const sign_up_Url = authUrl + "/sign_up"
const adminProjectUrl = apiUrl + "/admin_project"
const adminDeveloperUrl = apiUrl + "/admin_developer"
const developerBugUrl = apiUrl + "/developer_bug"
const developerProjectUrl = apiUrl + "/developer_project"
const getProjectsUrl = adminProjectUrl + "/get_projects"
const getDevelopersUrl = adminDeveloperUrl + "/get_developers"
const createProjectUrl = adminProjectUrl + "/create_project"
const deleteProjectUrl = adminProjectUrl + "/delete_project"
const updateProjectUrl = adminProjectUrl + "/update_project"
const getIdleDevelopersUrl = adminDeveloperUrl + "/get_idle_developers"
const updateDeveloperUrl = adminDeveloperUrl + "/update_developer"
const deleteDeveloperUrl = adminDeveloperUrl + "/delete_developer"
const getDeveloperProjectUrl = developerProjectUrl + "/get_developer_project"
const createBugUrl = developerBugUrl + "/create_bug"
const getBugByIdUrl = developerBugUrl + "/get_bug"
const getDevelopersOnProjectUrl = developerProjectUrl + "/get_developers_on_project"
const updateBugUrl = developerBugUrl + "/update_bug"
const getBugsUrl = developerBugUrl + "/get_bugs"
const getDevelopersOnProjectAndIdleUrl = adminDeveloperUrl + "/get_developers_on_project_and_idle"

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
    createBugUrl : createBugUrl,
    getBugByIdUrl : getBugByIdUrl,
    getDevelopersOnProjectUrl : getDevelopersOnProjectUrl,
    updateBugUrl : updateBugUrl,
    getBugsUrl : getBugsUrl,
    getDevelopersOnProjectAndIdleUrl : getDevelopersOnProjectAndIdleUrl
}

export default enviroment