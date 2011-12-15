$(document).ready(function() {
    $("#char").focus();

    var step = 1;

    $('.nav-handler').click(function(event) {
        if (! $("#char").val())
        {
            return ;
        }
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

    $('#color-bg').click(function() {
        $("#color-bg").autocomplete("search", "");
    });


    $("#color-bg").autocomplete({
        source: ['181818',
                 '313231',
                 '0073CC',
                 '00A3CC',
                 '00CC73',
                 '00CCBE',
                 '0500CC',
                 '43CC00',
                 '5D00BF',
                 '808080',
                 '96CC00',
                 'A300CC',
                 'C20E09',
                 'CC0051',
                 'CC00A3',
                 'CC2700',
                 'CC7900',
                 'CCB100',
                 'FF7E7E',
                 'FF7EB2',
                ],
        minLength: 0,
        select: function (event, ui) {
            $("#color-bg").val('#' + ui.item.value);
            return false;
        },
        focus: function(event, ui) {
            $("#color-bg").val('#' + ui.item.value);
        }
            
    })
        .data("autocomplete")._renderItem = function (ul, item) {
            var html_str = '<li class="autocomplete" id="' +
                item.value +
                '"style="background-color:#' +
                item.value +
                ';hover{background-color:#' +
                item.value + ';}"></li>';
            var node = $(html_str)
                .data( "item.autocomplete", item )
                .append('<a>&nbsp;</a>').appendTo(ul);
        };

    $('#color-shadow, #color-text').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
            hex = hex.toUpperCase();
            $(el).val("#"+hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            hex = hex.toUpperCase();
            $(el).val("#"+hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    }).bind('keyup', function() {
            $(this).ColorPickerSetColor(this.value);
    });

    $("#deer-horn-left").resizable({
        aspectRatio: 1/1,
        maxHeight: 200,
        maxWidth: 200,
        minHeight: 10,
        minWidth: 10
    }).draggable({
        zIndex: 9999999,
        stop: function() {
            $(this).removeClass('ui-draggable-dragging');
        }
    });

    $("#deer-horn-right").resizable({
        aspectRatio: 1/1,
        maxHeight: 200,
        maxWidth: 200,
        minHeight: 10,
        minWidth: 10
    }).draggable({
        zIndex: 9999999,
        stop: function() {
            $(this).removeClass('ui-draggable-dragging');
        }
    });

    $("#char").keyup(function () {
        var img_text = $("#char").val();
        if (img_text)
        {
            $("#turn-right").removeClass("gn-right-disable");
            $("#turn-right").addClass("gn-right");
        }
        else
        {
            $("#turn-right").removeClass("gn-right");
            $("#turn-right").addClass("gn-right-disable");
        }
    });
});
