$(function(){
    $(".summernote-editor").summernote({
        height: 250, // set editor height
        minHeight: 200, // set minimum height of editor
        maxHeight: 400, // set maximum height of editor

        placeholder:"타인 죽는다?",
        toolbar:[
        ["font", ["style", "fontname", "fontsize", "forecolor", "backcolor"]],
        ["style", ["bold", "italic", "underline", "strikethrough"]],
        ["attach", ["picture"]],
        ["tool", ["ol", "ul", "paragraph", "table", "hr", "fullscreen"]],
        ],
    });
});