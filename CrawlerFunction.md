# Web Crawler

This project is a simple web crawler implemented in JavaScript. It crawls web pages, extracts content, and keeps track of the number of times each page is encountered.

## Features

- Crawls web pages starting from a given base URL
- Extracts paragraph content from HTML pages
- Keeps track of the number of times each URL is encountered
- Handles both relative and absolute URLs

# Web Crawler

This project is a simple web crawler implemented in JavaScript. It crawls web pages, extracts content, and keeps track of the number of times each page is encountered.

## Features

- Crawls web pages starting from a given base URL
- Extracts paragraph content from HTML pages
- Keeps track of the number of times each URL is encountered
- Handles both relative and absolute URLs
- Normalizes URLs for consistent tracking
- Respects same-origin policy (only crawls pages on the same domain)

## Used Packages

- `cheerio`: For parsing and manipulating HTML



## Usage

To use the web crawler in your project, you can import the required functions:
```javascript
const { crawlPage} = require('./crawler');
```

### Main Functions

#### `crawlPage(baseURL, currentURL, pages)`

Crawls a page and its linked pages recursively

**Parameters**:
- `baseURL`: The starting URL for the crawl
- `currentURL`: The current URL being crawled
- `pages`: An object to store crawled pages and their data

#### `getURLsFromHTML(htmlBody, baseUrl)`

Extracts URLs from HTML content

**Parameters**:
- `htmlBody`: The HTML content as a string
- `baseUrl`: The base URL for resolving relative URLs

#### `normalizeURL(urlString)`

Normalizes a URL by removing the protocol and trailing slash

**Parameter**:
- `urlString`: The URL to normalize

### Example

Here's a simple example of how to use the crawler:
```javascript
const { crawlPage } = require('./crawler');

async function main() {
  const baseURL = 'https://example.com';

  const result = await crawlPage(baseURL, baseURL, pages);
  console.log(result);
}

main();
```

## Notes

- The crawler respects the same-origin policy and will only crawl pages on the same domain as the base URL.
- It handles errors gracefully, logging issues with fetching or parsing pages.
- The crawler extracts paragraph content from each page and stores it in the `pages` object.
