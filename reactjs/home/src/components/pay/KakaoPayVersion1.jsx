import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function KakaoPayVersion1() {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        itemName: "",
        totalAmount: ""
    })

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const sendData = useCallback(async () => {
        const { data } = await axios.post("/kakaopay/v1/buy", input);
        console.log(data);
        navigate(data.next_redirect_pc_url);
    }, [input]);

    return (

        <>

            <Jumbotron subject="KakaoPayVersion1" detail="KakaoPayVersion1KakaoPayVersion1KakaoPayVersion1"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">구입 물품</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        name="itemName" value={input.itemName} onChange={changeStrValue} />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">개수</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" name="totalAmount"
                        value={input.totalAmount} onChange={changeStrValue}></input>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-success btn-lg w-100" onClick={sendData}>
                        구매하기
                    </button>
                </div>
            </div>

        </>
    );
}