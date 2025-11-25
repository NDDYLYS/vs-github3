import Content from "./components/Content"
import Footer from "./components/Footer"
import Menu from "./components/menu";
import { HashRouter, BrowserRouter, useNavigate } from "react-router-dom"
import { ToastContainer, Flip } from "react-toastify";
import "./App.css";
import { Provider, useAtom, useSetAtom  } from "jotai";
import "jotai-devtools/styles.css";
import { DevTools, useAtomDevtools } from "jotai-devtools";
import axios from "axios";
import { accessTokenState, clearLoginState, refreshTokenState } from "./utils/jotai"
import { useEffect, useReducer, useRef } from "react"

export default function App() {

    const [accessToken, setAccessToken] = useAtom(accessTokenState);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenState);
    const clearLogin = useSetAtom(clearLoginState);

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