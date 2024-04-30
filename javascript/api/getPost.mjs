export async function getPost(url) {
    try {
        console.log(url);
        const token = localStorage.getItem('accessToken');
        console.log(token);
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

    } catch (error) {
        console.log(error);
    }

}

