#!/usr/bin/env bash

# install Apache
# apt-get update
# apt-get install -y apache2
# if ! [ -L /var/www ]; then
#   rm -rf /var/www
#   ln -fs /vagrant /var/www
# fi

# install Oracle JDK
apt-get install -y python-software-properties debconf-utils
add-apt-repository -y ppa:webupd8team/java
apt-get update
# no modal
echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections
# install
apt-get install -y oracle-java8-installer
# javac -version
apt-get install -y oracle-java8-set-default

# install elasticsearch
apt-get install -y apt-transport-https
echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-5.x.list
apt-get update
apt-get install -y elasticsearch --allow-unauthenticated

# install kibana
apt-get install -y kibana --allow-unauthenticated

# start elastic search
/etc/init.d/elasticsearch start
# start kibana
/etc/init.d/kibana start

