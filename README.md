Set up parameters
=================
cp app/config/parameters.ini.dist app/config/parameters.ini
Edit app/config/parameters.ini and set yout parameters

Install Libraries
=================
npm install

Install NodeJS on server
========================
sudo apt-get install software-properties-common
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs npm

Install Mercurial on server
===========================
sudo apt-get update
sudo apt-get install mercurial

Install Supervisor
==================
sudo apt-get install python-setuptools
sudo easy_install supervisor
curl https://raw.github.com/gist/176149/88d0d68c4af22a7474ad1d011659ea2d27e35b8d/supervisord.sh > supervisord
chmod +x supervisord
sudo mv supervisord /etc/init.d/supervisord
sudo apt-get install dialog
sudo rcconf
sudo echo_supervisord_conf > supervisord.conf
sudo mv supervisord.conf /etc/supervisord.conf
sudo vi /etc/supervisord.conf
-- Add Section --
[program:portfolio]
command=node app.js
directory=/home/ubuntu/www/portfolio/app/
environment=NODE_ENV=production