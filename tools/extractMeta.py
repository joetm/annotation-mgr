#!/usr/bin/python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ======================
    PDF Metadata Extractor
    ======================
"""

import sys
import json
from pyPdf import PdfFileReader

class MetadataExtractor:
    """
    Metadata Extractor class
    """

    # def __init__(self):
    #     """
    #     Constructor
    #     """
    #     pass

    @staticmethod
    def get_metadata(pdf_file_path):
        "Get all metadata"
        if not pdf_file_path:
            raise # TODO

        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            # print 'reading %s' % pdf_file_path
            # return dict(pdf_reader.getDocumentInfo())
            return json.dumps(pdf_reader.getDocumentInfo(), indent=4, encoding="utf-8")

    @staticmethod
    def get_title(pdf_file_path):
        "Get title"
        mdoc = self.get_metadata(pdf_file_path)
        return mdoc.title

    @staticmethod
    def get_subject(pdf_file_path):
        "Get subject"
        mdoc = self.get_metadata(pdf_file_path)
        return mdoc.subject

    @staticmethod
    def get_creator(pdf_file_path):
        "Get creator"
        mdoc = self.get_metadata(pdf_file_path)
        return mdoc.creator

    @staticmethod
    def get_author(pdf_file_path):
        "Get author"
        mdoc = self.get_metadata(pdf_file_path)
        return mdoc.author

    @staticmethod
    def get_keywords(pdf_file_path):
        "Get keywords"
        mdoc = self.get_metadata(pdf_file_path)
        keywords_str = mdoc['/Keywords']
        keywords = keywords_str.split(',')
        keywords = [x.strip() for x in keywords]
        return keywords

    @staticmethod
    def get_creationdate(pdf_file_path):
        "Get creationdate"
        mdoc = self.get_metadata(pdf_file_path)
        return mdoc.creationDate

    @staticmethod
    def get_numpages(pdf_file_path):
        "Get numpages"
        if not pdf_file_path:
            raise # TODO
        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            return pdf_reader.getNumPages()

    @staticmethod
    def get_outlines(pdf_file_path):
        "Get outlines"
        if not pdf_file_path:
            raise # TODO
        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            return pdf_reader.getOutlines()


if __name__ == "__main__":

    if len(sys.argv) != 2:
        print "Missing path to document as argument"
        print "Usage: %s /path/to/file.pdf" % sys.argv[0]
        sys.exit(1)

    metadata = MetadataExtractor.get_metadata(sys.argv[1])
    print metadata
