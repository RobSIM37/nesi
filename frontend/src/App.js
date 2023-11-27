import "./App.css";
import React, { useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { currentUrl } from "./consts/url";
import axios from 'axios';
import User from "./models/User"
import LandingPage from "../src/pages/LandingPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { Typography } from "@mui/material";

const LOADED_STATUS_UNLOADED = "unloaded";
const LOADED_STATUS_PENDING = "pending";
const LOADED_STATUS_COMPLETE = "complete";

const App = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loadedStatus, setLoadedStatus] = useState(LOADED_STATUS_UNLOADED);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('nesiAuthToken')}`;

   const initNewUser = useCallback(
        (data) => {
            const newUser = new User(data);
            localStorage.setItem("nesiAuthToken", data.token);
            newUser.assignSetStateFunction(setUser);
            setLoadedStatus(LOADED_STATUS_COMPLETE);
            navigate("/dashboard")
        },[navigate])

    const tokenLogin = useCallback(
        () => {
            setLoadedStatus(LOADED_STATUS_PENDING);
            axios.post(`${currentUrl()}/refresh-token`, {password:localStorage.getItem("nesiPassword")})
                .then((res) => {
                    initNewUser(res.data);
                })
                .catch((err) => {
                    setLoadedStatus(LOADED_STATUS_COMPLETE);
                })
        },[initNewUser])

    useEffect(()=>{
        const user = sessionStorage.getItem("nesiUser");
        if (user) return initNewUser(JSON.parse(user));
        const token = localStorage.getItem("nesiAuthToken");
        if (token) return tokenLogin();
        setLoadedStatus(LOADED_STATUS_COMPLETE);
    },[initNewUser, tokenLogin])

    const contentByLoadedStatus = () => {
        switch (loadedStatus) {
            case LOADED_STATUS_COMPLETE:
                return(
                    <Routes>
                        <Route path="/" element={<LandingPage user={user} initNewUser={initNewUser}/>}/>
                        {user &&
                        <>
                            <Route path="/dashboard" element={<Dashboard user={user}/>}/>
                        </>}
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                )
            case LOADED_STATUS_PENDING:
                return (<Typography>Attempting to log you back into NESI...</Typography>)
            case LOADED_STATUS_UNLOADED:
            default:
                return (<></>)
        }
    }

    return (contentByLoadedStatus())
}

export default App;