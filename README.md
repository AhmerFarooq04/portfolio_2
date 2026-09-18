# Ahmer's portfolio

## Local development

Set `UNSPLASH_ACCESS_KEY` in `.env.local`, then run `npm run dev`.
The component named `Nasa` uses Unsplash, not NASA.

## Server deployment

Pushing to `main` builds and publishes the Docker image through GitHub Actions.
The included `compose.yaml` runs that image on port 3000.

One-time setup in your existing server deployment directory:

1. Copy `compose.yaml` and `.env.example` from this repository to that directory.
   If you already have a Compose file with custom networking or other services,
   add the `UNSPLASH_ACCESS_KEY` environment entry to its existing `portfolio`
   service instead of replacing your configuration.
2. Create `.env` from `.env.example` if `.env` does not already exist.
3. Fill in `UNSPLASH_ACCESS_KEY` in the server's `.env` file.
4. After the GitHub image build succeeds, run from that same directory:

```bash
docker compose pull portfolio
docker compose up -d portfolio
```

A blank `.env` has also been created in this local workspace for Compose use.
Local `.env` and `.env.local` files are ignored by Git and excluded from Docker
builds. Updating a local key does not copy it to the server: set it there once.
The Compose file requires a nonempty key so missing configuration fails clearly.
No build-time API key or source checkout on the server is required.

For later image updates, use the commands above or your existing update timer.
After changing a runtime key, run `docker compose up -d portfolio` again.

## Space image troubleshooting

The browser calls `/api/space-image`; the server caches the upstream photo for
one hour to limit API usage. A missing key returns 503. Provider failures return
502 and log a diagnostic without the key. The widget displays the local Orion
image when the request or image loading fails.

```bash
docker compose logs --tail=50 portfolio
```
