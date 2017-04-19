#!/usr/bin/env bash

# install ingest-attachment plugin
# yes: bypass confirmation
# yes | /usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-attachment

# http://stackoverflow.com/a/40334033/426266

# create papers index
# curl -XPUT 'localhost:9200/papers?pretty&pretty' -H "Content-Type: application/json" -d '{"mappings":{"my_type":{"properties":{"attachment.data":{"type":"text"}}}}}'

# create ingest pipeline
# curl -XPUT 'localhost:9200/_ingest/pipeline/attachment?pretty&pretty' -H "Content-Type: application/json" -d '{"description":"Extract attachment information","processors":[{"attachment":{"field":"data","indexed_chars":-1}}]}'


