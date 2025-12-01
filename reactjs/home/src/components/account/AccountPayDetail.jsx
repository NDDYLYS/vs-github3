import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./AccountPayDetail.css";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AccountPayDetail() {
    //parameter
    const { paymentNo } = useParams();

    //state
    const [payment, setPayment] = useState(null);
    const [paymentDetailList, setPaymentDetailList] = useState(null);
    const [kakaopayInfo, setKakaopayInfo] = useState(null);

    //effect
    useEffect(() => {
        loadData();
    }, []);

    //callback
    const loadData = useCallback(async () => {
        const { data } = await axios.get(`/payment/${paymentNo}`);
        const { paymentDto, paymentDetailList, responseVO } = data;
        setPayment(paymentDto);
        setPaymentDetailList(paymentDetailList);
        setKakaopayInfo(responseVO);
    }, []);

    /**
     * 숫자를 세 자리마다 콤마로 포맷하는 가벼운 JavaScript 함수입니다.
     * React 훅 없이 순수하게 정규 표현식 치환을 사용하여 구현되었습니다.
     *
     * @param {string|number} x 포맷할 숫자 또는 숫자 형태의 문자열
     * @returns {string} 콤마가 추가된 포맷팅된 문자열
     */
    const numberWithComma = useCallback((x) => {
        // 1. null, undefined, 빈 문자열 처리
        if (x === null || x === undefined || x === '') {
            return '';
        }

        const numString = String(x);

        // 2. 정수부와 소수부 분리
        const parts = numString.split('.');
        // 정수부만 가져옵니다.
        const integerPart = parts[0];
        // 소수부가 있으면 '.'과 함께 가져오고, 없으면 빈 문자열입니다.
        const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

        // 3. 정규 표현식을 사용하여 정수부에 세 자리마다 콤마 삽입
        // \B: 비단어 경계에만 콤마를 삽입하여 숫자 전체를 감싸지 않도록 합니다.
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // 4. 포맷팅된 정수부와 소수부 결합
        return formattedInteger + decimalPart;
    }, []);

    const cancelAll = useCallback(async () => {
        await axios.delete(`/payment/${paymentNo}`);
        toast.success("전체취소가 완료되었습니다.");
        loadData();
    }, []);

        const cancelUnit = useCallback(async () => {
        await axios.delete(`/payment/${paymentNo}`);
        toast.success("전체취소가 완료되었습니다.");
        loadData();
    }, []);


    //return
    return (<>
        <h1>결제 상세내역</h1>
        <hr />

        {/* 결제 대표정보 */}
        <h2>
            결제 대표정보
        </h2>
        <div className="row mt-4">
            <div className="col">
                {payment === null ? (
                    <h3>결제 대표정보 불러오는중...</h3>
                ) : (<>

                    <div className="row">
                        <div className="col-sm-3 text-primary">결제번호</div>
                        <div className="col-sm-9 text-secondary">{payment.paymentNo}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">거래번호</div>
                        <div className="col-sm-9 text-secondary">{payment.paymentTid}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">구매상품명</div>
                        <div className="col-sm-9 text-secondary">{payment.paymentName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">구매금액</div>
                        <div className="col-sm-9 text-secondary">{numberWithComma(payment.paymentTotal)}원</div>
                    </div>

                    {payment.paymentRemain > 0 && (
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-danger ms-2" onClick={cancelAll}>
                                    전체취소
                                </button>
                            </div>
                        </div>
                    )}
                </>)}
            </div>
        </div>

        <hr />
        {/* 결제 상세정보 */}
        <h2>결제 상세정보</h2>
        <div className="row mt-4">
            <div className="col">
                {paymentDetailList === null ? (
                    <h3>결제 상세정보 불러오는중...</h3>
                ) : (<>
                    {paymentDetailList.map(paymentDetail => (
                        <div className="row mb-4" key={paymentDetail.paymentDetailNo}>
                            <div className="col">
                                <div className="row">
                                    <div className="col-sm-3 text-primary">상세번호</div>
                                    <div className="col-sm-9 text-secondary">{paymentDetail.paymentDetailNo}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 text-primary">상품명</div>
                                    <div className="col-sm-9 text-secondary">{paymentDetail.paymentDetailItemName}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 text-primary">판매가격</div>
                                    <div className="col-sm-9 text-secondary">
                                        {numberWithComma(
                                            paymentDetail.paymentDetailItemPrice * paymentDetail.paymentDetailQty
                                        )}원
                                        (
                                        {numberWithComma(paymentDetail.paymentDetailItemPrice)}원
                                        x
                                        {paymentDetail.paymentDetailQty}개
                                        )
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 text-primary">결제상태</div>
                                    <div className="col-sm-9 text-secondary">{paymentDetail.paymentDetailStatus}</div>
                                </div>

                                {paymentDetail.paymentDetailStatus === "승인" && ()
                                    onClick=
                                }
                            </div>
                            <div 
                        </div>
                    ))}
                </>)}
            </div>
        </div>

        <hr />
        {/* 카카오페이 조회내역 */}
        <h2>카카오페이 정보</h2>
        <div className="row mt-4">
            <div className="col">
                {kakaopayInfo === null ? (
                    <h3>카카오페이 정보 불러오는중...</h3>
                ) : (<>
                    <div className="row">
                        <div className="col-sm-3 text-primary">거래번호</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.tid}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">가맹점코드</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.cid}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 상태</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.status}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">주문번호</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.partner_order_id}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">주문자</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.partner_user_id}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">구매 금액</div>
                        <div className="col-sm-9 text-secondary">
                            <div className="custom-overlay d-flex align-items-center">
                                {numberWithComma(kakaopayInfo.amount.total)}원
                                <FaQuestionCircle className="text-primary ms-2" />
                                <div className="custom-overlay-popup">
                                    <div className="row">
                                        <div className="col-6">비과세액</div>
                                        <div className="col-6">{numberWithComma(kakaopayInfo.amount.tax_free)}원</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">부가세액</div>
                                        <div className="col-6">{numberWithComma(kakaopayInfo.amount.vat)}원</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">포인트 사용</div>
                                        <div className="col-6">{numberWithComma(kakaopayInfo.amount.point)}원</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">할인 적용</div>
                                        <div className="col-6">{numberWithComma(kakaopayInfo.amount.discount)}원</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">컵 보증금</div>
                                        <div className="col-6">{numberWithComma(kakaopayInfo.amount.green_deposit)}원</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">취소 금액</div>
                        <div className="col-sm-9 text-secondary">
                            {kakaopayInfo.cancel_amount !== null ? (
                                <div className="custom-overlay d-flex align-items-center">
                                    {numberWithComma(kakaopayInfo.cancel_amount.total)}원
                                    <FaQuestionCircle className="text-primary ms-2" />
                                    <div className="custom-overlay-popup">
                                        <div className="row">
                                            <div className="col-6">비과세액</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_amount.tax_free)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">부가세액</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_amount.vat)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">포인트 사용</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_amount.point)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">할인 적용</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_amount.discount)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">컵 보증금</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_amount.green_deposit)}원</div>
                                        </div>
                                    </div>
                                </div>
                            ) : "없음"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">취소 가능 금액</div>
                        <div className="col-sm-9 text-secondary">
                            {kakaopayInfo.cancel_avilable_amount !== null ? (
                                <div className="custom-overlay d-flex align-items-center">
                                    {numberWithComma(kakaopayInfo.cancel_available_amount.total)}원
                                    <FaQuestionCircle className="text-primary ms-2" />
                                    <div className="custom-overlay-popup">
                                        <div className="row">
                                            <div className="col-6">비과세액</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_available_amount.tax_free)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">부가세액</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_available_amount.vat)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">포인트 사용</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_available_amount.point)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">할인 적용</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_available_amount.discount)}원</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">컵 보증금</div>
                                            <div className="col-6">{numberWithComma(kakaopayInfo.cancel_available_amount.green_deposit)}원</div>
                                        </div>
                                    </div>
                                </div>
                            ) : "없음"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 이름</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.item_name}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 코드</div>
                        <div className="col-sm-9 text-secondary">
                            {kakaopayInfo.item_code || "없음"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 수량</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.quantity}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 시작시각</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.created_at}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 승인시각</div>
                        <div className="col-sm-9 text-secondary">{kakaopayInfo.approved_at}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 취소시각</div>
                        <div className="col-sm-9 text-secondary">
                            {kakaopayInfo.canceled_at || "없음"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 카드정보</div>
                        <div className="col-sm-9 text-secondary">
                            {kakaopayInfo.selected_card_info !== null ? (<>
                                <div className="row">
                                    <div className="col-6">카드사</div>
                                    <div className="col-6">{kakaopayInfo.selected_card_info.card_corp_name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">카드BIN</div>
                                    <div className="col-6">{kakaopayInfo.selected_card_info.bin}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">할부</div>
                                    <div className="col-6">
                                        {kakaopayInfo.selected_card_info.install_month > 0 ? "Y" : "N"}
                                        {kakaopayInfo.selected_card_info.install_month > 0 && (<>
                                            (
                                            무이자할부 : {kakaopayInfo.selected_card_info.interest_free_install},
                                            할부기간 : {kakaopayInfo.selected_card_info.install_month}개월
                                            )
                                        </>)}
                                    </div>
                                </div>
                            </>) : "없음"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 text-primary">결제 히스토리</div>
                        <div className="col-sm-9 text-secondary">

                        </div>
                    </div>

                </>)}
            </div>
        </div>
    </>);
}