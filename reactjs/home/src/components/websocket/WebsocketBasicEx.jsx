import { useState, useCallback, useEffect } from "react";
import Jumbotron from "../templates/Jumbotron";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// npm i sockjs-client @stomp/stompjs 설치 필요 
export default function WebsocketBasicEx(){

    const [client, setClient] = useState(null);

    useEffect(() => {
        const client = conectToServer();
        setClient(client);

        return ()=>{
            disconnectFromServer(client);
            setClient(null);
        }
    }, []);


    // 연결 생성 > client 생성 > 구독 설정
    const conectToServer = useCallback(()=>{
        //1
        const socket = new SockJS("http://localhost:8080/ws");
        //2
        const client = new Client({
            webSocketFactory: () => socket, // 소켓 정보 설정
            onConnect: () => { // 연결 성공 시
                client.subscribe("/public/basic", (message) => { // 구독 설정
                    console.log("메시지 수신 : ", message);
                });
            },
            debug: (str) => {
                console.log(str);
            }
        });

        client.activate();

        return client

    }, []);

    const disconnectFromServer = useCallback((client)=>{
        if (client)
            client.deactivate();
    }, []);

    return (

        <>
            <Jumbotron subject="웹소켓 basic" detail="웹소켓을 이용한 채팅 테스트 페이지입니다." />
        </>

    )
}