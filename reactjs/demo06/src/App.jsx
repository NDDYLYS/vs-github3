import { useState } from 'react'
import './App.css'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"
import Exam03 from "./components/Exam03"
import Exam04 from "./components/Exam04"
import Exam05 from "./components/Exam05"
import Exam06 from "./components/Exam06"
import Exam07 from "./components/Exam07"
import Exam08 from "./components/Exam08"
import { ToastContainer, Flip } from 'react-toastify';

export default function App() {
  const [isOpen01, setIsOpen01] = useState(false);
  const [isOpen02, setIsOpen02] = useState(false);
  const [isOpen03, setIsOpen03] = useState(false);
  const [isOpen04, setIsOpen04] = useState(false);
  const [isOpen05, setIsOpen05] = useState(false);
  const [isOpen06, setIsOpen06] = useState(false);
  const [isOpen07, setIsOpen07] = useState(false);
  const [isOpen08, setIsOpen08] = useState(false);

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">

            <div className="row my-3">
              <div className="col d-flex">
                <button onClick={() => setIsOpen01(!isOpen01)} className="mx-1 btn btn-outline-info">
                  {isOpen01 ? <>Exam01 <FaArrowUp /></> : <>Exam01 <FaArrowDown /></>}
                </button>
                <button onClick={() => setIsOpen02(!isOpen02)} className="mx-1 btn btn-outline-info">
                  {isOpen02 ? <>Exam02 <FaArrowUp /></> : <>Exam02 <FaArrowDown /></>}
                </button>
                <button onClick={() => setIsOpen03(!isOpen03)} className="mx-1 btn btn-outline-info">
                  {isOpen03 ? <>Exam03 <FaArrowUp /></> : <>Exam03 <FaArrowDown /></>}
                </button>
                <button onClick={() => setIsOpen04(!isOpen04)} className="mx-1 btn btn-outline-info">
                  {isOpen04 ? <>Exam04 <FaArrowUp /></> : <>Exam04 <FaArrowDown /></>}
                </button>
                <button onClick={() => setIsOpen05(!isOpen05)} className="mx-1 btn btn-outline-info">
                  {isOpen05 ? <>Exam05 <FaArrowUp /></> : <>Exam05 <FaArrowDown /></>}
                </button>
                <button onClick={() => setIsOpen06(!isOpen06)} className="mx-1 btn btn-outline-info">
                  {isOpen06 ? <>Exam06 <FaArrowUp /></> : <>Exam06 <FaArrowDown /></> }
                </button>
                <button onClick={() => setIsOpen07(!isOpen07)} className="mx-1 btn btn-outline-info">
                  {isOpen07 ? <>Exam07 <FaArrowUp /></> : <>Exam07 <FaArrowDown /></> }
                </button>
               <button onClick={() => setIsOpen08(!isOpen08)} className="mx-1 btn btn-outline-info">
                  {isOpen08 ? <>Exam08 <FaArrowUp /></> : <>Exam08 <FaArrowDown /></> }
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
              {isOpen06 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam06></Exam06>
                  <hr className="my-5" /> 
                </div>
              )}
              {isOpen07 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam07></Exam07>
                  <hr className="my-5" /> 
                </div>
              )}
              {isOpen08 && (
                <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
                  <Exam08></Exam08>
                  <hr className="my-5" /> 
                </div>
              )}

              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Flip}
                />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
