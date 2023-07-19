_this branch uses [twind](https://twind.dev/) for styling_

# THE BETH STACK

_It may not be the BEST stack, but it is the BETH stack._

## [Bun](https://bun.sh/)

## [Elysia](https://elysiajs.com/)

## [Turso](https://turso.tech/)

## [HTMX](https://htmx.org/)

Also: [typed-html](https://github.com/nicojs/typed-html), [tailwind-css](https://tailwindcss.com/), [drizzle](https://orm.drizzle.team/), [hyperscript](https://hyperscript.org/) and [fly.io](https://fly.io/)

### VIEW THE LIVE DEMO AT [the-beth-stack.fly.dev](https://the-beth-stack.fly.dev/)

## EACH STEP IN THE TUTORIAL IS [A BRANCH IN THIS REPO](https://github.com/ethanniser/the-beth-stack/branches)

### SO YOU CAN SEE THE CODE AT EACH STEP

# TO RUN LOCALLY

1. Clone this repo

2. Install [Bun](https://bun.sh)

3. Run `bun install` to install dependencies

4. Create a database with [Turso](https://turso.tech) and add the connection url and token to a `.env` file in the root of this project

5. Run `bun run db:push` to push the database schema to your database

6. Run `bun run dev` to start the dev server

# TO DEPLOY TO FLY

1. Install the [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)

2. Run `fly launch`

3. Run `fly secrets set DATABASE_URL=<your url>` & `fly secrets set DATABASE_AUTH_TOKEN=<your token>`

4. Run `fly deploy`
