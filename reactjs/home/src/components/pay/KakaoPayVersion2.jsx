import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";

export default function KakaoPayVersion2() {
    //state
    const [giftcardList, setGiftcardList] = useState([]);

    //effect
    useEffect(()=>{
        loadData();
    }, []);

    //callback
    const loadData = useCallback(async ()=>{
        const {data} = await axios.get("/giftcard/");
        setGiftcardList(data);
    }, []);

    //render
    return (<>
        <Jumbotron subject="KakaoPayVersion2" detail="KakaoPayVersion2KakaoPayVersion2KakaoPayVersion2" />

        <div className="row mt-4">
            <div className="col">
                <div className="text-nowrap table-responsive">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    {/* 전체선택 체크박스 */}
                                    <input type="checkbox"/>
                                </th>
                                <th>이름</th>
                                <th>금액</th>
                                <th>포인트</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            {giftcardList.map(giftcard=>(
                            <tr key={giftcard.giftcardNo}>
                                <td><input type="checkbox"/></td>
                                <td>{giftcard.giftcardName}</td>
                                <td>{giftcard.giftcardPrice}</td>
                                <td>{giftcard.giftcardPoint}</td>
                                <td>입력창</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </>)
}