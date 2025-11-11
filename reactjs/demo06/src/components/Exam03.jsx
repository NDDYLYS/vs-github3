import { useMemo } from "react";
import { useState } from "react";

export default function Exam03(){
    const [text, setText] = useState("");
    const count = useMemo(()=>{
        return text.length;
    }, [text]);
    const isValid = useMemo(()=>{
        return count <= 1000; 
    }, [count]);

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
                    <h1>자기소개서</h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-start">
                    <h4>(Q) 본인의 성장 과정은 이러이러하다</h4>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <textarea className="form-control w-100" rows="9" value={text} onChange={e=>{setText(e.target.value);}}></textarea>
                </div>
            </div>

            <div className="row mt-1">
                <div className={`col text-end ${isValid ? "" : "text-danger"}`}>
                    {text.length}/1000
                </div>
            </div>
        </>
    )
}