# UrbanNest — Hackathon Documentation

## 1. Problem

Traditional local lifestyle shops often depend on physical footfall and have limited digital reach. Customers may also have no convenient way to ask questions outside store hours.

## 2. Proposed Solution

UrbanNest Lifestyle Store is presented as a modern digital storefront where customers can explore products, learn about the business, submit a real query and interact with an AI assistant.

## 3. Key Features

- Professional landing page
- Product catalogue and category filtering
- Search
- Responsive desktop/tablet/mobile UI
- Customer query form connected to n8n
- Existing n8n AI chatbot integration
- Render deployment

## 4. Architecture

Website → n8n Query Webhook → Existing n8n Workflow

Website → n8n Chat Trigger → AI Agent → OpenAI Chat Model + Memory → Chat response

## 5. Team Contributions

Replace the placeholders with the real three members:

- Member 1 — UI/UX and landing page
- Member 2 — React development and responsive shop
- Member 3 — n8n integration, testing and deployment

## 6. Deployment

1. Push source code to GitHub.
2. Create a Render Static Site.
3. Connect the repository.
4. Build with `npm install && npm run build`.
5. Publish `dist`.
6. Add the n8n webhook URLs as Render environment variables.
7. Deploy and test the public URL.

## 7. Future Improvements

- Real inventory
- Online payments
- Order tracking
- Customer accounts
- Personalized recommendations
- WhatsApp integration
- Google Maps
- Analytics dashboard
