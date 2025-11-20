import { useEffect, useState } from 'react'
import axios from "axios";
import Jumbotron from "../templates/Jumbotron";
import { Link } from "react-router-dom";

export default function PokemonList(){

     const [pokemonList, setPokemonList] = useState([]);

    // effect -> 특정 state가 변할 떄마다 실행되어야 하는 코드를 작성하는 도구(항목이 없으면 1회 실행)

    useEffect(()=>{
        // 섭에 신호를 보내서 받아온 데이터를 pokemonList로 설정하는 코드
        // 2번 실행 방지 위해서는 main.jsx에 있는 <StrictMode> 지우기
        axios({
            url:"/pokemon/",
            method:"get",
        })
        .then(response=>{
            setPokemonList(response.data)
        });
    }, []);

    return (
        <>
            <Jumbotron subject="pokemon-list" detail="포켓몬의 목록을 본다"></Jumbotron>
            
            <div className="row mt-4">
                <div className="col text-end">
                    <Link to="/pokemon/add" className="btn btn-primary btn-lg">포켓몬 등록</Link>
                </div>
            </div>

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
                                    <tr key={pokemon.pokemonNo}>
                                        <td>{pokemon.pokemonNo}</td>
                                        <td>
                                            <Link to={`/pokemon/detail/${pokemon.pokemonNo}`} className="link-underline link-underline-opacity-0 me-3">
                                                {pokemon.pokemonName}
                                            </Link>

                                            <Link to={`/pokemon/detail2/${pokemon.pokemonNo}`} className="link-underline link-underline-opacity-0">
                                                {pokemon.pokemonName}
                                            </Link>
                                        </td>
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

            <div className="row mt-4">
                <div className="col text-end">
                    <Link to="/pokemon/add" className="btn btn-primary btn-lg">포켓몬 등록</Link>
                </div>
            </div>
        </>
    )
}