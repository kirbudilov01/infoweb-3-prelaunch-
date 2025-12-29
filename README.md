# Документация FABRICBOT ECOSYSTEM

Статический сайт документации для платформы FABRICBOT ECOSYSTEM.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Docker

```bash
docker build -t docs-frontend .
docker run -p 3004:80 docs-frontend
```

## Структура

- `src/pages/` - страницы документации
- `src/scss/` - стили
- `public/` - статические файлы
