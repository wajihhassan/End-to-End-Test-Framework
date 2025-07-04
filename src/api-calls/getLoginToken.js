import * as nodeFetch from "node-fetch"


export const getLoginToken = async (username,password) => {

    const response = await nodeFetch.default("http://localhost:2221/api/login",{
        method: "POST",
        body: JSON.stringify({"username": username, "password": password}),
    })
    if (!response.ok) {
        //console.log(username, password)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const body = await response.json() 
    return body.token

}
//export default getLoginToken;