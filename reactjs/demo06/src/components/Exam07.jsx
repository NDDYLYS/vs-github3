import { useState } from 'react'
import Jumbotron from "../templates/Jumbotron";

export default function Exam07(){
    const [size, SetSize] = useState(300)

    return (
        <>
            <Jumbotron subject="예제7번" detail=""></Jumbotron>
        </>
    )
}