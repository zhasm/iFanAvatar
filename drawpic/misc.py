import os
from settings import APP_ROOT

def findPath(path):
    '''path is a relative;
    return absolute path based on the project folder'''

    return os.path.join(APP_ROOT, path)

def fontFile(font):
    '''
    input:  font filename.
    output: absolute path of that font file.
    '''
    return findPath("media/font/%s" % font)

def fontPosition(pFont):
    '''specify the position and size for each font'''
    if pFont.find("wqy")!=-1: #for wenquanyi
        textPosition=(20, 15)
        fontSize=150
    elif pFont.find("xujinglei")!=-1: #for xujinglei
        textPosition=(10, 10)
        fontSize=170
    elif  pFont.find("YaHei") !=-1:
        textPosition=(25, 0)
        fontSize=140
    elif pFont.find("fzybksjt") !=-1: #fang zheng ying kai jian
        textPosition=(15, 15)
        fontSize=160
    elif pFont.find("fzqtj") !=-1: #fang zheng ying kai jian
        textPosition=(15, 15)
        fontSize=160
    elif pFont.find("shoujin") !=-1: #fang zheng ying kai jian
        textPosition=(18, 18)
        fontSize=155
    elif pFont.find("msjhbd") !=-1 :
        textPosition=(18, -8)
        fontSize=155
    elif pFont.find("liuti") !=-1 :
        textPosition=(15, 15)
        fontSize=165
    elif pFont.find("fangzhengsuxinshiliukaijianti") !=-1 :
        textPosition=(15, 15)
        fontSize=165
    elif pFont.find("huakanghaibao") !=-1 :
        textPosition=(15, 15)
        fontSize=165
    elif pFont.find("jingdianfansuiyi") !=-1 :
        textPosition=(15, 15)
        fontSize=165

    return (textPosition, fontSize)
