import { useState } from 'react'
import Jumbotron from "./templates/Jumbotron";
import Menu from "./components/Menu"
import Content from "./components/Content"
import Footer from "./components/Footer"
import { HashRouter, BrowserRouter } from "react-router-dom"

export default function App(){
    const [size, SetSize] = useState(300)

    return (
        <>
            <BrowserRouter>
                <Menu/>

                <div className="container-fluid">
                    <Content/>
                    <hr></hr>
                    <Footer/>
                </div>
            </BrowserRouter>
        </>
    )
}