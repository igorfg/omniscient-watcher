# omniscient-watcher
This application uses MangaDex API to go thourgh a list of mangas and check whether a new chapter has been released or not. If a new chapter is available it uses a Discord Webhook to post a new message in a channel.

## Look and feel

Here are a few screenshots of a working MDList and Discord Webhook integration

### MangaDex List example

![MangaDex List](imgs/mangadex_list.png)

### Discord messaging

![Discord messaging](imgs/discord_output.png)


## Installation

This project uses Yarn 4.9.1 and pnp package installation. If you don't know how that works check: https://yarnpkg.com/features/pnp

1. Install dependencies
```bash
yarn
```

2. Initialize SQLite3 Database
```
yarn init-db
```

3. Configure the environment variables in a .env file. You can copy .env.sample for that
```
MANGADEX_LIST_ID=your-list-id
WEBHOOK_URL=your-webhook-url
```

4. To run it locally
```bash
yarn dev
```

## Motivation
I have a bad habit of forgetting to read some manga that I managed to catch up with the weekly/monthly release. This tool was created to help me by sending push notifications, so that I'm reminded about those chapters.

## Credits

All the data shown here is fetched from the [MangaDex API](https://api.mangadex.org/docs/)