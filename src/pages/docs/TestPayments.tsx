import '../../scss/DocsPage.scss';
import InteractiveRequest from '../../components/InteractiveRequest';
import { useLocale } from '../../hooks/useLocale';

const TestPayments = () => {
  const { t } = useLocale();

  return (
    <>
      <h1>{t.testPayments.title}</h1>

      <h2>{t.testPayments.overview.title}</h2>
      <p>{t.testPayments.overview.text}</p>

      <h2>{t.testPayments.testData.title}</h2>

      <h3>{t.testPayments.testData.apiKey.title}</h3>
      <ol>
        <li>{t.testPayments.testData.apiKey.step1}</li>
        <li>{t.testPayments.testData.apiKey.step2}</li>
        <li>{t.testPayments.testData.apiKey.step3}</li>
        <li>{t.testPayments.testData.apiKey.step4}</li>
      </ol>

      <h3>{t.testPayments.testData.webhookUrl.title}</h3>
      <p>{t.testPayments.testData.webhookUrl.text}</p>
      <ul>
        <li>
          <strong><a href="https://webhook.site" target="_blank" rel="noopener noreferrer">webhook.site</a></strong> - 
          {t.testPayments.testData.webhookUrl.webhookSite}
        </li>
        <li>
          <strong><a href="https://ngrok.com" target="_blank" rel="noopener noreferrer">ngrok</a></strong> - 
          {t.testPayments.testData.webhookUrl.ngrok}
        </li>
        <li>
          <strong><a href="https://requestbin.com" target="_blank" rel="noopener noreferrer">RequestBin</a></strong> - 
          {t.testPayments.testData.webhookUrl.requestBin}
        </li>
      </ul>

      <h2>{t.testPayments.examples.title}</h2>
      <p>{t.testPayments.examples.text}</p>

      <h3>{t.testPayments.examples.example1.title}</h3>
      <p>{t.testPayments.examples.example1.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/create"
        description={t.testPayments.examples.example1.description}
        defaultBody={{
          amount: 10,
          webhookUrl: "https://webhook.site/your-unique-id"
        }}
      />

      <h3>{t.testPayments.examples.example2.title}</h3>
      <p>{t.testPayments.examples.example2.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/create"
        description={t.testPayments.examples.example2.description}
        defaultBody={{
          amount: 50,
          description: "Тестовый платеж за услугу",
          webhookUrl: "https://webhook.site/your-unique-id"
        }}
      />

      <h3>{t.testPayments.examples.example3.title}</h3>
      <p>{t.testPayments.examples.example3.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/create"
        description={t.testPayments.examples.example3.description}
        defaultBody={{
          amount: 100,
          description: "Оплата заказа #12345",
          webhookUrl: "https://webhook.site/your-unique-id",
          metadata: "{\"orderId\": \"12345\", \"userId\": \"user123\", \"productId\": \"prod456\"}"
        }}
      />

      <h3>{t.testPayments.examples.example4.title}</h3>
      <p>{t.testPayments.examples.example4.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/create"
        description={t.testPayments.examples.example4.description}
        defaultBody={{
          amount: 75,
          description: "Оплата подписки",
          webhookUrl: "https://webhook.site/your-unique-id",
          idempotencyKey: "subscription-user123-month-2024-01"
        }}
      />

      <h3>{t.testPayments.examples.example5.title}</h3>
      <p>{t.testPayments.examples.example5.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/create"
        description={t.testPayments.examples.example5.description}
        defaultBody={{
          amount: 100,
          description: "Тестовый платеж (без списания баланса)",
          webhookUrl: "https://webhook.site/your-unique-id",
          isTest: true
        }}
      />

      <h3>{t.testPayments.examples.example6.title}</h3>
      <p>{t.testPayments.examples.example6.description}</p>
      <InteractiveRequest
        method="POST"
        endpoint="/payment-request/webhook/test"
        description={t.testPayments.examples.example6.description}
        defaultBody={{
          webhookUrl: "https://webhook.site/your-unique-id"
        }}
      />

      <h3>{t.testPayments.examples.example7.title}</h3>
      <p>{t.testPayments.examples.example7.description}</p>
      <InteractiveRequest
        method="GET"
        endpoint="/payment-request/status/{requestId}"
        description={t.testPayments.examples.example7.description}
        pathParams={{ requestId: '' }}
      />

      <h2>{t.testPayments.curl.title}</h2>

      <h3>{t.testPayments.curl.createTitle}</h3>
      <pre><code>{`curl -X POST https://fabricbot.tech/api/v1/payment-request/create \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-test-api-key" \\
  -d '{
    "amount": 10,
    "description": "Тестовый платеж",
    "webhookUrl": "https://webhook.site/your-unique-id",
    "metadata": "{\\"test\\": true}",
    "isTest": true
  }'`}</code></pre>

      <h3>{t.testPayments.curl.testWebhookTitle}</h3>
      <pre><code>{`curl -X POST https://fabricbot.tech/api/v1/payment-request/webhook/test \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-test-api-key" \\
  -d '{
    "webhookUrl": "https://webhook.site/your-unique-id"
  }'`}</code></pre>

      <h3>{t.testPayments.curl.statusTitle}</h3>
      <pre><code>{`curl -X GET https://fabricbot.tech/api/v1/payment-request/status/550e8400-e29b-41d4-a716-446655440000 \\
  -H "X-API-Key: your-test-api-key"`}</code></pre>

      <h2>{t.testPayments.js.title}</h2>

      <pre><code>{`async function createTestPayment(apiKey: string, webhookUrl: string) {
  const response = await fetch('https://fabricbot.tech/api/v1/payment-request/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      amount: 10,
      description: 'Тестовый платеж',
      webhookUrl: webhookUrl,
      metadata: JSON.stringify({ test: true, timestamp: Date.now() }),
      isTest: true
    })
  });
  
  const data = await response.json();
  console.log('Payment URL:', data.paymentUrl);
  return data;
}

const apiKey = 'your-test-api-key';
const webhookUrl = 'https://webhook.site/your-unique-id';
createTestPayment(apiKey, webhookUrl);`}</code></pre>

      <h2>{t.testPayments.python.title}</h2>

      <pre><code>{`import requests
import json

def create_test_payment(api_key, webhook_url):
    url = 'https://fabricbot.tech/api/v1/payment-request/create'
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
    data = {
        'amount': 10,
        'description': 'Тестовый платеж',
        'webhookUrl': webhook_url,
        'metadata': json.dumps({'test': True}),
        'isTest': True
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()

api_key = 'your-test-api-key'
webhook_url = 'https://webhook.site/your-unique-id'
result = create_test_payment(api_key, webhook_url)
print('Payment URL:', result.get('paymentUrl'))`}</code></pre>

      <h2>{t.testPayments.responses.title}</h2>

      <h3>{t.testPayments.responses.successTitle}</h3>
      <pre><code>{`{
  "success": true,
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "paymentUrl": "https://t.me/fabricbotbot?startapp=pay_eyJwYXlsb2FkIjoi...",
  "expiresAt": "2024-01-01T12:30:00.000Z",
  "message": "Payment request created successfully"
}`}</code></pre>

      <h3>{t.testPayments.responses.validationErrorTitle}</h3>
      <pre><code>{`{
  "success": false,
  "error": "Invalid request data",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v1/payment-request/create"
}`}</code></pre>

      <h3>{t.testPayments.responses.authErrorTitle}</h3>
      <pre><code>{`{
  "success": false,
  "error": "Developer API key is required",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v1/payment-request/create"
}`}</code></pre>

      <h2>{t.testPayments.webhookTesting.title}</h2>

      <h3>{t.testPayments.webhookTesting.formatTitle}</h3>
      <p>{t.testPayments.webhookTesting.text}</p>
      <pre><code>{`POST https://your-webhook-url.com/webhook
Content-Type: application/json
X-Webhook-Signature: hmac-signature-here

{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "approved",
  "amount": 10,
  "transactionId": "transaction_123456",
  "telegramID": "123456789",
  "metadata": {
    "test": true,
    "timestamp": 1704110400000
  },
  "isTest": true,
  "timestamp": "2024-01-01T12:00:00.000Z"
}`}</code></pre>

      <h3>{t.testPayments.webhookTesting.statusesTitle}</h3>
      <ul>
        <li><code>approved</code> - {t.testPayments.webhookTesting.statusApproved}</li>
        <li><code>rejected</code> - {t.testPayments.webhookTesting.statusRejected}</li>
        <li><code>expired</code> - {t.testPayments.webhookTesting.statusExpired}</li>
      </ul>

      <h2>{t.testPayments.commonIssues.title}</h2>

      <h3>{t.testPayments.commonIssues.issue1.title}</h3>
      <p>
        <strong>{t.testPayments.commonIssues.issue1.cause}</strong>
      </p>
      <p>
        <strong>{t.testPayments.commonIssues.issue1.solution}</strong>
      </p>

      <h3>{t.testPayments.commonIssues.issue2.title}</h3>
      <p>
        <strong>{t.testPayments.commonIssues.issue2.cause}</strong>
      </p>
      <p>
        <strong>{t.testPayments.commonIssues.issue2.solution}</strong>
      </p>

      <h3>{t.testPayments.commonIssues.issue3.title}</h3>
      <p>
        <strong>{t.testPayments.commonIssues.issue3.cause}</strong>
      </p>
      <p>
        <strong>{t.testPayments.commonIssues.issue3.solution}</strong>
      </p>

      <h2>{t.testPayments.swagger.title}</h2>
      <p>{t.testPayments.swagger.text}</p>
      <p>
        <a 
          href="https://fabricbot.tech/api-docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="swagger-link"
        >
          🔗 {t.testPayments.swagger.linkText} → https://fabricbot.tech/api-docs
        </a>
      </p>
      <p>{t.testPayments.swagger.features.title}</p>
      <ul>
        <li>{t.testPayments.swagger.features.item1}</li>
        <li>{t.testPayments.swagger.features.item2}</li>
        <li>{t.testPayments.swagger.features.item3}</li>
        <li>{t.testPayments.swagger.features.item4}</li>
      </ul>
    </>
  );
};

export default TestPayments;

