import axios from 'axios';

const url = "http://localhost:5000";

// User http requests
export const register = (newUser) => axios.post(`${url}/user/register`, newUser);
export const login = (userDetails) => axios.post(`${url}/user/login`, userDetails);

// Tasks http requests
export const fetchTasks = (token) => axios({ method: 'get', url: `${url}/task/tasks`, headers: { 'auth-token': token } });
export const addTask = (username, text, token) => axios({ method: 'post', url: `${url}/task/add`, data: { username, text} , headers: { 'auth-token': token } });
export const deleteTask = (id, token) => axios({ method: 'delete', url: `${url}/task/delete/${id}`, headers: { 'auth-token': token } });
export const changeTask = (id, token) => axios({ method: 'patch', url: `${url}/task/finish/${id}`, headers: { 'auth-token': token } });
