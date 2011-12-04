$(document).ready(function() {

    String.prototype.s= function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };

    function int2css(deg, mirror) {
	var deg=deg;
	if (! mirror){
            return "-webkit-transform: rotate("+deg+"deg); -moz-transform: rotate("+deg+"deg);";
	}
	else{
	    deg=360-deg;
            return "-webkit-transform: rotate("+deg+"deg); -moz-transform: rotate("+deg+"deg);";
	}
    }

    function getImageArgs() {
        var border=getCheckedStatus("#border");
        var highlight=getCheckedStatus("#highlight");
        var status="";

        if (highlight=='True') {
            status+="h";
        }
        if (border=='True') {
            status+="b";
        }
        if (status) {
            status="_"+status;
        }
        return status;
    }

    function getCheckedStatus(checkboxID) {
        //return 1 if checked, or 0
        if ($(checkboxID).attr('checked')) {
            return 'True';
        }
        else {
            return 'False';
        }
    }

    //get auguments
    function getArgs() {
        var bg = $("#bg").val() + getImageArgs($(this)) + ".png";

        //important code for fixing pic name;
        //pls don't delete
        bg=bg.replace(/\.png[_bh]{0,3}\.png$/, '.png');

        var bg_h = $("#highlight").attr("checked");
        var bg_b = $("#border").attr("checked");

        var text=$("#text_input").val();
        var textColor=$("#textColor").val();
        var shadowColor=$("#shadowColor").val();
        var font=$("#font_select").val();
        var border=getCheckedStatus("#border");
        var shadow=$("input[name='shadow']:checked").val();
        var highlight=getCheckedStatus("#highlight");

        return {
            'bg':bg,
            'text':text,
            'textColor':textColor,
            'shadowColor':shadowColor,
            'font':font,
            'border':border,
            'shadow':shadow,
            'highlight':highlight
        };
    }

    function addImgToHistory(data)
    {
        //add img url to history:
        var history=$("#history").html();
        var match=data.match(/\w+\.png/i);
        if (!match)
        {
            return false;
        }

        var img=match[0];
        if (history.search(img) == -1 && data.search("loading.gif") == -1) {
            if ($("#history>a>img").length >= 10) {
                $("#history>a>img:first").remove();
            }

            $("#history").append(data);
        }

        $("#history > a >img").click(function() {

            var src=$(this).attr('src');
            function img2html(img)
            {
                return "<a href=\"result?url={url}\"><img src=\"{url}\"></a>".s({url:src});
            }
            var img=img2html(src);
            $("#pic_output").html(img);//.append(xmas);
            addXmasButton();
            //return false is very import to avoid downloading //from the history zone
            return false;
        });


    }//addImgToHistory end

    function addXmasButton()
    {
        //for deer
        var mode=$("#preset").val();
        if (mode=='deer'){
	    $("#xmas-hat").attr('src', '/site_media/images/lefthorn.png');
            $("#xmas-hat-choose").html('<div>\
<h2>麋鹿角</h2>\
<br />\
</div>');
	    $("hr").hide();
	    $("#xmas-optins").hide();
	    $('#x_hat').change(function(){
		var img=$(this).val();
		img="/site_media/images/"+img;
		$("#xmas-hat").attr("src",img);
	    });

//<input type="checkbox" id="double_horn_symmetrical" value = "1" checked="checked">&nbsp;双鹿角对称 <br />旋转鹿角');
            var xmas = '<span id="xmas-trigger" style="position:absolute;color:red;font-size:1em;text-align:center;cursor:pointer;">圣诞鹿角</span>';
            $("#pic_output").append(xmas);
            /****** xmas-special ******/

            $("#xmas-trigger").click(function(e) {
                $("#avatar-img").attr("src", '');
                $("#xmas-special").css({
                    top: e.pageY,
                    left: e.pageX - 130,
                    zIndex: 9999999,
                }).fadeIn();
		var img=$("#pic_output>a>img").attr('src');
		img=img.replace('/result/', '/result/deer_');
                $("#avatar-img").attr("src", img);
            });

            $("#xmas-hat-holder").resizable({
                aspectRatio: 1/1,
                maxHeight: 200,
                maxWidth: 200,
                minHeight: 10,
                minWidth: 10,
		alsoResize: "#xmas-hat-holder2",
		helper: "ui-resizable-helper"
            }).draggable({
                zIndex: 9999999,
//                containment:"#avatar-holder",
                stop: function() {
                    $(this).removeClass('ui-draggable-dragging');

                }
            });
            $("#xmas-hat-holder2").resizable({
                aspectRatio: 1/1,
                maxHeight: 200,
                maxWidth: 200,
                minHeight: 10,
                minWidth: 10,
            }).draggable({
                zIndex: 9999999,
  //              containment:"#avatar-holder",
                stop: function() {
                    $(this).removeClass('ui-draggable-dragging');

                }
            });


            $("#xmas-slider").slider({
                max: 359,
                min: 0,
                range: "min",
                slide: function(event, ui) {
                    var cangle = ui.value;//turn angle to counter clockwise// original 360- ui.value
                    $("#xmas-hat-angel").val(cangle);
                    $("#xmas-hat").attr("style", int2css(cangle));
		    $("#xmas-hat2-angel").val(360-cangle);
		    $("#xams-hat2").attr("style", int2css(cangle, 1));
                }
            });

            $("#xmas-off").click(function() {
                $("#xmas-special").fadeOut();
            });


            return;
        }//deer mode end
	else {
            var xmas = '<span id="xmas-trigger" style="position:absolute;color:red;font-size:1em;text-align:center;cursor:pointer;">圣诞惊喜</span>';
	    $("#xmas-hat-choose").html('\
         <div id="xmas-hat-choose">\
                选择您喜欢的帽子<br />\
                <select id="x_hat">\
                    <option value="hat.png">hat 1</option>\
                    <option value="hat2.png">hat 2</option>\
                    <option value="hat3.png">hat 3</option>\
                    <option value="hat4.png">hat 4</option>\
                </select>\
            </div>\
');
	    $("hr").show();
	    $("#xmas-optins").show();
            $("#pic_output").append(xmas);
	    $("#xmas-hat-holder2").hide();
	    $('#x_hat').change(function(){
		var img=$(this).val();
		img="/site_media/images/"+img;
		$("#xmas-hat").attr("src",img);
	    });

            /****** xmas-special ******/

            $("#xmas-trigger").click(function(e) {
		$("#avatar-img").attr("src", '');
		$("#xmas-special").css({
                    top: e.pageY,
                    left: e.pageX - 130,
                    zIndex: 9999999,
		}).fadeIn();
		$("#avatar-img").attr("src", $("#pic_output>a>img").attr('src'));
            });


            $("#xmas-hat-holder").resizable({
		aspectRatio: 1/1,
		maxHeight: 200,
		maxWidth: 200,
		minHeight: 10,
		minWidth: 10,
            }).draggable({
		zIndex: 9999999,
		containment:"#avatar-holder",
		stop: function() {
                    $(this).removeClass('ui-draggable-dragging');
		}
            });

            $("#xmas-slider").slider({
		max: 359,
		min: 0,
		range: "min",
		slide: function(event, ui) {
                    var cangle = ui.value;//turn angle to counter clockwise// original 360- ui.value
                    $("#xmas-hat-angel").val(cangle);
                    $("#xmas-hat").attr("style", int2css(cangle));
		}
            });

            $("#xmas-off").click(function() {
		$("#xmas-special").fadeOut();
            });
	}//main else end

    }//addXmasButton end


    $('#btn_gen').click(function() {
        $("#pic_output").html("<img id='loading-icon' src='/site_media/images/loading.gif' />");

        $.get('/gen', getArgs(), function(data) {
            $("#pic_output").html(data);
            addImgToHistory(data);
            addXmasButton();

        }); //request ends

        //click to download

    });//submitbutton ends

    $('.bgcolors').click(function() {
        var bgColor = $(this).css('background-color');
        $("#bg").val($(this).attr('id'));
        $('#text_input').css('background-color', bgColor);

        //for deer
        var bgImage = $(this).css('background-image');
        if (bgImage){
            $('#text_input').css('background-image', bgImage);
        }
    });

    $('#highlight').click(function() {
        $('#text_input').toggleClass('sprite');
    });

    $("#preset").change(function() {
        set=$(this).val();
        if (set=='ifan') {
            $("#font_select").val("iYaHei.ttf");
            $("#textColor").val("#FFFFFF");
            $("#bg").val("c206_hb.png");
            $('#border').attr('checked','checked');
            $('#highlight').attr('checked','checked');
            $("#c206").click();
            $("input[name='shadow'][value=1]").attr('checked', 'checked');
            $("#shadowColor").val("#000000");
        }
        else if (set == 'fanfou') {
            $("#font_select").val("msjhbd.ttf");
            $("#textColor").val("#FFFFFF");
            $("#bg").val("c192.png");
            $('#border').removeAttr('checked');
            $('#highlight').removeAttr('checked');
            $("#c192").click();
            $("input[name='shadow'][value=0]").attr('checked', 'checked');
            $("#shadowColor").val("#000000");
        }
        else if (set== 'deer' ){
            $("#font_select").val("jingdianfansuiyi.ttf");
            $("#textColor").val("#FFFFFF");
            $("#bg").val("deer.png");
            $('#border').removeAttr('checked');
            $('#highlight').removeAttr('checked');
            $("#bg_deer").click();
            $("input[name='shadow'][value=0]").attr('checked', 'checked');
            $("#shadowColor").val("#000000");

        }
        else {
            $("#textColor").val("#FFFFFF");
        }

    });
    $("#preset").click(function(){
         $(this).change();
    });
    $("#preset").blur(function(){
         $(this).change();
    });
    $("#preset").change();

    /******* code from index.html **********/

    $('#textColor, #shadowColor').ColorPicker({
        onChange: function(hsb, hex, rgb, el) {
                      function getCheckedStatus(checkboxID) {
                          //return 1 if checked, or 0
                          if ($(checkboxID).attr('checked')) {
                              return 'True';
                          }
                          else {
                              return 'False';
                          }
                      }
                      $(el).val("#"+hex);
                      if ($(el).attr("id")=="textColor")
    {
        $("#text_input").css('color', '#' + hex);
    }
                      else if (getCheckedStatus("#shadow")=='True') {
                          $("#text_input").css('text-shadow', '#' + hex+" 0 0 3px");
                      }

                  },
            onSubmit: function(hsb, hex, rgb, el) {
                          hex=hex.toUpperCase();
                          $(el).val("#"+hex);
                          $(el).ColorPickerHide();
                      },
            onBeforeShow: function () {
                              $(this).ColorPickerSetColor(this.value);
                          }

    })
    .bind('keyup', function() {
        $(this).ColorPickerSetColor(this.value.replace("#",''));
    });
    $("#textColor").val("#FFFFFF");
    $("#shadowColor").val("#000000");

    /****** end of code from index.html ********/
    //for x-mas hat

    function getHatArgs(hat2)
    {
        //get current image result,
        //HAT: rotation angle, size, offset of the

        //site_media/result/bc98ff0348403f8098a3f7207c29f94f.png
	
        var bg=$("#avatar-img").attr("src");
        if (bg.length < 36)   //for valid result only
        {
            return;
        }
	if (hat2){
            var hat=$("#xmas-hat2").attr("src");//   site_media/images/hat.png
	    var holder="#xmas-hat-holder2";
	}
	else{
	    var hat=$("#xmas-hat").attr("src");//   site_media/images/hat.png
	    var holder='#xmas-hat-holder';
	}
        var angle=parseInt($("#xmas-slider").slider( "option", "value"));
        angle=360-angle;

        var base=$("#avatar-img").offset(); //left, top
        var hatoffset=$(holder).offset();
        var offsetLeft=hatoffset.left-base.left;
        var offsetTop=hatoffset.top-base.top;
        var hatWidth=$(holder+">img").width();
        var hatHeight=$(holder+">img").height();

        return {
            bg:bg,
            hat:hat,
            angle:angle,
            offsetTop:offsetTop,
            offsetLeft:offsetLeft,
            hatHeight:hatHeight,
            hatWidth:hatWidth
        }
    }
    $("#add_hat").click(function(){
        $("#pic_output").html("<img id='loading-icon' src='/site_media/images/loading.gif' />");
	
	var mode=$("#preset").val();
	if (mode != 'deer'){
            $.get("/hat", getHatArgs(), function(data){
		//data==result
		$("#pic_output").html(data);
		addImgToHistory(data);
		addXmasButton();
	    });
	}
	else{
	    $.get("/hat", getHatArgs(), function(data){
		var bg=data;
		var myRegexp = /src=\"([^\"]+)\"/;
		var match = myRegexp.exec(bg);
		bg=match[1]; 
		var args=getHatArgs(1);
		args.bg=bg;
		$.get("/hat", args, function(data){
		    //data==result
		    alert(data);
		    $("#pic_output").html(data);
		    addImgToHistory(data);
		    addXmasButton();
		});	
	    });
	 
	}
	
    });
    //hat selection
    $("#x_hat").change(function(){
        var img=$(this).val();
	
        img="/site_media/images/"+img;
        $("#xmas-hat").attr("src",img);

    });

});//document ready ends

