import { useMemo } from "react";
import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";

export default function Exam05(){

const [student, setStudent] = useState({
    studentName:"",
    studentKor:0,
    studentEng:0,
    studentMat:0
});
const studentNameValid = useMemo(()=>{
    const regex = /^[가-힣]{1,7}$/;
    return regex.test(student.studentName);
}, [student.studentName]);
const studentKorValid = useMemo(()=>{
    return student.studentKor > 0 && student.studentKor <= 100;
}, [student.studentKor]);
const studentEngValid = useMemo(()=>{
    return student.studentEng > 0 && student.studentEng <= 100;
}, [student.studentEng]);
const studentMatValid = useMemo(()=>{
    return student.studentMat > 0 && student.studentMat <= 100;
}, [student.studentMat]);
const studentValid = useMemo(()=>{
    return studentNameValid && studentKorValid && studentEngValid && studentMatValid;
}, [studentNameValid, studentKorValid, studentEngValid, studentMatValid]);

    return (
        <>
            <Jumbotron subject="예제 5번" detail="student-insert react로 구현"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">학생 이름</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    value={student.studentName}
                    onChange={e=>{
                        setStudent({
                        ...student, // asd
                        studentName:e.target.value
                    })
                    }}/>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">학생 국어</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    value={student.studentKor} inputMode="numeric" 
                    onChange={e=>{
                        // 숫자 입력은 값을 정제
                        const regex = /[^0-9]+/g;
                        const replace = e.target.value.replace(regex, "");
                        const number = (replace.length == 0) ? "" : parseInt(e.target.value);

                        setStudent({
                        ...student,
                        studentKor:number
                    })
                    }}/>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">학생 영어</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    value={student.studentEng} inputMode="numeric" 
                    onChange={e=>{
                        // 숫자 입력은 값을 정제
                        const regex = /[^0-9]+/g;
                        const replace = e.target.value.replace(regex, "");
                        const number = (replace.length == 0) ? "" : parseInt(e.target.value);

                        setStudent({
                        ...student,
                        studentEng:number
                    })
                    }}/>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">학생 수학</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    value={student.studentMat} inputMode="numeric" 
                    onChange={e=>{
                        // 숫자 입력은 값을 정제
                        const regex = /[^0-9]+/g;
                        const replace = e.target.value.replace(regex, "");
                        const number = (replace.length == 0) ? "" : parseInt(e.target.value);

                        setStudent({
                        ...student,
                        studentMat:number
                    })
                    }}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    disabled={studentValid == false}>등록</button>
                </div>     
            </div>
        </>
    )
}