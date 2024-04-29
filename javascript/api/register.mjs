import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";




async function registerUser (url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userData),
            };
        const response = await fetch(url, postData);
        const json = await response.json();
            console.log(json);
        return json;
        } 
        
        catch (error) {
            console.error('Error:', error);
    }
}


const userData = {
    name: 'eli_nyg',
    email: 'elinyg@stud.noroff.no',
    password: 'Test3Test5'
}

registerUser(API_BASE + API_AUTH + API_REGISTER, userData);
