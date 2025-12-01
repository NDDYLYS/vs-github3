import { useCallback, useEffect } from "react";
import Jumbotron from "../templates/jumbotron";


export default function AccountPayInfomation() {

    const [paymentList, setPaymentList] = useState([]);

    useEffect(()=>{
        loadData();
    });

    const loadData = useCallback(async()=>{
        const {data} = await axios.get("/payment/account");
        setPaymentList(data);
    }, []);

    const calculateStatus = useCallback(payment=>{
        const [paymentTotal, paymentRemain] = payment;
        if (paymentTotal === paymentRemain) 
            return "결제완료";
        if (paymentRemain === 0) 
            return "결제전체취소";
        return "결제취소";
    }, []);

    return (

        <>
            <Jumbotron subject="결제내역" detail="AccountPayInfomation"></Jumbotron>

           {paymentList.map(payment=>{
                <div className="row mt-4">
                    <div className="col">
                        <div>{payment.paymentName}</div>
                        <div>금액:{payment.paymentTotal}</div>
                        <div>번호:{payment.paymentTid}</div>
                        <div>일시:{payment.paymentTime}</div>
                        <div>상태:{calculateStatus}</div>
                        <div className="mt-2">
                            <Link className="btn btn-lg btn-primary" 
                            to={`/account/info/pay/${payment.paymentNo}`}>상세보기</Link>
                        </div>
                    </div>
                </div>
           })}
        </>

    )

}