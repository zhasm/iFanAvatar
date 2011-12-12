# encoding: utf-8
from django.conf.urls.defaults import *
from views import home, generate, generate_random, hat
import os.path
from downloader import downloader
from app.views import route

import views

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
    (r'^home2/?$', views.home2),
    (r'^gen\b', generate),
    (r'^random$', generate_random),
    (r'^result$', downloader),
    (r'^hat$', hat),
    (r'^auth/', include('fanfouapi.urls')),
    url(r'^upload/', route, name='route'),
    url(r'^at/', include('app.urls')),
    (r'^static/(?P<path>.*)$',
     'django.views.static.serve',
     {'document_root': 'static'}),

    (r'^site_media/(?P<path>.*/?)$', 'django.views.static.serve',
     {'document_root': STATIC_DOC_ROOT}),
)
