#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

node ./dirTree.js "$1" > ../build/data/folders.json
