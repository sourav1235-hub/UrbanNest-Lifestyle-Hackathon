# UrbanNest Lifestyle Store

A modern responsive website for the UrbanNest mini-hackathon challenge.

## Stack

- React + Vite
- CSS
- Lucide React
- n8n for query automation and AI chatbot
- Render for deployment

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## n8n configuration

Set these values in `.env`:

```env
VITE_N8N_QUERY_WEBHOOK_URL=https://YOUR-N8N-DOMAIN/webhook/YOUR-QUERY-WEBHOOK
VITE_N8N_CHAT_WEBHOOK_URL=https://YOUR-N8N-DOMAIN/webhook/YOUR-CHAT-TRIGGER-PATH
```

The query form sends JSON with:

- name
- email
- phone
- category
- message
- source
- submittedAt

The chatbot is loaded using the official `@n8n/chat` package and the public Chat Trigger webhook URL.

### Important n8n note

The screenshot supplied for the current workflow shows a Chat Trigger + AI Agent + OpenAI Chat Model + Simple Memory. It also shows:

> "The requested webhook ... is not registered."

This usually means the chat trigger is being tested through a URL that is not currently registered/active. For the public website, use the **production/public URL** from the Chat Trigger and make sure the workflow is active/published.

Do not put n8n login passwords, API keys, or private credentials in the React app or GitHub.

## Render

For a Vite static site on Render:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

Add the two environment variables in Render before deploying.

## Before submission

- Test the query form from the deployed Render URL.
- Confirm the query appears in the n8n execution history.
- Test the chatbot from the deployed URL.
- Check desktop, tablet and mobile.
- Open the Render URL in an incognito window.
- Keep secrets out of GitHub.
