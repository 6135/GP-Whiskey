# Using Docker (Alternative)



docker rm -fv $(docker ps -aq)

docker rmi $(docker images -a -q)

docker volume rm $(docker volume ls -q)

