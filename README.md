# GP-Whiskey

### Pre-requisitos

* [Python 3.10.8](https://www.python.org/downloads/) (Usamos o 3.10 porque para  algumas packages ainda não existem updates)
* [PostgreSQL 15](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
* [Git](https://git-scm.com/downloads)

### Instalação

ESTIMATED TIME FOR SETUP -> 1-2 hours

É estritamente necessário ter os pre-requisitos instalados nas versoes mencionadas.

1. Abrir o terminal ou o github desktop.
2. Clonar o projeto.

Se usarem terminal:

```ssh
git clone https://github.com/6135/GP-Whiskey
```

3. Entrar na pasta do projeto.
4. Abrir o terminal na pasta.
5. Criar o ambiente (virtual) do projeto.

Atenção: A versão de Python com a qual criar o ambiente do projeto deve ser igual para todos (v3.11.0). Para verificar a versao deve-se usar:

```bash
py -V
```
Para criar o ambiente:
Atenção: Existe a possibilidade de que o comando para linux seja ligeiramente diferente.

```bash
py -m venv env
```

Isto deve criar uma pasta `env` na diretoria do projeto, esta pasta NAO DEVE ser seguida pelo github, é individual para cada maquina em que seja desenvolvido o projeto.

6. Ativar o ambiente no terminal.
   
Em linux:
```bash 
source env/bin/activate
```

Em Windows:

```bash
env\Scripts\activate
```

A extensão padrão de Python do VSCode tem a opção de ativar automaticamente o ambiente em novos terminais. Para ativar a funcionalidade, há que abrir a **Palete de Comandos (F1)**,  **Python: Selecionar Interpretador** e escolher a opção cuja localização comece com `./env` ou `.\env`.

7. Atualizar as dependencias iniciais do ambiente e do projeto

```bash
py -m pip install --upgrade pip
pip install --upgrade pip setuptools
```
seguido de:
```bash
pip install -r requirements.txt
```

8. Criar um ficheiro .env dentro da pasta do projeto, a mesma pasta que contem o ficheiro settings.py, este ficheiro contem informações sensiveis ao projeto, como credenciais de acesso. **Nao deve ser partilhado no git.**


Um exemplo do conteudo do ficheir env seria:
```
DATABASE_HOST=localhost
DATABASE_NAME=gp_whiskey
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
SECRET_KEY=q1^j3mv#y9-n&^*j)-rd3@lqqu@jv49p_99$mefzljeuz#fra3
EMAIL_HOST_USER=some_email@gmail.com
EMAIL_HOST_PASSWORD=password
```

9. Gerar uma nova SECRET_KEY aleatória (https://djecrety.ir/) e substituí-la no .env

10. Gerar uma nova BD vazia com o nome igual ao definido no ficheiro .env

11. Gerar as migrações

Este comando gera as alterações efetuadas aos modelos (Classes do ORM do django) e aplica-as na base de dados. Por exemplo, se criarmos a classe `User`, o django cria a tabela `users` caso ela nao exista, se existir nao o faz. No caso de adicionarmos uma propriedade a classe, ele adiciona uma coluna a tabela. [Ver a documentação](https://docs.djangoproject.com/en/4.1/intro/tutorial02/)

```bash
py manage.py makemigrations
```

1.  Gerar a base de dados
    
```bash
py manage.py migrate
```

## Comandos fundamentais


### Desativar o ambiente virtual no terminal

```SH
deactivate
```

### Iniciar o servidor localmente

Perminte desenvolver sem necessitar deployment.
```SH
python manage.py runserver
```

### Gerar migrações automaticamente através dos modelos

```SH
python manage.py makemigrations
```

### Aplicar as migrações à base de dados

```SH
python manage.py migrate
```

### Instalar nova dependência

```SH
pip install nome_da_dependência && pip freeze > requirements.txt
```

### Instalar lista de dependências necessárias

```SH
pip install -r requirements.txt
```

### Criar nova app (cada "componente" vai ser uma "app")

```SH
python manage.py startapp nome_da_app
```

### Gerar automaticamente modelos através de tabelas da base de dados

Nao utilizar por favor...
```SH
python manage.py inspectdb tabela1 tabela2 > nome_da_app/models.py
```

## Dependências

 
---------
TODO
---------

### TroubleShooting

Em windows, podem existir problemas de segurança ao executar o ambiente, para isso devem desativar a verificação da seguinte forma:

```powershell
Set-ExecutionPolicy Unrestricted -Force
env\Scripts\activate.PS1
```

Em windows, podem ocorrer erros a quando da instalação das packages.

```
Encountered error while trying to install package.
╰─> psycopg2
```
Se este erro for emitido, [instala as build tools do c++](https://stackoverflow.com/a/49984619)

Em caso de duvida, a arvore de diretorias deve ser [semelhante a esta](gp_tree.txt):
```
E:\GP-WHISKEY
│   .gitattributes
│   .gitignore
│   gp_tree.txt
│   README.md
│   requirements.txt
├───env
└───gp_whiskey
    │   manage.py
    │   
    ├───etar
    │   │   admin.py
    │   │   apps.py
    │   │   models.py
    │   │   tests.py
    │   │   views.py
    │   │   __init__.py
    │   │   
    │   └───migrations
    │           __init__.py
    │           
    └───gp_whiskey
        │   .env
        │   .env-example
        │   asgi.py
        │   settings.py
        │   urls.py
        │   wsgi.py
        │   __init__.py
        │   
        └───__pycache__
                settings.cpython-310.pyc
                settings.cpython-311.pyc
                urls.cpython-310.pyc
                urls.cpython-311.pyc
                wsgi.cpython-310.pyc
                __init__.cpython-310.pyc
                __init__.cpython-311.pyc
                

```
### Reference Guide

1. [Django Installation Guide - Official](https://docs.djangoproject.com/en/4.0/intro/install/)
2. [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
3. [PostegreSQL with django](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django)
4. [Django how to use env vars](https://djangocentral.com/environment-variables-in-django) or [here](/https://stackoverflow.com/questions/62925571/how-do-i-use-env-in-django#62925707)

ps: took me 2h.55m.50s.980ms to set up