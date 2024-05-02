//using the username to construct the endpoint
const userName = JSON.parse(localStorage.getItem('userName'));
const name = userName.data.name;


export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = "/auth";
export const API_REGISTER = "/register"; 
export const API_LOGIN = "/login";

export const API_POSTS = "/blog/posts";

export const API_NAME = `/${name}`




