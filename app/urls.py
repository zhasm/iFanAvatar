from django.conf.urls.defaults import patterns, include, url

from app.views import dashboard, update_profile_image, signout

urlpatterns = patterns('',
    url(r'^dashboard$', dashboard, name='dashboard'),
    url(r'^update_profile_image$', update_profile_image, name='update_profile_image'),
    url(r'^logout$', signout, name='signout'),
)
