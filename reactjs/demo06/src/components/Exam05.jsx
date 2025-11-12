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

    const [studentClass, setStudentClass] = useState({
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

    //통합 구현
    const changeStudentScore = useCallback(e=>{
        //숫자 입력은 미리 값을 정제할 필요가 있다
        const regex = /[^0-9]+/g;
        const replacement = e.target.value.replace(regex, "");
        const number = replacement.length == 0 ? "" : parseInt(replacement);

        setStudent({
            ...student,
            // e.target.name에 들어있는 글자명과 같은 필드를 바꾸세요!
            // (중요) 입력창에 반드시 state의 필드명과 동일한 name이 붙어 있어야 한다
            [e.target.name] : number 
        })
    }, [student]);

    const checkStudentName = useCallback(e=>{
        const regex = /^[가-힣]{2,7}$/;
        const isValid = regex.test(student.studentName);
        setStudentClass({
            ...studentClass,
            studentName : isValid ? "is-valid" : "is-invalid"
        });
    }, [student]);
    const checkStudentScore = useCallback(e=>{
        const {name, value} = e.target;
        const isValid = parseInt(value) >= 0 && parseInt(value) <= 100;
        setStudentClass({
            ...studentClass,
            [name] : isValid ? "is-valid" : "is-invalid"
        });
    }, [student]);
    
    //memo
    //문법 : const 이름 = useMemo(함수, [연관항목]);

    //render
    return (<>
        <Jumbotron subject="예제 5번" detail="학생 등록 화면에 feedback 추가"></Jumbotron>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">이름</label>
            <div className="col-sm-9">
                <input type="text" name="studentName" 
                        className={`form-control ${studentClass.studentName}`}
                        value={student.studentName} 
                        onChange={changeStudentName} 
                        onBlur={checkStudentName} />
                <div className="valid-feedback">올바른 이름</div>
                <div className="invalid-feedback">잘못된 이름</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">국어</label>
            <div className="col-sm-9">
                <input type="text" name="studentKor" 
                        className={`form-control ${studentClass.studentKor}`} 
                        inputMode="numeric" 
                        value={student.studentKor} 
                        onChange={changeStudentScore} 
                        onBlur={checkStudentScore} />
                <div className="valid-feedback">적합</div>
                <div className="invalid-feedback">부적합</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">영어</label>
            <div className="col-sm-9">
                <input type="text" name="studentEng" 
                        className={`form-control ${studentClass.studentEng}`} 
                        inputMode="numeric" 
                        value={student.studentEng} 
                        onChange={changeStudentScore} 
                        onBlur={checkStudentScore} />
                <div className="valid-feedback">적합</div>
                <div className="invalid-feedback">부적합</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수학</label>
            <div className="col-sm-9">
                <input type="text" name="studentMat" 
                        className={`form-control ${studentClass.studentMat}`} 
                        inputMode="numeric" 
                        value={student.studentMat} 
                        onChange={changeStudentScore} 
                        onBlur={checkStudentScore} />
                <div className="valid-feedback">적합</div>
                <div className="invalid-feedback">부적합</div>
            </div>
        </div>
    </>)
}