import { useEffect, useState } from 'react'
import axios from "axios";
import Jumbotron from "../templates/Jumbotron";

export default function Exam08(){
    const [studentList, setStudentList] = useState([])

    useEffect(()=>{
        axios({
            url:"http://localhost:8080/student/",
            method:"get",
        })
        .then(response=>{
            setStudentList(response.data)
        });
    }, []);

    return (
        <>

            <Jumbotron subject="예제8번" detail="student-list 구현"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <div className="text-nowrap table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>No</th>
                                <th>이름</th>
                                <th>국어</th>
                                <th>영어</th>
                                <th>수학</th>
                                <th>평균</th>
                                <th>총점</th>
                                <th>등록일</th>
                            </thead>
                            <tbody>
                                {/* map으로 화면을 만들때는 단위 화면으 유일함을 보장할 key 설정이 필요하다 */}
                                {studentList.map(student=>(
                                    <tr>
                                        <td>{student.studentNo}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student.studentKor}</td>
                                        <td>{student.studentEng}</td>
                                        <td>{student.studentMat}</td>
                                        <td>{student.studentAverage}</td>
                                        <td>{student.total}</td>
                                        <td>{student.studentReg}</td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}