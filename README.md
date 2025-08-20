This is an internal website for the Studio for Interrelated Media department of the Massachusetts College of Art and Design.

# History

The first website for SIM was developed by Matt Karl.

# Structure

The important files and folders are…

- src/app [Folder]: This folder is where the actual pages which the end users will view and interact with are.

- /src/components [Folder]: Read this page if you are unfamiliar with React and what components are: https://reactjs.org/docs/components-and-props.html

- /database [Folder]: This contains the Prisma schema, which defines the way in which we interact with the database through Prisma. It is important to understand Prisma and this schema before interacting with the database. Read this page to get started: https://www.prisma.io/docs/concepts/components/prisma-schema

- /public [Folder]: This folder contains all media, including everything from images to the favicon. Everything in this folder is public, hence the name. While the files in Pages are rendered for the end user, their actual JavaScript is hidden. Do not put any sensitive information in this folder.

- .env [File]: This contains environment variables, such as the database URL.

- package.json [Folder]: All required modules are listed here. It is recommended to use Yarn to interact with this project, as opposed to NPM: https://yarnpkg.com/

# Getting Started

It is a [Next.js](https://nextjs.org) project. It is written in Javascript.

### Get NPM

If you don't have a way to download NPM, first get that.

Download and install fnm:

```
curl -o- https://fnm.vercel.app/install | bash
```

### Download and install Node.js:

```
fnm install 22
```

# YOU MUST HAVE NODE v18+ to use this app.

### Download and install Yarn:

npm install --global yarn

### Verify Yarn version:

yarn -v

# Install Nginx

```
sudo apt install nginx
```

# Adjust firewall

```
sudo ufw app list
```

You want to see a list of available applications: (list them)

```
sudo ufw allow 'Nginx HTTP' // (verify with "sudo ufw status")
```

# Install Nginx (cont'd)

```
sudo nano /etc/nginx/sites-available/sim
```

FIND OUT WHAT OUR IP ADDRESS

Write:

```
server {
  listen 80;
  server_name YOUR_IP_ADDRESS;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Create link

```
sudo ln -s /etc/nginx/sites-available/sim /etc/nginx/sites-enabled/
```

Check for errors:

```
sudo nginx -t
```

Run Nginx:

```
sudo service nginx restart
```

# Clone Git

```
cd /var/www
sudo git clone https://github.com/aefader00/sim-next-app.git sim
```

then go into that directory.

# Set up app

```
sudo yarn install

```

Add .env with this:

```
...
```

First, run the development server:

```
sudo yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Database

## Setting up PostgreSQL

Create a new PostgreSQL database and user that can access it.
Point to that database in the `.env` file like so:

```
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE"
```

## Setting up Prisma

Format the new database in the command line like so:

```
yarn prisma migrate dev --name init
```

Then, see the database with a default semester (as defined in `/prisma/seed.ts`):

```
yarn prisma db seed
```

Finally, install the Prisma client.

```
yarn prisma init
```
