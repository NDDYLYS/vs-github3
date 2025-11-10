import { useState } from 'react';
import './App.css'

export default function App() {
  const [text, setText] = useState("");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <label>{text}</label>
          </div>
        </div>

        <div className="row mt-1 justify-content-center">
          <div className="col-2 p-0 me-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"7")}}>7</button>
          </div>
          <div className="col-2 p-0">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"8")}}>8</button>
          </div>
          <div className="col-2 p-0 ms-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"9")}}>9</button>
          </div>
        </div>

        <div className="row mt-1 justify-content-center">
          <div className="col-2 p-0 me-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"4")}}>4</button>
          </div>
          <div className="col-2 p-0">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"5")}}>5</button>
          </div>
          <div className="col-2 p-0 ms-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"6")}}>6</button>
          </div>
        </div>

        <div className="row mt-1 justify-content-center">
          <div className="col-2 p-0 me-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"1")}}>1</button>
          </div>
          <div className="col-2 p-0">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"2")}}>2</button>
          </div>
          <div className="col-2 p-0 ms-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"3")}}>3</button>
          </div>
        </div>

        <div className="row mt-1 justify-content-center">
          <div className="col-2 p-0 me-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"#")}}>#</button>
          </div>
          <div className="col-2 p-0">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"0")}}>0</button>
          </div>
          <div className="col-2 p-0 ms-1">
            <button className="btn btn-secondary w-100" onClick={()=>{setText(text+"$")}}>$</button>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-6 offset-3 p-0 justify-content-center">
            <button className="btn btn-secondary w-100" onClick={()=>{setText("")}}>전체 지우기</button>
          </div>
        </div>
      </div>
    </>
  )
}