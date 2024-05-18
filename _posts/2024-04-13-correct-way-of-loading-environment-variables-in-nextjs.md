---
title: How to read environment variables in NextJS
date: 2024-04-13 14:10:00 +0800
categories: [practices]
tags: [engineering]
render_with_liquid: false
comments: true
---

I was not able to load the environment variables in my next applications. What we usually do is create a `.env.local` file to store all API keys and credential secrets and then read them in the application using

```typescript
const key = process.env.API_KEY;
```

This is not safe as if the `API_KEY` is not valid, then it will return undefined which will cause problems and the api requests will not work.

Naively expecting the `API_KEY` environment variable to exist will hide the bug and make this problem a pain to debug due to the misleading error message.

To fix this issue we need two things.

1. When a problem exists that causes the application to not function, the application needs to fail immediately and visibly.
2. A meaningful abstraction to encapsulate the loading of environment variables.

## How to load environment variables in NextJS

_.env.local_

```
GOOGLE_CLIENT_ID=secret
GOOGLE_CLIENT_SECRET=secret
```

_If you are using any other framework than nextjs, you will need a package like `dotenv`_

Create a `config.ts` file in parent directory

```typescript
const readEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const EnvironmentVariables = {
  googleclientid: readEnvironmentVariable("GOOGLE_CLIENT_ID"),
  googleclientsecret: readEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
};
```

### Using these environment variables

_auth.ts_

```typescript
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { EnvironmentVariables } from "@/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: EnvironmentVariables.googleclientid,
      clientSecret: EnvironmentVariables.googleclientsecret,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
```

## Why this is the correct way of reading the environment variables

In a case where you forgot to add the environment variable API_KEY the application won't even build/compile, and it will throw an error like this: Couldn't find environment variable: API_KEY.

**Our application now fails immediately and visibly.**

This is called **failing fast**.

It is part of the clean code principles, which you can read more about [here](https://www.martinfowler.com/ieeeSoftware/failFast.pdf)

Because we are using TypeScript, we can be 100% sure that all the values in the config exist.

Additionally, TypeScript helps us avoid small bugs.

If we make a typo:

```typescript
const clientId: EnvironmentVariables.googleclientud;
```

TypeScript will give us the following error:

```
Property 'googleclientud' does not exist on type '{ googleclientud: string; }'. Did you mean 'googleclientid'?
```

How cool is that!

It's like coding with superpowers.

## Encapsulating logic

Why should the functionality of fetching blog posts know anything about the user environment the application is currently running in?

Well it shouldn't.

The logic of authenticating a user doesn't care where it gets the api key from. If it comes from the user environment, text file, or an API doesn't make any difference to it.

Therefore, it shouldn't rely on `process.env` or any other low-level abstractions.

Creating a config for the sole purpose of reading environment variables encapsulates this functionality and creates a meaningful high-level abstraction.

> A config.

Thanks to this, we can change the way we get the config values (like the api key) without touching the blog post functionality at all!

Another very hidden benefit is that unit testing just became ten times easier. Instead of playing around with our user environment, we can just mock the config with the values we want to.

## Conclusion

While this might seem pedantic, keeping these small things in your mind while writing code will make you a better software engineer.
