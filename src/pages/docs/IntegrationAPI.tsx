import '../../scss/DocsPage.scss';
import { useLocale } from '../../hooks/useLocale';

const IntegrationAPI = () => {
  const { t } = useLocale();

  return (
    <>
      <h1>{t.integrationAPI.title}</h1>

      <h2>{t.integrationAPI.overview.title}</h2>
      <p>{t.integrationAPI.overview.text}</p>

      <h2>{t.integrationAPI.baseUrl.title}</h2>
      <p><strong>{t.integrationAPI.baseUrl.production}</strong></p>
      <pre><code>https://fabricbot.tech/api/v1</code></pre>
      
      <p><strong>{t.integrationAPI.baseUrl.development}</strong></p>
      <pre><code>http://localhost:3002/api/v1</code></pre>

      <h2>{t.integrationAPI.auth.title}</h2>
      <p>{t.integrationAPI.auth.text}</p>
      <pre><code>X-API-Key: your-api-key-here</code></pre>
      <p>{t.integrationAPI.auth.note}</p>

      <h2>{t.integrationAPI.requestSigning.title}</h2>
      <p>{t.integrationAPI.requestSigning.text}</p>

      <h3>{t.integrationAPI.requestSigning.howToSign.title}</h3>
      <ol>
        <li>{t.integrationAPI.requestSigning.howToSign.step1}</li>
        <li>{t.integrationAPI.requestSigning.howToSign.step2}</li>
        <li>{t.integrationAPI.requestSigning.howToSign.step3}</li>
      </ol>

      <h3>{t.integrationAPI.requestSigning.important.title}</h3>
      <p><strong>{t.integrationAPI.requestSigning.important.fieldsNote}</strong></p>
      <p>{t.integrationAPI.requestSigning.important.canonicalFormat}</p>

      <h3>{t.integrationAPI.requestSigning.example.title}</h3>
      <p>{t.integrationAPI.requestSigning.example.description}</p>

      <h4>JavaScript/TypeScript</h4>
      <pre><code>{`const crypto = require('crypto');

function normalizeJson(obj) {
  if (obj === null || obj === undefined) {
    return 'null';
  }
  if (typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(item => normalizeJson(item)).join(',') + ']';
  }
  const sortedKeys = Object.keys(obj).sort();
  const pairs = sortedKeys.map(key => {
    return JSON.stringify(key) + ':' + normalizeJson(obj[key]);
  });
  return '{' + pairs.join(',') + '}';
}

function signRequest(body, apiKey) {
  const normalizedBody = normalizeJson(body);
  const signature = crypto
    .createHmac('sha256', apiKey)
    .update(normalizedBody)
    .digest('hex');
  return signature;
}

const body = {
  amount: 100.5,
  description: 'Оплата за услугу',
  webhookUrl: 'https://your-app.com/webhook'
};

const signature = signRequest(body, 'your-api-key');

fetch('https://fabricbot.tech/api/v1/payment-request/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key',
    'X-Request-Signature': signature
  },
  body: JSON.stringify(body)
});`}</code></pre>

      <h4>Python</h4>
      <pre><code>{`import hmac
import hashlib
import json

def sign_request(body, api_key):
    sorted_body = json.dumps(body, sort_keys=True, separators=(',', ':'))
    signature = hmac.new(
        api_key.encode('utf-8'),
        sorted_body.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return signature

body = {
    'amount': 100.5,
    'description': 'Оплата за услугу',
    'webhookUrl': 'https://your-app.com/webhook'
}

signature = sign_request(body, 'your-api-key')

headers = {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key',
    'X-Request-Signature': signature
}`}</code></pre>

      <h3>{t.integrationAPI.requestSigning.webhookSigning.title}</h3>
      <p>{t.integrationAPI.requestSigning.webhookSigning.text}</p>
      <p><strong>{t.integrationAPI.requestSigning.webhookSigning.example}</strong></p>
      <pre><code>{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// В вашем webhook обработчике:
const signature = req.headers['x-webhook-signature'];
const isValid = verifyWebhookSignature(req.body, signature, webhookSecret);

if (!isValid) {
  return res.status(401).json({ error: 'Invalid signature' });
}`}</code></pre>

      <h2>{t.integrationAPI.howItWorks.title}</h2>
      <ol>
        <li>{t.integrationAPI.howItWorks.step1}</li>
        <li>{t.integrationAPI.howItWorks.step2}</li>
        <li>{t.integrationAPI.howItWorks.step3}</li>
        <li>{t.integrationAPI.howItWorks.step4}</li>
        <li>{t.integrationAPI.howItWorks.step5}</li>
      </ol>

      <h2>{t.integrationAPI.endpoints.title}</h2>

      <h3>{t.integrationAPI.endpoints.create.title}</h3>
      <p>{t.integrationAPI.endpoints.create.description}</p>

      <h4>{t.integrationAPI.endpoints.create.requestTitle}</h4>
      <pre><code>{`POST /api/v1/payment-request/create
Content-Type: application/json
X-API-Key: your-api-key
X-Request-Signature: hmac-signature-here (опционально)

{
  "amount": 100.5,
  "description": "Оплата за услугу",
  "webhookUrl": "https://your-app.com/webhook",
  "metadata": "{\\"orderId\\": \\"12345\\", \\"userId\\": \\"user123\\"}",
  "idempotencyKey": "order-12345-unique",
  "isTest": false
}`}</code></pre>

      <h4>{t.integrationAPI.endpoints.create.responseSuccessTitle}</h4>
      <pre><code>{`{
  "success": true,
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "paymentUrl": "https://t.me/fabricbotbot?startapp=pay_eyJwYXlsb2FkIjoi...",
  "expiresAt": "2024-01-01T12:30:00.000Z",
  "message": "Payment request created successfully"
}`}</code></pre>

      <h4>{t.integrationAPI.endpoints.create.responseErrorTitle}</h4>
      <pre><code>{`{
  "success": false,
  "error": "Invalid request data",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v1/payment-request/create"
}`}</code></pre>

      <h4>{t.integrationAPI.endpoints.create.paramsTitle}</h4>
      <table>
        <thead>
          <tr>
            <th>{t.integrationAPI.endpoints.create.tableHeader.parameter}</th>
            <th>{t.integrationAPI.endpoints.create.tableHeader.type}</th>
            <th>{t.integrationAPI.endpoints.create.tableHeader.required}</th>
            <th>{t.integrationAPI.endpoints.create.tableHeader.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>amount</code></td>
            <td>number</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.yes}</td>
            <td>{t.integrationAPI.endpoints.create.paramAmount}</td>
          </tr>
          <tr>
            <td><code>webhookUrl</code></td>
            <td>string</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.yes}</td>
            <td>{t.integrationAPI.endpoints.create.paramWebhookUrl}</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td>string</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.no}</td>
            <td>{t.integrationAPI.endpoints.create.paramDescription}</td>
          </tr>
          <tr>
            <td><code>metadata</code></td>
            <td>string</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.no}</td>
            <td>{t.integrationAPI.endpoints.create.paramMetadata}</td>
          </tr>
          <tr>
            <td><code>idempotencyKey</code></td>
            <td>string</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.no}</td>
            <td>{t.integrationAPI.endpoints.create.paramIdempotencyKey}</td>
          </tr>
          <tr>
            <td><code>isTest</code></td>
            <td>boolean</td>
            <td>{t.integrationAPI.endpoints.create.tableValues.no}</td>
            <td>{t.integrationAPI.endpoints.create.paramIsTest}</td>
          </tr>
        </tbody>
      </table>


      <h3>{t.integrationAPI.endpoints.testWebhook.title}</h3>
      <p>{t.integrationAPI.endpoints.testWebhook.description}</p>

      <h4>{t.integrationAPI.endpoints.testWebhook.requestTitle}</h4>
      <pre><code>{`POST /api/v1/payment-request/webhook/test
Content-Type: application/json
X-API-Key: your-api-key

{
  "webhookUrl": "https://your-app.com/webhook"
}`}</code></pre>

      <h4>{t.integrationAPI.endpoints.testWebhook.responseTitle}</h4>
      <pre><code>{`{
  "success": true,
  "message": "Webhook URL is accessible"
}`}</code></pre>

      <h3>{t.integrationAPI.endpoints.status.title}</h3>
      <p>{t.integrationAPI.endpoints.status.description}</p>

      <h4>{t.integrationAPI.endpoints.status.requestTitle}</h4>
      <pre><code>{`GET /api/v1/payment-request/status/550e8400-e29b-41d4-a716-446655440000
X-API-Key: your-api-key`}</code></pre>

      <h4>{t.integrationAPI.endpoints.status.responseTitle}</h4>
      <pre><code>{`{
  "success": true,
  "data": {
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "webhookSentAt": "2024-01-01T12:00:00.000Z",
    "webhookAttempts": 1,
    "webhookLastAttemptAt": "2024-01-01T12:00:00.000Z",
    "webhookResponse": {
      "status": 200,
      "attempts": 1
    }
  }
}`}</code></pre>

      <h2>{t.integrationAPI.webhooks.title}</h2>
      <p>{t.integrationAPI.webhooks.text}</p>

      <h3>{t.integrationAPI.webhooks.formatTitle}</h3>
      <pre><code>{`{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "approved",
  "amount": 100.5,
  "transactionId": "transaction_123456",
  "telegramID": "123456789",
  "metadata": {
    "orderId": "12345",
    "userId": "user123"
  },
  "isTest": false,
  "timestamp": "2024-01-01T12:00:00.000Z"
}`}</code></pre>

      <h3>{t.integrationAPI.webhooks.statusesTitle}</h3>
      <ul>
        <li><code>approved</code> - {t.integrationAPI.webhooks.statusApproved}</li>
        <li><code>rejected</code> - {t.integrationAPI.webhooks.statusRejected}</li>
        <li><code>expired</code> - {t.integrationAPI.webhooks.statusExpired}</li>
      </ul>

      <h3>{t.integrationAPI.webhooks.securityTitle}</h3>
      <p>{t.integrationAPI.webhooks.securityText}</p>

      <h3>{t.integrationAPI.webhooks.retryTitle}</h3>
      <p>{t.integrationAPI.webhooks.retryText}</p>

      <h2>{t.integrationAPI.examples.title}</h2>

      <h3>{t.integrationAPI.examples.jsTitle}</h3>
      <pre><code>{`async function createPaymentRequest(apiKey: string, amount: number, webhookUrl: string) {
  const response = await fetch('https://fabricbot.tech/api/v1/payment-request/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      amount,
      description: 'Оплата за услугу',
      webhookUrl,
      metadata: JSON.stringify({ orderId: '12345' })
    })
  });
  
  return await response.json();
}`}</code></pre>

      <h3>{t.integrationAPI.examples.pythonTitle}</h3>
      <pre><code>{`import requests

