function collect_param()
{
    //gather params
    var theme = $('input:radio[name=theme]:checked').val();
    if (theme === 'cx50')
    {
        //read from user selected colors
        theme = $("#color-bg").attr("rel");
    }

    var bh_info = $('#theme-hl').is(':checked') ? 'h' : '';
    bh_info = bh_info + ($('#theme-border').is(':checked') ? 'b' : '');
    bh_info = bh_info ? ('_' + bh_info) : '';

    var bg = theme + bh_info + '.png';

    var font_related = {font: $(".black-border").attr("rel"),
                        text: escape($("#char").val()),
                        textColor: $('#color-text').val(),
                        shadowColor: $('#color-shadow').val(),
                        shadow:  $('input:radio[name=theme-shadow]:checked').val()
                       };

    var hat_related = {};
    if (theme === 'deer')
    {
        //get left hat info
        var base = $('#demo-head').offset();
        var left_holder = $('#deer-horn-left');
        var left_holder_offset = left_holder.offset();
        var left_horn = {hat: 'lefthorn.png',
                         angle: 0,
                         offsetLeft: left_holder_offset.left - base.left,
                         offsetTop: left_holder_offset.top - base.top,
                         hatWidth: $('#horn-img-left').width(),
                         hatHeight:  $('#horn-img-left').height()
                        };
        hat_related.left = left_horn;

        var right_holder = $('#deer-horn-right');
        var right_holder_offset = right_holder.offset();
        var right_horn = {hat: 'righthorn.png',
                         angle: 360,
                         offsetLeft: right_holder_offset.left - base.left,
                         offsetTop: right_holder_offset.top - base.top,
                         hatWidth: $('#horn-img-right').width(),
                         hatHeight:  $('#horn-img-right').height()
                        };
        hat_related.right = right_horn;
    }

    return {bg: bg,
            font_related: font_related,
            hat_related: hat_related};
}

function head_preview (event)
{
    if (! $("#char").val())
    {
        show_step(1);
        return;
    }

    var params = collect_param();

    //gen url
    var gen_url = function(added_params)
    {
        var result = '';

        for (added in added_params)
        {
            result = result + '&' + added + '=' + added_params[added];
        }
        return result;
    }


    var new_url = '/gen?bg=' + params.bg;
    new_url = new_url + gen_url(params.font_related);
    var rst_url = new_url;
    if ( $('input:radio[name=theme]:checked').val() == 'deer')
    {
        new_url = new_url + gen_url(params.hat_related.left);
        new_url = new_url + gen_url(params.hat_related.right);
    }

    new_url = new_url.replace(/#/gi, '%23');
    rst_url = rst_url.replace(/#/gi, '%23');

    //update the demo head src
    $('#demo-head').attr('src', rst_url);
    $('#final-demo-head').attr('src', new_url);
    $('#save-to-disk').attr('href', new_url + '&save=1');
};

function show_step(step)
{
    //show the horn for deer style
    if (step === 3)
    {
        var theme = $('input:radio[name=theme]:checked').val();
        if (theme === 'deer')
        {
            $("#horn-img-container").show();
            $('.color-options').hide();
            $('.master-list-down').hide();
        }
        else
        {
            $("#horn-img-container").hide();
            if (theme === 'cx50')
            {
                $("#horn-img-container").hide();
                $('.colors label').show();
                $('.color-options').show();
                $('.master-list-down').show();
            }
            else
            {
                $("#horn-img-container").hide();
                $('.colors label').hide();
                $('.color-options').show();
                $('.master-list-down').show();
            }
        }
        head_preview();
    }

    //show nav handler
    $(".nav-handler").show();
    if (step === 1)
    {
        $("#turn-left").hide();
    }
    if (step === 4)
    {
        $("#turn-right").hide();
        head_preview();
    }

    $(".steps").hide();
    $("#step" + step.toString()).show();

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
}

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
        show_step(step);
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
        source: [{value: '181818', file_name: 'cx10'},
                 {value: '313231', file_name: 'bg'},
                 {value: '0073CC', file_name: 'c206'},
                 {value: '00A3CC', file_name: 'c192'},
                 {value: '00CC73', file_name: 'c154'},
                 {value: '00CCBE', file_name: 'c176'},
                 {value: '0500CC', file_name: 'c242'},
                 {value: '43CC00', file_name: 'c100'},
                 {value: '5D00BF', file_name: 'c270'},
                 {value: '808080', file_name: 'cx50'},
                 {value: '96CC00', file_name: 'c76'},
                 {value: 'A300CC', file_name: 'c288'},
                 {value: 'C20E09', file_name: 'deer'},
                 {value: 'CC0051', file_name: 'c336'},
                 {value: 'CC00A3', file_name: 'c312'},
                 {value: 'CC2700', file_name: 'c12'},
                 {value: 'CC7900', file_name: 'c36'},
                 {value: 'CCB100', file_name: 'c52'},
                 {value: 'FF7E7E', file_name: 'c01'},
                 {value: 'FF7EB2', file_name: 'c336a'}
                ],
        minLength: 0,
        select: function (event, ui) {
            $("#color-bg").val('#' + ui.item.value);
            $("#color-bg").attr("rel", ui.item.file_name);
            return false;
        },

        focus: function(event, ui) {
            $("#color-bg").val('#' + ui.item.value);
            $("#color-bg").attr("rel", ui.item.file_name);
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
    $(".preview-button").click(head_preview);
    $('.finish-button').click(function (event) {
        window.location.href = "/upload";
    });

    $('.theme_preview').click(function (event) {
        $(event.target).next().attr('checked', 'checked');
    });
});
