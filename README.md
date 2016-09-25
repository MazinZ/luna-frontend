## Install Homebrew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

## Install git, git-flow

```brew install git git-flow```

## Clone the repository

```
git clone https://github.com/MazinZ/luna-frontend.git
cd luna-frontend
git flow init -d
```

## Setup Client

From the same luna-frontend directory:

```
cp Procfile.package Procfile
npm install
cd app/js/external_libs
bower install
```

Go back to the luna-frontend/ directory and run `foreman start`


