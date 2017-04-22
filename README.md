# The Real Donal Trump

This is a simple Alexa skill for the Amazon Echo. It will read tweets from [@realDonaldTrump](https://twitter.com/realDonaldTrump).

## Example phrases
```
Alexa, ask the real Donald Trump for some wisdom …
```

## Development

### Test

```bash
npm test
```

### Build

```bash
npm run build
```

Uses `webpack` to build the AWS lambda function in `dist/index.js`.

### Deploy

```bash
npm run deploy
```

Uses `serverless` to package and deploy the lambda function directly to AWS.
