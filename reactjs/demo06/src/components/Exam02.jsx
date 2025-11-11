import { useMemo } from "react";
import { useState } from "react";

export default function Exam02(){
    const [text, setText] = useState("")
const isValid = useMemo(function(){
    if (text.length < 8) return "불합격";
    if (text.length > 16) return "불합격";
    return "합격"; 
}, [text]);

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark text-light p-4 rounded-4">
                        <h1>예제 2번</h1>
                        <div>입력창에 state 연결하기</div>
                    </div>
                </div>
            </div>

             <div className="row mt-4">
                <div className="col">
                    <input className="form-control" value={text} onChange={e=>{setText(e.target.value);}}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    입력하신 글자수는 총 {text.length}글자입니다.
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    8~16글자 사이라면 {isValid}
                </div>
            </div>
        </>
    )
}