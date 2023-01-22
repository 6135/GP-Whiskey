// Path: frontend/src/hooks/useAuth.js
import { useState, useEffect, useContext } from "react";
import { useGetApi } from "./serviceapi";
import { AuthContext } from "../context/auth-context";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [user, setUser] = useState(null);
    const { response, error, loading, fetchData } = useGetApi(
        "http://localhost:8000/api/users/me",
        {
        headers: { Authorization: `JWT ${token}` },
        }
    );

    useEffect(() => {
        if (response) {
        setUser(response.data);
        }
    }
    , [response]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
        const remainingTime =
            tokenExpirationDate.getTime() - new Date().getTime();
        setTimeout(logout, remainingTime);
        }
    }
    , [token, tokenExpirationDate]);

    const login = (uid, token, expirationDate) => {
        setIsLoggedIn(true);
        setUserId(uid);
        setToken(token);
        const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
        "userData",
        JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString(),
        })
        );
    }

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
    }

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
        ) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }
    , []);

    useEffect(() => {
        if (token) {
        fetchData();
        }
    }
    , [token, fetchData]);

    return { isLoggedIn, userId, token, login, logout, user };
}