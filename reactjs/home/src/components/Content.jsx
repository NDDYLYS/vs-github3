import { Route, Routes } from "react-router-dom";
import Home from "./Home"
import Pokemon from "./Pokemon"
import Student from "./Student"

export default function Content (){

    return (
        <>
            <h1>컨텐츠 영역</h1>

            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/pokemon" element={<Pokemon/>}></Route>
                <Route path="/student" element={<Student/>}></Route>
            </Routes>
        </>
    )
}