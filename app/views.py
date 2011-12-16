# encoding: utf-8
from django.core.urlresolvers import reverse
from django.template.context import Context, RequestContext
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth.decorators import login_required
from django import forms
from fanfouapi.models import FFUser
from django.http import HttpResponse
from draw import findPath
from iFanAvatar.views import home
import re
import json



from django.contrib.auth import logout

def signout(request):
    logout(request)
    return HttpResponseRedirect("/")

def route(request):

    if request.user.is_authenticated():
        return update_profile_image(request)
#        return HttpResponseRedirect(reverse('dashboard'))
    else:
        return HttpResponseRedirect("/auth")


@login_required
def update_profile_image(request):
    ffuser = FFUser.objects.get_by_user(request.user)
    api = ffuser.get_api()

    url = request.session['avatar_to_upload']
    url = re.sub(r"\/?\.?\/site_media", "media", url)

    filename=findPath(url)
    content= open(filename).read()

    try:
        result = api.update_profile_image(filename=filename,
                                      content=content,
                                      file_type="image/png")
        response=u"上传成功!"

    except Exception, e:
        response=u"上传失败，原因是: %s" % str(e)

    #return HttpResponse(json.dumps({"msg": response}), mimetype="application/json")
    return HttpResponse("""<script >window.location.href="/";alert("%s"); </script>""" % (response))

@login_required
def dashboard(request):
    avatar_to_upload=request.session['avatar_to_upload'].replace('./site_media', '/site_media')

    return render_to_response('dashboard.html',
                              RequestContext(request,
                                             locals()))

