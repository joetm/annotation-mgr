#!/usr/bin/python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

# http://blog.isnotworking.com/2006/08/extract-pdf-title-from-all-files-on.html

import os, sys
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

    def getTitle(self, filepath):

        if filepath.lower()[-3:] != "pdf":
            raise Exception("%s : Not a pdf file" % os.path.basename(filepath))

        title = None

        with file(filepath, "rb") as f:
            title = PdfFileReader(f).getDocumentInfo().title

        return title


if __name__ == "__main__":
    if (len(sys.argv) != 2):
        print "Missing path to document as argument"
        print "Usage: %s /path/to/file.pdf" % sys.argv[0]
        sys.exit(1)
    te = TitleExtractor()
    print te.getTitle(sys.argv[1])
