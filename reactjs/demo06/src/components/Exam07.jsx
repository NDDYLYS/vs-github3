import { useEffect, useState } from 'react'
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";

export default function Exam07(){
    // const [pokemonList, setPokemonList] = useState(
    //     [
    //         // 객체 배열
    //         {pokemonNo:1, pokemonName:"캡틴", pokemonType:"땅", pokemonLike:0},
    //         {pokemonNo:2, pokemonName:"플래닛", pokemonType:"불", pokemonLike:0},
    //         {pokemonNo:3, pokemonName:"아름다운", pokemonType:"바람", pokemonLike:44},
    //         {pokemonNo:4, pokemonName:"지구", pokemonType:"물", pokemonLike:3},
    //         {pokemonNo:5, pokemonName:"내가지킨다", pokemonType:"마음", pokemonLike:0},
    //     ]
    // )

    const [pokemonList, setPokemonList] = useState([]);

    // effect -> 특정 state가 변할 떄마다 실행되어야 하는 코드를 작성하는 도구(항목이 없으면 1회 실행)

    useEffect(()=>{
        // 섭에 신호를 보내서 받아온 데이터를 pokemonList로 설정하는 코드
        // 2번 실행 방지 위해서는 main.jsx에 있는 <StrictMode> 지우기
        axios({
            url:"http://localhost:8080/pokemon/",
            method:"get",
        })
        .then(response=>{
            setPokemonList(response.data)
        });
    }, []);

    return (
        <>
            <Jumbotron subject="예제7번" detail="배열 형태의 데이터 출력"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <div className="text-nowrap table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>이름</th>
                                    <th>속성</th>
                                    <th>좋아요</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* for */}
                                {pokemonList.map(pokemon=>(
                                    <tr>
                                        <td>{pokemon.pokemonNo}</td>
                                        <td>{pokemon.pokemonName}</td>
                                        <td>{pokemon.pokemonType}</td>
                                        <td>{pokemon.pokemonLike}</td>
                                    </tr>)
                                )}
                                {/* for */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}