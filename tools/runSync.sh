#!/usr/bin/env bash
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

if [ -z "$1" ]
  then
    echo "No path supplied."
    echo "Usage: $0 /path/to/pdfs/"
    exit 1 # error
fi

./parseFolders.sh "$1" # 2> /dev/null
if [ $? != 0 ]
then
  echo "Error parsing folder" # >&2
  exit $?
fi
echo "Successfully parsed folder"

./syncPapers.py "$1"
if [ $? != 0 ]
then
  echo "Error extracting metadata / annotations" # >&2
  exit $?
fi
echo "Successfully extracted annotations"
