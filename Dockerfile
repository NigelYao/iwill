FROM node:4-onbuild
EXPOSE 8080

# Update apt-get local index
RUN apt-get -qq update

# Install
RUN apt-get -y --force-yes install mysql-server mysql-client

# MySQL conf
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

RUN service mysql start && service redis-server start && mysql -e "create database tickets"

CMD ["service", "mysql", "start"]
