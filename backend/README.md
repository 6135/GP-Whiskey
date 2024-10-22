# GP-Whiskey

### Status:
![Workflow result](https://github.com/6135/GP-Whiskey/actions/workflows/django.yml/badge.svg)

### Pre-requisitos

* [Python 3.10.8](https://www.python.org/downloads/) (Usamos o 3.10 porque para  algumas packages ainda não existem updates)
* [PostgreSQL 15](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
* [Git](https://git-scm.com/downloads) (Useful to use VSC outside github desktop)

### Instalação

ESTIMATED TIME FOR SETUP -> 1-2 hours

É estritamente necessário ter os pre-requisitos instalados nas versoes mencionadas. Se nao desejar instalar postgres, pode-se usar uma base de dados remota, disponibilizada por mim. Pff pedir detalhes da DB.

1. Abrir o terminal ou o github desktop.
2. Clonar o projeto.

Se usarem terminal:

```ssh
git clone https://github.com/6135/GP-Whiskey
```

3. Entrar na pasta do projeto.
4. Abrir o terminal na pasta.
5. Criar o ambiente (virtual) do projeto.

Atenção: A versão de Python com a qual criar o ambiente do projeto deve ser igual para todos (v3.10.8). Para verificar a versao deve-se usar:

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
USE_REMOTE_DB=false

LOCAL_DATABASE_HOST=localhost
LOCAL_DATABASE_NAME=gp_whiskey
LOCAL_DATABASE_USER=postgres
LOCAL_DATABASE_PASSWORD=postgres

REMOTE_DATABASE_PROD_NAME=gp_whiskey_prod
REMOTE_DATABASE_NAME=gp_whiskey
REMOTE_DATABASE_HOST=server
REMOTE_DATABASE_PASSWORD=pwd
REMOTE_DATABASE_USER=postgres


DATABASE_PORT=5432

SECRET_KEY=q1^j3mv#y9-n&^*j)-rd3@lqqu@jv49p_99$mefzljeuz#fra3
EMAIL_HOST_USER=some_email@gmail.com
EMAIL_HOST_PASSWORD=password
```
```USE_REMOTE_DB=false``` usado para indicar se pretende usar a db remota ou a local.


9. Gerar uma nova SECRET_KEY aleatória (https://djecrety.ir/) e substituí-la no .env
10.  Gerar uma nova BD vazia com o nome igual ao definido no ficheiro .env (Este passo pode ser ignorado caso se use a DB remota)
11.  Navegar para a pasta GP-WHISKEY\gp_whiskey\ e gerar as migrações

Este comando gera as alterações efetuadas aos modelos (Classes do ORM do django) e aplica-as na base de dados. Por exemplo, se criarmos a classe `User`, o django cria a tabela `users` caso ela nao exista, se existir nao o faz. No caso de adicionarmos uma propriedade a classe, ele adiciona uma coluna a tabela. [Ver a documentação](https://docs.djangoproject.com/en/4.1/intro/tutorial02/)

(manage.py encontra-se na pasta referida no ponto 11)

```bash
py manage.py makemigrations
```

12. Gerar a base de dados

```bash
py manage.py migrate
```

13. Testar se a setup funcionou

```bash
py manage.py runserver
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

A base de dados deve ter as seguintes tabelas apos as migrações iniciais:

![ERD no pgadmin, depois das migrações](ERDAfterMigrations.png)

### Instalar nova dependência

```SH
pip install nome_da_dependência && pip freeze > requirements.txt
```

### Instalar lista de dependências necessárias

```SH
pip install -r requirements.txt
```

### Criar nova app (cada "componente" vai ser uma "app", neste caso ja existe uma, discutir com equipa caso seja necessaria outra)

```SH
python manage.py startapp nome_da_app
```

### Gerar automaticamente modelos através de tabelas da base de dados

Nao utilizar por favor...

```SH
python manage.py inspectdb tabela1 tabela2 > nome_da_app/models.py
```

## Dependências

---

TODO
----

### TroubleShooting

#### **Windows 10/11**

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


#### **Ubuntu 22.04**

1. Ao criar o ambiente virtual de ***python*** com o comando `python -m venv env` é possível obter o seguinte erro:

    ![Erro ao criar ambiente virtual](create_venv_error.png)

    Para corrigir este erro, temos de instalar o *package* `python3.10-venv` com o *package manager*:

    ```SH
    $ sudo apt install python3.10-venv
    ```

2. Durante a instalação das dependências para o ambiente virtual e para o projeto, com o comando `pip install -r requirements.txt`, pode não ser possível instalar o package `psycopg2`: 

    ![Erro durante a instalação dos packages presentes no ficheiro requirements.txt](install_psycopg2_error.png)


    Para o solucionar temos de instalar o package `libpq-dev`:

    ```SH
    $ sudo apt-get install libpq-dev
    ```

    E voltar a correr o comando necessário para instalar a lista de dependências do projeto:

    ```SH
    $ pip install -r requirements.txt
    ```

3. Se não for possível instalar a package `libpq-dev`:

    ![Erro durante a instalação dos packages presentes no ficheiro requirements.txt](install_psycopg2_solution.png)

    Temos de instalar a versão indicada na mensagem de erro, `14.5-0ubuntu0.22.04.1`, do *package* `libpq5`:

    ```SH
    $ sudo apt install libpq5=14.5-0ubuntu0.22.04.1
    ```

    Por fim, instalamos o *package* `libpq-dev` e voltamos a instalar a lista de dependências do projeto:

    ```SH
    $ sudo apt-get install libpq-dev
    $ pip install -r requirements.txt
    ```

4. Ao gerar as migrações automaticamente através do comando `python manage.py makemigrations`, podemos obter a seguinte mensagem de erro:

    ![Erro durante o makemigrations](makemigrations_error.png)

    Este erro surge porque a *password* do utilizador `postgres` não corresponde à *password* definida no campo `LOCAL_DATABASE_PASSWORD` do ficheiro `.env`.

    Para alterarmos a *password* do *superuser* `postgres` através da CLI, temos de fazer *login* com o utilizador `postgres`:

    ```console
    $ sudo -u postgres psql
    ```

    E alterar a sua password com o comando `ALTER USER`:

    ```console
    postgres=# ALTER USER postgres WITH PASSWORD 'postgres';
    ```

5. Comandos para criar a base de dados através da CLI:

    - Login como *superuser* **postgres**:

        ```console
        $ sudo -u postgres psql
        ```

    - Criar base de dados:

        ```console
        postgres=# CREATE DATABASE gp_whiskey;
        ```
    - Listar bases de dados, para verificar se a base de dados foi criada

        ```console
        postgres=# \l
        ```

    - Logout:

        ```
        postgres=# \q
        ```

### Reference Guide

1. [Django Installation Guide - Official](https://docs.djangoproject.com/en/4.0/intro/install/)
2. [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
3. [PostegreSQL with django](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django)
4. [Django how to use env vars](https://djangocentral.com/environment-variables-in-django) or [here](/https://stackoverflow.com/questions/62925571/how-do-i-use-env-in-django#62925707)

ps: took me 3h.20m to set up.
