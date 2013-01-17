Install Libraries
=================
npm install

Install the nodejs init.d script
================================
sudo ln -s /home/ubuntu/projects/portfolio/portfolio.sh /etc/init.d/portfolio
sudo chmod +x /etc/init.d/portfolio
sudo update-rc.d portfolio defaults 98 02

Install NodeJS on server
========================
sudo apt-get install software-properties-common
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs npm

Install Mercurial on server
===========================
sudo apt-get install mercurial