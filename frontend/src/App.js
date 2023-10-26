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

    const initNewUser = (data) => {
        const newUser = new User(data);
        localStorage.setItem("nesiAuthToken", data.authToken);
        newUser.assignSetStateFunction(setUser);
        newUser.updateState();
        navigate("/dashboard");
    }

    useEffect(()=>{
        const authToken = localStorage.getItem("nesiAuthToken");
        if (authToken) {
            axios
                .post(`${currentUrl()}/authLogin`,{authToken})
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