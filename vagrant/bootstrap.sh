#!/usr/bin/env bash

sudo apt-get install -y build-essential

# install Apache
apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
  ln -fs /vagrant/build /var/www/html
fi

sudo apt-get install -y libxml2-dev
a2enmod proxy
a2enmod proxy_http
a2enmod proxy_ajp
a2enmod rewrite
a2enmod deflate
a2enmod headers
# a2enmod proxy_balancer
a2enmod proxy_connect
a2enmod proxy_html

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

iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -F
ufw disable

# install elasticsearch
apt-get install -y apt-transport-https

wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | apt-key add -
echo "deb http://packages.elastic.co/elasticsearch/5.x/debian stable main" | tee -a /etc/apt/sources.list.d/elasticsearch-5.x.list
echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-5.x.list

apt-get update

# install elasticsearch
apt-get install -y elasticsearch --allow-unauthenticated

# install kibana
apt-get install -y kibana --allow-unauthenticated

# install logstash
apt-get install -y logstash --allow-unauthenticated

# TODO - configure elasticsearch and kibana


# !!!!!!!!!!!!!!
# TODO - lower elasticsearch memory
# see http://stackoverflow.com/a/41662868/426266
# !!!!!!!!!!!!!!


# !!!!!!!!!!!!!!
# edit /etc/kibana/kibana.yml and change server.host: "localhost" to server.host: "0.0.0.0"
# !!!!!!!!!!!!!!

# !!!!!!!!!!!!!!
# edit /etc/elasticsearch/elasticsearch.yml and change network.host: 196.168.0.1 to network.host: 0.0.0.0
# !!!!!!!!!!!!!!

# !!!!!!!!!!!!!!
# TODO: elasticsearch cors config for dev
# http.cors.enabled: true
# http.cors.allow-origin: "*"
# !!!!!!!!!!!!!!


# update-rc.d elasticsearch defaults 95 10
update-rc.d kibana defaults 95 10

# start elastic search
# /etc/init.d/elasticsearch start

/bin/systemctl daemon-reload
/bin/systemctl enable elasticsearch.service
/bin/systemctl start elasticsearch.service

/etc/init.d/elasticsearch start

# service elasticsearch status

# start kibana
/etc/init.d/kibana start

# elasticsearch setup
./elasticsearch.sh

