import { useMemo } from "react";
import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";

export default function Exam04(){

// 편하지만 작업양이 많고 서버와 형태가 다르다
//const [pokemonName, setPokemonName] = useState("");
//const [pokemonType, setPokemonType] = useState("");

const [pokemon, setPokemon] = useState({
    pokemonName:"",
    pokemonType:""
});
const pokemonNameValid = useMemo(()=>{
    const regex = /^[가-힣]{1,10}$/;
    return regex.test(pokemon.pokemonName);
}, [pokemon.pokemonName]);
const pokemonTypeValid = useMemo(()=>{
    return pokemon.pokemonType.length > 0 && pokemon.pokemonType.length <= 10;
}, [pokemon.pokemonType]);
const pokemonValid = useMemo(()=>{
    return pokemonNameValid && pokemonTypeValid;
}, [pokemonNameValid, pokemonTypeValid]);

    return (
        <>
            <Jumbotron subject="예제 4번" detail="여러 state를 관리하는 방법을 알아본다"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">포켓몬 이름</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" value={pokemon.pokemonName}
                    onChange={e=>{
                        setPokemon({
                        ...pokemon,
                        pokemonName:e.target.value
                    })
                    }}/>
                </div>
            </div>

             <div className="row mt-4">
                <label className="col-sm-3 col-form-label">포켓몬 속성</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" value={pokemon.pokemonType}
                    onChange={e=>{
                        setPokemon({
                        ...pokemon,
                        pokemonType:e.target.value
                    })
                    }}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    disabled={pokemonValid == false}>등록</button>
                </div>     
            </div>
        </>
    )
}