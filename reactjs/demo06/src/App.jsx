import { useState } from 'react'
import './App.css'
import Exam01 from "./components/Exam01"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
            <div className="row mb-5">
                
              <Exam01></Exam01>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
