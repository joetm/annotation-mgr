#!/usr/bin/env bash
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

./parseFolders.sh "$1" # 2> /dev/null
if [ $? != 0 ]
then
  echo "Error parsing folder" # >&2
  exit $?
fi
echo "Successfully parsed folder"

./syncAnnotations.py "$1"
if [ $? != 0 ]
then
  echo "Error extracting annotations" # >&2
  exit $?
fi
echo "Successfully extracted annotations"
