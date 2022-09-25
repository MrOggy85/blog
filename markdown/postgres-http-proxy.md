---
title: Postgres HTTP proxy
description: Lightweight HTTP proxy for sending SQL commands to a Postgres DB
slug: postgres-http-proxy
date: 25/09/2022
img: postgres-http-proxy/squid.png
alt: 'high tech solarpunk squid'
width: 256
height: 256
---

## The (narrow) usage case

You are hacking away on a personal website using React or any other SPA
technology. You also need to write a backend service to connect to your DB in
order to persist your data across your different devices and client. However,
imagine if you could just use a general backend to directly connect to your DB?

## How?

Deploy a HTTP server that accepts POST requests with a JSON body. The body needs
to include the credentials and location of your DB as well as the SQL you want
to execute. Then you just connect to the DB using the credentials from the
request and execute the query. Return the result and you are done.

## Usage Example

It's very convenient to use for a web client. See this example using `axios`:

```ts
type PostgresProxyResponse = {
  command: "SELECT";
  query: unknown;
  rowCount: number;
  rows: any[][];
};

async function request(q: string) {
  const response = await axios({
    url: "/",
    baseURL: HTTP_ADDRESS_OF_ADEPLOYED_API,
    method: "POST",
    data: {
      u: "DB_USER",
      pw: "DB_PASSWORD",
      h: "DB_HOST",
      port: "DB_PORT",
      db: "DB_NAME",
      q: "SELECT * FROM table",
    },
  });

  return response.data;
}
```

## Security concerns

This is a short-cut solution for personal web projects to enable rapid
development. This assumes you are consuming a Postgres DB that is open to the
internet. If you are developing a web service for other users, it means that
they need to establish connection to their own DB. Otherwise you need to include
the DB credentials (in plaintext) for all users to see.

Needles to say, since this solution pushes the DB credentials down to the
client, it's not a very secure solution, unless you trust the client, since you
wrote it yourself.

Another issue is that you need to run your own proxy to be safe. Right now I am
not logging the credentials, but it's easy for a malicient service to store your
crentials. Also, since you are sending your DB credentials over the wire, make
sure it's HTTPS!

## Performance concerns

The API is static, which means it will open and close a DB connection for each
request. Therefor it adds extra latency. Another performance concern is the
multiple protocols involved and data tranformation happening for each SQL
command. With that said, this is obviously not a perforant nor a scalable
technical solution. However, for the very small scale it's intended for it's
suffice.

This is very handy if you like your website to be able to send SQL commands
directly to the DB. It's very useful for small personal projects. But, it's
definitly not recommended for any service with multiple users because of obvious
security concerns. Please use it at your own risk.

## Take away

This is far from rocket science, and someone probably already created this.
However, I didn't find this solution after some (Brave) searching so I wrote it
instead.

See Github: https://github.com/MrOggy85/postgres-proxy
