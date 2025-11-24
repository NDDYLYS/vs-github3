import { useState } from 'react'
import Jumbotron from "./templates/Jumbotron";
import Content from "./components/Content"
import Footer from "./components/Footer"
import Menu from "./components/menu";
import { HashRouter, BrowserRouter } from "react-router-dom"
import { ToastContainer, Flip } from "react-toastify";
import "./App.css";
import { Provider } from "jotai";

export default function App() {
    const [size, SetSize] = useState(300)

    return (
        <>

            <BrowserRouter>
            {/* 생략 가능 */}
                <Provider>

                    <Menu />

                    <div className="container-fluid my-5 pt-5">
                        <Content />
                        <hr></hr>
                        <Footer />
                    </div>

                </Provider>
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