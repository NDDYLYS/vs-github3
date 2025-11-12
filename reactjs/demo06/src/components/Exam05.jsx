import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";


export default function Exam05() {
    //state - 객체 형태로 student 입력값을 관리
    const [student, setStudent] = useState({
        studentName : "",
        studentKor : "",
        studentEng : "",
        studentMat : ""
    });

    //callback - 호출하여 사용 가능한 함수들을 보관하는 도구
    //문법 : const 이름 = useCallback(함수, [연관항목]);
    const changeStudentName = useCallback(e=>{
        setStudent({//student를 변경하는데
            ...student,//나머지는 유지하고
            studentName : e.target.value//studentName만 입력값(e.target.value)으로 변경하세요!
        })
    } , [student]);

    const changeStudentKor = useCallback(e=>{
        //숫자 입력은 미리 값을 정제할 필요가 있다
        const regex = /[^0-9]+/g;
        const replacement = e.target.value.replace(regex, "");
        const number = replacement.length == 0 ? "" : parseInt(replacement);

        setStudent({
            ...student,
            studentKor : number
        })
    }, [student]);
    const changeStudentEng = useCallback(e=>{
        //숫자 입력은 미리 값을 정제할 필요가 있다
        const regex = /[^0-9]+/g;
        const replacement = e.target.value.replace(regex, "");
        const number = replacement.length == 0 ? "" : parseInt(replacement);

        setStudent({
            ...student,
            studentEng : number
        })
    }, [student]);
    const changeStudentMat = useCallback(e=>{
        //숫자 입력은 미리 값을 정제할 필요가 있다
        const regex = /[^0-9]+/g;
        const replacement = e.target.value.replace(regex, "");
        const number = replacement.length == 0 ? "" : parseInt(replacement);

        setStudent({
            ...student,
            studentMat : number
        })
    }, [student]);

    const changeStudentScore = useCallback(e=>{
        console.log(e.target.name);

        //숫자 입력은 미리 값을 정제할 필요가 있다
        const regex = /[^0-9]+/g;
        const replacement = e.target.value.replace(regex, "");
        const number = replacement.length == 0 ? "" : parseInt(replacement);

        setStudent({
            ...student,
            [e.target.name] : number
        })
    }, [student]);
    
    //memo
    //문법 : const 이름 = useMemo(함수, [연관항목]);

    //render
    return (<>
        <Jumbotron subject="예제5번" detail="학생 등록 화면 만들기"></Jumbotron>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">학생이름 *</label>
            <div className="col-sm-9">
                <input type="text" name="studentName" className="form-control" placeholder="(ex) 홍길동"
                        value={student.studentName} onChange={changeStudentName} />
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">국어점수 *</label>
            <div className="col-sm-9">
                <input type="text" name="studentKor" className="form-control" placeholder="0 ~ 100"
                        inputMode="numeric" value={student.studentKor} 
                        onChange={changeStudentScore} />
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">영어점수 *</label>
            <div className="col-sm-9">
                <input type="text" name="studentEng" className="form-control" placeholder="0 ~ 100"
                        inputMode="numeric" value={student.studentEng} 
                        onChange={changeStudentScore} />
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수학점수 *</label>
            <div className="col-sm-9">
                <input type="text" name="studentMat" className="form-control" placeholder="0 ~ 100"
                        inputMode="numeric" value={student.studentMat} 
                        onChange={changeStudentScore} />
            </div>
        </div>
    </>)
}