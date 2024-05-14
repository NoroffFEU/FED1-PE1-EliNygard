export async function getPosts(url, token = null) {
    try {
        // await new Promise(resolve => setTimeout(resolve, 4000));
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (token) {
            getData.headers.Authorization = `Bearer ${token}`;
        }
        const response = await fetch(url, getData);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    } finally {
    };
};


// loader prevents getPosts to work on index.mjs RESEARCH 
