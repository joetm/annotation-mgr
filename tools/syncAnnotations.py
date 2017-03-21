#!/usr/bin/python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ================
    Sync Annotations
    ================
"""

import sys
import os.path
from pyPdf import PdfFileReader
from pyPdf.utils import PdfReadError

from extractAnnotations import AnnotationExtractor
from extractMeta import MetadataExtractor


class Syncer:
    """
    Syncer class
    """

    @staticmethod
    def get_files(rootpath):
        print "Syncing %s" % rootpath

        # traverse all files and sub-folders
        for path, subdirs, files in os.walk(rootpath):
            for name in files:
                filepath = os.path.join(path, name)

                if name.lower()[-3:] != "pdf":
                    continue # skip this file


                try:
                    print MetadataExtractor.get_metadata(filepath)
                except ValueError:
                    print "==========================================="
                    print filepath
                    print "skipped - Got the " "`ValueError: invalid literal for int() with base 10...`" " error on this file"
                except PdfReadError as err:
                    print "==========================================="
                    print filepath
                    print "skipped - pyPdf PdfReadError: %s" % err
                except Exception as err:
                    print "==========================================="
                    print filepath
                    print "skipped - other exception: %s" % err



if __name__ == "__main__":

    if len(sys.argv) != 2:
        print "Missing folder path as argument"
        print "Usage: %s /path/to/folder" % sys.argv[0]
        sys.exit(1)

    # check if argument is a folder
    if not os.path.isdir(sys.argv[1]):
        print "Argument must be a folder"
        sys.exit(1)

    Syncer.get_files(sys.argv[1])
