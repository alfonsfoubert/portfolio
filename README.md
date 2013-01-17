Install Libraries
=================
npm install

Install the nodejs init.d script
================================
sudo ln /home/ubuntu/projects/portfolio/portfolio.sh portfolio
sudo chmod +x portfolio
sudo update-rc.d portfolio defaults 98 02
