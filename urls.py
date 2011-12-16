# encoding: utf-8
from django.conf.urls.defaults import *
import os.path
from app.views import route
from drawpic.views import gen
from views import home

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
STATIC_DOC_ROOT = os.path.join(os.path.dirname(__file__), 'media').replace('\\','/')


urlpatterns = patterns('',
    # Example:
    # (r'^iFanAvatar/', include('iFanAvatar.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
    (r'^/?$', home),
    (r"^gen\b", gen),
#    (r'^random$', generate_random),
#    (r'^result$', downloader),
#    (r'^hat$', hat),
    (r'^auth/', include('fanfouapi.urls')),
    url(r'^upload/', route, name='route'),
    url(r'^at/', include('app.urls')),
    (r'^static/(?P<path>.*)$',
         'django.views.static.serve',
         {'document_root': 'static'}),
    (r'^site_media/(?P<path>.*/?)$', 'django.views.static.serve',
         {'document_root': STATIC_DOC_ROOT}),
)
