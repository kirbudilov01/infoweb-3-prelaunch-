import { useState } from 'react';
import '../scss/InteractiveRequest.scss';
import { useLocale } from '../hooks/useLocale';

// Helper function to check if a string is a URL
const isUrl = (str: string): boolean => {
  return /^(https?:\/\/|tg:\/\/|https:\/\/t\.me\/)/.test(str);
};

// Component to render JSON with special formatting for URLs
const JsonRenderer = ({ data }: { data: unknown }) => {
  const formatValue = (value: unknown, indent: number = 0): React.ReactNode => {
    
    if (value === null) {
      return <span className="json-null">null</span>;
    }
    
    if (typeof value === 'boolean') {
      return <span className="json-boolean">{String(value)}</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }
    
    if (typeof value === 'string') {
      if (isUrl(value)) {
        return (
          <span className="json-url-container">
            <span className="json-string">"</span>
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="json-url-link"
            >
              {value}
            </a>
            <button
              className="json-copy-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(value);
                const btn = e.currentTarget;
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.classList.add('copied');
                setTimeout(() => {
                  btn.textContent = originalText;
                  btn.classList.remove('copied');
                }, 2000);
              }}
              title="Copy URL"
            >
              📋
            </button>
            <span className="json-string">"</span>
          </span>
        );
      }
      return <span className="json-string">"{value}"</span>;
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="json-array">[]</span>;
      }
      return (
        <span>
          <span className="json-bracket">[</span>
          <div style={{ marginLeft: `${indent + 1}rem` }}>
            {value.map((item, index) => (
              <div key={index}>
                {formatValue(item, indent + 1)}
                {index < value.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
          <div style={{ marginLeft: `${indent}rem` }}>
            <span className="json-bracket">]</span>
          </div>
        </span>
      );
    }
    
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return <span className="json-object">{'{}'}</span>;
      }
      return (
        <span>
          <span className="json-bracket">{'{'}</span>
          <div style={{ marginLeft: `${indent + 1}rem` }}>
            {entries.map(([key, val], index) => (
              <div key={key}>
                <span className="json-key">"{key}"</span>
                <span className="json-colon">: </span>
                {formatValue(val, indent + 1)}
                {index < entries.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
          <div style={{ marginLeft: `${indent}rem` }}>
            <span className="json-bracket">{'}'}</span>
          </div>
        </span>
      );
    }
    
    return <span>{String(value)}</span>;
  };
  
  return (
    <pre className="json-renderer">
      <code>{formatValue(data)}</code>
    </pre>
  );
};

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
}

interface InteractiveRequestProps {
  method: 'GET' | 'POST';
  endpoint: string;
  description?: string;
  defaultBody?: Record<string, unknown>;
  defaultHeaders?: Record<string, string>;
  showApiKey?: boolean;
  pathParams?: Record<string, string>; // For dynamic path parameters like {requestId}
}

const InteractiveRequest = ({
  method,
  endpoint,
  description,
  defaultBody = {},
  defaultHeaders = {},
  showApiKey = true,
  pathParams = {},
}: InteractiveRequestProps) => {
  const [apiKey, setApiKey] = useState('');
  const [requestBody, setRequestBody] = useState(JSON.stringify(defaultBody, null, 2));
  const [pathParamsState, setPathParamsState] = useState<Record<string, string>>(pathParams);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const { t } = useLocale();

  const baseUrl = 'https://fabricbot.tech/api/v1';
  
  // Replace path parameters in endpoint
  const getResolvedEndpoint = () => {
    let resolved = endpoint;
    Object.entries(pathParamsState).forEach(([key, value]) => {
      resolved = resolved.replace(`{${key}}`, value || `{${key}}`);
    });
    return resolved;
  };

  const handleSubmit = async () => {
    if (showApiKey && !apiKey.trim()) {
      setError(t.interactive.apiKeyPlaceholder);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      };

      if (showApiKey && apiKey) {
        headers['X-API-Key'] = apiKey;
      }

      let body: string | undefined;
      if (method === 'POST' && requestBody) {
        try {
          JSON.parse(requestBody);
          body = requestBody;
        } catch {
          setError('Invalid JSON format in request body');
          setLoading(false);
          return;
        }
      }

      const resolvedEndpoint = getResolvedEndpoint();
      const response = await fetch(`${baseUrl}${resolvedEndpoint}`, {
        method,
        headers,
        body: method === 'POST' ? body : undefined,
        mode: 'cors',
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || 'Ответ получен, но не в формате JSON' };
      }
      
      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
      });
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Network error. Check your internet connection and API availability.');
      } else {
        setError(error.message || 'An error occurred while executing the request');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interactive-request">
      <div className="interactive-request-header" onClick={() => setExpanded(!expanded)}>
        <div className="interactive-request-title">
          <span className={`method-badge method-badge--${method.toLowerCase()}`}>{method}</span>
          <code className="endpoint">{getResolvedEndpoint()}</code>
        </div>
        <button className="expand-button" type="button">
          {expanded ? t.interactive.collapse : t.interactive.expand}
        </button>
      </div>

      {description && <p className="interactive-request-description">{description}</p>}

      {expanded && (
        <div className="interactive-request-content">
          {showApiKey && (
            <div className="form-group">
              <label htmlFor="api-key">{t.interactive.apiKey}</label>
              <input
                id="api-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t.interactive.apiKeyPlaceholder}
                className="form-input"
              />
            </div>
          )}

          {Object.keys(pathParamsState).length > 0 && (
            <div className="form-group">
              <label>Path Parameters</label>
              {Object.keys(pathParamsState).map((key) => (
                <div key={key} style={{ marginBottom: '0.5rem' }}>
                  <label htmlFor={`path-param-${key}`} style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    {key}:
                  </label>
                  <input
                    id={`path-param-${key}`}
                    type="text"
                    value={pathParamsState[key] || ''}
                    onChange={(e) => setPathParamsState({ ...pathParamsState, [key]: e.target.value })}
                    placeholder={`Enter ${key}`}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          )}

          {method === 'POST' && (
            <div className="form-group">
              <label htmlFor="request-body">{t.interactive.requestBody}</label>
              <textarea
                id="request-body"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="form-textarea"
                rows={10}
                placeholder={t.interactive.requestBodyPlaceholder}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? t.interactive.submitting : t.interactive.submit}
          </button>

          {error && (
            <div className="response-error">
              <strong>{t.interactive.error}</strong> {error}
            </div>
          )}

          {response && (
            <div className="response-container">
              <div className="response-header">
                <span className={`status-badge status-badge--${response.status >= 200 && response.status < 300 ? 'success' : 'error'}`}>
                  {response.status} {response.statusText}
                </span>
                <button
                  className="copy-response-button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
                    const btn = document.activeElement as HTMLButtonElement;
                    if (btn) {
                      const originalText = btn.textContent;
                      btn.textContent = '✓ Copied!';
                      setTimeout(() => {
                        btn.textContent = originalText;
                      }, 2000);
                    }
                  }}
                  title="Copy response"
                >
                  📋 Copy JSON
                </button>
              </div>
              <div className="response-body">
                <JsonRenderer data={response.data} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveRequest;

