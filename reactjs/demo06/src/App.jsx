import { useState } from 'react'
import './App.css'
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"
import Exam03 from "./components/Exam03"

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
            <div className="row mb-5">
                
              <Exam01></Exam01>
              <hr className="my-5"/>
              <Exam02></Exam02>
              <hr className="my-5"/>
              <Exam03></Exam03>
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
