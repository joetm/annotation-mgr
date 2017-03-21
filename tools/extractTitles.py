#!/usr/bin/python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

# http://blog.isnotworking.com/2006/08/extract-pdf-title-from-all-files-on.html

import os
from pyPdf import PdfFileWriter, PdfFileReader


class TitleExtractor:
    """
    Title Extractor class
    """

    def __init__(self):
        """
        Constructor
        """
        pass

    def printTitles(self):

        for fileName in os.listdir('.'):
            try:
                if fileName.lower()[-3:] != "pdf": continue
                input1 = PdfFileReader(file(fileName, "rb"))

                # print the title of document
                print '##1', fileName, '##2', input1.getDocumentInfo().title
            except:
                print '##1', fileName, '##2'


if __name__ == "__main__":

    te = TitleExtractor()
    te.printTitles()

