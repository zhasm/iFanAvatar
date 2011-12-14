$(document).ready(function() {
    $("#char").focus();

    var step = 1;

    $('.nav-handler').click(function(event) {
        
        //show step
        var position = 1;
        if (event.target.id === 'turn-left')
        {
            position = -1;
        }
        step = step + position;
        $(".steps").hide();
        $("#step" + step.toString()).show();
        //show nav handler
        $(".nav-handler").show();
        if (step === 1)
        {
            $("#turn-left").hide();
        }
        if (step === 4)
        {
            $("#turn-right").hide();
        }

        //hinter handler
        $(".hinter").removeClass('current_hinter');
        $("#hinter" + step.toString()).addClass('current_hinter');
        
        var pos = $("#hinter" + step.toString()).position().left;
        //move right
        $('.hinter-desc').css({
            backgroundPositionX: (step - 1) * -76 + 'px'
        }).animate({
            left:  $("#hinter" + step.toString()).position().left
        });
    });

    $(".font-preview").click(function(event) {
        $(".font-preview").removeClass('black-border');
        $(".font-preview").addClass('white-border');
        $(event.target).removeClass('white-border');
        $(event.target).addClass('black-border');
        
    });
});
