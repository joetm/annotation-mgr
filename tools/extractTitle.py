# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ======================
    PDF Metadata Extractor
    ======================
"""

from pyPdf import PdfFileReader

class Extractor:
    """
    Extractor class
    """

    def __init__(self):
        """
        Constructor
        """
        pass

    def get_metadata(self, pdf_file_path):
        if not pdf_file_path:
            raise # TODO

        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            return pdf_reader.getDocumentInfo()

    def get_title(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        return metadata.title

    def get_subject(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        return metadata.subject

    def get_creator(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        return metadata.creator

    def get_author(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        return metadata.author

    def get_keywords(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        keywords_str = metadata['/Keywords']
        keywords = keywords_str.split(',')
        keywords = [x.strip() for x in keywords]
        return keywords

    def get_creationdate(self, pdf_file_path):
        metadata = self.get_metadata(pdf_file_path)
        return metadata.creationDate

    def get_numpages(self, pdf_file_path):
        if not pdf_file_path:
            raise # TODO
        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            return pdf_reader.getNumPages()

    def get_outlines(self, pdf_file_path):
        if not pdf_file_path:
            raise # TODO
        with open(pdf_file_path) as f:
            pdf_reader = PdfFileReader(f)
            return pdf_reader.getOutlines()



e = Extractor()

title = e.get_keywords('test-PDFXChange-Viewer.pdf')

print title


