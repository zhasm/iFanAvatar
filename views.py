#!/usr/bin/env python
# encoding: utf-8

import os

from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Template, Context
from django.shortcuts import render_to_response

def home(request):
    """new home by nos.

    Arguments:
    - `request`:
    """
    template = get_template('index.html')

    html = template.render(Context(locals()))
    return HttpResponse(html)


