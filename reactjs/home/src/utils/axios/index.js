import axios from "axios";
import { getDefaultStore } from "jotai";
import { accessTokenState, refreshTokenState } from "../jotai";

const store = getDefaultStore();

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.timeout = 10000; // milli second

axios.interceptors.response.use((response) => {
    console.log("request success");
    const newAccessToken = response.headers["access-token"];
    if (newAccessToken?.length > 0) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        //setAccessToken(newAccessToken);
        store.set(accessTokenState, newAccessToken);
    }
    return response;
}, async (error) => {
    console.log("request fail");
    try {
        const data = error.response.data;
        if (data?.status === "401" && data?.message === "TOKEN_EXPIRED") {
            const response = await axios.post("/account/refresh", { refreshToken: `Bearer ${refreshToken}` });

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

            //setAccessToken(response.data.accessToken);
            //setRefreshToken(response.data.refreshToken);
            store.set(accessTokenState, response.data.accessToken);
            store.set(refreshTokenState, response.data.refreshToken);

            const originalR = error.config;
            //originalR._retry = true;
            originalR.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            return axios(originalR);
        }
    }
    catch (ex) {
        //clearLogin();
        //navigate("/account/login");
        //location.href = "/account/login";
    }
    return Promise.reject(error);
});