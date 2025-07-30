#!/bin/bash
# Move para o diretório correto
cd /home/site/wwwroot

# Link simbólico para apontar o root para o public
cp -r public/* .

# Start o PHP built-in (ou apenas deixe o Azure iniciar o Apache/Nginx, se configurado)
