import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import Swal from 'sweetalert2';

export default function MemberJoin() {


    //render
    return (<>
        <Jumbotron subject="member-join" detail="회원가입을 구현한다" />
    </>)
}