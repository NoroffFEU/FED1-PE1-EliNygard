import loader from "../ui/loader.mjs";

export async function getPost(url) {
    loader.show()
    try {
        console.log(url);
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
        console.log(response);
        console.log(json);
        console.log(loader.show);
        return json;
    } catch (error) {
        console.log(error);
    } finally {
        loader.hide();
    };
};


// await new Promise(resolve => setTimeout(resolve, 4000));