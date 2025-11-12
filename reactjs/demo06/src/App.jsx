import { useState } from 'react'
import './App.css'
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"
import Exam03 from "./components/Exam03"
import Exam04 from "./components/Exam04"
import Exam05 from "./components/Exam05"

export default function App() {
  const [isOpen01, setIsOpen01] = useState(false);
  const [isOpen02, setIsOpen02] = useState(false);
  const [isOpen03, setIsOpen03] = useState(false);
  const [isOpen04, setIsOpen04] = useState(false);
  const [isOpen05, setIsOpen05] = useState(false);

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">

            <div className="row my-3">
              <div className="col d-flex">
                <button onClick={() => setIsOpen01(!isOpen01)} className="mx-1 btn btn-info">
                  {isOpen01 ? "예제01 접기" : "예제01 펼치기"}
                </button>
                <button onClick={() => setIsOpen02(!isOpen02)} className="mx-1 btn btn-info">
                  {isOpen02 ? "예제02 접기" : "예제02 펼치기"}
                </button>
                <button onClick={() => setIsOpen03(!isOpen03)} className="mx-1 btn btn-info">
                  {isOpen03 ? "예제03 접기" : "예제03 펼치기"}
                </button>
                <button onClick={() => setIsOpen04(!isOpen04)} className="mx-1 btn btn-info">
                  {isOpen04 ? "예제04 접기3" : "예제04 펼치기"}
                </button>
                <button onClick={() => setIsOpen05(!isOpen05)} className="mx-1 btn btn-info">
                  {isOpen05 ? "예제05 접기" : "예제05 펼치기"}
                </button>
              </div>
            </div>

            <div className="row mb-5">

              {isOpen01 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam01></Exam01>
                  <hr className="my-5" />
                </div>
              )}
              {isOpen02 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam02></Exam02>
                  <hr className="my-5" />
                </div>
              )}
              {isOpen03 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam03></Exam03>
                  <hr className="my-5" />
                </div>
              )}
              {isOpen04 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam04></Exam04>
                  <hr className="my-5" />
                </div>
              )}              
              {isOpen05 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam05></Exam05>
                  <hr className="my-5" /> 
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? "접기" : "펼치기"}
//       </button>

//       {isOpen && (
//         <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
//           여기에 접었다 펼칠 내용
//         </div>
//       )}
//     </div>
