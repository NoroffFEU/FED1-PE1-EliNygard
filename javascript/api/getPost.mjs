import { hideLoader, showLoader } from "../ui/loader.mjs";

export async function getPosts(url) {
    // showLoader()
    try {
        // await new Promise(resolve => setTimeout(resolve, 4000));
        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await fetch(url, getData);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    } finally {
        // hideLoader()
    };
};


// loader prevents getPosts to work on index.mjs RESEARCH 
