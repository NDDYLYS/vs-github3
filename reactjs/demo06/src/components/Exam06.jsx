import { useCallback, useMemo, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { FaAsterisk } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

export default function Exam06(){
    const[book, setBook] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublicationDate : "",
        bookPrice : "",
        bookPublisher : "",
        bookPageCount : "",
        bookTitle : "",
        bookGenre : ""
    });
    
    const[bookClass, setBookClass] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublicationDate : "",
        bookPrice : "",
        bookPublisher : "",
        bookPageCount : "",
        bookTitle : "",
        bookGenre : ""
    });

    const changeStrValue = useCallback(e=>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    }, [book]);
    const changeNumberValue = useCallback(e=>{
        const regex = /[^0-9]+/g;
        const replace = e.target.value.replace(regex, "");
        const number = (replace.length == 0) ? 0 : parseInt(e.target.value);

        setBook({
            ...book,
            [e.target.name] : number
        });
    }, [book]);
    const checkBookStr1 = useCallback(e=>{
        const regex = /^[가-힣]{1,100}$/;
        const isValid = regex.test(book.bookTitle);
        setBookClass({
            ...bookClass,
            bookTitle : isValid ? "is-valid" : "is-invalid"
        });
    }, [book]);
    const checkBookStr2 = useCallback(e=>{
        const regex = /^[가-힣]{1,30}$/;
        const isValid = regex.test([e.target.value]);
        setBookClass({
            ...bookClass,
            [e.target.name] : isValid ? "is-valid" : "is-invalid"
        });
    }, [book]);
    const checkBookStr3 = useCallback(e=>{
        const regex = /^[가-힣]{1,10}$/;
        const isValid = regex.test([e.target.value]);
        setBookClass({
            ...bookClass,
            [e.target.name] : isValid ? "is-valid" : "is-invalid"
        });
    }, [book]);
    const checkBookNumber1 = useCallback(e=>{
        setBookClass({
            ...bookClass,
            [e.target.name] : (e.target.value >= 0) ? "is-valid" : "is-invalid"
        });
    }, [book]);
    const checkBookNumber2 = useCallback(e=>{
        setBookClass({
            ...bookClass,
            [e.target.name] : (e.target.value > 0) ? "is-valid" : "is-invalid"
        });
    }, [book]);
    const checkBookAllOK = useCallback(e=>{
        setBookClass({
            ...bookClass,
            [e.target.name] : "is-valid"
        });
    }, [book]);

    const sendable = useMemo(()=>{
        let count = 0;
        if (bookClass.bookTitle === "is-valid") count++;
        if (bookClass.bookPrice === "is-valid") count++;
        if (bookClass.bookPageCount === "is-valid") count++;
        if (bookClass.bookGenre === "is-valid") count++;
        if (bookClass.bookAuthor === "is-valid") count++;
        if (bookClass.bookPublisher === "is-valid") count++;
        if (bookClass.bookPublicationDate === "is-valid") count++;
        return count === 7;
    }, [bookClass]);

    const sendData = useCallback(()=>{
    axios({
        url:"http://localhost:8080/book/",
        method:"post",
        data:book
    })
    .then(response=>{
        toast.success("도서 등록 완료");
    });
}, [book]);

    return (
        <>
            <Jumbotron subject="예제6번" detail="도서 등록 화면 React로 만들기"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서명 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookTitle" 
                    className={`form-control ${bookClass.bookTitle}`} 
                    value={book.bookTitle} 
                    onChange={changeStrValue}
                    onBlur={checkBookStr1}>
                    </input>
                    <div className="valid-feedback">좋은 도서명입니다.</div>
                    <div className="invalid-feedback">나쁜 도서명입니다.</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 금액 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookPrice" 
                    className={`form-control ${bookClass.bookPrice}`}
                    value={book.bookPrice} 
                    onChange={changeNumberValue} inputMode="numeric" 
                    onBlur={checkBookNumber1}>
                    </input>
                    <div className="invalid-feedback">0원 이상이어야 합니다.</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 페이지 수 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookPageCount" 
                    className={`form-control ${bookClass.bookPageCount}`}
                    value={book.bookPageCount} 
                    onChange={changeNumberValue} inputMode="numeric"
                    onBlur={checkBookNumber2}>
                    </input>
                    <div className="invalid-feedback">1장 이상이어야 합니다.</div>
                </div>
            </div>
            
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 장르 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <select name="bookGenre" 
                    className={`form-select ${bookClass.bookGenre}`}
                    value={book.bookGenre} 
                    onChange={changeStrValue}                     
                    onBlur={checkBookStr3}>
                        <option value="">선택하세요</option>
                        <option>추리/미스터리</option>
                        <option>과학소설</option>
                        <option>판타지</option>
                        <option>로맨스</option>
                        <option>스릴러/서스펜스</option>
                        <option>역사 소설</option>
                        <option>전기/평전</option>
                        <option>성장 소설</option>
                        <option>자기 계발</option>
                    </select>
                    <div className="invalid-feedback">옳지 않은 장르입니다.</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 저자</label>
                <div className="col-sm-9">
                    <input type="text" name="bookAuthor" 
                    className={`form-control ${bookClass.bookAuthor}`}
                    value={book.bookAuthor} 
                    onChange={changeStrValue}
                    onBlur={checkBookStr2}>
                    </input>
                    <div className="valid-feedback">좋은 저자입니다.</div>
                    <div className="invalid-feedback">나쁜 저자입니다.</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출간일</label>
                <div className="col-sm-9">
                    <input type="date" name="bookPublicationDate" 
                    className={`form-control ${bookClass.bookPublicationDate}`}
                    value={book.bookPublicationDate} 
                    onChange={changeStrValue}                    
                    onBlur={checkBookAllOK}>
                    </input>
                    <div className="valid-feedback">좋은 출간일입니다.</div>
                </div>
            </div>


            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출판사</label>
                <div className="col-sm-9">
                    <input type="text" name="bookPublisher" 
                    className={`form-control ${bookClass.bookPublisher}`}
                    value={book.bookPublisher} 
                    onChange={changeStrValue}
                    onBlur={checkBookStr2}>
                    </input>
                    <div className="valid-feedback">좋은 출판사입니다.</div>
                    <div className="invalid-feedback">나쁜 출판사입니다.</div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    disabled={sendable == false} onClick={sendData}>등록</button>
                </div>     
            </div>
        </>
    )
}