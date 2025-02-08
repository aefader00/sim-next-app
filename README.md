This is an internal website for the Studio for Interrelated Media department of the Massachusetts College of Art and Design.

The important files and folders are…

- src/app [Folder]: This folder is where the actual pages which the end users will view and interact with are.

- /src/components [Folder]: Read this page if you are unfamiliar with React and what components are: https://reactjs.org/docs/components-and-props.html

- /prisma [Folder]: This contains the Prisma schema, which defines the way in which we interact with the database through Prisma. It is important to understand Prisma and this schema before interacting with the database. Read this page to get started: https://www.prisma.io/docs/concepts/components/prisma-schema

- /public [Folder]: This folder contains all media, including everything from images to the favicon. Everything in this folder is public, hence the name. While the files in Pages are rendered for the end user, their actual JavaScript is hidden. Do not put any sensitive information in this folder.

- .env [File]: This contains environment variables, such as the database URL.

- package.json [Folder]: All required modules are listed here. It is recommended to use Yarn to interact with this project, as opposed to NPM: https://yarnpkg.com/

# Getting Started

It is a [Next.js](https://nextjs.org) project. It is written in Javascript.

```
yarn install
```

First, run the development server:

```
yarn run dev
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
