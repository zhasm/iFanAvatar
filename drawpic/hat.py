import Image
import ImageDraw
import ImageFont
import ImageFilter

from hashlib import md5
from misc import findPath, fontFile, fontPosition


def parseHatParameters(request):

    def _safeGetList(request, key, default=[]):
        try:
            q=request.GET.getlist(key)
            return [int(float(i)) for i in q]
        except:
            return []

    
    hatNames = request.GET.getlist('hat')
    if hatNames:
        angles     = _safeGetList(request, 'angle')
        offsetTops = _safeGetList(request, "offsetTop")
        offsetLefts= _safeGetList(request, "offsetLeft")
        hatHeights = _safeGetList(request, "hatHeight")
        hatWidths  = _safeGetList(request, "hatWidth")
        
        count=len(hatNames)
#        print angles, offsetTops, offsetLefts, hatHeights, hatWidths
        return [(hatNames[i],\
                 angles[i],\
                 offsetTops[i],\
                 offsetLefts[i],\
                 hatHeights[i],\
                 hatWidths[i],\
                 ) \
                for i in range(count)]
    else:
        return []

def hat(request, bg):

    #parse
    paras = parseHatParameters(request)
    for para in paras:
        #the ordering maters!!!
        hatName, angle, offsetTop, offsetLeft, hatHeight, hatWidth = para
        print "PARA", para 
        bg = draw_hat( bg, hatName, angle, offsetLeft, offsetTop, hatWidth, hatHeight)
    
    return bg

def draw_hat(bg, hatName, angle, offsetLeft, offsetTop, hatWidth, hatHeight):

    filename=md5("".join([str(x) for x in [bg, hatName, angle, offsetLeft, offsetTop, hatWidth, hatHeight]])).hexdigest()+".png"
    filename=findPath('media/result/')+filename

    #cut filename from
    # #/site_media/result/bc98ff0348403f8098a3f7207c29f94f.png
    # to
    # media/result/bc98ff0348403f8098a3f7207c29f94f.png
    bg=bg[-49:] 
    bg=findPath(bg)
    bg=Image.open(bg)
    
    hat=findPath("media/images/"+hatName)
    hat=hat[hat.index("media"):hat.index("png")+3]
    hat=findPath(hat)
    hat=Image.open(hat)

    #resize the hat
    hat=hat.resize((hatWidth, hatHeight), Image.ANTIALIAS)
    hat=hat.rotate(angle, Image.BILINEAR)
    box=(0, 0, hat.size[0], hat.size[1])
    pisition=(offsetLeft, offsetTop, hat.size[0]+offsetLeft, hat.size[1]+offsetTop)
    bg.paste(hat,pisition, hat)

    #add snowflakes
    snowfile=findPath('media/images/snowflakes.png')
    snow=Image.open(snowfile)
    bg.paste(snow, (0, 0, snow.size[0], snow.size[1]), snow)

    #save as file
    bg.save(filename, "PNG")
    filename=filename[-49:]

    url="""/site_%s""" % filename
    html="""<a href="/result?url=%s"><img src="%s"></a>""" % (url, url)
    
#    image_path_on_server="""./media/result/%s""" % filename
    image_path_on_server = filename
    return image_path_on_server
