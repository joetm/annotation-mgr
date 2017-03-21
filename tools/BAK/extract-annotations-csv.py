#!/usr/bin/python

import poppler, os.path
import csv


filename = "test-PDFXChange-Viewer"


# see:
# http://stackoverflow.com/a/13748949/426266
path = 'file://%s' % os.path.realpath('%s.pdf' % filename)
doc = poppler.document_new_from_file(path, None)
pages = [doc.get_page(i) for i in range(doc.get_n_pages())]

csvfile = open('%s.csv' % filename, 'wb')
csvwriter = csv.writer(csvfile,
    delimiter='|',
    quotechar='"',
    quoting=csv.QUOTE_MINIMAL)

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
        csvwriter.writerow([page_no + 1, it])

csvfile.close()
