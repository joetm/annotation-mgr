#!/usr/bin/bash python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ========================
    PDF Annotation Extractor
    ========================
"""

import sys
import json
import os.path
import poppler

class AnnotationExtractor:

    @staticmethod
    def getAnnotations(filepath):

        # absolute path
        if not filepath.startswith('file://'):
            # if filepath.startswith('/'):
            #     filepath = "file:/%s" % filepath
            # else:
            filepath = "file://%s" % filepath
        # print filepath

        doc = poppler.document_new_from_file(filepath, None)
        pages = [doc.get_page(i) for i in range(doc.get_n_pages())]

        annotations = []

        # process annotations
        for page_no, page in enumerate(pages):
            # get the annotations
            items = [i.annot.get_contents() for i in page.get_annot_mapping()]
            # filter out empty annotations
            items = [i for i in items if i]
            # print "page: %s comments: %s " % (page_no + 1, items)
            for it in items:
                # clean string
                it = it.replace("\n", "").replace("\r", "").strip()
                # write to file
                annotations.append({'page': page_no + 1, 'annotation': it})

        # return json.dumps(annotations, indent=4, encoding="utf-8")
        return annotations



if __name__ == "__main__":

    if (len(sys.argv) != 2):
        print "Missing path to document as argument"
        print "Usage: %s /path/to/file.pdf" % sys.argv[0]
        sys.exit(1)

    filepath = sys.argv[1]

    print AnnotationExtractor.getAnnotations(filepath)
