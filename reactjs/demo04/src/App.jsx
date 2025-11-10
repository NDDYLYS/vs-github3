// 리액트 컴포넌트
// 필요한 요소들을 불러오는 import 구문
// 실제 화면으 구현하는 function 함수
// default export를 하면 {} 없이 사용 가능
// React는 import / function / export로 구분된다
// 읽기전용 변수와 변경전용 함수를 동시에 생성하도록 되어 있음
import { useState } from 'react';
import './App.css'

export default function App() {
  const [count, setCount] = useState(0);

// jQuery의 목적은 여러 태그의 제어를 간단하게 하는 법
// 리액트의 목적은 데이터를 기반으로 화면을 구현하는 것
  return (
    // fragment(<>) 화면의 태그가 여러 개라면 만들어서 감싸야 함
    <>
      <h1>카운트:{count}</h1>
      <button onClick={()=>{setCount(count-5)}}>-5</button> 
      <button onClick={()=>{setCount(count-1)}}>-1</button> 
      <button onClick={()=>{setCount(count+1)}}>+1</button>       
      <button onClick={()=>{setCount(count+5)}}>+5</button> 
      <button onClick={()=>{setCount(count+99999)}}>+99999</button> 
      <button onClick={()=>{setCount(count+1234567890)}}>+1234567890</button> 
      <button on={()=>{setCount(count+1234567890)}}>+1234567890</button> 
    </>
  )
}