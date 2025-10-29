/**
 * x402 Payments Protocol Integration
 * "1 line of code to accept digital dollars. No fee, 2 second settlement, $0.001 minimum payment."
 */

import type { Tool } from './types';

export const X402_CONTEXT = `
═══════════════════════════════════════════════════════════════════════════════
💰 x402 PAYMENTS PROTOCOL INTEGRATION
═══════════════════════════════════════════════════════════════════════════════

When building web applications or APIs, integrate x402 payments protocol for instant digital payments.

## Overview
x402: "1 line of code to accept digital dollars. No fee, 2 second settlement, $0.001 minimum payment."

## Quick Integration (Express/Node.js)

\`\`\`typescript
import { paymentMiddleware } from '@x402/node';

app.use(
  paymentMiddleware("0xYourAddress", { 
    "/api/premium": "$0.01",
    "/api/query": "$0.001"
  })
);

// That's it! Your endpoints now require payment
\`\`\`

## Key Features
- **No fees**: Unlike credit cards (2-3%), x402 has no percentage-based fees
- **Instant settlement**: 2 second settlement time
- **Micro-payments**: $0.001 minimum payment (1/10th of a cent)
- **HTTP native**: Uses standard 402 Payment Required status code
- **Gasless**: No gas fees for client or server
- **Chain agnostic**: Works on multiple blockchains

## Installation

\`\`\`bash
npm install @x402/node @x402/client
\`\`\`

## Server Implementation

### Express Server
\`\`\`typescript
import express from 'express';
import { paymentMiddleware } from '@x402/node';

const app = express();

// Add payment middleware
app.use(
  paymentMiddleware(
    "0xYourWalletAddress",  // Where you want funds to land
    {
      "/api/weather": "$0.01",
      "/api/premium-data": "$0.05",
      "/api/ai-query": "$0.10"
    }
  )
);

// Your protected endpoints
app.get('/api/weather', (req, res) => {
  res.json({ weather: 'sunny', temp: 72 });
});

app.listen(3000);
\`\`\`

### Next.js API Routes
\`\`\`typescript
// pages/api/premium.ts
import { withPayment } from '@x402/next';

async function handler(req, res) {
  res.json({ data: 'premium content' });
}

export default withPayment(handler, {
  address: "0xYourWalletAddress",
  price: "$0.01"
});
\`\`\`

## Client Implementation

### JavaScript/TypeScript Client
\`\`\`typescript
import { X402Client } from '@x402/client';

const client = new X402Client({
  privateKey: process.env.PRIVATE_KEY,
  network: 'base-sepolia' // or 'base-mainnet'
});

// Make a payment-required request
const response = await client.get('https://api.example.com/premium-data');
console.log(response.data); // Payment automatically handled
\`\`\`

### Browser Usage
\`\`\`typescript
import { createX402Fetch } from '@x402/browser';

const x402fetch = createX402Fetch({
  wallet: await window.ethereum.request({ method: 'eth_requestAccounts' })
});

const data = await x402fetch('/api/premium');
\`\`\`

## Protocol Flow

1. **Initial Request**: Client requests resource without payment
2. **402 Response**: Server returns \`402 Payment Required\` with payment details
3. **Payment Header**: Client adds \`X-PAYMENT\` header with payment proof
4. **Verification**: Server verifies payment (locally or via facilitator)
5. **Settlement**: Payment settles on-chain (async, non-blocking)
6. **Response**: Server returns resource with \`X-PAYMENT-RESPONSE\` header

## Payment Requirements Schema

\`\`\`typescript
interface PaymentRequirements {
  scheme: 'exact' | 'upto';           // Payment type
  network: 'base' | 'ethereum' | 'arbitrum';
  maxAmountRequired: string;           // In atomic units (wei)
  resource: string;                    // URL path
  description: string;
  payTo: string;                       // Recipient address
  asset: string;                       // Token contract address (USDC, etc)
  maxTimeoutSeconds: number;
}
\`\`\`

## Environment Setup

\`\`\`bash
# Server .env
WALLET_ADDRESS=0x...                  # Your receiving address
FACILITATOR_URL=https://facilitator.x402.org

# Client .env
PRIVATE_KEY=0x...                     # Payment account private key
X402_NETWORK=base-sepolia
\`\`\`

## Common Use Cases

### 1. AI API with Per-Token Pricing
\`\`\`typescript
app.use(paymentMiddleware("0xAddress", {
  "/ai/chat": "$0.001"  // $0.001 per request
}));
\`\`\`

### 2. Content Paywall
\`\`\`typescript
app.use(paymentMiddleware("0xAddress", {
  "/articles/premium/*": "$0.05"
}));
\`\`\`

### 3. File Downloads
\`\`\`typescript
app.use(paymentMiddleware("0xAddress", {
  "/download/*": "$0.10"
}));
\`\`\`

## Verification & Settlement

### Local Verification (Fast)
\`\`\`typescript
import { verifyPayment } from '@x402/verify';

const isValid = await verifyPayment(paymentHeader, requirements);
\`\`\`

### Facilitator Service (Recommended)
\`\`\`typescript
// Facilitator handles verification + settlement
// POST /verify - Verify payment signature
// POST /settle - Execute on-chain transaction
// GET /supported - Get supported chains/schemes

const facilitator = 'https://facilitator.x402.org';
\`\`\`

## Supported Networks
- Base (Mainnet & Sepolia)
- Ethereum
- Arbitrum
- Polygon
- More coming...

## Supported Schemes
- \`exact\`: Fixed amount payment (e.g., $0.01 for article)
- \`upto\`: Variable payment up to max (e.g., LLM tokens consumed)

## Best Practices

1. **Use Testnet First**: Start with base-sepolia
2. **Async Settlement**: Don't block responses on on-chain confirmation
3. **Clear Pricing**: Show users costs upfront
4. **Error Handling**: Handle insufficient funds gracefully
5. **Receipt Storage**: Log payment responses for reconciliation

## Links
- Documentation: https://github.com/Meteor-Wallet/x402_protocol
- Facilitator Service: https://facilitator.x402.org
- Testnet Faucet: https://faucet.quicknode.com/base/sepolia

═══════════════════════════════════════════════════════════════════════════════
⚡ When building APIs or paid services, integrate x402 for instant payments!
═══════════════════════════════════════════════════════════════════════════════
`;

export const x402Tool: Tool = {
  id: 'x402',
  name: 'x402 Payments',
  description: 'HTTP-native payment protocol. $0.001 minimum, 2s settlement, no fees.',
  category: 'payments',
  enabled: false,
  contextPrompt: X402_CONTEXT,
  icon: '💰',
  documentationUrl: 'https://github.com/Meteor-Wallet/x402_protocol'
};
