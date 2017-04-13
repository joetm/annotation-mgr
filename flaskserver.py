#!/usr/bin/bash python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

from flask import Flask
from flask import request

app = Flask(__name__)


from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


# decoreator for Allow-Request-Origin header
# see http://flask.pocoo.org/snippets/56/
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator



@app.route("/")
def hello():
    return "GET TO WORK! The Annotation Mgr."

@app.route("/metadata")
@crossdomain(origin='*')
def getMetadata():
    # TODO
    # insecure
    filepath = request.args.get('path')
    from tools.extractMeta import MetadataExtractor
    metadata = MetadataExtractor.get_metadata(filepath)
    return metadata

@app.route("/annotation")
@crossdomain(origin='*')
def getAnnotation():
    # TODO
    # insecure
    filepath = request.args.get('path')
    from tools.extractAnnotations import AnnotationExtractor
    # absolute path
    if not filepath.startswith('file://'):
        filepath = "file://%s" % filepath
    # print filepath
    return AnnotationExtractor.getAnnotations(filepath)


if __name__ == "__main__":
    app.run()
