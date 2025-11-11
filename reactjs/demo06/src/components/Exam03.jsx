import { useState } from "react";

export default function Exam03(){
    const [text, setText] = useState("")

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark text-light p-4 rounded-4">
                        <h1>예제 3번</h1>
                        <div>자기소개서 만들기</div>
                    </div>
                </div>
            </div>

             <div className="row mt-4">
                <div className="col">
                </div>
            </div>
        </>
    )
}