import { useCallback, useEffect, useMemo, useState } from "react";
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
        //data에 check여부와 수량항목을 추가
        const convert = data.map(giftcard=>({
            ...giftcard,//모두 유지하되
            check: false,//체크는 안한걸로 추가하고
            qty: 1,//수량은 1로 하자
        }));
        setGiftcardList(convert);//바꾼 정보로 state 설정
    }, []);

    //목록을 체크하는 경우에 대한 처리
    const changeGiftcardCheck = useCallback(e=>{
        //e.target에서 giftcard번호를 추출(value)
        const {value, checked} = e.target;

        //giftcardList에서 번호가 같은 대상의 체크상태를 변경
        const convert = giftcardList.map(giftcard=>{
            if(giftcard.giftcardNo === parseInt(value)) {//번호가 같다면
                return {...giftcard , check: checked};//check 항목만 수정해서 반환
            }
            return giftcard;//그냥 반환
        });

        setGiftcardList(convert);
    }, [giftcardList]);

    const changeGiftcardQty = useCallback(e=>{
        //data-pk에 번호가 있고 value에 입력값이 있다
        const giftcardNo = e.target.dataset.pk;
        const value = e.target.value;

        const convert = giftcardList.map(giftcard=>{
            if(giftcard.giftcardNo === parseInt(giftcardNo)) {//번호가 같다면
                return {...giftcard , qty: parseInt(value)};//qty 항목만 수정해서 반환
            }
            return giftcard;//그냥 반환
        });

        setGiftcardList(convert);
    }, [giftcardList]);

    const changeGiftcardQty2 = useCallback((e, obj)=>{//(e) 이벤트정보 , (obj) 데이터 객체
        const convert = giftcardList.map(giftcard=>{
            if(giftcard.giftcardNo === obj.giftcardNo) {//번호가 같다면
                return {...giftcard , qty: parseInt(e.target.value)};//qty 항목만 수정해서 반환
            }
            return giftcard;//그냥 반환
        });
        setGiftcardList(convert);
    }, [giftcardList]);

    //memo
    //- 체크된 상품 목록
    const checkedGiftcardList = useMemo(()=>{
        return giftcardList.filter(giftcard=>giftcard.check === true);
    }, [giftcardList]);

    //- 체크된 상품 목록 금액 합계
    const checkedTotal = useMemo(()=>{
        // 클래식하게
        // let total = 0;
        // for(let i=0; i < checkedGiftcardList.length; i++) {
        //     total += checkedGiftcardList[i].giftcardPrice * checkedGiftcardList[i].qty;//가격 x 수량
        // }
        // return total;

        // 모던하게
        return checkedGiftcardList.reduce(
            (total, giftcard)=> total + (giftcard.giftcardPrice * giftcard.qty), //합치기 위한 작업
            0 //초기값
        );
    }, [checkedGiftcardList]);

    //render
    return (<>
        <Jumbotron subject="카카오페이 결제 버전2" detail="실제 상품 결제(포인트 충전권)" />

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
                                <th width="100">수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            {giftcardList.map(giftcard=>(
                            <tr key={giftcard.giftcardNo}>
                                <td>
                                    <input type="checkbox" value={giftcard.giftcardNo} 
                                            checked={giftcard.check} onChange={changeGiftcardCheck}/>
                                </td>
                                <td>{giftcard.giftcardName}</td>
                                <td>{giftcard.giftcardPrice}</td>
                                <td>{giftcard.giftcardPoint}</td>
                                <td>
                                    <input type="number" inputMode="numeric"
                                        className="form-control" min={1}
                                        value={giftcard.qty} 
                                        disabled={giftcard.check === false}
                                        
                                        // data-pk={giftcard.giftcardNo}
                                        // onChange={changeGiftcardQty}

                                        onChange={e=>changeGiftcardQty2(e, giftcard)}
                                    />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

        {/* 합계 금액 */}
        <div className="row mt-4">
            <div className="col fs-2">
                총 {checkedGiftcardList.length}개의 상품권 선택
            </div>
            <div className="col text-end fs-2">
                결제 금액 : {checkedTotal}원
            </div>
        </div>

        {/* 구매 버튼 */}
        <div className="row mt-4">
            <div className="col text-end">
                <button className="btn btn-lg btn-success">구매하기</button>
            </div>
        </div>

    </>)
}