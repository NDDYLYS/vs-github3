import './Exam01.css'
import { useState } from 'react'

export default function Exam01(){
    const [size, SetSize] = useState(300)

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark text-light p-4 rounded-4">
                        <h1>예제 1번</h1>
                        <div>이미지 크기 조절 문제</div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-center">
                    <div>현재 크기 {size}x{size}</div>
                </div>
            </div>

            {/* 작동이 안 된다 */}
            <div className="row mt-4">
                <div className="col">
                    <input type="text" value={size} className="form-control"/>
                </div>
            </div>

            {/* 작동이 안 된다 */}
            <div className="row mt-4">
                <div className="col">
                    <input type="range" min={1} max={1000} value={size} className="form-control" onChange={e=>{SetSize(e.target.value);}}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-center">
                    <button className="btn btn-primary me-2" onClick={e=>{SetSize(size-10)}}>-</button>
                    <button className="btn btn-primary me-2" onClick={e=>{SetSize(150)}}>small</button>
                    <button className="btn btn-primary" onClick={e=>{SetSize(300)}}>medium</button>
                    <button className="btn btn-primary ms-2" onClick={e=>{SetSize(450)}}>large</button>                    
                    <button className="btn btn-primary ms-2" onClick={e=>{SetSize(size+10)}}>+</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-center">
                    {/* 리액트는 모든 태그가 반드시 닫혀야 한다 */}
                    <img className="target" src="https://picsum.photos/id/1000/500/500" width={size} height={size}></img>
                </div>
            </div>
        </>
    )
}