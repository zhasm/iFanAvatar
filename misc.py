#!/usr/bin/env python
# encoding: utf-8
"""
misc.py

Created by rex on 2010-12-01.
Copyright (c) 2010 __MyCompanyName__. All rights reserved.
"""
from os.path import dirname as dirname
from os.path import join as pathjoin

def getPath(sufix=""):
    '''get absolute path of the current dir'''
    path = dirname(__file__)
    try:
        index=path.index("..")
        if index!=-1:
            path=path[:index]
    except:
        pass
    return pathjoin(path, sufix).replace('\\','/')


import commands

def getVersionInfor():
    path=getPath()
    cmd="cd %s && git tag |sort -r |head -1" % path
    version=commands.getoutput(cmd)
    cmd='''cd %s && git log -1 |grep  commit |grep -o "\<[a-f0-9]\+\>"''' % path
    build=commands.getoutput(cmd)
    return (version, build)

if __name__=='__main__':
    print getVersionInfor()

