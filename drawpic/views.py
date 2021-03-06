# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.db.models.loading import get_app

import os
import glob

import Image
import ImageDraw
import ImageFont
import ImageFilter

from misc import findPath, fontFile, fontPosition
from hat import hat
from settings import REMAIN_PICS

def delete_pic(remain=REMAIN_PICS):
    '''delete old pics so as to reduce the disk usage'''

    p=findPath("media/result/*.png")

    files=glob.glob(p)
    s={}
    for f in files:
        statinfo=os.stat(f)
        s[f]=statinfo.st_mtime

    c= s.items()
    c.sort(key=lambda x:x[1])

    if len(c)<=remain:
        pass
    else:
        for (x,y) in c[0:len(c)-remain]:
            os.unlink(x)
            

def gen(request):
    """to draw pictures with all parameters set"""

    #background
    delete_pic()
    
    def _safeGetBoolean(request, key, default=False):
        try:
            return eval(request.GET.get(key))
        except:
            return default

    bg = request.GET.get('bg', 'c206_hb.png')  #can be changed to POST

    text=request.GET.get('text', '%u996d')
    try:
        text = unichr(int(text[2:], 16))
    except Exception, e:
        print 'error', e
    font=request.GET.get('font', 'iYaHei.ttf')
    textColor=request.GET.get('textColor', '#FFFFFF')
    shadowColor=request.GET.get('shadowColor', '#000000')

    #boolean args
    shadow    = _safeGetBoolean(request, "shadow")
    border    = _safeGetBoolean(request, "border")
    highlight = _safeGetBoolean(request, "highlight")

    #return HttpResponse("<pre>%r</pre>" % locals())
    image_path_on_server = my_draw(request,
            bg=bg,
            text=text,
            font=font,
            textColor=textColor,
            shadowColor=shadowColor,
            border=border,
            shadow=shadow,
            highlight=highlight)

    #hat processing, a loop procedure, for several hats(horns)
    image_path_on_server=hat(request, bg=image_path_on_server)
    saveImage4Upload(request, image_path_on_server)
    image_path_on_server=findPath(image_path_on_server)
    image_data = open(image_path_on_server, "rb").read()

    #if save==1, download:
    save = _safeGetBoolean(request, "save")
    if save:
        response = HttpResponse(image_data, mimetype="image/png")
        response['Content-Disposition'] = 'attachment; filename=%s' % image_path_on_server[-36:]
        return response

    return HttpResponse(image_data, mimetype="image/png")

def my_draw(request, bg, text, font, textColor, shadowColor, border, shadow, highlight):
    """draw avatar. Core part of the program."""
    from hashlib import md5
    text_md5=md5(text.encode('utf-8')).hexdigest()
    pure=md5(text_md5+bg+font+textColor+shadowColor+str(border)+str(shadow)+str(highlight)).hexdigest()+".png"
    filename=findPath('media/result/')+pure
    pFont=fontFile(font)

    (textPosition, fontSize)=fontPosition(pFont)

    #generate new pic only when not existing
    if not os.path.exists(filename):
        # when debugging, set if to 1, so as to gen pic each time;
        # when done, set if to not os.path.exists(filename), and only gen new pics.

        image_a=Image.open(findPath("colors/%s" % bg))
        image_b=Image.open(findPath("colors/%s" % bg))
        font=ImageFont.truetype(pFont, fontSize)
        width=180
        height=180
        img_draw=ImageDraw.Draw(image_b)
        shadow=int(shadow)
        if shadow ==0:    #no shadow at all
            img_draw.text(textPosition,text,font=font, fill=textColor)
            image_b.save(filename)
        else  :
            if shadow==2: #shadow offset
                side=15
            else:         #shadow but no offset
                side=10

            box=(10,10,width+10, height+10)
            position=(0+side,0+side, width+side, height+side)

            img_draw.text(textPosition,text,font=font,fill=shadowColor)
            imgfilted=image_b.filter(ImageFilter.BLUR)
            region=imgfilted.crop(box)
            img_draw=ImageDraw.Draw(image_a)
            image_a.paste(region,position)
            img_draw.text(textPosition,text,font=font, fill=textColor)
            image_a.save(filename)


    image_path_on_server="""./media/result/%s""" % pure
    return image_path_on_server

def saveImage4Upload(request, image_url):
    image_url = image_url.replace("/media/", "/site_media/")
    request.session['avatar_to_upload'] = image_url

def generate_random(request):
    bgPath = os.getcwd() + "/media/colors/"
    fontPath = os.getcwd() + "/media/font"

    def randomColorUnit():
        return str(hex(random.randrange(0x00, 0xFF))[2:]).zfill(2)

    bg = random.choice(os.listdir(bgPath))
    text = request.GET.get('text', '')
    font = random.choice(os.listdir(fontPath))
    textColor = "#" + randomColorUnit() + randomColorUnit() + randomColorUnit()
    shadowColor = "#" + randomColorUnit() + randomColorUnit() + randomColorUnit()
    border = random.randint(0, 1)
    shadow = random.randint(0, 2)
    highlight = random.randint(0, 1)

    return my_draw(request, bg, text, font, textColor, shadowColor, border, shadow, highlight)


