import { useCallback, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { FaAsterisk } from "react-icons/fa6";

export default function Exam06(){
    const[book, setBook] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublicationDate : "",
        bookPrice : 0,
        bookPublisher : "",
        bookPageCount : 0,
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

    return (
        <>
            <Jumbotron subject="예제6번" detail="도서 등록 화면 React로 만들기"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서명 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookTitle" className="form-control" 
                    value={book.bookTitle} 
                    onChange={changeStrValue}>
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 저자</label>
                <div className="col-sm-9">
                    <input type="text" name="bookAuthor" className="form-control" 
                    value={book.bookAuthor} 
                    onChange={changeStrValue}>
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출간일</label>
                <div className="col-sm-9">
                    <input type="text" name="bookPublicationDate" className="form-control" 
                    value={book.bookPublicationDate} 
                    onChange={changeStrValue}>
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 금액 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookPrice" className="form-control" 
                    value={book.bookPrice} 
                    onChange={changeNumberValue} inputMode="numeric">
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출판사</label>
                <div className="col-sm-9">
                    <input type="text" name="bookPubliesher" className="form-control" 
                    value={book.bookPubliesher} 
                    onChange={changeStrValue}>
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 페이지 수 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <input type="text" name="bookPageCount" className="form-control" 
                    value={book.bookPageCount} 
                    onChange={changeNumberValue} inputMode="numeric">
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서 장르 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <select name="bookGenre" className="form-select" 
                    value={book.bookGenre} onChange={changeStrValue}>
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
                </div>
            </div>
        </>
    )
}