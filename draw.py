#!/usr/bin/env python
# encoding: utf-8
"""
draw.py

"""
import os
import sys
import Image
import ImageDraw
import ImageFont
import ImageFilter

from hashlib import md5
from django.template.loader import get_template
from django.shortcuts import render_to_response
from django.http import HttpResponse

#necessary to force chinese encoding(utf8)
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding) 

def findPath(path):
    '''path is a relative;
    return absolute path based on the project folder'''

    return os.path.join(os.path.dirname(__file__), path)

def fontFile(font):
    return findPath("font/%s" % font) 

def my_draw(request,text,bg, font):
    """draw avatar. Core part of the program. 
    """
    pure=md5(text+bg+font).hexdigest()+".png" 
    filename=findPath('media/')+pure 
    pFont=fontFile(font)
    textPosition=(20, -15)

    #generate new pic only when not existing

    if not os.path.exists(filename):
        image_a=Image.open(findPath('colors/bg.png'))
        image_b=Image.open(findPath("colors/%s" % bg))
        font=ImageFont.truetype(pFont,170)
        font2=ImageFont.truetype(pFont,174)
        box=(0,0,190,190)
        position=(5,5,195,195)

        img_draw=ImageDraw.Draw(image_b)
        img_draw.text(textPosition,text,font=font,fill="#808080")
        imgfilted=image_b.filter(ImageFilter.BLUR)

        img_draw=ImageDraw.Draw(image_a)

        region=imgfilted.crop(box)
        image_a.paste(region,position)
        img_draw.text(textPosition,text,font=font,fill="#ffffff") 
        
        image_a.save(filename)

    #display the picture;
    #img tag is enough, for this is displayed in pic_output div.
    html="""<img src="./site_media/%s">""" % (pure)
    return HttpResponse(html)
