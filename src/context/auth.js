import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';
import * as api from '../api';


const initialState = {
    user: null
};

// If token is saved on local storage there is a user
if(localStorage.getItem("jwtToken")){
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user:null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    async function login(userData){
        try {
            const {data} = await api.login(userData); 
            localStorage.setItem("jwtToken", data.token);
            dispatch({
                type: 'LOGIN',
                payload: userData
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    function logout(){
        localStorage.removeItem("jwtToken");
        dispatch({type:'LOGOUT'});
    }

    return (
        <AuthContext.Provider
        value={{user: state.user, login, logout}}
        {...props}
        />
    )
}

export {AuthContext, AuthProvider};