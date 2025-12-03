import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { loginCompleteState, loginIdState, loginState } from "../../utils/jotai";
import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useAtom(loginIdState);
    const isLogin = useAtomValue(loginState);
    const loginComplete = useAtomValue(loginCompleteState);


    const [roomList, setRoomList] = useState([]);
    const [input, setInput] = useState({ roomName: "" });

    useEffect(() => {
        if (loginComplete === false)
            return;
        loadData();
    }, [loginComplete]);

    //callback
    const loadData = useCallback(async () => {
        if (isLogin) {
            const { data } = await axios.get("/room/");
            setRoomList(data);
        }
        else {
            const { data } = await axios.get("/room/list");
            setRoomList(data);
        }
    }, [isLogin]);

    const sendData = useCallback(async () => {
        if (input.roomName.length === 0)
            return;

        const { data } = await axios.post("/room/", input);
        loadData();
        setInput({ roomName: "" });
    }, [input, loadData]);

    const enterRoom = useCallback(async (room) => {
        if (room.roomEnter === 'N') {
            await axios.post("/room/enter", room);
        }

        navigate(`/websocket/group/${room.roomNo}`);
    });

    return (

        <>
            <Jumbotron subject="대기실" detail="기다리는 방"></Jumbotron>
            <h2>현재 아이디 : {loginId}</h2>

            {(loginComplete === true && isLogin === true) && (
                <div className="row mt-4">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <input type="text" className="form-control w-auto flex-grow-1"
                                placeholder="생성할 방 제목 입력" name="roomName"
                                value={input.roomName} onChange={e => setInput({ roomName: e.target.value })}
                                onKeyUp={e => { if (e.key === "Enter") sendData(); }} />
                            <button type="button" className="btn btn-primary ms-2" onClick={sendData}>
                                <span>생성</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mt-4">
                <div className="col">
                    {roomList.map(room => (
                        <div className="row mb-4" key={room.roomNo}>
                            <div className="col p-4 shadow rounded">
                                <div className="fs-3 d-flex align-items-center mb-4">
                                    <span className="badge text-bg-primary">{room.roomNo}</span>
                                    <span className="ms-4">{room.roomName}</span>
                                </div>

                                {(loginComplete && isLogin) && (

                                    <>
                                        <div>
                                            {(room.roomEnter === 'Y') && (
                                                <>
                                                    <button type="button" className="btn btn-success"
                                                        onClick={enterRoom}>입장</button>
                                                </>
                                            )}
                                            {(room.roomEnter === 'N') && (
                                                <>
                                                    <button type="button" className="btn btn- secondary"
                                                        onClick={enterRoom}>참여</button>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}