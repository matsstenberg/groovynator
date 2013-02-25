require(['$api/models'], function (models) {

    // When application has loaded, run pages function
    models.application.load('arguments').done(pages);

    // When arguments change, run pages function
    models.application.addEventListener('arguments', pages);

    function pages() {
        var arg = models.application.arguments[0];
        $('.section').each(function(){
            $(this).hide();
        })
        switch(arg)
        {
        case 'key':
            renderKeyTab();
            break;
        case 'tempo':
            renderTempoTab();
            break;
        default:
        }
        $('#' + arg).show();
    }
});