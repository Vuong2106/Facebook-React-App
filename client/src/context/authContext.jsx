import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({
    currentUser: null,
    token: null,
    setCurrentUser: ()=> {},
    setToken: () => {}

})

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, _setToken] = useState(JSON.parse(localStorage.getItem("access_token")) || null);
    // const login = (input) => {
    //     axiosClient.post('/auth/login', input, {
    //         withCredentials: true,
    //     }).then((res) => {
    //         console.log('success')
    //         setCurrentUser(res.data)
    //     })
    //     .catch((err) =>{
    //         // return redirect('/auth/login')
    //     });
    // }
    const login = async (inputs) => {
        console.log('input',inputs);
        const res = await axios.post("http://127.0.0.1:8800/api/auth/login", inputs, {
            withCredentials: true,
        })
        console.log('res', res.data)
        setCurrentUser(res.data)
    }



    const setToken = (token) => {
        _setToken(token);
        if (token){
            localStorage.setItem('access_token', token);
        } else {
            localStorage.removeItem("access_token");
        }
    }
    useEffect (() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}