def create_payment_request(api_key, amount, webhook_url):
    url = 'https://fabricbot.tech/api/v1/payment-request/create'
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
    data = {
        'amount': amount,
        'description': 'Оплата за услугу',
        'webhookUrl': webhook_url,
        'metadata': '{"orderId": "12345"}'
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()`}</code></pre>

      <h3>{t.integrationAPI.examples.curlTitle}</h3>
      <pre><code>{`curl -X POST https://fabricbot.tech/api/v1/payment-request/create \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "amount": 100.5,
    "description": "Оплата за услугу",
    "webhookUrl": "https://your-app.com/webhook",
    "metadata": "{\\"orderId\\": \\"12345\\"}"
  }'`}</code></pre>

      <h2>{t.integrationAPI.testData.title}</h2>
      <p>{t.integrationAPI.testData.text}</p>
      <ul>
        <li><strong>{t.integrationAPI.testData.apiKey}</strong> {t.integrationAPI.testData.apiKeyNote}</li>
        <li><strong>{t.integrationAPI.testData.webhookUrl}</strong> {t.integrationAPI.testData.webhookUrlNote}</li>
      </ul>

      <h3>{t.integrationAPI.testData.exampleTitle}</h3>
      <pre><code>{`{
  "amount": 10,
  "description": "Тестовый платеж",
  "webhookUrl": "https://webhook.site/your-unique-id",
  "metadata": "{\\"test\\": true}"
}`}</code></pre>

      <h2>{t.integrationAPI.swagger.title}</h2>
      <p>{t.integrationAPI.swagger.text}</p>
      <p>
        <a 
          href="https://fabricbot.tech/api-docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="swagger-link"
        >
          🔗 {t.integrationAPI.swagger.linkText} → https://fabricbot.tech/api-docs
        </a>
      </p>
      <p>{t.integrationAPI.swagger.note}</p>
    </>
  );
};

export default IntegrationAPI;

