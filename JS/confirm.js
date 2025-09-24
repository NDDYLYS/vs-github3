window.addEventListener("load", function()
{
    var links = document.querySelectorAll("a.confirm-link");
    for(var i = 0; i < links.length; i++)
    {
        links[i].addEventListener("click", function(e)
        {
            var comment = this.dataset.comment;
            if (comment == undefined)
                comment = "정말로 이동하시겠습니까?";

            var choice = window.confirm(comment);
            if (choice == false)
                e.preventDefault();
        });
    }
});