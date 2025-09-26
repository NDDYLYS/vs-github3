window.addEventListener("load", function () {
    var state = { memberAddressValid : true,
    };

    document.querySelector("[name=memberAddress2]")
    .addEventListener("blur", function(){
        var memberPostInput = document.querySelector("[name=memberPost]");
        var memberAddress1Input = document.querySelector("[name=memberAddress1]");
        var memberAddress2Input = this;
        var empty = memberPostInput.value.length == 0 &&
            memberAddress1Input.value.length == 0 &&
            memberAddress2Input.value.length == 0;
        var fill = memberPostInput.value.length > 0 &&
            memberAddress1Input.value.length > 0 &&
            memberAddress2Input.value.length > 0;
            var valid = empty || fill;

        memberPostInput.classList.remove("success", "fail");
        memberPostInput.classList.add(valid? "success" : "fail");
        memberAddress1Input.classList.remove("success", "fail");
        memberAddress1Input.classList.add(valid? "success" : "fail");
        memberAddress2Input.classList.remove("success", "fail");
        memberAddress2Input.classList.add(valid? "success" : "fail");
    });

    //검색 버튼에 대한 클릭 이벤트를 설정
    var addressSearchBtn = document.querySelector(".btn-address-search");
    addressSearchBtn.addEventListener("click", findAddress);
    document.querySelector("[name=memberPost]").addEventListener("click", findAddress);
    document.querySelector("[name=memberAddress1]").addEventListener("click", findAddress);

    function findAddress() 
    {
        //daum에서 제공하는 샘플 코드
        new daum.Postcode({
            oncomplete: function (data) 
            {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.querySelector("[name=memberPost]").value = data.zonecode;
                document.querySelector("[name=memberAddress1]").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.querySelector("[name=memberAddress2]").focus();
                //document.querySelector("[name=memberAddress2]").dispatchEvent(new Event("focus"));

                //삭제버튼 표시
                document.querySelector(".btn-address-clear").style.display = "";
            }
        }).open();
    }

    //주소 삭제버튼
    document.querySelector(".btn-address-clear").addEventListener("click", function(){
        document.querySelector("[name=memberPost]").value = "";
        document.querySelector("[name=memberAddress1]").value = "";
        document.querySelector("[name=memberAddress2]").value = "";
        this.style.display = "none";
    });
});