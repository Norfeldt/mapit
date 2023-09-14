# Mapit Extension

Mapit is a Chrome/Edge extension that allows you to quickly search for addresses and get directions on Google Maps. This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime - but the main usage of bun is to bundle the TS files chrome/edge uses V8 engine.


## Setup 
[Get a Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and place it into a `.env` file (use the structure from `.env.example` but do NOT commit it):


To install dependencies:

```zsh
bun install
```

## Develop

One time bundling:

```zsh
bun dle
```

watch bundling (like auto reload)

```zsh
bun dlew
```
