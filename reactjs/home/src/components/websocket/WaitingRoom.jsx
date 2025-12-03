import { useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { useCallback } from "react";
import { useEffect } from "react";

export default function WaitingRoom() {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    //callback
    const loadData = useCallback(async () => {
        const { data } = await axios.get("/room/");
        setRoomList(data);
    }, []);

    return (

        <>
            <Jumbotron subject="대기실" detail="기다리는 방"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    {roomList.map(room => (
                        <div className="row mb-4" key={room.roomNo}>
                            <div className="col p-4 shadow rounded">
                                <div className="fs-3 d-flex align-items-center mb-4">
                                    <span className="badge text-bg-primary">{room.roomNo}</span>
                                    <span className="ms-4">{room.roomName}</span>
                                </div>
                                <button type="button" className="btn btn-success">참여하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}