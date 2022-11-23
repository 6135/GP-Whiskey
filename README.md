# GP_Whiskey

## Using classic env of DJANGO

###### (Only serves for backend and database)

Go to the [backend/README.md](backend/README.md) folder, there is all the information that you need.

## Using classic react.js server

(Only serves for frontend)

### Pre-requisitos

- [Node](https://nodejs.org/en/)

Averiguar se tem as versões mais recentes tanto de *node* como de *npm*.

```shell
node -v # for example v18.12.1
npm -v  # for example 9.1.2
```

### Execução

1. Abrir o terminal ou o github desktop.
2. Clonar o projeto.
3. Correr no terminal e dentro da pasta `cd frontend && npm install`
4. Correr o projeto dentro da pasta frontend `npm run start`

Se usarem terminal:

```sh
git clone https://github.com/6135/GP-Whiskey
cd GP-Whiskey/frontend && npm install
npm run start
```

## Using Docker (Alternative)

(Serves for all)

### Pre-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Instalação

Duração máxima da instalação -> 15 minutos

##### Steps

1. Abrir o terminal ou o github desktop.
2. Clonar o projeto.
3. Correr no terminal e dentro da pasta `docker-compose up -d --build`

Se usarem terminal:

```
git clone https://github.com/6135/GP-Whiskey
```

1. Entrar na pasta do projeto.
2. Correr `docker-compose up -d --build`

Após isto o projeto já deve estar a correr. Enquanto o projeto estiver a correr, qualquer comando no **DJANGO** deve ser feito dentro do container **backend**.

Portanto no terminal e para entrar dentro do container, escrever o seguinte:

```
docker exec -it backend /bin/sh
```

### Instalar nova dependência

```
pip install nome_da_dependência && pip freeze > requirements.txt
```

### Instalar lista de dependências necessárias

```
pip install -r requirements.txt
```

### Gerar migrações automaticamente através dos modelos

```
python manage.py makemigrations
```

### Aplicar as migrações à base de dados

```
python manage.py migrate
```

### Other Commands outside container

```sh
# For stopping running containers
docker-compose stop
# For stopping and removing running containers
docker-compose down
# For removing every container
docker rm -fv $(docker ps -aq)
#For removing every image
docker rmi -f $(docker images -a -q)
#For removing every volume
docker volume rm -f $(docker volume ls -q)
```

### Resources:

https://mherman.org/blog/dockerizing-a-react-app/

https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/

https://learndjango.com/tutorials/django-docker-and-postgresql-tutorial
