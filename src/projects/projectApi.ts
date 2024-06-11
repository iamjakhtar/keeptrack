import { Project } from "./Project";
const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;


function translateStatusCodeToErrorMessages(status: number) {
    switch(status) {
        case 401:
            return 'Please login again';
        case 403:
            return 'You do not have permission to view project(s)';
        default:
            return "There was an issue retrieving project(s),  please try again";
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        } 

        console.log(`log server http error ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusCodeToErrorMessages(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function convertToJson(response: Response) {
    return response.json();
}

function delay(ms: number) {
    return function(x: any): Promise<any> {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    }
}

function convertToProjectsModels(data: any[]): Project[] {
    let projects = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}



const projectApi = {
    get(page = 1, limit=20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(convertToJson)
            .then(convertToProjectsModels)
            .catch((error: Error) => {
                console.log('log client error', error);
                throw new Error(
                  "There was an error retrieving the projects. Please try again."
                );
            })
    }
}
export { projectApi };