#!/usr/bin/python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ===========
    Sync Papers
    ===========
"""

import sys, json
import os.path
from pyPdf import PdfFileReader
from pyPdf.utils import PdfReadError
import hashlib

from modules.extractAnnotations import AnnotationExtractor
from modules.extractMeta import MetadataExtractor


class Syncer:
    """
    Syncer class
    """

    @staticmethod
    def get_files(rootpath):
        """ Go through all the documents and extract the metadata """
        print "Syncing %s" % rootpath

        # erase existing or create new
        open('../build/data/papers.json', 'w').close()

        # open output file in append mode
        fp = open('../build/data/papers.json', 'a')
        fp.write("[\n")

        # traverse all files and sub-folders
        for path, subdirs, files in os.walk(rootpath):

            for name in files:

                filepath = os.path.join(path, name)

                if name.lower()[-3:] != "pdf":
                    continue # skip this file, since it's not a pdf

                metadata = {}
                try:
                    metadata = MetadataExtractor.get_metadata(filepath)
                except (PdfReadError, Exception) as e:
                    print "==========================================="
                    print filepath
                    print "Error [metadata]: %s" % e
                    metadata = {"error": str(e)}

                annotations = []
                try:
                    annotations = AnnotationExtractor.getAnnotations(filepath)
                except Exception as e:
                    print "==========================================="
                    print filepath
                    print "Error [annotation]: %s" % e
                    annotations = []

                statinfo = os.stat(filepath)

                # assemble the output dictionary
                output = {
                    "path": filepath,
                    "name": os.path.basename(filepath),
                    # "type": "file",
                    "hash": hashlib.md5(open(filepath, 'rb').read()).hexdigest(),
                    "mtime": statinfo.st_mtime,
                    "atime": statinfo.st_atime,
                    "size": statinfo.st_size,
                    "metadata": metadata,
                    "annotations": annotations
                }

                # print output['metadata']
                # print json.dumps(output, indent=4, encoding="utf-8")

                json.dump(output, fp,
                    skipkeys=False,
                    ensure_ascii=False,
                    check_circular=True,
                    allow_nan=True,
                    cls=None,
                    indent=None,
                    separators=(',',':'),
                    encoding="utf-8",
                    default=None,
                    sort_keys=False
                )

                fp.write(",\n")

        # remove the last comma
        fp.seek(-2, os.SEEK_END)
        fp.truncate()

        fp.write("\n]\n")

        fp.close()




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
