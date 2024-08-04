const cheerio = require('cheerio')

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizeCurrentURL = normalizeURL(currentURL)
  if (normalizeCurrentURL in pages) {
    pages[normalizeCurrentURL].count++
    return pages
  }

  pages[normalizeCurrentURL] = { count: 1, content: [] }

  console.log('================================')
  console.log('actively crawling : ', currentURL)
  console.log('================================')

  try {
    const response = await fetch(currentURL)
    if (response.status > 399) {
      console.log(
        `error in fetch with status code : ${response.status}, on page ${currentURL}`
      )
      return pages
    }

    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')) {
      console.log(
        `non html response,content type: ${contentType}, on page ${currentURL}`
      )
      return pages
    }

    const htmlBody = await response.text()
    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    // Extract content
    const $ = cheerio.load(htmlBody)
    $('p').each((index, element) => {
      const text = $(element).text()
      pages[normalizeCurrentURL].content.push(text)
    })

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  } catch (error) {
    console.log(`error in fetch : ${error.message},on page:${currentURL}`)
  }

  return pages
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const urls = []
  
  const $ = cheerio.load(htmlBody)
  const linkElements = $('a')


  for (const linkElement of linkElements) {
    if (linkElement.attribs.href.slice(0, 1) === '/') {
      //relative url
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.attribs.href}`)

        urls.push(urlObj.href)
      } catch (error) {
        console.log('error with relative url:', error.message)
      }
    } else {
      //absolute url
      try {
        const urlObj = new URL(linkElement.attribs.href)

        urls.push(urlObj.href)
      } catch (error) {
        console.log('error with relative url:', error.message)
      }
    }
  }
  return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  }
  return hostPath
}



module.exports = {
  crawlPage,
  getURLsFromHTML,
  normalizeURL,
}