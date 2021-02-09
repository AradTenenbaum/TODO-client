import axios from 'axios';

const url = "http://localhost:5000";

// User http requests
export const register = (newUser) => axios.post(`${url}/user/register`, newUser);
export const login = (userDetails) => axios.post(`${url}/user/login`, userDetails);

// Tasks http requests
export const fetchTasks = (username, token) => axios.get(`${url}/task/tasks`, username, {
    headers: {
        'auth-token': token
    }
});
export const addTask = (username, token) => axios.post(`${url}/task/add`, username, {
    headers: {
        'auth-token': token
    }
});
export const deleteTask = (id, token) => axios.delete(`${url}/task/delete/${id}`, {
    headers: {
        'auth-token': token
    }
});
export const changeTask = (id, token) => axios.patch(`${url}/task/finish/${id}`, {
    headers: {
        'auth-token': token
    }
});