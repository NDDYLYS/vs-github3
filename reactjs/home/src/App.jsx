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
    // - 서버의 응답 헤더에 "Access-Token"이 있으면 axios 헤더와 jotai의 AccessTokenState를 교체
    axios.interceptors.response.use((response) => {
        const newAccessToken = response.headers["access-token"];//response의 header를 조사 (* 소문자로 작성)
        if(newAccessToken) {//newAccessToken?.length > 0
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            setAccessToken(newAccessToken);//jotai 갱신 코드
        }
        return response;
    }, async (error) => {
        console.log(error);
        try {
          //console.log(error.response.data?.status);
          //console.log(error.response.data?.message);
          const data = error.response.data;
          if(data?.status === "401" && data?.message === "TOKEN_EXPIRED") {//토큰이 만료된 경우
            //토큰 갱신 요청(axios)
            const response = await axios.post("/account/refresh", { refreshToken : refreshToken });
            //response안에는 반드시 다시 발급된 accessToken과 refreshToken이 있어야 함
            // - jotai 또는 axios에 대한 갱신작업
            return axios(null);//원래 하려던 요청을 다시 진행
          }
        }
        catch(ex) {//refresh token마저 사용이 불가능한 상황
          //clearLogin();//모든 jotai state 초기화
          //navigate("/account/login");//로그인 페이지로 이동 (사용불가... Routes 외부)
          //location.href = "/account/login";
        }
        return Promise.reject(error);//에러 발생 처리
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