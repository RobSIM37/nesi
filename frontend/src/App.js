import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import User from "./models/User"
import { currentUrl } from "./consts/url";
import LandingPage from "../src/pages/LandingPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const App = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('nesiAuthToken')}`;

    const initNewUser = (data) => {
        const newUser = new User(data);
        sessionStorage.setItem("nesiAuthToken", data.token);
        newUser.assignSetStateFunction(setUser);
        newUser.updateState();
        navigate("/dashboard");
    }

    useEffect(()=>{
        const password = localStorage.getItem("nesiAuthPassword");
        if (password) {
            axios
                .post(`${currentUrl()}/refresh-token`,{password})
                .then(res=>{
                    initNewUser(res.data);
                })
        }
    })

    return (
        <Routes>
            <Route path="/" element={<LandingPage user={user} initNewUser={initNewUser}/>}/>
            {user &&
            <>
                <Route path="/dashboard" element={<Dashboard user={user}/>}/>
            </>}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App;