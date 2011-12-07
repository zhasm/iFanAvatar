$(function() {
    $("#char").focus();

    var step = 1;

    $('.nav-handler').click(function(event) {

        var $stepsWrapper = $('#stepsWrapper');
        var $active = $('>.active', $stepsWrapper);
        var $target, $furtherTarget;

        if(/left/.test(event.currentTarget.id)) {
            $target = $active.prev();
            $furtherTarget = $target.prev();
        } else if (/right/.test(event.currentTarget.id)) {
            $target = $active.next();
            $furtherTarget = $target.next();
        }


        $active.removeClass('active');
        $target.addClass('active');

        step = parseInt($target[0].id.replace(/step/, ''), 10);

        $('.current_hinter').removeClass('current_hinter');
        $("#hinter" + step).addClass('current_hinter');

        $('.hinter_desc').css({
            backgroundPositionX: (step - 1) * -76 + 'px',
        }).animate({
            left: $('.current_hinter').position().left,
        });



        if ($furtherTarget.length === 0) {
            $(this).addClass('gn-hide');
        } else {
            $('.gn-hide').removeClass('gn-hide');
        }

        $stepsWrapper.animate({
            left: $target.position().left * -1
        });

    });

});
