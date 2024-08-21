FROM node:lts-slim

# Instalação do PostgreSQL Client e outras dependências
RUN apt-get update && \
    apt-get -y install postgresql-client tzdata libgbm-dev gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
    ln -fs /usr/share/zoneinfo/America/Campo_Grande /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    apt-get -y clean && \
    apt-get -y autoclean && \
    apt-get -y autoremove && \
    rm -rf /var/lib/apt/lists/*

# Definição do diretório de trabalho
WORKDIR /var/api/

# Copia os arquivos necessários para o container
COPY ./package*.json ./
COPY ./dist ./dist
COPY ./envs ./envs

# Instala as dependências do projeto
RUN npm install --production

# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
