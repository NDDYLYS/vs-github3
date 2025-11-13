import { useCallback, useMemo } from "react";
import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";

export default function Exam04(){

// 편하지만 작업양이 많고 서버와 형태가 다르다
//const [pokemonName, setPokemonName] = useState("");
//const [pokemonType, setPokemonType] = useState("");

const [pokemon, setPokemon] = useState({
    pokemonName:"",
    pokemonType:""
});
// 객체의 검사 결과를 수동으로 관리하도록 state를 하나 더 만든다
const [pokemonClass, setPokemonClass] = useState({
    pokemonName:"", // "is-valid" or "is-invalid"
    pokemonType:"" // "is-valid" or "is-invalid"
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

const sendData = useCallback(()=>{
    axios({
        url:"http://localhost:8080/pokemon/",
        method:"post",
        data:pokemon
    })
    .then(response=>{
        //console.log("포켓몬 등록 완료");
        toast.success("포켓몬 등록 완료");
    });
}, [pokemon]);

    return (
        <>
            <Jumbotron subject="예제 4번" detail="여러 state를 관리하는 방법을 알아본다"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">포켓몬 이름</label>
                <div className="col-sm-9">
                    <input type="text" className={"form-control " + pokemonClass.pokemonName} value={pokemon.pokemonName}
                    onChange={e=>{
                        setPokemon({
                        ...pokemon,
                        pokemonName:e.target.value
                        });
                    }}
                    onBlur={e=>{
                        setPokemonClass({
                            ...pokemonClass, 
                            pokemonName : pokemonNameValid ? "is-valid" : "is-invalid"
                        });
                    }}
                    />
                    <div className="valid-feedback">좋은 이름</div>
                    <div className="invalid-feedback">나쁜 이름</div>
                </div>
            </div>

             <div className="row mt-4">
                <label className="col-sm-3 col-form-label">포켓몬 속성</label>
                <div className="col-sm-9">
                    <input type="text" className={"form-control " + pokemonClass.pokemonType} value={pokemon.pokemonType}
                    onChange={e=>{
                        setPokemon({
                        ...pokemon,
                        pokemonType:e.target.value
                        });
                    }}
                    onBlur={e=>{
                        setPokemonClass({
                            ...pokemonClass, 
                            pokemonType : pokemonTypeValid ? "is-valid" : "is-invalid"
                        });
                    }}
                    />
                    <div className="valid-feedback">좋은 속성</div>
                    <div className="invalid-feedback">나쁜 속성</div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    disabled={pokemonValid == false} onClick={sendData}>등록</button>
                </div>     
            </div>
        </>
    )
}