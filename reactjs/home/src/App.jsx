import { useEffect, useState } from 'react'
import Jumbotron from "./templates/Jumbotron";
import Content from "./components/Content"
import Footer from "./components/Footer"
import Menu from "./components/menu";
import { HashRouter, BrowserRouter, useNavigate } from "react-router-dom"
import { ToastContainer, Flip } from "react-toastify";
import "./App.css";
import { Provider, useAtom, useSetAtom  } from "jotai";
import "jotai-devtools/styles.css";
import { DevTools } from "jotai-devtools";
import axios from "axios";
import { accessTokenState, clearLoginState, refreshTokenState } from "./utils/jotai"
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.timeout = 10000; // milli second

export default function App() {

    const [accessToken, setAccessToken] = useAtom(accessTokenState);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenState);
    const clearLogin = useSetAtom(clearLoginState);
//effect
  useEffect(()=>{
    axios.interceptors.response.use((response) => {
        const newAccessToken = response.headers["access-token"];
        if(newAccessToken?.length > 0) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            setAccessToken(newAccessToken);
        }
        return response;
    }, async (error) => {
        try {
          const data = error.response.data;
          if(data?.status === "401" && data?.message === "TOKEN_EXPIRED") {
            const response = await axios.post("/account/refresh", { refreshToken : refreshToken });

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);

            const originalR = error.config;
            originalR._retry = true;
            originalR.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            return axios(originalR);
          }
        }
        catch(ex) {
          //clearLogin();
          //navigate("/account/login");
          //location.href = "/account/login";
        }
        return Promise.reject(error);
    });
  }, []);

    return (
        <>

            <BrowserRouter>
                {/* 
                    개발 모드만 돌고 배포에서는 잘려야 함수
                    process.env.NODE-ENV
                    개발 : development
                    배포 : production */}
                {import.meta.env.MODE === "development" && <DevTools />}


                <Menu />

                <div className="container-fluid my-5 pt-5">
                    <Content />
                    <hr></hr>
                    <Footer />
                </div>


            </BrowserRouter>

            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Flip} />
        </>
    )
}