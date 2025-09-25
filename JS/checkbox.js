window.addEventListener("load", function()
{
    var allCheckList = document.querySelectorAll(".check-all");
    for(var i = 0; i < allCheckList.length; i++)
    {
        allCheckList[i].addEventListener("input", function(){
            var checkItemList = document.querySelectorAll(".check-item");
            for(var k = 0; k < checkItemList.length; k++)
            {
                checkItemList[k].checked = this.checked;
            }

            refreshCheckbox();
        });
    }

    var requiredCheckList = document.querySelectorAll(".check-required");
    for(var i = 0; i < requiredCheckList.length; i++)
    {
        requiredCheckList[i].addEventListener("input", function(){
            var requiredCheckItemList = document.querySelectorAll(".check-item.check-item-required");
            for(var k = 0; k < requiredCheckItemList.length; k++)
            {
                requiredCheckItemList[k].checked = this.checked;
            }

            refreshCheckbox();
        });
    }

    function refreshCheckbox()
    {
        var checkitemList = document.querySelectorAll(".check-item");
        var selectedcheckitemList = document.querySelectorAll(".check-item:checked");
        var all = checkitemList.length == selectedcheckitemList.length;
        var allcheckboxList = document.querySelectorAll(".check-all");
        for(var i = 0; i < allcheckboxList.length; i++)
           allcheckboxList[i].checked = all;
    
        var requireditemList = document.querySelectorAll(".check-item.check-item-required");
        var selectedrequireditemList = document.querySelectorAll(".check-item.check-item-required:checked");
        var required = requireditemList.length == selectedrequireditemList.length;
        var requiredcheckboxList = document.querySelectorAll(".check-required");
        for(var i = 0; i < requiredcheckboxList.length; i++)
           requiredcheckboxList[i].checked = required;
    }

    var checkItemList = document.querySelectorAll(".check-item");
    for(var i = 0; i < checkItemList.length; i++)
        checkItemList[i].addEventListener("input", refreshCheckbox);
});
