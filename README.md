# Invoice Processing App

This is a Next.js project designed to automate the processing of invoices, including parsing, data extraction, and integration with QuickBooks and Notion.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Data Flow Architecture

1. Buyer/SME emails or uploads invoice PDF to the Invoice Parsing Service
    1. Create automation pathway to encapsulate provided invoice
        1. Push to QBO
        2. Pass into parser
2. Invoice Parsing Service passes the URL of the invoice PDF to the Invoice Parser endpoint
    1. Open source LLM for secure information parsing
3. Invoice Parser fetches the PDF file from the URL
4. Invoice Parser extracts the raw text from the PDF
5. The extracted text is split into chunks and embeddings are generated for each chunk
6. An Open source model is used to extract structured line item data (description, quantity, unit price, amount) from the invoice text
7. The extracted line items are returned to the Invoice Parsing Service as a JSON array
8. Invoice Parsing Service enriches the extracted line item data with master product details and pricing from the Products Database
9. Calculated revenue, cost, and profit for the invoice are synced to the Deals Database in Notion
10. The receivable invoice is synced to QuickBooks
11. When payment is received, invoice status is updated in Notion Deals Database
12. Fulfillment requests are sent to the Fulfillment Partner and status is synced back
13. Deal financials and product pricing data are pushed to ChartBase for reporting

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Additional Considerations

- Original invoice PDFs should be stored securely and deleted after a defined retention period as they may contain sensitive data.
- Extracted text should also be treated as sensitive and access controlled appropriately.
- Increased data volume estimates:
    - 500 PDFs/month * 500KB average size = 250MB/month
    - 500 PDFs/month * 10 chunks/PDF * 1KB/embedding = 5MB/month
    - 500 PDFs/month * 1000 tokens/PDF * $0.002/1K tokens = $1/month in OpenAI usage
- Processing time SLAs should be established and infrastructure sized to handle peak PDF parsing loads.

## Estimation

Approximately 35 hours over a 4 week period.

### Breakdown:

1. Invoice Parser Endpoint: 5 hours
2. Invoice Parsing Service: 5 hours
3. Notion Databases/Integration: 10 hours
4. QuickBooks Integration: 10 hours
5. Fulfillment Integration: 5 hours
```
</rewritten_file><|eot_id|>

