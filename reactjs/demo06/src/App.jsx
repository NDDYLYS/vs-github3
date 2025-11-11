import { useState } from 'react'
import './App.css'
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
            <div className="row mb-5">
                
              <Exam01></Exam01>
              <hr className="my-5"/>
              <Exam02></Exam02>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
