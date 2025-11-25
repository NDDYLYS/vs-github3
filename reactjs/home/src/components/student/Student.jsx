import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import Jumbotron from "../templates/Jumbotron";


export default function Student() {
    //state
    const [studentList, setStudentList] = useState([]);

    //effect
    useEffect(()=>{
        loadData();
    }, []);

    //callback
    const loadData = useCallback(async ()=>{
        const {data} = await axios.get("/student/");
        setStudentList(data);
    }, []);

    //render
    return(<>
        <Jumbotron subject="학생 목록" detail="학생들의 정보를 확인하세요"/>
        
        <div className="row mt-4">
            <div className="col text-end">
                등록된 학생 수 : {studentList.length}명
            </div>
        </div>
        <div className="row mt-2">
            <div className="col">
                <div className="text-nowrap table-responsive">
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>국어</th>
                                <th>영어</th>
                                <th>수학</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {studentList.map(student=>(
                            <tr key={student.studentNo}>
                                <td>{student.studentNo}</td>
                                <td>{student.studentName}</td>
                                <td>{student.studentKor}</td>
                                <td>{student.studentEng}</td>
                                <td>{student.studentMat}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}