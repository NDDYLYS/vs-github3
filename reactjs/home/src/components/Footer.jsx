import { FaAsterisk } from "react-icons/fa6";

export default function Footer (){

    return (
        <>
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="container-fluid mb-5 pb-5">
                        <div className="row">

                            <div className="col-md-6">
                                
                                <div className="row">
                                    <div className="col fs-2 fw-bold">
                                        KH정보교육원
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        오산시 남촌동 성산새싹길 32 개나리맨숀 202호
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col">
                                        이윤석
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col">
                                        경찰서 - 112
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        
                                        <div className="row">
                                            <div className="col fs-2">
                                                지점정보
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col">
                                                강남지점 <FaAsterisk />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                종로지점 <FaAsterisk />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                당산지점 <FaAsterisk />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                부산지점 <FaAsterisk />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-sm-6">
                                        
                                        <div className="row">
                                            <div className="col fs-2">
                                                운영 방침
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col">
                                                <FaAsterisk /> 홈페이지 이용약관
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col">
                                                <FaAsterisk /> 개인정보 처리방침
                                            </div>
                                        </div>

                                        <div className="row mt-5">
                                            <div className="col fs-2">
                                                파트너쉽
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col">
                                                <FaAsterisk />
                                                <FaAsterisk />
                                                <FaAsterisk />
                                                <FaAsterisk />
                                                <FaAsterisk />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}