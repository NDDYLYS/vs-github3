function checkAll()
{        
    var all = document.querySelector(".check-all");
    var alls = document.querySelectorAll(".check-item");
    for(var i = 0; i < alls.length; i++)
    {
        alls[i].checked = all.checked;
    }

    refreshCheck();
}

function checkRequired()
{            
    var required = document.querySelector(".check-required");
    var requireds = document.querySelectorAll(".check-item-required");
    for(var i = 0; i < requireds.length; i++)
    {
        requireds[i].checked = required.checked;
    }

    refreshCheck();
}

function refreshCheck()
{
    var checkitems = document.querySelectorAll(".check-item");
    var selectedcheckitems = document.querySelectorAll(".check-item:checked");
    var all = checkitems.length == selectedcheckitems.length;
    var allcheckbox = document.querySelector(".check-all");
    allcheckbox.checked = all;

    var requireditems = document.querySelectorAll(".check-item-required");
    var selectedrequireditems = document.querySelectorAll(".check-item-required:checked");
    var required = requireditems.length == selectedrequireditems.length;
    var requiredcheckbox = document.querySelector(".check-required");
    requiredcheckbox.checked = required;
}