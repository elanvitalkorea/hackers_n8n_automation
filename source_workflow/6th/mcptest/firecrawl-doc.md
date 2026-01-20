<page>
  <title>Quickstart | Firecrawl</title>
  <url>https://docs.firecrawl.dev</url>
  <content>Welcome to Firecrawl
--------------------

[Firecrawl](https://firecrawl.dev/?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown. We crawl all accessible subpages and give you clean markdown for each. No sitemap required.

How to use it?
--------------

We provide an easy to use API with our hosted version. You can find the playground and documentation [here](https://firecrawl.dev/playground). You can also self host the backend if you’d like. Check out the following resources to get started:

*   **API**: [Documentation](https://docs.firecrawl.dev/api-reference/introduction)
*   **SDKs**: [Python](https://docs.firecrawl.dev/sdks/python), [Node](https://docs.firecrawl.dev/sdks/node)
*   **LLM Frameworks**: [Langchain (python)](https://python.langchain.com/docs/integrations/document_loaders/firecrawl/), [Langchain (js)](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/firecrawl), [Llama Index](https://docs.llamaindex.ai/en/latest/examples/data_connectors/WebPageDemo/#using-firecrawl-reader), [Crew.ai](https://docs.crewai.com/), [Composio](https://composio.dev/tools/firecrawl/all), [PraisonAI](https://docs.praison.ai/firecrawl/), [Superinterface](https://superinterface.ai/docs/assistants/functions/firecrawl), [Vectorize](https://docs.vectorize.io/integrations/source-connectors/firecrawl)
*   **Low-code Frameworks**: [Dify](https://dify.ai/blog/dify-ai-blog-integrated-with-firecrawl), [Langflow](https://docs.langflow.org/), [Flowise AI](https://docs.flowiseai.com/integrations/langchain/document-loaders/firecrawl), [Cargo](https://docs.getcargo.io/integration/firecrawl), [Pipedream](https://pipedream.com/apps/firecrawl/)
*   **Community SDKs**: [Go](https://docs.firecrawl.dev/sdks/go), [Rust](https://docs.firecrawl.dev/sdks/rust) (v1)
*   **Others**: [Zapier](https://zapier.com/apps/firecrawl/integrations), [Pabbly Connect](https://www.pabbly.com/connect/integrations/firecrawl/)
*   **Self-host:** To self-host refer to guide [here](https://docs.firecrawl.dev/contributing/self-host).

Want an SDK or Integration? Let us know by opening an [issue](https://github.com/firecrawl/firecrawl/issues).

### API Key

To use the API, you need to sign up on [Firecrawl](https://firecrawl.dev/) and get an API key.

### Features

*   [**Scrape**](#scraping): scrapes a URL and get its content in LLM-ready format (markdown, summary, structured data via [json mode](#json-mode), screenshot, html)
*   [**Crawl**](#crawling): scrapes all the URLs of a web page and return content in LLM-ready format
*   [**Map**](https://docs.firecrawl.dev/features/map): input a website and get all the website urls - extremely fast
*   [**Search**](https://docs.firecrawl.dev/features/search): search the web and get full content from results
*   [**Extract**](https://docs.firecrawl.dev/features/extract): get structured data from single page, multiple pages or entire websites with AI.

### Powerful Capabilities

*   **LLM-ready formats**: markdown, summary, structured data, screenshot, HTML, links, metadata
*   **The hard stuff**: proxies, anti-bot mechanisms, dynamic content (js-rendered), output parsing, orchestration
*   **Lightning fast**: Get results in seconds—built for speed and high-throughput use cases.
*   **Customizability**: exclude tags, crawl behind auth walls with custom headers, max crawl depth, etc…
*   **Media parsing**: pdfs, docx, images.
*   **Reliability first**: designed to get the data you need - no matter how hard it is.
*   **Actions**: click, scroll, input, wait and more before extracting data

You can find all of Firecrawl’s capabilities and how to use them in our [documentation](https://docs.firecrawl.dev/api-reference/v2-introduction)

Installing Firecrawl
--------------------

Scraping
--------

To scrape a single URL, use the `scrape` method. It takes the URL as a parameter and returns the scraped data as a dictionary.

### Response

SDKs will return the data object directly. cURL will return the payload exactly as shown below.

    {
      "success": true,
      "data" : {
        "markdown": "Launch Week I is here! [See our Day 2 Release 🚀](https://www.firecrawl.dev/blog/launch-week-i-day-2-doubled-rate-limits)[💥 Get 2 months free...",
        "html": "<!DOCTYPE html><html lang=\"en\" class=\"light\" style=\"color-scheme: light;\"><body class=\"__variable_36bd41 __variable_d7dc5d font-inter ...",
        "metadata": {
          "title": "Home - Firecrawl",
          "description": "Firecrawl crawls and converts any website into clean markdown.",
          "language": "en",
          "keywords": "Firecrawl,Markdown,Data,Mendable,Langchain",
          "robots": "follow, index",
          "ogTitle": "Firecrawl",
          "ogDescription": "Turn any website into LLM-ready data.",
          "ogUrl": "https://www.firecrawl.dev/",
          "ogImage": "https://www.firecrawl.dev/og.png?123",
          "ogLocaleAlternate": [],
          "ogSiteName": "Firecrawl",
          "sourceURL": "https://firecrawl.dev",
          "statusCode": 200
        }
      }
    }
    

Crawling
--------

The crawl feature allows you to automatically discover and extract content from a URL and all of its accessible subpages. With our SDKs, simply call the crawl method—this will submit a crawl job, wait for it to finish, and return the complete results for the entire site.

### Usage

If you’re using our API directly, cURL or `start crawl` functions on SDKs, this will return an `ID` where you can use to check the status of the crawl.

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
    }
    

### Get Crawl Status

Used to check the status of a crawl job and get its result.

#### Response

The response will be different depending on the status of the crawl. For not completed or large responses exceeding 10MB, a `next` URL parameter is provided. You must request this URL to retrieve the next 10MB of data. If the `next` parameter is absent, it indicates the end of the crawl data.

JSON mode
---------

With JSON mode, you can easily extract structured data from any URL. We support pydantic schemas to make it easier for you too. Here is how you to use it:

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
            "supports_sso": true,
            "is_open_source": true,
            "is_in_yc": true
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

Search
------

Firecrawl’s search API allows you to perform web searches and optionally scrape the search results in one operation.

*   Choose specific output formats (markdown, HTML, links, screenshots)
*   Choose specific sources (web, news, images)
*   Search the web with customizable parameters (location, etc.)

For details, see the [Search Endpoint API Reference](https://docs.firecrawl.dev/api-reference/endpoint/search).

### Response

SDKs will return the data object directly. cURL will return the complete payload.

    {
      "success": true,
      "data": {
        "web": [
          {
            "url": "https://www.firecrawl.dev/",
            "title": "Firecrawl - The Web Data API for AI",
            "description": "The web crawling, scraping, and search API for AI. Built for scale. Firecrawl delivers the entire internet to AI agents and builders.",
            "position": 1
          },
          {
            "url": "https://github.com/mendableai/firecrawl",
            "title": "mendableai/firecrawl: Turn entire websites into LLM-ready ... - GitHub",
            "description": "Firecrawl is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data.",
            "position": 2
          },
          ...
        ],
        "images": [
          {
            "title": "Quickstart | Firecrawl",
            "imageUrl": "https://mintlify.s3.us-west-1.amazonaws.com/firecrawl/logo/logo.png",
            "imageWidth": 5814,
            "imageHeight": 1200,
            "url": "https://docs.firecrawl.dev/",
            "position": 1
          },
          ...
        ],
        "news": [
          {
            "title": "Y Combinator startup Firecrawl is ready to pay $1M to hire three AI agents as employees",
            "url": "https://techcrunch.com/2025/05/17/y-combinator-startup-firecrawl-is-ready-to-pay-1m-to-hire-three-ai-agents-as-employees/",
            "snippet": "It's now placed three new ads on YC's job board for “AI agents only” and has set aside a $1 million budget total to make it happen.",
            "date": "3 months ago",
            "position": 1
          },
          ...
        ]
      }
    }
    

You can now extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

Interacting with the page with Actions
--------------------------------------

Firecrawl allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction. Here is an example of how to use actions to navigate to google.com, search for Firecrawl, click on the first result, and take a screenshot. It is important to almost always use the `wait` action before/after executing other actions to give enough time for the page to load.

### Example

### Output

Open Source vs Cloud
--------------------

Firecrawl is open source available under the [AGPL-3.0 license](https://github.com/mendableai/firecrawl/blob/main/LICENSE). To deliver the best possible product, we offer a hosted version of Firecrawl alongside our open-source offering. The cloud solution allows us to continuously innovate and maintain a high-quality, sustainable service for all users. Firecrawl Cloud is available at [firecrawl.dev](https://firecrawl.dev/) and offers a range of features that are not available in the open source version:

Contributing
------------

We love contributions! Please read our [contributing guide](https://github.com/mendableai/firecrawl/blob/main/CONTRIBUTING.md) before submitting a pull request.</content>
</page>

<page>
  <title>Quickstart | Firecrawl</title>
  <url>https://docs.firecrawl.dev/introduction</url>
  <content>Welcome to Firecrawl
--------------------

[Firecrawl](https://firecrawl.dev/?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown. We crawl all accessible subpages and give you clean markdown for each. No sitemap required.

How to use it?
--------------

We provide an easy to use API with our hosted version. You can find the playground and documentation [here](https://firecrawl.dev/playground). You can also self host the backend if you’d like. Check out the following resources to get started:

*   **API**: [Documentation](https://docs.firecrawl.dev/api-reference/introduction)
*   **SDKs**: [Python](https://docs.firecrawl.dev/sdks/python), [Node](https://docs.firecrawl.dev/sdks/node)
*   **LLM Frameworks**: [Langchain (python)](https://python.langchain.com/docs/integrations/document_loaders/firecrawl/), [Langchain (js)](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/firecrawl), [Llama Index](https://docs.llamaindex.ai/en/latest/examples/data_connectors/WebPageDemo/#using-firecrawl-reader), [Crew.ai](https://docs.crewai.com/), [Composio](https://composio.dev/tools/firecrawl/all), [PraisonAI](https://docs.praison.ai/firecrawl/), [Superinterface](https://superinterface.ai/docs/assistants/functions/firecrawl), [Vectorize](https://docs.vectorize.io/integrations/source-connectors/firecrawl)
*   **Low-code Frameworks**: [Dify](https://dify.ai/blog/dify-ai-blog-integrated-with-firecrawl), [Langflow](https://docs.langflow.org/), [Flowise AI](https://docs.flowiseai.com/integrations/langchain/document-loaders/firecrawl), [Cargo](https://docs.getcargo.io/integration/firecrawl), [Pipedream](https://pipedream.com/apps/firecrawl/)
*   **Community SDKs**: [Go](https://docs.firecrawl.dev/sdks/go), [Rust](https://docs.firecrawl.dev/sdks/rust) (v1)
*   **Others**: [Zapier](https://zapier.com/apps/firecrawl/integrations), [Pabbly Connect](https://www.pabbly.com/connect/integrations/firecrawl/)
*   **Self-host:** To self-host refer to guide [here](https://docs.firecrawl.dev/contributing/self-host).

Want an SDK or Integration? Let us know by opening an [issue](https://github.com/firecrawl/firecrawl/issues).

### API Key

To use the API, you need to sign up on [Firecrawl](https://firecrawl.dev/) and get an API key.

### Features

*   [**Scrape**](#scraping): scrapes a URL and get its content in LLM-ready format (markdown, summary, structured data via [json mode](#json-mode), screenshot, html)
*   [**Crawl**](#crawling): scrapes all the URLs of a web page and return content in LLM-ready format
*   [**Map**](https://docs.firecrawl.dev/features/map): input a website and get all the website urls - extremely fast
*   [**Search**](https://docs.firecrawl.dev/features/search): search the web and get full content from results
*   [**Extract**](https://docs.firecrawl.dev/features/extract): get structured data from single page, multiple pages or entire websites with AI.

### Powerful Capabilities

*   **LLM-ready formats**: markdown, summary, structured data, screenshot, HTML, links, metadata
*   **The hard stuff**: proxies, anti-bot mechanisms, dynamic content (js-rendered), output parsing, orchestration
*   **Lightning fast**: Get results in seconds—built for speed and high-throughput use cases.
*   **Customizability**: exclude tags, crawl behind auth walls with custom headers, max crawl depth, etc…
*   **Media parsing**: pdfs, docx, images.
*   **Reliability first**: designed to get the data you need - no matter how hard it is.
*   **Actions**: click, scroll, input, wait and more before extracting data

You can find all of Firecrawl’s capabilities and how to use them in our [documentation](https://docs.firecrawl.dev/api-reference/v2-introduction)

Installing Firecrawl
--------------------

Scraping
--------

To scrape a single URL, use the `scrape` method. It takes the URL as a parameter and returns the scraped data as a dictionary.

### Response

SDKs will return the data object directly. cURL will return the payload exactly as shown below.

    {
      "success": true,
      "data" : {
        "markdown": "Launch Week I is here! [See our Day 2 Release 🚀](https://www.firecrawl.dev/blog/launch-week-i-day-2-doubled-rate-limits)[💥 Get 2 months free...",
        "html": "<!DOCTYPE html><html lang=\"en\" class=\"light\" style=\"color-scheme: light;\"><body class=\"__variable_36bd41 __variable_d7dc5d font-inter ...",
        "metadata": {
          "title": "Home - Firecrawl",
          "description": "Firecrawl crawls and converts any website into clean markdown.",
          "language": "en",
          "keywords": "Firecrawl,Markdown,Data,Mendable,Langchain",
          "robots": "follow, index",
          "ogTitle": "Firecrawl",
          "ogDescription": "Turn any website into LLM-ready data.",
          "ogUrl": "https://www.firecrawl.dev/",
          "ogImage": "https://www.firecrawl.dev/og.png?123",
          "ogLocaleAlternate": [],
          "ogSiteName": "Firecrawl",
          "sourceURL": "https://firecrawl.dev",
          "statusCode": 200
        }
      }
    }
    

Crawling
--------

The crawl feature allows you to automatically discover and extract content from a URL and all of its accessible subpages. With our SDKs, simply call the crawl method—this will submit a crawl job, wait for it to finish, and return the complete results for the entire site.

### Usage

If you’re using our API directly, cURL or `start crawl` functions on SDKs, this will return an `ID` where you can use to check the status of the crawl.

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
    }
    

### Get Crawl Status

Used to check the status of a crawl job and get its result.

#### Response

The response will be different depending on the status of the crawl. For not completed or large responses exceeding 10MB, a `next` URL parameter is provided. You must request this URL to retrieve the next 10MB of data. If the `next` parameter is absent, it indicates the end of the crawl data.

JSON mode
---------

With JSON mode, you can easily extract structured data from any URL. We support pydantic schemas to make it easier for you too. Here is how you to use it:

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
            "supports_sso": true,
            "is_open_source": true,
            "is_in_yc": true
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

Search
------

Firecrawl’s search API allows you to perform web searches and optionally scrape the search results in one operation.

*   Choose specific output formats (markdown, HTML, links, screenshots)
*   Choose specific sources (web, news, images)
*   Search the web with customizable parameters (location, etc.)

For details, see the [Search Endpoint API Reference](https://docs.firecrawl.dev/api-reference/endpoint/search).

### Response

SDKs will return the data object directly. cURL will return the complete payload.

    {
      "success": true,
      "data": {
        "web": [
          {
            "url": "https://www.firecrawl.dev/",
            "title": "Firecrawl - The Web Data API for AI",
            "description": "The web crawling, scraping, and search API for AI. Built for scale. Firecrawl delivers the entire internet to AI agents and builders.",
            "position": 1
          },
          {
            "url": "https://github.com/mendableai/firecrawl",
            "title": "mendableai/firecrawl: Turn entire websites into LLM-ready ... - GitHub",
            "description": "Firecrawl is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data.",
            "position": 2
          },
          ...
        ],
        "images": [
          {
            "title": "Quickstart | Firecrawl",
            "imageUrl": "https://mintlify.s3.us-west-1.amazonaws.com/firecrawl/logo/logo.png",
            "imageWidth": 5814,
            "imageHeight": 1200,
            "url": "https://docs.firecrawl.dev/",
            "position": 1
          },
          ...
        ],
        "news": [
          {
            "title": "Y Combinator startup Firecrawl is ready to pay $1M to hire three AI agents as employees",
            "url": "https://techcrunch.com/2025/05/17/y-combinator-startup-firecrawl-is-ready-to-pay-1m-to-hire-three-ai-agents-as-employees/",
            "snippet": "It's now placed three new ads on YC's job board for “AI agents only” and has set aside a $1 million budget total to make it happen.",
            "date": "3 months ago",
            "position": 1
          },
          ...
        ]
      }
    }
    

You can now extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

Interacting with the page with Actions
--------------------------------------

Firecrawl allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction. Here is an example of how to use actions to navigate to google.com, search for Firecrawl, click on the first result, and take a screenshot. It is important to almost always use the `wait` action before/after executing other actions to give enough time for the page to load.

### Example

### Output

Open Source vs Cloud
--------------------

Firecrawl is open source available under the [AGPL-3.0 license](https://github.com/mendableai/firecrawl/blob/main/LICENSE). To deliver the best possible product, we offer a hosted version of Firecrawl alongside our open-source offering. The cloud solution allows us to continuously innovate and maintain a high-quality, sustainable service for all users. Firecrawl Cloud is available at [firecrawl.dev](https://firecrawl.dev/) and offers a range of features that are not available in the open source version:

Contributing
------------

We love contributions! Please read our [contributing guide](https://github.com/mendableai/firecrawl/blob/main/CONTRIBUTING.md) before submitting a pull request.</content>
</page>

<page>
  <title>Introduction - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/v2-introduction</url>
  <content>Features
--------

Agentic Features
----------------

Base URL
--------

All requests contain the following base URL:

    https://api.firecrawl.dev 
    

Authentication
--------------

For authentication, it’s required to include an Authorization header. The header should contain `Bearer fc-123456789`, where `fc-123456789` represents your API Key.

    Authorization: Bearer fc-123456789
    

​

Response codes
--------------

Firecrawl employs conventional HTTP status codes to signify the outcome of your requests. Typically, 2xx HTTP status codes denote success, 4xx codes represent failures related to the user, and 5xx codes signal infrastructure problems.

| Status | Description |
| --- | --- |
| 200 | Request was successful. |
| 400 | Verify the correctness of the parameters. |
| 401 | The API key was not provided. |
| 402 | Payment required |
| 404 | The requested resource could not be located. |
| 429 | The rate limit has been surpassed. |
| 5xx | Signifies a server error with Firecrawl. |

Refer to the Error Codes section for a detailed explanation of all potential API errors. ​

Rate limit
----------

The Firecrawl API has a rate limit to ensure the stability and reliability of the service. The rate limit is applied to all endpoints and is based on the number of requests made within a specific time frame. When you exceed the rate limit, you will receive a 429 response code.</content>
</page>

<page>
  <title>Firecrawl MCP Server</title>
  <url>https://docs.firecrawl.dev/mcp-server</url>
  <content>A Model Context Protocol (MCP) server implementation that integrates [Firecrawl](https://github.com/mendableai/firecrawl) for web scraping capabilities. Our MCP server is open-source and available on [GitHub](https://github.com/mendableai/firecrawl-mcp-server).

Features
--------

*   Web scraping, crawling, and discovery
*   Search and content extraction
*   Deep research and batch scraping
*   Cloud and self-hosted support
*   Streamable HTTP support

Installation
------------

You can either use our remote hosted URL or run the server locally. Get your API key from [https://firecrawl.dev/app/api-keys](https://www.firecrawl.dev/app/api-keys)

### Remote hosted URL

    https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp
    

### Running with npx

    env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
    

### Manual Installation

    npm install -g firecrawl-mcp
    

### Running on Cursor

#### Manual Installation

Configuring Cursor 🖥️ Note: Requires Cursor version 0.45.6+ For the most up-to-date configuration instructions, please refer to the official Cursor documentation on configuring MCP servers: [Cursor MCP Server Configuration Guide](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers) To configure Firecrawl MCP in Cursor **v0.48.6**

1.  Open Cursor Settings
2.  Go to Features > MCP Servers
3.  Click ”+ Add new global MCP server”
4.  Enter the following code:
    
        {
          "mcpServers": {
            "firecrawl-mcp": {
              "command": "npx",
              "args": ["-y", "firecrawl-mcp"],
              "env": {
                "FIRECRAWL_API_KEY": "YOUR-API-KEY"
              }
            }
          }
        }
        
    

To configure Firecrawl MCP in Cursor **v0.45.6**

1.  Open Cursor Settings
2.  Go to Features > MCP Servers
3.  Click ”+ Add New MCP Server”
4.  Enter the following:
    *   Name: “firecrawl-mcp” (or your preferred name)
    *   Type: “command”
    *   Command: `env FIRECRAWL_API_KEY=your-api-key npx -y firecrawl-mcp`

> If you are using Windows and are running into issues, try `cmd /c "set FIRECRAWL_API_KEY=your-api-key && npx -y firecrawl-mcp"`

Replace `your-api-key` with your Firecrawl API key. If you don’t have one yet, you can create an account and get it from [https://www.firecrawl.dev/app/api-keys](https://www.firecrawl.dev/app/api-keys) After adding, refresh the MCP server list to see the new tools. The Composer Agent will automatically use Firecrawl MCP when appropriate, but you can explicitly request it by describing your web scraping needs. Access the Composer via Command+L (Mac), select “Agent” next to the submit button, and enter your query.

### Running on Windsurf

Add this to your `./codeium/windsurf/model_config.json`:

    {
      "mcpServers": {
        "mcp-server-firecrawl": {
          "command": "npx",
          "args": ["-y", "firecrawl-mcp"],
          "env": {
            "FIRECRAWL_API_KEY": "YOUR_API_KEY"
          }
        }
      }
    }
    

### Running with Streamable HTTP Mode

To run the server using streamable HTTP transport locally instead of the default stdio transport:

    env HTTP_STREAMABLE_SERVER=true FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
    

Use the url: [http://localhost:3000/v2/mcp](http://localhost:3000/v2/mcp) or [https://mcp.firecrawl.dev/{FIRECRAWL\_API\_KEY}/v2/mcp](https://mcp.firecrawl.dev/%7BFIRECRAWL_API_KEY%7D/v2/mcp)

### Installing via Smithery (Legacy)

To install Firecrawl for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mendableai/mcp-server-firecrawl):

    npx -y @smithery/cli install @mendableai/mcp-server-firecrawl --client claude
    

### Running on VS Code

For one-click installation, click one of the install buttons below… [](https://insiders.vscode.dev/redirect/mcp/install?name=firecrawl&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22apiKey%22%2C%22description%22%3A%22Firecrawl%20API%20Key%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22firecrawl-mcp%22%5D%2C%22env%22%3A%7B%22FIRECRAWL_API_KEY%22%3A%22%24%7Binput%3AapiKey%7D%22%7D%7D)[](https://insiders.vscode.dev/redirect/mcp/install?name=firecrawl&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22apiKey%22%2C%22description%22%3A%22Firecrawl%20API%20Key%22%2C%22password%22%3Atrue%7D%5D&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22firecrawl-mcp%22%5D%2C%22env%22%3A%7B%22FIRECRAWL_API_KEY%22%3A%22%24%7Binput%3AapiKey%7D%22%7D%7D&quality=insiders)For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open User Settings (JSON)`.

    {
      "mcp": {
        "inputs": [
          {
            "type": "promptString",
            "id": "apiKey",
            "description": "Firecrawl API Key",
            "password": true
          }
        ],
        "servers": {
          "firecrawl": {
            "command": "npx",
            "args": ["-y", "firecrawl-mcp"],
            "env": {
              "FIRECRAWL_API_KEY": "${input:apiKey}"
            }
          }
        }
      }
    }
    

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others:

    {
      "inputs": [
        {
          "type": "promptString",
          "id": "apiKey",
          "description": "Firecrawl API Key",
          "password": true
        }
      ],
      "servers": {
        "firecrawl": {
          "command": "npx",
          "args": ["-y", "firecrawl-mcp"],
          "env": {
            "FIRECRAWL_API_KEY": "${input:apiKey}"
          }
        }
      }
    }
    

### Running on Claude Desktop

Add this to the Claude config file:

    {
      "mcpServers": {
        "firecrawl": {
          "url": "https://mcp.firecrawl.dev/v2/mcp",
          "headers": {
            "Authorization": "Bearer YOUR_API_KEY"
          }
        }
      }
    }
    

### Running on Claude Code

Add the Firecrawl MCP server using the Claude Code CLI:

    claude mcp add firecrawl -e FIRECRAWL_API_KEY=your-api-key -- npx -y firecrawl-mcp
    

Configuration
-------------

### Environment Variables

#### Required for Cloud API

*   `FIRECRAWL_API_KEY`: Your Firecrawl API key
    *   Required when using cloud API (default)
    *   Optional when using self-hosted instance with `FIRECRAWL_API_URL`
*   `FIRECRAWL_API_URL` (Optional): Custom API endpoint for self-hosted instances
    *   Example: `https://firecrawl.your-domain.com`
    *   If not provided, the cloud API will be used (requires API key)

#### Optional Configuration

##### Retry Configuration

*   `FIRECRAWL_RETRY_MAX_ATTEMPTS`: Maximum number of retry attempts (default: 3)
*   `FIRECRAWL_RETRY_INITIAL_DELAY`: Initial delay in milliseconds before first retry (default: 1000)
*   `FIRECRAWL_RETRY_MAX_DELAY`: Maximum delay in milliseconds between retries (default: 10000)
*   `FIRECRAWL_RETRY_BACKOFF_FACTOR`: Exponential backoff multiplier (default: 2)

##### Credit Usage Monitoring

*   `FIRECRAWL_CREDIT_WARNING_THRESHOLD`: Credit usage warning threshold (default: 1000)
*   `FIRECRAWL_CREDIT_CRITICAL_THRESHOLD`: Credit usage critical threshold (default: 100)

### Configuration Examples

For cloud API usage with custom retry and credit monitoring:

    # Required for cloud API
    export FIRECRAWL_API_KEY=your-api-key
    
    # Optional retry configuration
    export FIRECRAWL_RETRY_MAX_ATTEMPTS=5        # Increase max retry attempts
    export FIRECRAWL_RETRY_INITIAL_DELAY=2000    # Start with 2s delay
    export FIRECRAWL_RETRY_MAX_DELAY=30000       # Maximum 30s delay
    export FIRECRAWL_RETRY_BACKOFF_FACTOR=3      # More aggressive backoff
    
    # Optional credit monitoring
    export FIRECRAWL_CREDIT_WARNING_THRESHOLD=2000    # Warning at 2000 credits
    export FIRECRAWL_CREDIT_CRITICAL_THRESHOLD=500    # Critical at 500 credits
    

For self-hosted instance:

    # Required for self-hosted
    export FIRECRAWL_API_URL=https://firecrawl.your-domain.com
    
    # Optional authentication for self-hosted
    export FIRECRAWL_API_KEY=your-api-key  # If your instance requires auth
    
    # Custom retry configuration
    export FIRECRAWL_RETRY_MAX_ATTEMPTS=10
    export FIRECRAWL_RETRY_INITIAL_DELAY=500     # Start with faster retries
    

### Custom configuration with Claude Desktop

Add this to your `claude_desktop_config.json`:

    {
      "mcpServers": {
        "mcp-server-firecrawl": {
          "command": "npx",
          "args": ["-y", "firecrawl-mcp"],
          "env": {
            "FIRECRAWL_API_KEY": "YOUR_API_KEY_HERE",
    
            "FIRECRAWL_RETRY_MAX_ATTEMPTS": "5",
            "FIRECRAWL_RETRY_INITIAL_DELAY": "2000",
            "FIRECRAWL_RETRY_MAX_DELAY": "30000",
            "FIRECRAWL_RETRY_BACKOFF_FACTOR": "3",
    
            "FIRECRAWL_CREDIT_WARNING_THRESHOLD": "2000",
            "FIRECRAWL_CREDIT_CRITICAL_THRESHOLD": "500"
          }
        }
      }
    }
    

### System Configuration

The server includes several configurable parameters that can be set via environment variables. Here are the default values if not configured:

    const CONFIG = {
      retry: {
        maxAttempts: 3, // Number of retry attempts for rate-limited requests
        initialDelay: 1000, // Initial delay before first retry (in milliseconds)
        maxDelay: 10000, // Maximum delay between retries (in milliseconds)
        backoffFactor: 2, // Multiplier for exponential backoff
      },
      credit: {
        warningThreshold: 1000, // Warn when credit usage reaches this level
        criticalThreshold: 100, // Critical alert when credit usage reaches this level
      },
    };
    

These configurations control:

1.  **Retry Behavior**
    *   Automatically retries failed requests due to rate limits
    *   Uses exponential backoff to avoid overwhelming the API
    *   Example: With default settings, retries will be attempted at:
        *   1st retry: 1 second delay
        *   2nd retry: 2 seconds delay
        *   3rd retry: 4 seconds delay (capped at maxDelay)
2.  **Credit Usage Monitoring**
    *   Tracks API credit consumption for cloud API usage
    *   Provides warnings at specified thresholds
    *   Helps prevent unexpected service interruption
    *   Example: With default settings:
        *   Warning at 1000 credits remaining
        *   Critical alert at 100 credits remaining

### Rate Limiting and Batch Processing

The server utilizes Firecrawl’s built-in rate limiting and batch processing capabilities:

*   Automatic rate limit handling with exponential backoff
*   Efficient parallel processing for batch operations
*   Smart request queuing and throttling
*   Automatic retries for transient errors

### 1\. Scrape Tool (`firecrawl_scrape`)

Scrape content from a single URL with advanced options.

    {
      "name": "firecrawl_scrape",
      "arguments": {
        "url": "https://example.com",
        "formats": ["markdown"],
        "onlyMainContent": true,
        "waitFor": 1000,
        "timeout": 30000,
        "mobile": false,
        "includeTags": ["article", "main"],
        "excludeTags": ["nav", "footer"],
        "skipTlsVerification": false
      }
    }
    

### 2\. Batch Scrape Tool (`firecrawl_batch_scrape`)

Scrape multiple URLs efficiently with built-in rate limiting and parallel processing.

    {
      "name": "firecrawl_batch_scrape",
      "arguments": {
        "urls": ["https://example1.com", "https://example2.com"],
        "options": {
          "formats": ["markdown"],
          "onlyMainContent": true
        }
      }
    }
    

Response includes operation ID for status checking:

    {
      "content": [
        {
          "type": "text",
          "text": "Batch operation queued with ID: batch_1. Use firecrawl_check_batch_status to check progress."
        }
      ],
      "isError": false
    }
    

### 3\. Check Batch Status (`firecrawl_check_batch_status`)

Check the status of a batch operation.

    {
      "name": "firecrawl_check_batch_status",
      "arguments": {
        "id": "batch_1"
      }
    }
    

### 4\. Map Tool (`firecrawl_map`)

Map a website to discover all indexed URLs on the site.

    {
      "name": "firecrawl_map",
      "arguments": {
        "url": "https://example.com",
        "search": "blog",
        "sitemap": "include",
        "includeSubdomains": false,
        "limit": 100,
        "ignoreQueryParameters": true
      }
    }
    

#### Map Tool Options:

*   `url`: The base URL of the website to map
*   `search`: Optional search term to filter URLs
*   `sitemap`: Control sitemap usage - “include”, “skip”, or “only”
*   `includeSubdomains`: Whether to include subdomains in the mapping
*   `limit`: Maximum number of URLs to return
*   `ignoreQueryParameters`: Whether to ignore query parameters when mapping

**Best for:** Discovering URLs on a website before deciding what to scrape; finding specific sections of a website. **Returns:** Array of URLs found on the site.

### 5\. Search Tool (`firecrawl_search`)

Search the web and optionally extract content from search results.

    {
      "name": "firecrawl_search",
      "arguments": {
        "query": "your search query",
        "limit": 5,
        "lang": "en",
        "country": "us",
        "scrapeOptions": {
          "formats": ["markdown"],
          "onlyMainContent": true
        }
      }
    }
    

### 6\. Crawl Tool (`firecrawl_crawl`)

Start an asynchronous crawl with advanced options.

    {
      "name": "firecrawl_crawl",
      "arguments": {
        "url": "https://example.com",
        "maxDepth": 2,
        "limit": 100,
        "allowExternalLinks": false,
        "deduplicateSimilarURLs": true
      }
    }
    

### 7\. Check Crawl Status (`firecrawl_check_crawl_status`)

Check the status of a crawl job.

    {
      "name": "firecrawl_check_crawl_status",
      "arguments": {
        "id": "550e8400-e29b-41d4-a716-446655440000"
      }
    }
    

**Returns:** Status and progress of the crawl job, including results if available.

Extract structured information from web pages using LLM capabilities. Supports both cloud AI and self-hosted LLM extraction.

    {
      "name": "firecrawl_extract",
      "arguments": {
        "urls": ["https://example.com/page1", "https://example.com/page2"],
        "prompt": "Extract product information including name, price, and description",
        "systemPrompt": "You are a helpful assistant that extracts product information",
        "schema": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "price": { "type": "number" },
            "description": { "type": "string" }
          },
          "required": ["name", "price"]
        },
        "allowExternalLinks": false,
        "enableWebSearch": false,
        "includeSubdomains": false
      }
    }
    

Example response:

    {
      "content": [
        {
          "type": "text",
          "text": {
            "name": "Example Product",
            "price": 99.99,
            "description": "This is an example product description"
          }
        }
      ],
      "isError": false
    }
    

*   `urls`: Array of URLs to extract information from
*   `prompt`: Custom prompt for the LLM extraction
*   `systemPrompt`: System prompt to guide the LLM
*   `schema`: JSON schema for structured data extraction
*   `allowExternalLinks`: Allow extraction from external links
*   `enableWebSearch`: Enable web search for additional context
*   `includeSubdomains`: Include subdomains in extraction

When using a self-hosted instance, the extraction will use your configured LLM. For cloud API, it uses Firecrawl’s managed LLM service.

Logging System
--------------

The server includes comprehensive logging:

*   Operation status and progress
*   Performance metrics
*   Credit usage monitoring
*   Rate limit tracking
*   Error conditions

Example log messages:

    [INFO] Firecrawl MCP Server initialized successfully
    [INFO] Starting scrape for URL: https://example.com
    [INFO] Batch operation queued with ID: batch_1
    [WARNING] Credit usage has reached warning threshold
    [ERROR] Rate limit exceeded, retrying in 2s...
    

Error Handling
--------------

The server provides robust error handling:

*   Automatic retries for transient errors
*   Rate limit handling with backoff
*   Detailed error messages
*   Credit usage warnings
*   Network resilience

Example error response:

    {
      "content": [
        {
          "type": "text",
          "text": "Error: Rate limit exceeded. Retrying in 2 seconds..."
        }
      ],
      "isError": true
    }
    

Development
-----------

    # Install dependencies
    npm install
    
    # Build
    npm run build
    
    # Run tests
    npm test
    

### Contributing

1.  Fork the repository
2.  Create your feature branch
3.  Run tests: `npm test`
4.  Submit a pull request

### Thanks to contributors

Thanks to [@vrknetha](https://github.com/vrknetha), [@cawstudios](https://caw.tech/) for the initial implementation! Thanks to MCP.so and Klavis AI for hosting and [@gstarwd](https://github.com/gstarwd), [@xiangkaiz](https://github.com/xiangkaiz) and [@zihaolin96](https://github.com/zihaolin96) for integrating our server.

License
-------

MIT License - see LICENSE file for details</content>
</page>

<page>
  <title>Rate Limits | Firecrawl</title>
  <url>https://docs.firecrawl.dev/rate-limits</url>
  <content>Concurrent Browser Limits
-------------------------

Concurrent browsers represent how many web pages Firecrawl can process for you at the same time. Your plan determines how many of these jobs can run simultaneously - if you exceed this limit, additional jobs will wait in a queue until resources become available.

### Standard Plans (most API endpoints)

| Plan | Concurrent Browsers |
| --- | --- |
| Free | 2 |
| Hobby | 5 |
| Standard | 50 |
| Growth | 100 |

| Plan | Concurrent Browsers |
| --- | --- |
| Free | 2 |
| Starter | 50 |
| Explorer | 100 |
| Pro | 200 |

Standard API
------------

The following rate limits apply to standard API requests and are primarily in place to prevent abuse:

| Plan | /scrape (requests/min) | /map (requests/min) | /crawl (requests/min) | /search (requests/min) |
| --- | --- | --- | --- | --- |
| Free | 10 | 10 | 1 | 5 |
| Hobby | 100 | 100 | 15 | 50 |
| Standard | 500 | 500 | 50 | 250 |
| Growth | 5000 | 5000 | 250 | 2500 |

|  | /crawl/status (requests/min) |
| --- | --- |
| Default | 1500 |

These rate limits are enforced to ensure fair usage and availability of the API for all users. If you require higher limits, please contact us at [help@firecrawl.com](mailto:help@firecrawl.com) to discuss custom plans.

### Batch Endpoints

Batch endpoints follow the /crawl rate limit.

| Plan | /extract (requests/min) |
| --- | --- |
| Free | 10 |
| Starter | 100 |
| Explorer | 500 |
| Pro | 1000 |
| Enterprise | Custom |

|  | /extract/status (requests/min) |
| --- | --- |
| Free | 500 |

FIRE-1 Agent
------------

Requests involving the FIRE-1 agent requests have separate rate limits that are counted independently for each endpoint:

| Endpoint | Rate Limit (requests/min) |
| --- | --- |
| `/scrape` | 10 |
| `/extract` | 10 |

Legacy Plans
------------

| Plan | /scrape (requests/min) | /crawl (concurrent req) | /search (requests/min) |
| --- | --- | --- | --- |
| Starter | 100 | 15 | 100 |
| Standard Legacy | 200 | 200 | 200 |
| Scaled Legacy | 250 | 100 | 250 |

If you require higher limits, please contact us at [help@firecrawl.com](mailto:help@firecrawl.com) to discuss custom plans.</content>
</page>

<page>
  <title>Migrating from v1 to v2 | Firecrawl</title>
  <url>https://docs.firecrawl.dev/migrate-to-v2</url>
  <content>Overview
--------

### Key Improvements

*   **Faster by default**: Requests are cached with `maxAge` defaulting to 2 days, and sensible defaults like `blockAds`, `skipTlsVerification`, and `removeBase64Images` are enabled.
*   **New summary format**: You can now specify `"summary"` as a format to directly receive a concise summary of the page content.
*   **Updated JSON extraction**: JSON extraction and change tracking now use an object format: `{ type: "json", prompt, schema }`. The old `"extract"` format has been renamed to `"json"`.
*   **Enhanced screenshot options**: Use the object form: `{ type: "screenshot", fullPage, quality, viewport }`.
*   **New search sources**: Search across `"news"` and `"images"` in addition to web results by setting the `sources` parameter.
*   **Smart crawling with prompts**: Pass a natural-language `prompt` to crawl and the system derives paths/limits automatically. Use the new /crawl/params-preview endpoint to inspect the derived options before starting a job.

Quick migration checklist
-------------------------

*   Replace v1 client usage with v2 clients:
    *   JS: `const firecrawl = new Firecrawl({ apiKey: 'fc-YOUR-API-KEY' })`
    *   Python: `firecrawl = Firecrawl(api_key='fc-YOUR-API-KEY')`
    *   API: use the new `https://api.firecrawl.dev/v2/` endpoints.
*   Update formats:
    *   Use `"summary"` where needed
    *   JSON mode: Use `{ type: "json", prompt, schema }` for JSON extraction
    *   Screenshot and Screenshot@fullPage: Use screenshot object format when specifying options
*   Adopt standardized async flows in the SDKs:
    *   Crawls: `startCrawl` + `getCrawlStatus` (or `crawl` waiter)
    *   Batch: `startBatchScrape` + `getBatchScrapeStatus` (or `batchScrape` waiter)
    *   Extract: `startExtract` + `getExtractStatus` (or `extract` waiter)
*   Crawl options mapping (see below)
*   Check crawl `prompt` with `/crawl/params-preview`

SDK surface (v2)
----------------

### JS/TS

#### Method name changes (v1 → v2)

**Scrape, Search, and Map**

| v1 (FirecrawlApp) | v2 (Firecrawl) |
| --- | --- |
| `scrapeUrl(url, ...)` | `scrape(url, options?)` |
| `search(query, ...)` | `search(query, options?)` |
| `mapUrl(url, ...)` | `map(url, options?)` |

**Crawling**

| v1 | v2 |
| --- | --- |
| `crawlUrl(url, ...)` | `crawl(url, options?)` (waiter) |
| `asyncCrawlUrl(url, ...)` | `startCrawl(url, options?)` |
| `checkCrawlStatus(id, ...)` | `getCrawlStatus(id)` |
| `cancelCrawl(id)` | `cancelCrawl(id)` |
| `checkCrawlErrors(id)` | `getCrawlErrors(id)` |

**Batch Scraping**

| v1 | v2 |
| --- | --- |
| `batchScrapeUrls(urls, ...)` | `batchScrape(urls, opts?)` (waiter) |
| `asyncBatchScrapeUrls(urls, ...)` | `startBatchScrape(urls, opts?)` |
| `checkBatchScrapeStatus(id, ...)` | `getBatchScrapeStatus(id)` |
| `checkBatchScrapeErrors(id)` | `getBatchScrapeErrors(id)` |

**Extraction**

| v1 | v2 |
| --- | --- |
| `extract(urls?, params?)` | `extract(args)` |
| `asyncExtract(urls, params?)` | `startExtract(args)` |
| `getExtractStatus(id)` | `getExtractStatus(id)` |

**Other / Removed**

| v1 | v2 |
| --- | --- |
| `generateLLMsText(...)` | (not in v2 SDK) |
| `checkGenerateLLMsTextStatus(id)` | (not in v2 SDK) |
| `crawlUrlAndWatch(...)` | `watcher(jobId, ...)` |
| `batchScrapeUrlsAndWatch(...)` | `watcher(jobId, ...)` |

* * *

### Python (sync)

#### Method name changes (v1 → v2)

**Scrape, Search, and Map**

| v1 | v2 |
| --- | --- |
| `scrape_url(...)` | `scrape(...)` |
| `search(...)` | `search(...)` |
| `map_url(...)` | `map(...)` |

**Crawling**

| v1 | v2 |
| --- | --- |
| `crawl_url(...)` | `crawl(...)` (waiter) |
| `async_crawl_url(...)` | `start_crawl(...)` |
| `check_crawl_status(...)` | `get_crawl_status(...)` |
| `cancel_crawl(...)` | `cancel_crawl(...)` |

**Batch Scraping**

| v1 | v2 |
| --- | --- |
| `batch_scrape_urls(...)` | `batch_scrape(...)` (waiter) |
| `async_batch_scrape_urls(...)` | `start_batch_scrape(...)` |
| `get_batch_scrape_status(...)` | `get_batch_scrape_status(...)` |
| `get_batch_scrape_errors(...)` | `get_batch_scrape_errors(...)` |

**Extraction**

| v1 | v2 |
| --- | --- |
| `extract(...)` | `extract(...)` |
| `start_extract(...)` | `start_extract(...)` |
| `get_extract_status(...)` | `get_extract_status(...)` |

**Other / Removed**

| v1 | v2 |
| --- | --- |
| `generate_llms_text(...)` | (not in v2 SDK) |
| `get_generate_llms_text_status(...)` | (not in v2 SDK) |
| `watch_crawl(...)` | `watcher(job_id, ...)` |

* * *

### Python (async)

*   `AsyncFirecrawl` mirrors the same methods (all awaitable).

Formats and scrape options
--------------------------

*   Use string formats for basics: `"markdown"`, `"html"`, `"rawHtml"`, `"links"`, `"summary"`.
*   Instead of `parsePDF` use `parsers: [ { "type": "pdf" } | "pdf" ]`.
*   Use object formats for JSON, change tracking, and screenshots:

### JSON format

### Screenshot format

Crawl options mapping (v1 → v2)
-------------------------------

| v1 | v2 |
| --- | --- |
| `allowBackwardCrawling` | (removed) use `crawlEntireDomain` |
| `maxDepth` | (removed) use `maxDiscoveryDepth` |
| `ignoreSitemap` (bool) | `sitemap` (e.g., `"only"`, `"skip"`, or `"include"`) |
| (none) | `prompt` |

Crawl prompt + params preview
-----------------------------

See crawl params preview examples:</content>
</page>

<page>
  <title>SDKs | Firecrawl</title>
  <url>https://docs.firecrawl.dev/sdks/overview</url>
  <content>Overall

Overview
--------

Firecrawl SDKs are wrappers around the Firecrawl API to help you easily extract data from websites.

[​](#official-sdks)

Official SDKs
------------------------------------

[

Python SDK
----------

Explore the Python SDK for Firecrawl.



](https://docs.firecrawl.dev/sdks/python)[

Node SDK
--------

Explore the Node SDK for Firecrawl.



](https://docs.firecrawl.dev/sdks/node)

[​](#community-sdks-v1-only)

Community SDKs (v1 only)
--------------------------------------------------------

[

Go SDK
------

Explore the Go SDK for Firecrawl.



](https://docs.firecrawl.dev/sdks/go)[

Rust SDK
--------

Explore the Rust SDK for Firecrawl.



](https://docs.firecrawl.dev/sdks/rust)

[Suggest edits](https://github.com/firecrawl/firecrawl-docs/edit/main/sdks/overview.mdx)[Raise issue](https://github.com/firecrawl/firecrawl-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/sdks/overview)

[

Python

Next





](https://docs.firecrawl.dev/sdks/python)</content>
</page>

<page>
  <title>Advanced Scraping Guide | Firecrawl</title>
  <url>https://docs.firecrawl.dev/advanced-scraping-guide</url>
  <content>This guide will walk you through the different endpoints of Firecrawl and how to use them fully with all its parameters.

Basic scraping with Firecrawl
-----------------------------

To scrape a single page and get clean markdown content, you can use the `/scrape` endpoint.

Scraping PDFs
-------------

Firecrawl supports PDFs. Use the `parsers` option (e.g., `parsers: ["pdf"]`) when you want to ensure PDF parsing.

Scrape options
--------------

When using the `/scrape` endpoint, you can customize scraping with the options below.

### Formats (`formats`)

*   **Type**: `array`
*   **Strings**: `["markdown", "links", "html", "rawHtml", "summary"]`
*   **Object formats**:
    *   JSON: `{ type: "json", prompt, schema }`
    *   Screenshot: `{ type: "screenshot", fullPage?, quality?, viewport? }`
    *   Change tracking: `{ type: "changeTracking", modes?, prompt?, schema?, tag? }` (requires `markdown`)
*   **Default**: `["markdown"]`

### Full page content vs main content (`onlyMainContent`)

*   **Type**: `boolean`
*   **Description**: By default the scraper returns only the main content. Set to `false` to return full page content.
*   **Default**: `true`

### Include tags (`includeTags`)

*   **Type**: `array`
*   **Description**: HTML tags/classes/ids to include in the scrape.

### Exclude tags (`excludeTags`)

*   **Type**: `array`
*   **Description**: HTML tags/classes/ids to exclude from the scrape.

### Wait for page readiness (`waitFor`)

*   **Type**: `integer`
*   **Description**: Milliseconds to wait before scraping (use sparingly).
*   **Default**: `0`

### Freshness and cache (`maxAge`)

*   **Type**: `integer` (milliseconds)
*   **Description**: If a cached version of the page is newer than `maxAge`, Firecrawl returns it instantly; otherwise it scrapes fresh and updates the cache. Set `0` to always fetch fresh.
*   **Default**: `172800000` (2 days)

### Request timeout (`timeout`)

*   **Type**: `integer`
*   **Description**: Max duration in milliseconds before aborting.
*   **Default**: `30000` (30 seconds)

### PDF parsing (`parsers`)

*   **Type**: `array`
*   **Description**: Control parsing behavior. To parse PDFs, set `parsers: ["pdf"]`.

### Actions (`actions`)

When using the /scrape endpoint, Firecrawl allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction.

*   **Type**: `array`
*   **Description**: Sequence of browser steps to run before scraping.
*   **Supported actions**:
    *   `wait` `{ milliseconds }`
    *   `click` `{ selector }`
    *   `write` `{ selector, text }`
    *   `press` `{ key }`
    *   `scroll` `{ direction: "up" | "down" }`
    *   `scrape` `{ selector }` (scrape a sub-element)
    *   `executeJavascript` `{ script }`
    *   `pdf` (trigger PDF render in some flows)

### Example Usage

    curl -X POST https://api.firecrawl.dev/v2/scrape \
        -H '
        Content-Type: application/json' \
        -H 'Authorization: Bearer fc-YOUR-API-KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev",
          "formats": [
            "markdown",
            "links",
            "html",
            "rawHtml",
            { "type": "screenshot", "fullPage": true, "quality": 80 }
          ],
          "includeTags": ["h1", "p", "a", ".main-content"],
          "excludeTags": ["#ad", "#footer"],
          "onlyMainContent": false,
          "waitFor": 1000,
          "timeout": 15000,
          "parsers": ["pdf"]
        }'
    

In this example, the scraper will:

*   Return the full page content as markdown.
*   Include the markdown, raw HTML, HTML, links, and a screenshot in the response.
*   Include only the HTML tags `<h1>`, `<p>`, `<a>`, and elements with the class `.main-content`, while excluding any elements with the IDs `#ad` and `#footer`.
*   Wait for 1000 milliseconds (1 second) before scraping to allow the page to load.
*   Set the maximum duration of the scrape request to 15000 milliseconds (15 seconds).
*   Parse PDFs explicitly via `parsers: ["pdf"]`.

Here is the API Reference: [Scrape Endpoint Documentation](https://docs.firecrawl.dev/api-reference/endpoint/scrape)

Use the JSON format object in `formats` to extract structured data in one pass:

    curl -X POST https://api.firecrawl.dev/v2/scrape \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer fc-YOUR-API-KEY' \
      -d '{
        "url": "https://firecrawl.dev",
        "formats": [{
          "type": "json",
          "prompt": "Extract the features of the product",
          "schema": {"type": "object", "properties": {"features": {"type": "object"}}, "required": ["features"]}
        }]
      }'
    

Use the dedicated extract job API when you want asynchronous extraction with status polling.

Crawling multiple pages
-----------------------

To crawl multiple pages, use the `/v2/crawl` endpoint.

    curl -X POST https://api.firecrawl.dev/v2/crawl \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer fc-YOUR-API-KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev"
        }'
    

Returns an id

    { "id": "1234-5678-9101" }
    

### Check Crawl Job

Used to check the status of a crawl job and get its result.

    curl -X GET https://api.firecrawl.dev/v2/crawl/1234-5678-9101 \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer fc-YOUR-API-KEY'
    

If the content is larger than 10MB or if the crawl job is still running, the response may include a `next` parameter, a URL to the next page of results.

### Crawl prompt and params preview

You can provide a natural-language `prompt` to let Firecrawl derive crawl settings. Preview them first:

    curl -X POST https://api.firecrawl.dev/v2/crawl/params-preview \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer fc-YOUR-API-KEY' \
      -d '{
        "url": "https://docs.firecrawl.dev",
        "prompt": "Extract docs and blog"
      }'
    

### Crawler options

When using the `/v2/crawl` endpoint, you can customize the crawling behavior with:

#### includePaths

*   **Type**: `array`
*   **Description**: Regex patterns to include.
*   **Example**: `["^/blog/.*$", "^/docs/.*$"]`

#### excludePaths

*   **Type**: `array`
*   **Description**: Regex patterns to exclude.
*   **Example**: `["^/admin/.*$", "^/private/.*$"]`

#### maxDiscoveryDepth

*   **Type**: `integer`
*   **Description**: Max discovery depth for finding new URLs.

#### limit

*   **Type**: `integer`
*   **Description**: Max number of pages to crawl.
*   **Default**: `10000`

#### crawlEntireDomain

*   **Type**: `boolean`
*   **Description**: Explore across siblings/parents to cover the entire domain.
*   **Default**: `false`

#### allowExternalLinks

*   **Type**: `boolean`
*   **Description**: Follow links to external domains.
*   **Default**: `false`

#### allowSubdomains

*   **Type**: `boolean`
*   **Description**: Follow subdomains of the main domain.
*   **Default**: `false`

#### delay

*   **Type**: `number`
*   **Description**: Delay in seconds between scrapes.
*   **Default**: `undefined`

#### scrapeOptions

*   **Type**: `object`
*   **Description**: Options for the scraper (see Formats above).
*   **Example**: `{ "formats": ["markdown", "links", {"type": "screenshot", "fullPage": true}], "includeTags": ["h1", "p", "a", ".main-content"], "excludeTags": ["#ad", "#footer"], "onlyMainContent": false, "waitFor": 1000, "timeout": 15000}`
*   **Defaults**: `formats: ["markdown"]`, caching enabled by default (maxAge ~ 2 days)

### Example Usage

    curl -X POST https://api.firecrawl.dev/v2/crawl \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer fc-YOUR-API-KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev",
          "includePaths": ["^/blog/.*$", "^/docs/.*$"],
          "excludePaths": ["^/admin/.*$", "^/private/.*$"],
          "maxDiscoveryDepth": 2,
          "limit": 1000
        }'
    

Mapping website links
---------------------

The `/v2/map` endpoint identifies URLs related to a given website.

### Usage

    curl -X POST https://api.firecrawl.dev/v2/map \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer fc-YOUR-API-KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev"
        }'
    

### Map Options

#### search

*   **Type**: `string`
*   **Description**: Filter links containing text.

#### limit

*   **Type**: `integer`
*   **Description**: Maximum number of links to return.
*   **Default**: `100`

#### sitemap

*   **Type**: `"only" | "include" | "skip"`
*   **Description**: Control sitemap usage during mapping.
*   **Default**: `"include"`

#### includeSubdomains

*   **Type**: `boolean`
*   **Description**: Include subdomains of the website.
*   **Default**: `true`

Here is the API Reference for it: [Map Endpoint Documentation](https://docs.firecrawl.dev/api-reference/endpoint/map) Thanks for reading!</content>
</page>

<page>
  <title>Map | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/map</url>
  <content>Introducing /map
----------------

The easiest way to go from a single url to a map of the entire website. This is extremely useful for:

*   When you need to prompt the end-user to choose which links to scrape
*   Need to quickly know the links on a website
*   Need to scrape pages of a website that are related to a specific topic (use the `search` parameter)
*   Only need to scrape specific pages of a website

Mapping
-------

### /map endpoint

Used to map a URL and get urls of the website. This returns most links present on the website.

### Installation

### Usage

### Response

SDKs will return the data object directly. cURL will return the payload exactly as shown below.

    {
      "success": true,
      "links": [
        {
          "url": "https://docs.firecrawl.dev/features/scrape",
          "title": "Scrape | Firecrawl",
          "description": "Turn any url into clean data"
        },
        {
          "url": "https://www.firecrawl.dev/blog/5_easy_ways_to_access_glm_4_5",
          "title": "5 Easy Ways to Access GLM-4.5",
          "description": "Discover how to access GLM-4.5 models locally, through chat applications, via the official API, and using the LLM marketplaces API for seamless integration i..."
        },
        {
          "url": "https://www.firecrawl.dev/playground",
          "title": "Playground - Firecrawl",
          "description": "Preview the API response and get the code snippets for the API"
        },
        {
          "url": "https://www.firecrawl.dev/?testId=2a7e0542-077b-4eff-bec7-0130395570d6",
          "title": "Firecrawl - The Web Data API for AI",
          "description": "The web crawling, scraping, and search API for AI. Built for scale. Firecrawl delivers the entire internet to AI agents and builders. Clean, structured, and ..."
        },
        {
          "url": "https://www.firecrawl.dev/?testId=af391f07-ca0e-40d3-8ff2-b1ecf2e3fcde",
          "title": "Firecrawl - The Web Data API for AI",
          "description": "The web crawling, scraping, and search API for AI. Built for scale. Firecrawl delivers the entire internet to AI agents and builders. Clean, structured, and ..."
        },
        ...
      ]
    }
    

#### Map with search

Map with `search` param allows you to search for specific urls inside a website.

    curl -X POST https://api.firecrawl.dev/v2/map \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer YOUR_API_KEY' \
      -d '{
        "url": "https://firecrawl.dev",
        "search": "docs"
      }'
    

Response will be an ordered list from the most relevant to the least relevant.

    {
      "status": "success",
      "links": [
        {
          "url": "https://docs.firecrawl.dev",
          "title": "Firecrawl Docs",
          "description": "Firecrawl documentation"
        },
        {
          "url": "https://docs.firecrawl.dev/sdks/python",
          "title": "Firecrawl Python SDK",
          "description": "Firecrawl Python SDK documentation"
        },
        ...
      ]
    }
    

Location and Language
---------------------

Specify country and preferred languages to get relevant content based on your target location and language preferences, similar to the scrape endpoint.

### How it works

When you specify the location settings, Firecrawl will use an appropriate proxy if available and emulate the corresponding language and timezone settings. By default, the location is set to ‘US’ if not specified.

### Usage

To use the location and language settings, include the `location` object in your request body with the following properties:

*   `country`: ISO 3166-1 alpha-2 country code (e.g., ‘US’, ‘AU’, ‘DE’, ‘JP’). Defaults to ‘US’.
*   `languages`: An array of preferred languages and locales for the request in order of priority. Defaults to the language of the specified location.

For more details about supported locations, refer to the [Proxies documentation](https://docs.firecrawl.dev/features/proxies).

Considerations
--------------

This endpoint prioritizes speed, so it may not capture all website links. We are working on improvements. Feedback and suggestions are very welcome.</content>
</page>

<page>
  <title>Search | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/search</url>
  <content>Firecrawl’s search API allows you to perform web searches and optionally scrape the search results in one operation.

*   Choose specific output formats (markdown, HTML, links, screenshots)
*   Search the web with customizable parameters (location, etc.)
*   Optionally retrieve content from search results in various formats
*   Control the number of results and set timeouts

For details, see the [Search Endpoint API Reference](https://docs.firecrawl.dev/api-reference/endpoint/search).

Performing a Search with Firecrawl
----------------------------------

### /search endpoint

Used to perform web searches and optionally retrieve content from the results.

### Installation

### Basic Usage

### Response

SDKs will return the data object directly. cURL will return the complete payload.

    {
      "success": true,
      "data": {
        "web": [
          {
            "url": "https://www.firecrawl.dev/",
            "title": "Firecrawl - The Web Data API for AI",
            "description": "The web crawling, scraping, and search API for AI. Built for scale. Firecrawl delivers the entire internet to AI agents and builders.",
            "position": 1
          },
          {
            "url": "https://github.com/mendableai/firecrawl",
            "title": "mendableai/firecrawl: Turn entire websites into LLM-ready ... - GitHub",
            "description": "Firecrawl is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data.",
            "position": 2
          },
          ...
        ],
        "images": [
          {
            "title": "Quickstart | Firecrawl",
            "imageUrl": "https://mintlify.s3.us-west-1.amazonaws.com/firecrawl/logo/logo.png",
            "imageWidth": 5814,
            "imageHeight": 1200,
            "url": "https://docs.firecrawl.dev/",
            "position": 1
          },
          ...
        ],
        "news": [
          {
            "title": "Y Combinator startup Firecrawl is ready to pay $1M to hire three AI agents as employees",
            "url": "https://techcrunch.com/2025/05/17/y-combinator-startup-firecrawl-is-ready-to-pay-1m-to-hire-three-ai-agents-as-employees/",
            "snippet": "It's now placed three new ads on YC's job board for “AI agents only” and has set aside a $1 million budget total to make it happen.",
            "date": "3 months ago",
            "position": 1
          },
          ...
        ]
      }
    }
    

Search result types
-------------------

In addition to regular web results, Search supports specialized result types via the `sources` parameter:

*   `web`: standard web results (default)
*   `news`: news-focused results
*   `images`: image search results

Search Categories
-----------------

Filter search results by specific categories using the `categories` parameter:

*   `github`: Search within GitHub repositories, code, issues, and documentation
*   `research`: Search academic and research websites (arXiv, Nature, IEEE, PubMed, etc.)

### GitHub Category Search

Search specifically within GitHub repositories:

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "web scraping python",
        "categories": ["github"],
        "limit": 10
      }'
    

### Research Category Search

Search academic and research websites:

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "machine learning transformers",
        "categories": ["research"],
        "limit": 10
      }'
    

### Mixed Category Search

Combine multiple categories in one search:

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "neural networks",
        "categories": ["github", "research"],
        "limit": 15
      }'
    

### Category Response Format

Each search result includes a `category` field indicating its source:

    {
      "success": true,
      "data": {
        "web": [
          {
            "url": "https://github.com/example/neural-network",
            "title": "Neural Network Implementation",
            "description": "A PyTorch implementation of neural networks",
            "category": "github"
          },
          {
            "url": "https://arxiv.org/abs/2024.12345",
            "title": "Advances in Neural Network Architecture",
            "description": "Research paper on neural network improvements",
            "category": "research"
          }
        ]
      }
    }
    

Examples:

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "openai",
        "sources": ["news"],
        "limit": 5
      }'
    

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "jupiter",
        "sources": ["images"],
        "limit": 8
      }'
    

### HD Image Search with Size Filtering

Use Google Images operators to find high-resolution images:

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "sunset imagesize:1920x1080",
        "sources": ["images"],
        "limit": 5
      }'
    

    curl -X POST https://api.firecrawl.dev/v2/search \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer fc-YOUR_API_KEY" \
      -d '{
        "query": "mountain wallpaper larger:2560x1440",
        "sources": ["images"],
        "limit": 8
      }'
    

**Common HD resolutions:**

*   `imagesize:1920x1080` - Full HD (1080p)
*   `imagesize:2560x1440` - QHD (1440p)
*   `imagesize:3840x2160` - 4K UHD
*   `larger:1920x1080` - HD and above
*   `larger:2560x1440` - QHD and above

Search with Content Scraping
----------------------------

Search and retrieve content from the search results in one operation.

Every option in scrape endpoint is supported by this search endpoint through the `scrapeOptions` parameter.

### Response with Scraped Content

    {
      "success": true,
      "data": [
        {
          "title": "Firecrawl - The Ultimate Web Scraping API",
          "description": "Firecrawl is a powerful web scraping API that turns any website into clean, structured data for AI and analysis.",
          "url": "https://firecrawl.dev/",
          "markdown": "# Firecrawl\n\nThe Ultimate Web Scraping API\n\n## Turn any website into clean, structured data\n\nFirecrawl makes it easy to extract data from websites for AI applications, market research, content aggregation, and more...",
          "links": [
            "https://firecrawl.dev/pricing",
            "https://firecrawl.dev/docs",
            "https://firecrawl.dev/guides"
          ],
          "metadata": {
            "title": "Firecrawl - The Ultimate Web Scraping API",
            "description": "Firecrawl is a powerful web scraping API that turns any website into clean, structured data for AI and analysis.",
            "sourceURL": "https://firecrawl.dev/",
            "statusCode": 200
          }
        }
      ]
    }
    

Advanced Search Options
-----------------------

Firecrawl’s search API supports various parameters to customize your search:

### Location Customization

### Time-Based Search

Use the `tbs` parameter to filter results by time:

Common `tbs` values:

*   `qdr:h` - Past hour
*   `qdr:d` - Past 24 hours
*   `qdr:w` - Past week
*   `qdr:m` - Past month
*   `qdr:y` - Past year

For more precise time filtering, you can specify exact date ranges using the custom date range format:

### Custom Timeout

Set a custom timeout for search operations:

Cost Implications
-----------------

The cost of using this endpoint is 1 credit per search result. There is no additional charge for basic scrapes of each search result. However, be aware of these cost factors:

*   **PDF parsing**: 1 credit per PDF page (can significantly increase costs for multi-page PDFs)
*   **Stealth proxy mode**: +4 additional credits per search result
*   _**JSON mode**_: +4 additional credits per search result

To control costs:

*   Set `parsers: []` if you don’t need PDF content
*   Use `proxy: "basic"` instead of `"stealth"` when possible
*   Limit the number of search results with the `limit` parameter

Advanced Scraping Options
-------------------------

For more details about the scraping options, refer to the [Scrape Feature documentation](https://docs.firecrawl.dev/features/scrape). Everything except for the FIRE-1 Agent and Change-Tracking features are supported by this Search endpoint.</content>
</page>

<page>
  <title>Crawl | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/crawl</url>
  <content>Firecrawl efficiently crawls websites to extract comprehensive data while bypassing blockers. The process:

1.  **URL Analysis:** Scans sitemap and crawls website to identify links
2.  **Traversal:** Recursively follows links to find all subpages
3.  **Scraping:** Extracts content from each page, handling JS and rate limits
4.  **Output:** Converts data to clean markdown or structured format

This ensures thorough data collection from any starting URL.

Crawling
--------

### /crawl endpoint

Used to crawl a URL and all accessible subpages. This submits a crawl job and returns a job ID to check the status of the crawl.

### Installation

### Usage

### Scrape options in crawl

All options from the Scrape endpoint are available in Crawl via `scrapeOptions` (JS) / `scrape_options` (Python). These apply to every page the crawler scrapes: formats, proxy, caching, actions, location, tags, etc. See the full list in the [Scrape API Reference](https://docs.firecrawl.dev/api-reference/endpoint/scrape).

### API Response

If you’re using cURL or the starter method, this will return an `ID` to check the status of the crawl.

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
    }
    

### Check Crawl Job

Used to check the status of a crawl job and get its result.

#### Response Handling

The response varies based on the crawl’s status. For not completed or large responses exceeding 10MB, a `next` URL parameter is provided. You must request this URL to retrieve the next 10MB of data. If the `next` parameter is absent, it indicates the end of the crawl data. The skip parameter sets the maximum number of results returned for each chunk of results returned.

### SDK methods

There are two ways to use the SDK:

1.  **Crawl then wait** (`crawl`):
    *   Waits for the crawl to complete and returns the full response
    *   Handles pagination automatically
    *   Recommended for most use cases

The response includes the crawl status and all scraped data:

2.  **Start then check status** (`startCrawl`/`start_crawl`):
    *   Returns immediately with a crawl ID
    *   Allows manual status checking
    *   Useful for long-running crawls or custom polling logic

Crawl WebSocket
---------------

Firecrawl’s WebSocket-based method, `Crawl URL and Watch`, enables real-time data extraction and monitoring. Start a crawl with a URL and customize it with options like page limits, allowed domains, and output formats, ideal for immediate data processing needs.

Crawl Webhook
-------------

You can configure webhooks to receive real-time notifications as your crawl progresses. This allows you to process pages as they’re scraped instead of waiting for the entire crawl to complete.

    curl -X POST https://api.firecrawl.dev/v2/crawl \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer YOUR_API_KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev",
          "limit": 100,
          "webhook": {
            "url": "https://your-domain.com/webhook",
            "metadata": {
              "any_key": "any_value"
            },
            "events": ["started", "page", "completed"]
          }
        }'
    

For comprehensive webhook documentation including event types, payload structure, and implementation examples, see the [Webhooks documentation](https://docs.firecrawl.dev/webhooks/overview).

### Quick Reference

**Event Types:**

*   `crawl.started` - When the crawl begins
*   `crawl.page` - For each page successfully scraped
*   `crawl.completed` - When the crawl finishes
*   `crawl.failed` - If the crawl encounters an error

**Basic Payload:**

    {
      "success": true,
      "type": "crawl.page",
      "id": "crawl-job-id",
      "data": [...], // Page data for 'page' events
      "metadata": {}, // Your custom metadata
      "error": null
    }</content>
</page>

<page>
  <title>Extract | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/extract</url>
  <content>The `/extract` endpoint simplifies collecting structured data from any number of URLs or entire domains. Provide a list of URLs, optionally with wildcards (e.g., `example.com/*`), and a prompt or schema describing the information you want. Firecrawl handles the details of crawling, parsing, and collating large or small datasets.

You can extract structured data from one or multiple URLs, including wildcards:

*   **Single Page**  
    Example: `https://firecrawl.dev/some-page`
*   **Multiple Pages / Full Domain**  
    Example: `https://firecrawl.dev/*`

When you use `/*`, Firecrawl will automatically crawl and parse all URLs it can discover in that domain, then extract the requested data. This feature is experimental; email [help@firecrawl.com](mailto:help@firecrawl.com) if you have issues.

### Example Usage

**Key Parameters:**

*   **urls**: An array of one or more URLs. Supports wildcards (`/*`) for broader crawling.
*   **prompt** (Optional unless no schema): A natural language prompt describing the data you want or specifying how you want that data structured.
*   **schema** (Optional unless no prompt): A more rigid structure if you already know the JSON layout.
*   **enableWebSearch** (Optional): When `true`, extraction can follow links outside the specified domain.

See [API Reference](https://docs.firecrawl.dev/api-reference/endpoint/extract) for more details.

### Response (sdks)

    {
      "success": true,
      "data": {
        "company_mission": "Firecrawl is the easiest way to extract data from the web. Developers use us to reliably convert URLs into LLM-ready markdown or structured data with a single API call.",
        "supports_sso": false,
        "is_open_source": true,
        "is_in_yc": true
      }
    }
    

Job status and completion
-------------------------

When you submit an extraction job—either directly via the API or through the starter methods—you’ll receive a Job ID. You can use this ID to:

*   Get Job Status: Send a request to the /extract/ endpoint to see if the job is still running or has finished.
*   Wait for results: If you use the default `extract` method (Python/Node), the SDK waits and returns final results.
*   Start then poll: If you use the start methods—`start_extract` (Python) or `startExtract` (Node)—the SDK returns a Job ID immediately. Use `get_extract_status` (Python) or `getExtractStatus` (Node) to check progress.

Below are code examples for checking an extraction job’s status using Python, Node.js, and cURL:

### Possible States

*   **completed**: The extraction finished successfully.
*   **processing**: Firecrawl is still processing your request.
*   **failed**: An error occurred; data was not fully extracted.
*   **cancelled**: The job was cancelled by the user.

#### Pending Example

    {
      "success": true,
      "data": [],
      "status": "processing",
      "expiresAt": "2025-01-08T20:58:12.000Z"
    }
    

#### Completed Example

    {
      "success": true,
      "data": {
          "company_mission": "Firecrawl is the easiest way to extract data from the web. Developers use us to reliably convert URLs into LLM-ready markdown or structured data with a single API call.",
          "supports_sso": false,
          "is_open_source": true,
          "is_in_yc": true
        },
      "status": "completed",
      "expiresAt": "2025-01-08T20:58:12.000Z"
    }
    

If you prefer not to define a strict structure, you can simply provide a `prompt`. The underlying model will choose a structure for you, which can be useful for more exploratory or flexible requests.

    {
      "success": true,
      "data": {
        "company_mission": "Turn websites into LLM-ready data. Power your AI apps with clean data crawled from any website."
      }
    }
    

Improving Results with Web Search
---------------------------------

Setting `enableWebSearch = true` in your request will expand the crawl beyond the provided URL set. This can capture supporting or related information from linked pages. Here’s an example that extracts information about dash cams, enriching the results with data from related pages:

### Example Response with Web Search

    {
      "success": true,
      "data": {
        "dash_cams": [
          {
            "name": "Nextbase 622GW",
            "price": "$399.99",
            "features": [
              "4K video recording",
              "Image stabilization",
              "Alexa built-in",
              "What3Words integration"
            ],
            /* Information below enriched with other websites like 
            https://www.techradar.com/best/best-dash-cam found 
            via enableWebSearch parameter */
            "pros": [
              "Excellent video quality",
              "Great night vision",
              "Built-in GPS"
            ],
            "cons": ["Premium price point", "App can be finicky"]
          }
        ],
      }
    
    

The response includes additional context gathered from related pages, providing more comprehensive and accurate information.

The `/extract` endpoint now supports extracting structured data using a prompt without needing specific URLs. This is useful for research or when exact URLs are unknown. Currently in Alpha.

Known Limitations (Beta)
------------------------

1.  **Large-Scale Site Coverage**  
    Full coverage of massive sites (e.g., “all products on Amazon”) in a single request is not yet supported.
2.  **Complex Logical Queries**  
    Requests like “find every post from 2025” may not reliably return all expected data. More advanced query capabilities are in progress.
3.  **Occasional Inconsistencies**  
    Results might differ across runs, particularly for very large or dynamic sites. Usually it captures core details, but some variation is possible.
4.  **Beta State**  
    Since `/extract` is still in Beta, features and performance will continue to evolve. We welcome bug reports and feedback to help us improve.

Using FIRE-1
------------

FIRE-1 is an AI agent that enhances Firecrawl’s scraping capabilities. It can controls browser actions and navigates complex website structures to enable comprehensive data extraction beyond traditional scraping methods. You can leverage the FIRE-1 agent with the `/extract` endpoint for complex extraction tasks that require navigation across multiple pages or interaction with elements. **Example (cURL):**

    curl -X POST https://api.firecrawl.dev/v2/extract \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer YOUR_API_KEY' \
        -d '{
          "urls": ["https://example-forum.com/topic/123"],
          "prompt": "Extract all user comments from this forum thread.",
          "schema": {
            "type": "object",
            "properties": {
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "author": {"type": "string"},
                    "comment_text": {"type": "string"}
                  },
                  "required": ["author", "comment_text"]
                }
              }
            },
            "required": ["comments"]
          },
          "agent": {
            "model": "FIRE-1"
          }
        }'
    

> FIRE-1 is already live and available under preview.

Billing and Usage Tracking
--------------------------

You can check our the pricing for /extract on the [Extract landing page pricing page](https://www.firecrawl.dev/extract#pricing) and monitor usage via the [Extract page on the dashboard](https://www.firecrawl.dev/app/extract). Have feedback or need help? Email [help@firecrawl.com](mailto:help@firecrawl.com).</content>
</page>

<page>
  <title>Webhooks | Firecrawl</title>
  <url>https://docs.firecrawl.dev/webhooks/overview</url>
  <content>Webhooks allow you to receive real-time notifications about your Firecrawl operations as they progress. Instead of polling for status updates, Firecrawl will automatically send HTTP POST requests to your specified endpoint when events occur.

Supported Operations
--------------------

Webhooks are supported for most major Firecrawl operations:

*   **Crawl** - Get notified as pages are crawled and when crawls complete
*   **Batch scrape** - Receive updates for each URL scraped in a batch
*   **Extract** - Receive updates when extract jobs start, complete, or fail

Quick Setup
-----------

Configure webhooks by adding a `webhook` object to your request:

    {
      "webhook": {
        "url": "https://your-domain.com/webhook",
        "metadata": {
          "any_key": "any_value"
        },
        "events": ["started", "page", "completed", "failed"]
      }
    } 
    

### Configuration Options

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | ✅ | Your webhook endpoint URL |
| `headers` | object | ❌ | Custom headers to include in webhook requests |
| `metadata` | object | ❌ | Custom data included in all webhook payloads |
| `events` | array | ❌ | Event types to receive (default: all events) |

Basic Usage Examples
--------------------

### Crawl with Webhook

    curl -X POST https://api.firecrawl.dev/v2/crawl \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer YOUR_API_KEY' \
        -d '{
          "url": "https://docs.firecrawl.dev",
          "limit": 100,
          "webhook": {
            "url": "https://your-domain.com/webhook",
            "metadata": {
              "any_key": "any_value"
            },
            "events": ["started", "page", "completed"]
          }
        }'
    

### Batch Scrape with Webhook

    curl -X POST https://api.firecrawl.dev/v2/batch/scrape \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer YOUR_API_KEY' \
        -d '{
          "urls": [
            "https://example.com/page1",
            "https://example.com/page2",
            "https://example.com/page3"
          ],
          "webhook": {
            "url": "https://your-domain.com/webhook",
            "metadata": {
              "any_key": "any_value"
            },
            "events": ["started", "page", "completed"]
          }
        }' 
    

Handling Webhooks
-----------------

Here’s a simple example of handling webhooks in your application:

### Best Practices

1.  **Respond quickly** – Always return a `2xx` status code within 30 seconds
2.  **Process asynchronously** – For heavy processing, queue the work and respond immediately
3.  **Validate authenticity** – Always verify the webhook signature (see [Security](https://docs.firecrawl.dev/webhooks/security))</content>
</page>

<page>
  <title>Webhook Event Types | Firecrawl</title>
  <url>https://docs.firecrawl.dev/webhooks/events</url>
  <content>This page covers all the different types of webhook events that Firecrawl can send to your endpoint. Each event type corresponds to a different stage in your scraping operations.

Event Structure
---------------

All webhook events follow this basic structure:

    {
      "success": true,
      "type": "crawl.page",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [...],
      "metadata": {}
    }
    

### Common Fields

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Whether the operation was successful |
| `type` | string | Event type identifier |
| `id` | string | Unique identifier for the job |
| `data` | array | Event-specific data (varies by event type) |
| `metadata` | object | Custom metadata from your webhook configuration |
| `error` | string | Error message (present when `success` is `false`) |

Crawl Events
------------

Multi-page crawling operations that follow links.

### `crawl.started`

Sent when a crawl operation begins.

    {
      "success": true,
      "type": "crawl.started",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "metadata": {}
    }
    

### `crawl.page`

Sent for each individual page that gets scraped during a crawl.

    {
      "success": true,
      "type": "crawl.page",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [
        {
          "markdown": "# Welcome to our website\n\nThis is the main content of the page...",
          "metadata": {
            "title": "Page Title",
            "description": "Page description",
            "url": "https://example.com/page",
            "statusCode": 200,
            "contentType": "text/html",
            "scrapeId": "550e8400-e29b-41d4-a716-446655440001",
            "sourceURL": "https://example.com/page",
            "proxyUsed": "basic",
            "cacheState": "hit",
            "cachedAt": "2025-09-03T21:11:25.636Z",
            "creditsUsed": 1
          }
        }
      ],
      "metadata": {}
    }
    

### `crawl.completed`

Sent when the entire crawl operation finishes successfully.

    {
      "success": true,
      "type": "crawl.completed",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "metadata": {}
    }
    

Batch Scrape Events
-------------------

Operations that scrape multiple specific URLs.

### `batch_scrape.started`

Sent when a batch scrape operation begins.

    {
      "success": true,
      "type": "batch_scrape.started",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "metadata": {}
    }
    

### `batch_scrape.page`

Sent for each individual URL that gets scraped in the batch.

    {
      "success": true,
      "type": "batch_scrape.page",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [
        {
          "markdown": "# Company Homepage\n\nWelcome to our company website...",
          "metadata": {
            "title": "Company Name - Homepage",
            "description": "Company description and overview",
            "url": "https://example.com",
            "statusCode": 200,
            "contentType": "text/html",
            "scrapeId": "550e8400-e29b-41d4-a716-446655440001",
            "sourceURL": "https://example.com",
            "proxyUsed": "basic",
            "cacheState": "miss",
            "cachedAt": "2025-09-03T23:30:53.434Z",
            "creditsUsed": 1
          }
        }
      ],
      "metadata": {}
    }
    

### `batch_scrape.completed`

Sent when the entire batch scrape operation finishes.

    {
      "success": true,
      "type": "batch_scrape.completed",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "metadata": {}
    }
    

LLM-powered data extraction operations.

Sent when an extract operation begins.

    {
      "success": true,
      "type": "extract.started",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "metadata": {}
    }
    

Sent when an extract operation finishes successfully.

    {
      "success": true,
      "type": "extract.completed",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [
        {
          "success": true,
          "data": { "siteName": "Example Site", "category": "Technology" },
          "extractId": "550e8400-e29b-41d4-a716-446655440000",
          "llmUsage": 0.0020118,
          "totalUrlsScraped": 1,
          "sources": {
            "siteName": ["https://example.com"],
            "category": ["https://example.com"]
          }
        }
      ],
      "metadata": {}
    }
    

Sent when an extract operation encounters an error.

    {
      "success": false,
      "type": "extract.failed",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": [],
      "error": "Failed to extract data: timeout exceeded",
      "metadata": {}
    }
    

Event Filtering
---------------

You can control which events you receive by specifying an `events` array in your webhook configuration:

    {
      "url": "https://your-app.com/webhook",
      "events": ["completed", "failed"]
    }</content>
</page>

<page>
  <title>Webhook Security | Firecrawl</title>
  <url>https://docs.firecrawl.dev/webhooks/security</url>
  <content>Webhook security is critical to ensure that requests to your endpoint are actually coming from Firecrawl and haven’t been tampered with. This page covers how to verify webhook authenticity and implement security best practices.

Why Webhook Security Matters
----------------------------

Without proper verification, attackers could:

*   Send fake webhook requests to trigger unwanted actions
*   Modify payload data to manipulate your application
*   Overload your webhook endpoint with requests

How Firecrawl Signs Webhooks
----------------------------

Firecrawl signs every webhook request using **HMAC-SHA256** encryption with your account’s secret key. This creates a unique signature for each request that proves:

1.  The request came from Firecrawl
2.  The payload hasn’t been modified

Finding Your Secret Key
-----------------------

Your webhook secret is available under the [Advanced tab](https://www.firecrawl.dev/app/settings?tab=advanced) of your account settings. Each account has a unique secret that’s used to sign all webhook requests.

Signature Verification
----------------------

### How Signatures Work

Each webhook request includes an `X-Firecrawl-Signature` header with this format:

    X-Firecrawl-Signature: sha256=abc123def456...
    

The signature is computed as follows:

1.  Take the raw request body (JSON string)
2.  Create HMAC-SHA256 hash using your secret key
3.  Convert to hexadecimal string
4.  Prefix with `sha256=`

### Implementation Examples

### Step-by-Step Verification

1.  **Extract the signature** from the `X-Firecrawl-Signature` header
2.  **Get the raw request body** as received (don’t parse it first)
3.  **Compute HMAC-SHA256** using your secret key and the raw body
4.  **Compare signatures** using a timing-safe comparison function
5.  **Only process** the webhook if signatures match

Security Best Practices
-----------------------

### Always Validate Signatures

Never trust a webhook request without signature verification:

    // ❌ BAD - No verification
    app.post('/webhook', (req, res) => {
      processWebhook(req.body); // Dangerous!
      res.status(200).send('OK');
    });
    
    // ✅ GOOD - Verified first
    app.post('/webhook', (req, res) => {
      if (!verifySignature(req)) {
        return res.status(401).send('Unauthorized');
      }
      processWebhook(req.body);
      res.status(200).send('OK');
    });
    

### Use Timing-Safe Comparisons

Standard string comparison can leak timing information. Use dedicated functions:

*   **Node.js**: `crypto.timingSafeEqual()`
*   **Python**: `hmac.compare_digest()`
*   **Other languages**: Look for “constant-time” or “timing-safe” comparison functions

### Require HTTPS

Always use HTTPS endpoints for webhooks:

    {
      "url": "https://your-app.com/webhook" // ✅ Secure
    }
    

    {
      "url": "http://your-app.com/webhook" // ❌ Insecure
    }</content>
</page>

<page>
  <title>Webhook Testing & Debugging | Firecrawl</title>
  <url>https://docs.firecrawl.dev/webhooks/testing</url>
  <content>This page covers tools and techniques for testing webhook integrations during development and debugging issues in production.

Local Development
-----------------

### Exposing Local Servers

Since webhooks need to reach your server from the internet, you’ll need to expose your local development server publicly.

#### Using Cloudflare Tunnels

[Cloudflare Tunnels](https://github.com/cloudflare/cloudflared/releases) provide a free way to securely expose your local development server to the internet without requiring account registration or opening firewall ports:

    # Download cloudflared from GitHub releases or use a package manager
    
    # Expose your local server
    cloudflared tunnel --url localhost:3000
    
    # Example output:
    # Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
    # https://abc123.trycloudflare.com
    

Use the provided URL in your webhook configuration:

    {
      "url": "https://abc123.trycloudflare.com/webhook"
    }
    

Debugging Common Issues
-----------------------

### Webhooks Not Arriving

1.  **Check URL accessibility** – Ensure your endpoint is publicly accessible
2.  **Verify HTTPS** – Webhook URLs must use HTTPS
3.  **Check firewall settings** – Allow incoming connections to your webhook port
4.  **Review event filters** – Ensure you’re subscribed to the correct event types

### Signature Verification Failing

1.  **Check the secret key** – Ensure you’re using the correct secret
2.  **Verify raw body usage** – Make sure you’re using the raw request body:

    // ❌ Wrong - using parsed body
    const signature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    // ✅ Correct - using raw body
    app.use('/webhook', express.raw({ type: 'application/json' }));
    app.post('/webhook', (req, res) => {
      const signature = crypto
        .createHmac('sha256', secret)
        .update(req.body) // Raw buffer
        .digest('hex');
    });</content>
</page>

<page>
  <title>Use Cases - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/overview</url>
  <content>Explore how different teams leverage Firecrawl to power their AI applications and data workflows.

[

AI Platforms
------------

Add web knowledge to your RAG chatbots and AI assistants.



](https://docs.firecrawl.dev/use-cases/ai-platforms)[

Lead Enrichment
---------------

Extract and filter leads from websites to enrich your sales pipeline.



](https://docs.firecrawl.dev/use-cases/lead-enrichment)[

SEO Platforms
-------------

Monitor SERP rankings and optimize content strategy.



](https://docs.firecrawl.dev/use-cases/seo-platforms)[

Deep Research
-------------

Build agentic research tools with deep web search capabilities.



](https://docs.firecrawl.dev/use-cases/deep-research)[

Product & E-commerce
--------------------

Monitor pricing and track inventory across e-commerce sites.



](https://docs.firecrawl.dev/use-cases/product-ecommerce)[

Content Generation
------------------

Generate AI content based on website data and structure.



](https://docs.firecrawl.dev/use-cases/content-generation)[

Developers & MCP
----------------

Build powerful integrations with Model Context Protocol support.



](https://docs.firecrawl.dev/use-cases/developers-mcp)[

Investment & Finance
--------------------

Track companies and extract financial insights from web data.



](https://docs.firecrawl.dev/use-cases/investment-finance)[

Competitive Intelligence
------------------------

Monitor competitor websites and track changes in real-time.



](https://docs.firecrawl.dev/use-cases/competitive-intelligence)[

Data Migration
--------------

Transfer web data seamlessly between platforms and systems.



](https://docs.firecrawl.dev/use-cases/data-migration)[

Observability
-------------

Monitor websites, track uptime, and detect changes in real-time.



](https://docs.firecrawl.dev/use-cases/observability)</content>
</page>

<page>
  <title>AI Platforms - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/ai-platforms</url>
  <content>AI platform builders and teams use Firecrawl to power knowledge bases, chatbots, and enable customers to build AI applications with web data.

Start with a Template
---------------------

[

Firestarter
-----------

Instant AI chatbots for websites with web knowledge integration



](https://github.com/mendableai/firestarter)

How It Works
------------

Transform websites into AI-ready data. Power chatbots with real-time web knowledge, build RAG systems with up-to-date documentation, and enable your users to connect their AI applications to web sources.

Why AI Platforms Choose Firecrawl
---------------------------------

### Reduce Hallucinations with Real-Time Data

Your AI assistants need current information, not outdated training data. Whether it’s domain-specific knowledge, technical documentation, or industry-specific content, Firecrawl ensures your knowledge bases stay synchronized with the latest updates-reducing hallucinations and improving response accuracy.

Customer Stories
----------------

FAQs
----

*   [Deep Research](https://docs.firecrawl.dev/use-cases/deep-research) - Advanced research capabilities
*   [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation) - AI-powered content creation
*   [Developers & MCP](https://docs.firecrawl.dev/use-cases/developers-mcp) - Developer integrations</content>
</page>

<page>
  <title>SEO Platforms - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/seo-platforms</url>
  <content>SEO platforms and consultants use Firecrawl to optimize websites for AI assistants and search engines.

Start with a Template
---------------------

[

FireGEO
-------

GEO-powered SEO monitoring and multi-region rank tracking



](https://github.com/mendableai/firegeo)

How It Works
------------

Prepare your website for the AI-first future. Audit AI readability and ensure your content is discoverable by both traditional search engines and AI assistants.

Why SEO Platforms Choose Firecrawl
----------------------------------

### Optimize for AI Discovery, Not Just Google

The future of search is AI-powered. While competitors focus on traditional SEO, forward-thinking platforms use Firecrawl to increase their clients’ visibility in AI assistant responses-the new frontier of organic discovery.

### Complete Site Intelligence at Scale

Analyze entire websites, not just sample pages. Extract every meta tag, header structure, internal link, and content element across thousands of pages simultaneously. Identify optimization opportunities your competitors miss.

What You Can Build
------------------

*   **AI Readability Audit**: Optimize for AI comprehension
*   **Content Analysis**: Structure and semantic optimization
*   **Technical SEO**: Site performance and crawlability
*   **SERP Tracking**: Monitor search engine positions

FAQs
----

*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Build AI-powered SEO tools
*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Track competitor SEO
*   [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation) - Create SEO content</content>
</page>

<page>
  <title>Deep Research - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/deep-research</url>
  <content>Academic researchers and analysts use Firecrawl’s deep research mode to aggregate data from hundreds of sources automatically.

Start with a Template
---------------------

How It Works
------------

Build powerful research tools that transform scattered web data into comprehensive insights. Use Firecrawl’s APIs to iteratively explore topics, discover sources, and extract content with full citations for your research applications.

Why Researchers Choose Firecrawl
--------------------------------

### Accelerate Research from Weeks to Hours

Build automated research systems that discover, read, and synthesize information from across the web. Create tools that deliver comprehensive reports with full citations, eliminating manual searching through hundreds of sources.

### Ensure Research Completeness

Reduce the risk of missing critical information. Build systems that follow citation chains, discover related sources, and surface insights that traditional search methods miss.

*   **Iterative Exploration**: Build tools that automatically discover related topics and sources
*   **Multi-Source Synthesis**: Combine information from hundreds of websites
*   **Citation Preservation**: Maintain full source attribution in your research outputs
*   **Intelligent Summarization**: Extract key findings and insights for analysis
*   **Trend Detection**: Identify patterns across multiple sources

FAQs
----

*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Build AI research assistants
*   [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation) - Research-based content
*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Market research</content>
</page>

<page>
  <title>Running locally | Firecrawl</title>
  <url>https://docs.firecrawl.dev/contributing/guide</url>
  <content>Welcome to [Firecrawl](https://firecrawl.dev/) 🔥! Here are some instructions on how to get the project locally, so you can run it on your own (and contribute) If you’re contributing, note that the process is similar to other open source repos i.e. (fork firecrawl, make changes, run tests, PR). If you have any questions, and would like help gettin on board, reach out to [help@firecrawl.com](mailto:help@firecrawl.com) for more or submit an issue!

Running the project locally
---------------------------

First, start by installing dependencies:

1.  node.js [instructions](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
2.  pnpm [instructions](https://pnpm.io/installation)
3.  redis [instructions](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
4.  postgresql
5.  Docker (optional) (for running postgres)

You need to set up the PostgreSQL database by running the SQL file at `apps/nuq-postgres/nuq.sql`. Easiest way is to use the docker image inside `apps/nuq-postgres`. With Docker running, build the image:

    docker build -t nuq-postgres .
    

and then run:

    docker run --name nuqdb \          
      -e POSTGRES_PASSWORD=postgres \
      -p 5433:5432 \
      -v nuq-data:/var/lib/postgresql/data \
      -d nuq-postgres
    

Set environment variables in a .env in the /apps/api/ directory you can copy over the template in .env.example. To start, we wont set up authentication, or any optional sub services (pdf parsing, JS blocking support, AI features ) .env:

    # ===== Required ENVS ======
    NUM_WORKERS_PER_QUEUE=8
    PORT=3002
    HOST=0.0.0.0
    REDIS_URL=redis://localhost:6379
    REDIS_RATE_LIMIT_URL=redis://localhost:6379
    
    ## To turn on DB authentication, you need to set up supabase.
    USE_DB_AUTHENTICATION=false
    
    ## Using the PostgreSQL for queuing -- change if credentials, host, or DB is different
    NUQ_DATABASE_URL=postgres://postgres:postgres@localhost:5433/postgres
    
    # ===== Optional ENVS ======
    
    # Supabase Setup (used to support DB authentication, advanced logging, etc.)
    SUPABASE_ANON_TOKEN=
    SUPABASE_URL=
    SUPABASE_SERVICE_TOKEN=
    
    # Other Optionals
    TEST_API_KEY= # use if you've set up authentication and want to test with a real API key
    OPENAI_API_KEY= # add for LLM dependednt features (image alt generation, etc.)
    BULL_AUTH_KEY= @
    PLAYWRIGHT_MICROSERVICE_URL=  # set if you'd like to run a playwright fallback
    LLAMAPARSE_API_KEY= #Set if you have a llamaparse key you'd like to use to parse pdfs
    SLACK_WEBHOOK_URL= # set if you'd like to send slack server health status messages
    POSTHOG_API_KEY= # set if you'd like to send posthog events like job logs
    POSTHOG_HOST= # set if you'd like to send posthog events like job logs
    
    
    

### Installing dependencies

First, install the dependencies using pnpm.

    # cd apps/api # to make sure you're in the right folder
    pnpm install # make sure you have pnpm version 9+!
    

### Running the project

You’re going to need to open 3 terminals.

### Terminal 1 - setting up redis

Run the command anywhere within your project

### Terminal 2 - setting up the service

Now, navigate to the apps/api/ directory and run:

    pnpm start
    # if you are going to use the [llm-extract feature](https://github.com/firecrawl/firecrawl/pull/586/), you should also export OPENAI_API_KEY=sk-______
    

This will start the workers who are responsible for processing crawl jobs.

### Terminal 3 - sending our first request.

Alright: now let’s send our first request.

    curl -X GET http://localhost:3002/test
    

This should return the response Hello, world! If you’d like to test the crawl endpoint, you can run this

    curl -X POST http://localhost:3002/v1/crawl \
        -H 'Content-Type: application/json' \
        -d '{
          "url": "https://mendable.ai"
        }'
    

### Alternative: Using Docker Compose

For a simpler setup, you can use Docker Compose to run all services:

1.  Prerequisites: Make sure you have Docker and Docker Compose installed
2.  Copy the `.env.example` file to `.env` in the `/apps/api/` directory and configure as needed
3.  From the root directory, run:

This will start Redis, the API server, and workers automatically in the correct configuration.

Tests:
------

The best way to do this is run the test with `npm run test:snips`.</content>
</page>

<page>
  <title>Lead Enrichment - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/lead-enrichment</url>
  <content>Sales ops and BizDev teams use Firecrawl to scrape directories for leads, enrich CRM data, and automate account research.

Start with a Template
---------------------

[

Fire Enrich
-----------

AI-powered lead enrichment and data extraction from websites



](https://github.com/mendableai/fire-enrich)

How It Works
------------

Turn the web into your most powerful prospecting tool. Extract company information, find decision makers, and enrich your CRM with real-time data from company websites.

Why Sales Teams Choose Firecrawl
--------------------------------

### Transform Directories into Pipeline

Every industry directory is a goldmine of potential customers. Firecrawl extracts thousands of qualified leads from business directories, trade associations, and conference attendee lists-complete with company details and contact information.

### Enrich CRM Data Automatically

Stop paying for stale data from traditional providers. Firecrawl pulls real-time information directly from company websites, ensuring your sales team always has the latest company news, team changes, and growth signals.

Customer Stories
----------------

Lead Sources
------------

### Business Directories

*   Industry-specific directories
*   Chamber of commerce listings
*   Trade association members
*   Conference attendee lists

### Company Websites

*   About pages and team sections
*   Press releases and news
*   Job postings for growth signals
*   Customer case studies

FAQs
----

*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Build AI sales assistants
*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Track competitors
*   [Investment & Finance](https://docs.firecrawl.dev/use-cases/investment-finance) - Investment opportunities</content>
</page>

<page>
  <title>Open Source vs Cloud | Firecrawl</title>
  <url>https://docs.firecrawl.dev/contributing/open-source-or-cloud</url>
  <content>Contributing

Understand the differences between Firecrawl’s open-source and cloud offerings

Firecrawl is open source available under the [AGPL-3.0 license](https://github.com/mendableai/firecrawl/blob/main/LICENSE). To deliver the best possible product, we offer a hosted version of Firecrawl alongside our open-source offering. The cloud solution allows us to continuously innovate and maintain a high-quality, sustainable service for all users. Firecrawl Cloud is available at [firecrawl.dev](https://firecrawl.dev/) and offers a range of features that are not available in the open source version:

[Suggest edits](https://github.com/firecrawl/firecrawl-docs/edit/main/contributing/open-source-or-cloud.mdx)[Raise issue](https://github.com/firecrawl/firecrawl-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/contributing/open-source-or-cloud)

[

Observability & Monitoring

Previous





](https://docs.firecrawl.dev/use-cases/observability)[

Running locally

Next





](https://docs.firecrawl.dev/contributing/guide)</content>
</page>

<page>
  <title>Python SDK | Firecrawl</title>
  <url>https://docs.firecrawl.dev/sdks/python</url>
  <content>Installation
------------

To install the Firecrawl Python SDK, you can use pip:

    # pip install firecrawl-py
    
    from firecrawl import Firecrawl
    
    firecrawl = Firecrawl(api_key="fc-YOUR-API-KEY")
    

Usage
-----

1.  Get an API key from [firecrawl.dev](https://firecrawl.dev/)
2.  Set the API key as an environment variable named `FIRECRAWL_API_KEY` or pass it as a parameter to the `Firecrawl` class.

Here’s an example of how to use the SDK:

    from firecrawl import Firecrawl
    
    firecrawl = Firecrawl(api_key="fc-YOUR_API_KEY")
    
    # Scrape a website:
    scrape_status = firecrawl.scrape(
      'https://firecrawl.dev', 
      formats=['markdown', 'html']
    )
    print(scrape_status)
    
    # Crawl a website:
    crawl_status = firecrawl.crawl(
      'https://firecrawl.dev', 
      limit=100, 
      scrape_options={
        'formats': ['markdown', 'html']
      }
    )
    print(crawl_status)
    

### Scraping a URL

To scrape a single URL, use the `scrape` method. It takes the URL as a parameter and returns the scraped document.

    # Scrape a website:
    scrape_result = firecrawl.scrape('firecrawl.dev', formats=['markdown', 'html'])
    print(scrape_result)
    

### Crawl a Website

To crawl a website, use the `crawl` method. It takes the starting URL and optional options as arguments. The options allow you to specify additional settings for the crawl job, such as the maximum number of pages to crawl, allowed domains, and the output format. See [Pagination](#pagination) for auto/manual pagination and limiting.

    job = firecrawl.crawl(url="https://docs.firecrawl.dev", limit=5, poll_interval=1, timeout=120)
    print(job)
    

### Start a Crawl

Start a job without waiting using `start_crawl`. It returns a job `ID` you can use to check status. Use `crawl` when you want a waiter that blocks until completion. See [Pagination](#pagination) for paging behavior and limits.

    job = firecrawl.start_crawl(url="https://docs.firecrawl.dev", limit=10)
    print(job)
    

### Checking Crawl Status

To check the status of a crawl job, use the `get_crawl_status` method. It takes the job ID as a parameter and returns the current status of the crawl job.

    status = firecrawl.get_crawl_status("<crawl-id>")
    print(status)
    

### Cancelling a Crawl

To cancel an crawl job, use the `cancel_crawl` method. It takes the job ID of the `start_crawl` as a parameter and returns the cancellation status.

    ok = firecrawl.cancel_crawl("<crawl-id>")
    print("Cancelled:", ok)
    

### Map a Website

Use `map` to generate a list of URLs from a website. The options let you customize the mapping process, including excluding subdomains or utilizing the sitemap.

    res = firecrawl.map(url="https://firecrawl.dev", limit=10)
    print(res)
    

### Crawling a Website with WebSockets

To crawl a website with WebSockets, start the job with `start_crawl` and subscribe using the `watcher` helper. Create a watcher with the job ID and attach handlers (e.g., for page, completed, failed) before calling `start()`.

    import asyncio
    from firecrawl import AsyncFirecrawl
    
    async def main():
        firecrawl = AsyncFirecrawl(api_key="fc-YOUR-API-KEY")
    
        # Start a crawl first
        started = await firecrawl.start_crawl("https://firecrawl.dev", limit=5)
    
        # Watch updates (snapshots) until terminal status
        async for snapshot in firecrawl.watcher(started.id, kind="crawl", poll_interval=2, timeout=120):
            if snapshot.status == "completed":
                print("DONE", snapshot.status)
                for doc in snapshot.data:
                    print("DOC", doc.metadata.source_url if doc.metadata else None)
            elif snapshot.status == "failed":
                print("ERR", snapshot.status)
            else:
                print("STATUS", snapshot.status, snapshot.completed, "/", snapshot.total)
    
    asyncio.run(main())
    

Firecrawl endpoints for crawl and batch return a `next` URL when more data is available. The Python SDK auto-paginates by default and aggregates all documents; in that case `next` will be `None`. You can disable auto-pagination or set limits.

#### Crawl

Use the waiter method `crawl` for the simplest experience, or start a job and page manually.

##### Simple crawl (auto-pagination, default)

*   See the default flow in [Crawl a Website](#crawl-a-website).

##### Manual crawl with pagination control (single page)

*   Start a job, then fetch one page at a time with `auto_paginate=False`.

    crawl_job = client.start_crawl("https://example.com", limit=100)
    
    status = client.get_crawl_status(crawl_job.id, pagination_config=PaginationConfig(auto_paginate=False))
    print("crawl single page:", status.status, "docs:", len(status.data), "next:", status.next)
    

##### Manual crawl with limits (auto-pagination + early stop)

*   Keep auto-pagination on but stop early with `max_pages`, `max_results`, or `max_wait_time`.

    status = client.get_crawl_status(
        crawl_job.id,
        pagination_config=PaginationConfig(max_pages=2, max_results=50, max_wait_time=15),
    )
    print("crawl limited:", status.status, "docs:", len(status.data), "next:", status.next)
    

#### Batch Scrape

Use the waiter method `batch_scrape`, or start a job and page manually.

##### Simple batch scrape (auto-pagination, default)

*   See the default flow in [Batch Scrape](https://docs.firecrawl.dev/features/batch-scrape).

##### Manual batch scrape with pagination control (single page)

*   Start a job, then fetch one page at a time with `auto_paginate=False`.

    batch_job = client.start_batch_scrape(urls)
    status = client.get_batch_scrape_status(batch_job.id, pagination_config=PaginationConfig(auto_paginate=False))
    print("batch single page:", status.status, "docs:", len(status.data), "next:", status.next)
    

##### Manual batch scrape with limits (auto-pagination + early stop)

*   Keep auto-pagination on but stop early with `max_pages`, `max_results`, or `max_wait_time`.

    status = client.get_batch_scrape_status(
        batch_job.id,
        pagination_config=PaginationConfig(max_pages=2, max_results=100, max_wait_time=20),
    )
    print("batch limited:", status.status, "docs:", len(status.data), "next:", status.next)
    

Error Handling
--------------

The SDK handles errors returned by the Firecrawl API and raises appropriate exceptions. If an error occurs during a request, an exception will be raised with a descriptive error message.

Async Class
-----------

For async operations, use the `AsyncFirecrawl` class. Its methods mirror `Firecrawl`, but they don’t block the main thread.

    import asyncio
    from firecrawl import AsyncFirecrawl
    
    async def main():
        firecrawl = AsyncFirecrawl(api_key="fc-YOUR-API-KEY")
    
        # Scrape
        doc = await firecrawl.scrape("https://firecrawl.dev", formats=["markdown"])  # type: ignore[arg-type]
        print(doc.get("markdown"))
    
        # Search
        results = await firecrawl.search("firecrawl", limit=2)
        print(results.get("web", []))
    
        # Crawl (start + status)
        started = await firecrawl.start_crawl("https://docs.firecrawl.dev", limit=3)
        status = await firecrawl.get_crawl_status(started.id)
        print(status.status)
    
        # Batch scrape (wait)
        job = await firecrawl.batch_scrape([
            "https://firecrawl.dev",
            "https://docs.firecrawl.dev",
        ], formats=["markdown"], poll_interval=1, timeout=60)
        print(job.status, job.completed, job.total)
    
    asyncio.run(main())</content>
</page>

<page>
  <title>Self-hosting | Firecrawl</title>
  <url>https://docs.firecrawl.dev/contributing/self-host</url>
  <content>#### Contributor?

Welcome to [Firecrawl](https://firecrawl.dev/) 🔥! Here are some instructions on how to get the project locally so you can run it on your own and contribute. If you’re contributing, note that the process is similar to other open-source repos, i.e., fork Firecrawl, make changes, run tests, PR. If you have any questions or would like help getting on board, join our Discord community [here](https://discord.gg/gSmWdAkdwd) for more information or submit an issue on Github [here](https://github.com/mendableai/firecrawl/issues/new/choose)!

Refer to [SELF\_HOST.md](https://github.com/mendableai/firecrawl/blob/main/SELF_HOST.md) for instructions on how to run it locally.

Why?
----

Self-hosting Firecrawl is particularly beneficial for organizations with stringent security policies that require data to remain within controlled environments. Here are some key reasons to consider self-hosting:

*   **Enhanced Security and Compliance:** By self-hosting, you ensure that all data handling and processing complies with internal and external regulations, keeping sensitive information within your secure infrastructure. Note that Firecrawl is a Mendable product and relies on SOC2 Type2 certification, which means that the platform adheres to high industry standards for managing data security.
*   **Customizable Services:** Self-hosting allows you to tailor the services, such as the Playwright service, to meet specific needs or handle particular use cases that may not be supported by the standard cloud offering.
*   **Learning and Community Contribution:** By setting up and maintaining your own instance, you gain a deeper understanding of how Firecrawl works, which can also lead to more meaningful contributions to the project.

### Considerations

However, there are some limitations and additional responsibilities to be aware of:

1.  **Limited Access to Fire-engine:** Currently, self-hosted instances of Firecrawl do not have access to Fire-engine, which includes advanced features for handling IP blocks, robot detection mechanisms, and more. This means that while you can manage basic scraping tasks, more complex scenarios might require additional configuration or might not be supported.
2.  **Manual Configuration Required:** If you need to use scraping methods beyond the basic fetch and Playwright options, you will need to manually configure these in the `.env` file. This requires a deeper understanding of the technologies and might involve more setup time.

Self-hosting Firecrawl is ideal for those who need full control over their scraping and data processing environments but comes with the trade-off of additional maintenance and configuration efforts.

Steps
-----

1.  First, start by installing the dependencies

*   Docker [instructions](https://docs.docker.com/get-docker/)

2.  Set environment variables

Create an `.env` in the root directory you can copy over the template in `apps/api/.env.example` To start, we wont set up authentication, or any optional sub services (pdf parsing, JS blocking support, AI features)

    # .env
    
    # ===== Required ENVS ======
    NUM_WORKERS_PER_QUEUE=8 
    PORT=3002
    HOST=0.0.0.0
    
    #for self-hosting using docker, use redis://redis:6379. For running locally, use redis://localhost:6379
    REDIS_URL=redis://redis:6379
    
    #for self-hosting using docker, use redis://redis:6379. For running locally, use redis://localhost:6379
    REDIS_RATE_LIMIT_URL=redis://redis:6379 
    PLAYWRIGHT_MICROSERVICE_URL=http://playwright-service:3000/html
    
    ## To turn on DB authentication, you need to set up supabase.
    USE_DB_AUTHENTICATION=false
    
    # ===== Optional ENVS ======
    
    # Supabase Setup (used to support DB authentication, advanced logging, etc.)
    SUPABASE_ANON_TOKEN= 
    SUPABASE_URL= 
    SUPABASE_SERVICE_TOKEN=
    
    # Other Optionals
    # use if you've set up authentication and want to test with a real API key
    TEST_API_KEY=
    # set if you'd like to test the scraping rate limit
    RATE_LIMIT_TEST_API_KEY_SCRAPE=
    # set if you'd like to test the crawling rate limit
    RATE_LIMIT_TEST_API_KEY_CRAWL=
    # add for LLM dependednt features (image alt generation, etc.)
    OPENAI_API_KEY=
    BULL_AUTH_KEY=@
    # use if you're configuring basic logging with logtail
    LOGTAIL_KEY=
    # set if you have a llamaparse key you'd like to use to parse pdfs
    LLAMAPARSE_API_KEY=
    # set if you'd like to send slack server health status messages
    SLACK_WEBHOOK_URL=
    # set if you'd like to send posthog events like job logs
    POSTHOG_API_KEY=
    # set if you'd like to send posthog events like job logs
    POSTHOG_HOST=
    
    # set if you'd like to use the fire engine closed beta
    FIRE_ENGINE_BETA_URL=
    
    # Proxy Settings for Playwright (Alternative you can can use a proxy service like oxylabs, which rotates IPs for you on every request)
    PROXY_SERVER=
    PROXY_USERNAME=
    PROXY_PASSWORD=
    # set if you'd like to block media requests to save proxy bandwidth
    BLOCK_MEDIA=
    
    # Set this to the URL of your webhook when using the self-hosted version of FireCrawl
    SELF_HOSTED_WEBHOOK_URL=
    
    # Resend API Key for transactional emails
    RESEND_API_KEY=
    
    # LOGGING_LEVEL determines the verbosity of logs that the system will output.
    # Available levels are:
    # NONE - No logs will be output.
    # ERROR - For logging error messages that indicate a failure in a specific operation.
    # WARN - For logging potentially harmful situations that are not necessarily errors.
    # INFO - For logging informational messages that highlight the progress of the application.
    # DEBUG - For logging detailed information on the flow through the system, primarily used for debugging.
    # TRACE - For logging more detailed information than the DEBUG level.
    # Set LOGGING_LEVEL to one of the above options to control logging output.
    LOGGING_LEVEL=INFO
    

3.  _(Optional) Running with TypeScript Playwright Service_
    *   Update the `docker-compose.yml` file to change the Playwright service:
        
                build: apps/playwright-service
            
        
        TO
        
                build: apps/playwright-service-ts
            
        
    *   Set the `PLAYWRIGHT_MICROSERVICE_URL` in your `.env` file:
        
            PLAYWRIGHT_MICROSERVICE_URL=http://localhost:3000/scrape
            
        
    *   Don’t forget to set the proxy server in your `.env` file as needed.
4.  Build and run the Docker containers:
    
        docker compose build
        docker compose up
        
    

This will run a local instance of Firecrawl which can be accessed at `http://localhost:3002`. You should be able to see the Bull Queue Manager UI on `http://localhost:3002/admin/@/queues`.

5.  _(Optional)_ Test the API

If you’d like to test the crawl endpoint, you can run this:

    curl -X POST http://localhost:3002/v2/crawl \
        -H 'Content-Type: application/json' \
        -d '{
          "url": "https://docs.firecrawl.dev"
        }'
    

Troubleshooting
---------------

This section provides solutions to common issues you might encounter while setting up or running your self-hosted instance of Firecrawl.

### Supabase client is not configured

**Symptom:**

    [YYYY-MM-DDTHH:MM:SS.SSSz]ERROR - Attempted to access Supabase client when it's not configured.
    [YYYY-MM-DDTHH:MM:SS.SSSz]ERROR - Error inserting scrape event: Error: Supabase client is not configured.
    

**Explanation:** This error occurs because the Supabase client setup is not completed. You should be able to scrape and crawl with no problems. Right now it’s not possible to configure Supabase in self-hosted instances.

### You’re bypassing authentication

**Symptom:**

    [YYYY-MM-DDTHH:MM:SS.SSSz]WARN - You're bypassing authentication
    

**Explanation:** This error occurs because the Supabase client setup is not completed. You should be able to scrape and crawl with no problems. Right now it’s not possible to configure Supabase in self-hosted instances.

### Docker containers fail to start

**Symptom:** Docker containers exit unexpectedly or fail to start. **Solution:** Check the Docker logs for any error messages using the command:

    docker logs [container_name]
    

*   Ensure all required environment variables are set correctly in the .env file.
*   Verify that all Docker services defined in docker-compose.yml are correctly configured and the necessary images are available.

### Connection issues with Redis

**Symptom:** Errors related to connecting to Redis, such as timeouts or “Connection refused”. **Solution:**

*   Ensure that the Redis service is up and running in your Docker environment.
*   Verify that the REDIS\_URL and REDIS\_RATE\_LIMIT\_URL in your .env file point to the correct Redis instance.
*   Check network settings and firewall rules that may block the connection to the Redis port.

### API endpoint does not respond

**Symptom:** API requests to the Firecrawl instance timeout or return no response. **Solution:**

*   Ensure that the Firecrawl service is running by checking the Docker container status.
*   Verify that the PORT and HOST settings in your .env file are correct and that no other service is using the same port.
*   Check the network configuration to ensure that the host is accessible from the client making the API request.

By addressing these common issues, you can ensure a smoother setup and operation of your self-hosted Firecrawl instance.

Install Firecrawl on a Kubernetes Cluster (Simple Version)
----------------------------------------------------------

Read the [examples/kubernetes-cluster-install/README.md](https://github.com/firecrawl/firecrawl/tree/main/examples/kubernetes/cluster-install#readme) for instructions on how to install Firecrawl on a Kubernetes Cluster.</content>
</page>

<page>
  <title>Node SDK | Firecrawl</title>
  <url>https://docs.firecrawl.dev/sdks/node</url>
  <content>Installation
------------

To install the Firecrawl Node SDK, you can use npm:

    # npm install @mendable/firecrawl-js
    
    import Firecrawl from '@mendable/firecrawl-js';
    
    const firecrawl = new Firecrawl({ apiKey: "fc-YOUR-API-KEY" });
    

Usage
-----

1.  Get an API key from [firecrawl.dev](https://firecrawl.dev/)
2.  Set the API key as an environment variable named `FIRECRAWL_API_KEY` or pass it as a parameter to the `FirecrawlApp` class.

Here’s an example of how to use the SDK with error handling:

    import Firecrawl from '@mendable/firecrawl-js';
    
    const firecrawl = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});
    
    // Scrape a website
    const scrapeResponse = await firecrawl.scrape('https://firecrawl.dev', {
      formats: ['markdown', 'html'],
    });
    
    console.log(scrapeResponse)
    
    // Crawl a website
    const crawlResponse = await firecrawl.crawl('https://firecrawl.dev', {
      limit: 100,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    });
    
    console.log(crawlResponse)
    

### Scraping a URL

To scrape a single URL with error handling, use the `scrapeUrl` method. It takes the URL as a parameter and returns the scraped data as a dictionary.

    // Scrape a website:
    const scrapeResult = await firecrawl.scrape('firecrawl.dev', { formats: ['markdown', 'html'] });
    
    console.log(scrapeResult)
    

### Crawling a Website

To crawl a website with error handling, use the `crawlUrl` method. It takes the starting URL and optional parameters as arguments. The `params` argument allows you to specify additional options for the crawl job, such as the maximum number of pages to crawl, allowed domains, and the output format. See [Pagination](#pagination) for auto/ manual pagination and limiting.

    const job = await firecrawl.crawl('https://docs.firecrawl.dev', { limit: 5, pollInterval: 1, timeout: 120 });
    console.log(job.status);
    

### Start a Crawl

Start a job without waiting using `startCrawl`. It returns a job `ID` you can use to check status. Use `crawl` when you want a waiter that blocks until completion. See [Pagination](#pagination) for paging behavior and limits.

    const { id } = await firecrawl.startCrawl('https://docs.firecrawl.dev', { limit: 10 });
    console.log(id);
    

### Checking Crawl Status

To check the status of a crawl job with error handling, use the `checkCrawlStatus` method. It takes the `ID` as a parameter and returns the current status of the crawl job.

    const status = await firecrawl.getCrawlStatus("<crawl-id>");
    console.log(status);
    

### Cancelling a Crawl

To cancel an crawl job, use the `cancelCrawl` method. It takes the job ID of the `startCrawl` as a parameter and returns the cancellation status.

    const ok = await firecrawl.cancelCrawl("<crawl-id>");
    console.log("Cancelled:", ok);
    

### Mapping a Website

To map a website with error handling, use the `mapUrl` method. It takes the starting URL as a parameter and returns the mapped data as a dictionary.

    const res = await firecrawl.map('https://firecrawl.dev', { limit: 10 });
    console.log(res.links);
    

### Crawling a Website with WebSockets

To crawl a website with WebSockets, use the `crawlUrlAndWatch` method. It takes the starting URL and optional parameters as arguments. The `params` argument allows you to specify additional options for the crawl job, such as the maximum number of pages to crawl, allowed domains, and the output format.

    import Firecrawl from '@mendable/firecrawl-js';
    
    const firecrawl = new Firecrawl({ apiKey: 'fc-YOUR-API-KEY' });
    
    // Start a crawl and then watch it
    const { id } = await firecrawl.startCrawl('https://mendable.ai', {
      excludePaths: ['blog/*'],
      limit: 5,
    });
    
    const watcher = firecrawl.watcher(id, { kind: 'crawl', pollInterval: 2, timeout: 120 });
    
    watcher.on('document', (doc) => {
      console.log('DOC', doc);
    });
    
    watcher.on('error', (err) => {
      console.error('ERR', err?.error || err);
    });
    
    watcher.on('done', (state) => {
      console.log('DONE', state.status);
    });
    
    // Begin watching (WS with HTTP fallback)
    await watcher.start();
    

Firecrawl endpoints for crawl and batch return a `next` URL when more data is available. The Node SDK auto-paginates by default and aggregates all documents; in that case `next` will be `null`. You can disable auto-pagination or set limits.

#### Crawl

Use the waiter method `crawl` for the simplest experience, or start a job and page manually.

##### Simple crawl (auto-pagination, default)

*   See the default flow in [Crawling a Website](#crawling-a-website).

##### Manual crawl with pagination control (single page)

*   Start a job, then fetch one page at a time with `autoPaginate: false`.

    const crawlStart = await firecrawl.startCrawl('https://docs.firecrawl.dev', { limit: 5 });
    const crawlJobId = crawlStart.id;
    
    const crawlSingle = await firecrawl.getCrawlStatus(crawlJobId, { autoPaginate: false });
    console.log('crawl single page:', crawlSingle.status, 'docs:', crawlSingle.data.length, 'next:', crawlSingle.next);
    

##### Manual crawl with limits (auto-pagination + early stop)

*   Keep auto-pagination on but stop early with `maxPages`, `maxResults`, or `maxWaitTime`.

    const crawlLimited = await firecrawl.getCrawlStatus(crawlJobId, {
      autoPaginate: true,
      maxPages: 2,
      maxResults: 50,
      maxWaitTime: 15,
    });
    console.log('crawl limited:', crawlLimited.status, 'docs:', crawlLimited.data.length, 'next:', crawlLimited.next);
    

#### Batch Scrape

Use the waiter method `batchScrape`, or start a job and page manually.

##### Simple batch scrape (auto-pagination, default)

*   See the default flow in [Batch Scrape](https://docs.firecrawl.dev/features/batch-scrape).

##### Manual batch scrape with pagination control (single page)

*   Start a job, then fetch one page at a time with `autoPaginate: false`.

    const batchStart = await firecrawl.startBatchScrape([
      'https://docs.firecrawl.dev',
      'https://firecrawl.dev',
    ], { options: { formats: ['markdown'] } });
    const batchJobId = batchStart.id;
    
    const batchSingle = await firecrawl.getBatchScrapeStatus(batchJobId, { autoPaginate: false });
    console.log('batch single page:', batchSingle.status, 'docs:', batchSingle.data.length, 'next:', batchSingle.next);
    

##### Manual batch scrape with limits (auto-pagination + early stop)

*   Keep auto-pagination on but stop early with `maxPages`, `maxResults`, or `maxWaitTime`.

    const batchLimited = await firecrawl.getBatchScrapeStatus(batchJobId, {
      autoPaginate: true,
      maxPages: 2,
      maxResults: 100,
      maxWaitTime: 20,
    });
    console.log('batch limited:', batchLimited.status, 'docs:', batchLimited.data.length, 'next:', batchLimited.next);
    

Error Handling
--------------

The SDK handles errors returned by the Firecrawl API and raises appropriate exceptions. If an error occurs during a request, an exception will be raised with a descriptive error message. The examples above demonstrate how to handle these errors using `try/catch` blocks.</content>
</page>

<page>
  <title>Go SDK | Firecrawl</title>
  <url>https://docs.firecrawl.dev/sdks/go</url>
  <content>Installation
------------

To install the Firecrawl Go SDK, you can use go get:

    go get github.com/mendableai/firecrawl-go
    

Usage
-----

1.  Get an API key from [firecrawl.dev](https://firecrawl.dev/)
2.  Set the `API key` as a parameter to the `FirecrawlApp` struct.
3.  Set the `API URL` and/or pass it as a parameter to the `FirecrawlApp` struct. Defaults to `https://api.firecrawl.dev`.
4.  Set the `version` and/or pass it as a parameter to the `FirecrawlApp` struct. Defaults to `v1`.

Here’s an example of how to use the SDK with error handling:

    import (
    	"fmt"
    	"log"
    	"github.com/google/uuid"
    	"github.com/mendableai/firecrawl-go"
    )
    
    func ptr[T any](v T) *T {
    	return &v
    }
    
    func main() {
    	// Initialize the FirecrawlApp with your API key
    	apiKey := "fc-YOUR_API_KEY"
    	apiUrl := "https://api.firecrawl.dev"
    	version := "v1"
    
    	app, err := firecrawl.NewFirecrawlApp(apiKey, apiUrl, version)
    	if err != nil {
    		log.Fatalf("Failed to initialize FirecrawlApp: %v", err)
    	}
    
      // Scrape a website
      scrapeStatus, err := app.ScrapeUrl("https://firecrawl.dev", firecrawl.ScrapeParams{
        Formats: []string{"markdown", "html"},
      })
      if err != nil {
        log.Fatalf("Failed to send scrape request: %v", err)
      }
    
      fmt.Println(scrapeStatus)
    
    	// Crawl a website
      idempotencyKey := uuid.New().String() // optional idempotency key
      crawlParams := &firecrawl.CrawlParams{
    		ExcludePaths: []string{"blog/*"},
    		MaxDepth:     ptr(2),
    	}
    
    	crawlStatus, err := app.CrawlUrl("https://firecrawl.dev", crawlParams, &idempotencyKey)
    	if err != nil {
    		log.Fatalf("Failed to send crawl request: %v", err)
    	}
    
    	fmt.Println(crawlStatus) 
    }
    

### Scraping a URL

To scrape a single URL with error handling, use the `ScrapeURL` method. It takes the URL as a parameter and returns the scraped data as a dictionary.

    // Scrape a website
    scrapeResult, err := app.ScrapeUrl("https://firecrawl.dev", map[string]any{
      "formats": []string{"markdown", "html"},
    })
    if err != nil {
      log.Fatalf("Failed to scrape URL: %v", err)
    }
    
    fmt.Println(scrapeResult)
    

### Crawling a Website

To crawl a website, use the `CrawlUrl` method. It takes the starting URL and optional parameters as arguments. The `params` argument allows you to specify additional options for the crawl job, such as the maximum number of pages to crawl, allowed domains, and the output format.

    crawlStatus, err := app.CrawlUrl("https://firecrawl.dev", map[string]any{
      "limit": 100,
      "scrapeOptions": map[string]any{
        "formats": []string{"markdown", "html"},
      },
    })
    if err != nil {
      log.Fatalf("Failed to send crawl request: %v", err)
    }
    
    fmt.Println(crawlStatus) 
    

### Checking Crawl Status

To check the status of a crawl job, use the `CheckCrawlStatus` method. It takes the job ID as a parameter and returns the current status of the crawl job.

    // Get crawl status
    crawlStatus, err := app.CheckCrawlStatus("<crawl_id>")
    
    if err != nil {
      log.Fatalf("Failed to get crawl status: %v", err)
    }
    
    fmt.Println(crawlStatus)
    

### Map a Website

Use `MapUrl` to generate a list of URLs from a website. The `params` argument let you customize the mapping process, including options to exclude subdomains or to utilize the sitemap.

    // Map a website
    mapResult, err := app.MapUrl("https://firecrawl.dev", nil)
    if err != nil {
      log.Fatalf("Failed to map URL: %v", err)
    }
    
    fmt.Println(mapResult)
    

Error Handling
--------------

The SDK handles errors returned by the Firecrawl API and raises appropriate exceptions. If an error occurs during a request, an exception will be raised with a descriptive error message.</content>
</page>

<page>
  <title>Rust SDK | Firecrawl</title>
  <url>https://docs.firecrawl.dev/sdks/rust</url>
  <content>Installation
------------

To install the Firecrawl Rust SDK, add the following to your `Cargo.toml`:

    # Add this to your Cargo.toml
    [dependencies]
    firecrawl = "^1.0"
    tokio = { version = "^1", features = ["full"] }
    

Usage
-----

First, you need to obtain an API key from [firecrawl.dev](https://firecrawl.dev/). Then, you need to initialize the `FirecrawlApp`. From there, you can access functions like `FirecrawlApp::scrape_url`, which let you use our API. Here’s an example of how to use the SDK in Rust:

    use firecrawl::{crawl::{CrawlOptions, CrawlScrapeOptions, CrawlScrapeFormats}, FirecrawlApp, scrape::{ScrapeOptions, ScrapeFormats}};
    
    #[tokio::main]
    async fn main() {
        // Initialize the FirecrawlApp with the API key
        let app = FirecrawlApp::new("fc-YOUR_API_KEY").expect("Failed to initialize FirecrawlApp");
    
        // Scrape a URL
        let options = ScrapeOptions {
            formats vec! [ ScrapeFormats::Markdown, ScrapeFormats::HTML ].into(),
            ..Default::default()
        };
    
        let scrape_result = app.scrape_url("https://firecrawl.dev", options).await;
    
        match scrape_result {
            Ok(data) => println!("Scrape Result:\n{}", data.markdown.unwrap()),
            Err(e) => eprintln!("Map failed: {}", e),
        }
    
        // Crawl a website
        let crawl_options = CrawlOptions {
            scrape_options: CrawlScrapeOptions {
                formats: vec![ CrawlScrapeFormats::Markdown, CrawlScrapeFormats::HTML ].into(),
                ..Default::default()
            }.into(),
            limit: 100.into(),
            ..Default::default()
        };
    
        let crawl_result = app
            .crawl_url("https://mendable.ai", crawl_options)
            .await;
    
        match crawl_result {
            Ok(data) => println!("Crawl Result (used {} credits):\n{:#?}", data.credits_used, data.data),
            Err(e) => eprintln!("Crawl failed: {}", e),
        }
    }
    

### Scraping a URL

To scrape a single URL, use the `scrape_url` method. It takes the URL as a parameter and returns the scraped data as a `Document`.

    let options = ScrapeOptions {
        formats vec! [ ScrapeFormats::Markdown, ScrapeFormats::HTML ].into(),
        ..Default::default()
    };
    
    let scrape_result = app.scrape_url("https://firecrawl.dev", options).await;
    
    match scrape_result {
        Ok(data) => println!("Scrape Result:\n{}", data.markdown.unwrap()),
        Err(e) => eprintln!("Map failed: {}", e),
    }
    

With Extract, you can easily extract structured data from any URL. You need to specify your schema in the JSON Schema format, using the `serde_json::json!` macro.

    let json_schema = json!({
        "type": "object",
        "properties": {
            "top": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "points": {"type": "number"},
                        "by": {"type": "string"},
                        "commentsURL": {"type": "string"}
                    },
                    "required": ["title", "points", "by", "commentsURL"]
                },
                "minItems": 5,
                "maxItems": 5,
                "description": "Top 5 stories on Hacker News"
            }
        },
        "required": ["top"]
    });
    
    let llm_extraction_options = ScrapeOptions {
        formats: vec![ ScrapeFormats::Json ].into(),
        jsonOptions: ExtractOptions {
            schema: json_schema.into(),
            ..Default::default()
        }.into(),
        ..Default::default()
    };
    
    let llm_extraction_result = app
        .scrape_url("https://news.ycombinator.com", llm_extraction_options)
        .await;
    
    match llm_extraction_result {
        Ok(data) => println!("LLM Extraction Result:\n{:#?}", data.extract.unwrap()),
        Err(e) => eprintln!("LLM Extraction failed: {}", e),
    }
    

### Crawling a Website

To crawl a website, use the `crawl_url` method. This will wait for the crawl to complete, which may take a long time based on your starting URL and your options.

    let crawl_options = CrawlOptions {
        scrape_options: CrawlScrapeOptions {
            formats: vec![ CrawlScrapeFormats::Markdown, CrawlScrapeFormats::HTML ].into(),
            ..Default::default()
        }.into(),
        limit: 100.into(),
        ..Default::default()
    };
    
    let crawl_result = app
        .crawl_url("https://mendable.ai", crawl_options)
        .await;
    
    match crawl_result {
        Ok(data) => println!("Crawl Result (used {} credits):\n{:#?}", data.credits_used, data.data),
        Err(e) => eprintln!("Crawl failed: {}", e),
    }
    

#### Crawling asynchronously

To crawl without waiting for the result, use the `crawl_url_async` method. It takes the same parameters, but it returns a `CrawlAsyncRespone` struct, containing the crawl’s ID. You can use that ID with the `check_crawl_status` method to check the status at any time. Do note that completed crawls are deleted after 24 hours.

    let crawl_id = app.crawl_url_async("https://mendable.ai", None).await?.id;
    
    // ... later ...
    
    let status = app.check_crawl_status(crawl_id).await?;
    
    if status.status == CrawlStatusTypes::Completed {
        println!("Crawl is done: {:#?}", status.data);
    } else {
        // ... wait some more ...
    }
    

### Map a URL

Map all associated links from a starting URL.

    let map_result = app.map_url("https://firecrawl.dev", None).await;
    
    match map_result {
        Ok(data) => println!("Mapped URLs: {:#?}", data),
        Err(e) => eprintln!("Map failed: {}", e),
    }
    

Error Handling
--------------

The SDK handles errors returned by the Firecrawl API and by our dependencies, and combines them into the `FirecrawlError` enum, implementing `Error`, `Debug` and `Display`. All of our methods return a `Result<T, FirecrawlError>`.</content>
</page>

<page>
  <title>Scrape - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/scrape</url>
  <content>Scrape a single URL and optionally extract information using an LLM

What’s New in v2
----------------

### New Formats

*   `"summary"` - Get a concise summary of the page content
*   JSON extraction now uses object format: `{ type: "json", prompt, schema }`
*   Screenshot format now uses object format: `{ type: "screenshot", fullPage, quality, viewport }`

### Key Improvements

*   **Faster by default**: Requests are cached with `maxAge` defaulting to 2 days
*   **Sensible defaults**: `blockAds`, `skipTlsVerification`, and `removeBase64Images` are enabled by default
*   **Enhanced screenshot options**: Full control over screenshot parameters using object format

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

formats

(Markdown · object | Summary · object | HTML · object | Raw HTML · object | Links · object | Screenshot · object | JSON · object | Change Tracking · object)\[\]

Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.

*   Markdown
    
*   Summary
    
*   HTML
    
*   Raw HTML
    
*   Links
    
*   Screenshot
    
*   JSON
    
*   Change Tracking
    

Only return the main content of the page excluding headers, navs, footers, etc.

Tags to include in the output.

Tags to exclude from the output.

Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.

Headers to send with the request. Can be used to send cookies, user-agent, etc.

Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.

Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.

Skip TLS certificate verification when making requests

Timeout in milliseconds for the request.

Controls how files are processed during scraping. When "pdf" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit total.

actions

(Wait · object | Screenshot · object | Click · object | Write text · object | Press a key · object | Scroll · object | Scrape · object | Execute JavaScript · object | Generate PDF · object)\[\]

Actions to perform on the page before grabbing the content

*   Wait
    
*   Screenshot
    
*   Click
    
*   Write text
    
*   Press a key
    
*   Scroll
    
*   Scrape
    
*   Execute JavaScript
    
*   Generate PDF
    

Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.

Removes all base 64 images from the output, which may be overwhelmingly long. The image's alt text remains in the output, but the URL is replaced with a placeholder.

Enables ad-blocking and cookie popup blocking.

Specifies the type of proxy to use.

*   **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.
*   **stealth**: Stealth proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Costs up to 5 credits per request.
*   **auto**: Firecrawl will automatically retry scraping with stealth proxies if the basic proxy fails. If the retry with stealth is successful, 5 credits will be billed for the scrape. If the first attempt with basic is successful, only the regular cost will be billed.

If you do not specify a proxy, Firecrawl will default to auto.

Available options:

`basic`,

`stealth`,

`auto`

If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (actions, headers) will force this parameter to be false.

If true, this will enable zero data retention for this scrape. To enable this feature, please contact [help@firecrawl.dev](mailto:help@firecrawl.dev)

#### Response</content>
</page>

<page>
  <title>Introduction - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/introduction</url>
  <content>Features
--------

Agentic Features
----------------

Base URL
--------

All requests contain the following base URL:

    https://api.firecrawl.dev 
    

Authentication
--------------

For authentication, it’s required to include an Authorization header. The header should contain `Bearer fc-123456789`, where `fc-123456789` represents your API Key.

    Authorization: Bearer fc-123456789
    

​

Response codes
--------------

Firecrawl employs conventional HTTP status codes to signify the outcome of your requests. Typically, 2xx HTTP status codes denote success, 4xx codes represent failures related to the user, and 5xx codes signal infrastructure problems.

| Status | Description |
| --- | --- |
| 200 | Request was successful. |
| 400 | Verify the correctness of the parameters. |
| 401 | The API key was not provided. |
| 402 | Payment required |
| 404 | The requested resource could not be located. |
| 429 | The rate limit has been surpassed. |
| 5xx | Signifies a server error with Firecrawl. |

Refer to the Error Codes section for a detailed explanation of all potential API errors.

### Firecrawl error codes (5xx)

When a 5xx error occurs, Firecrawl provides more specific error codes to clarify what went wrong.​

| Error Code | Status | Description |
| --- | --- | --- |
| `SCRAPE_ALL_ENGINES_FAILED` | 500 | All scraping engines failed. |
| `SCRAPE_SSL_ERROR` | 500 | Page SSL certificate is invalid. You can use `skipTlsVerification:true` to bypass this check. |
| `SCRAPE_SITE_ERROR` | 500 | Unrecoverable site error. |
| `SCRAPE_DNS_RESOLUTION_ERROR` | 500 | DNS resolution failed. |
| `SCRAPE_ACTION_ERROR` | 500 | Error while performing a page action. |
| `SCRAPE_PDF_PREFETCH_FAILED` | 500 | Failed to prefetch PDF. |
| `SCRAPE_PDF_INSUFFICIENT_TIME_ERROR` | 500 | Not enough time to process PDF. |
| `SCRAPE_PDF_ANTIBOT_ERROR` | 500 | PDF blocked by anti-bot mechanisms. |
| `SCRAPE_ZDR_VIOLATION_ERROR` | 500 | Zero Data Retention conflict: occurs when `zeroDataRetention:true` but another option (e.g. `screenshot`) requires temporary storage. |
| `SCRAPE_UNSUPPORTED_FILE_ERROR` | 500 | Unsupported file type. |
| `UNKNOWN_ERROR` | 500 | Generic or unexpected error. |

Rate limit
----------

The Firecrawl API has a rate limit to ensure the stability and reliability of the service. The rate limit is applied to all endpoints and is based on the number of requests made within a specific time frame. When you exceed the rate limit, you will receive a 429 response code.</content>
</page>

<page>
  <title>Search - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/search</url>
  <content>What’s New in v2
----------------

### Search Multiple Sources

Search web, images, and news at once:

    {
      "query": "firecrawl web scraping",
      "sources": [ "web", "images", "news" ]
    }
    

### Response Format Changed

v1: flat list of results. v2: organized by source type:

    {
      "success": true,
      "data": {
        "web": [/* web results */],
        "images": [/* image results */],
        "news": [/* news results */]
      }
    }
    

### New Features

*   Filter by time ranges (“past week”, “past month”)
*   Target specific countries/regions
*   Category Filtering: Search within GitHub repositories or research websites
*   Results capped at 500 during alpha

The search endpoint combines web search (SERP) with Firecrawl’s scraping capabilities to return full page content for any query. Include `scrapeOptions` with `formats: [{"type": "markdown"}]` to get complete markdown content for each search result otherwise you will default to getting the SERP results (url, title, description). You can also use other formats like `{"type": "summary"}` for condensed content.

Supported query operators
-------------------------

We support a variety of query operators that allow you to filter your searches better.

| Operator | Functionality | Examples |
| --- | --- | --- |
| `""` | Non-fuzzy matches a string of text | `"Firecrawl"` |
| `-` | Excludes certain keywords or negates other operators | `-bad`, `-site:firecrawl.dev` |
| `site:` | Only returns results from a specified website | `site:firecrawl.dev` |
| `inurl:` | Only returns results that include a word in the URL | `inurl:firecrawl` |
| `allinurl:` | Only returns results that include multiple words in the URL | `allinurl:git firecrawl` |
| `intitle:` | Only returns results that include a word in the title of the page | `intitle:Firecrawl` |
| `allintitle:` | Only returns results that include multiple words in the title of the page | `allintitle:firecrawl playground` |
| `related:` | Only returns results that are related to a specific domain | `related:firecrawl.dev` |
| `imagesize:` | Only returns images with exact dimensions | `imagesize:1920x1080` |
| `larger:` | Only returns images larger than specified dimensions | `larger:1920x1080` |

Location Parameter
------------------

Use the `location` parameter to get geo-targeted search results. Format: `"string"`. Examples: `"Germany"`, `"San Francisco,California,United States"`. See the [complete list of supported locations](https://firecrawl.dev/search_locations.json) for all available countries and languages.

Categories Parameter
--------------------

Filter search results by specific categories using the `categories` parameter:

*   **`github`**: Search within GitHub repositories, code, issues, and documentation
*   **`research`**: Search academic and research websites (arXiv, Nature, IEEE, PubMed, etc.)

### Example Usage

    {
      "query": "machine learning",
      "categories": ["github", "research"],
      "limit": 10
    }
    

### Category Response

Each result includes a `category` field indicating its source:

    {
      "success": true,
      "data": {
        "web": [
          {
            "url": "https://github.com/example/ml-project",
            "title": "Machine Learning Project",
            "description": "Implementation of ML algorithms",
            "category": "github"
          },
          {
            "url": "https://arxiv.org/abs/2024.12345",
            "title": "ML Research Paper",
            "description": "Latest advances in machine learning",
            "category": "research"
          }
        ]
      }
    }
    

Time-Based Search
-----------------

Use the `tbs` parameter to filter results by time periods, including custom date ranges. See the [Search Feature documentation](https://docs.firecrawl.dev/features/search#time-based-search) for detailed examples and supported formats.

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

Maximum number of results to return

Required range: `1 <= x <= 100`

sources

(Web · object | Images · object | News · object)\[\]

Sources to search. Will determine the arrays available in the response.

*   Web
    
*   Images
    
*   News
    

categories

(GitHub · object | Research · object)\[\]

Categories to filter results by

*   GitHub
    
*   Research
    

Time-based search parameter. Supports predefined time ranges (`qdr:h`, `qdr:d`, `qdr:w`, `qdr:m`, `qdr:y`) and custom date ranges (`cdr:1,cd_min:MM/DD/YYYY,cd_max:MM/DD/YYYY`)

Location parameter for search results

Excludes URLs from the search results that are invalid for other Firecrawl endpoints. This helps reduce errors if you are piping data from search into other Firecrawl API endpoints.

Options for scraping search results

#### Response

The search results. The arrays available will depend on the sources you specified in the request. By default, the `web` array will be returned.

Warning message if any issues occurred</content>
</page>

<page>
  <title>Get Batch Scrape Status - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get</url>
  <content>#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

The ID of the batch scrape job

#### Response

The current status of the batch scrape. Can be `scraping`, `completed`, or `failed`.

The total number of pages that were attempted to be scraped.

The number of pages that have been successfully scraped.

The number of credits used for the batch scrape.

The date and time when the batch scrape will expire.

The URL to retrieve the next 10MB of data. Returned if the batch scrape is not completed or if the response is larger than 10MB.

The data of the batch scrape.</content>
</page>

<page>
  <title>Get Batch Scrape Errors - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get-errors</url>
  <content>#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

The ID of the batch scrape job

#### Response

Errored scrape jobs and error details

List of URLs that were attempted in scraping but were blocked by robots.txt</content>
</page>

<page>
  <title>Batch Scrape - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape</url>
  <content>Scrape multiple URLs and optionally extract information using an LLM

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

A webhook specification object.

Maximum number of concurrent scrapes. This parameter allows you to set a concurrency limit for this batch scrape. If not specified, the batch scrape adheres to your team's concurrency limit.

If invalid URLs are specified in the urls array, they will be ignored. Instead of them failing the entire request, a batch scrape using the remaining valid URLs will be created, and the invalid URLs will be returned in the invalidURLs field of the response.

formats

(Markdown · object | Summary · object | HTML · object | Raw HTML · object | Links · object | Screenshot · object | JSON · object | Change Tracking · object)\[\]

Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.

*   Markdown
    
*   Summary
    
*   HTML
    
*   Raw HTML
    
*   Links
    
*   Screenshot
    
*   JSON
    
*   Change Tracking
    

Only return the main content of the page excluding headers, navs, footers, etc.

Tags to include in the output.

Tags to exclude from the output.

Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.

Headers to send with the request. Can be used to send cookies, user-agent, etc.

Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.

Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.

Skip TLS certificate verification when making requests

Timeout in milliseconds for the request.

Controls how files are processed during scraping. When "pdf" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit total.

actions

(Wait · object | Screenshot · object | Click · object | Write text · object | Press a key · object | Scroll · object | Scrape · object | Execute JavaScript · object | Generate PDF · object)\[\]

Actions to perform on the page before grabbing the content

*   Wait
    
*   Screenshot
    
*   Click
    
*   Write text
    
*   Press a key
    
*   Scroll
    
*   Scrape
    
*   Execute JavaScript
    
*   Generate PDF
    

Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.

Removes all base 64 images from the output, which may be overwhelmingly long. The image's alt text remains in the output, but the URL is replaced with a placeholder.

Enables ad-blocking and cookie popup blocking.

Specifies the type of proxy to use.

*   **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.
*   **stealth**: Stealth proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Costs up to 5 credits per request.
*   **auto**: Firecrawl will automatically retry scraping with stealth proxies if the basic proxy fails. If the retry with stealth is successful, 5 credits will be billed for the scrape. If the first attempt with basic is successful, only the regular cost will be billed.

If you do not specify a proxy, Firecrawl will default to auto.

Available options:

`basic`,

`stealth`,

`auto`

If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (actions, headers) will force this parameter to be false.

If true, this will enable zero data retention for this batch scrape. To enable this feature, please contact [help@firecrawl.dev](mailto:help@firecrawl.dev)

#### Response

If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. If there were no invalid URLs, this will be an empty array. If ignoreInvalidURLs is false, this field will be undefined.</content>
</page>

<page>
  <title>Map - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/map</url>
  <content>What’s New in v2
----------------

### Better Sitemap Control

Three ways to handle sitemaps:

*   `"include"` - Use sitemap + find other pages (default)
*   `"skip"` - Ignore sitemap completely
*   `"only"` - Only return sitemap URLs

    {
      "url": "https://example.com",
      "sitemap": "only"
    }
    

### Response format changed

We now return the links in the `links` array of objects with enhanced metadata.

    {
      "url": "https://example.com",
      "links": [
        {
          "url": "https://example.com/page1",
          "title": "Page 1",
          "description": "Page 1 description"
        }
      ]
    }
    

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

The base URL to start crawling from

Specify a search query to order the results by relevance. Example: 'blog' will return URLs that contain the word 'blog' in the URL ordered by relevance.

sitemap

enum<string>

default:include

Sitemap mode when mapping. If you set it to `skip`, the sitemap won't be used to find URLs. If you set it to `only`, only URLs that are in the sitemap will be returned. By default (`include`), the sitemap and other methods will be used together to find URLs.

Available options:

`skip`,

`include`,

`only`

Include subdomains of the website

Do not return URLs with query parameters

Maximum number of links to return

Required range: `x <= 100000`

Timeout in milliseconds. There is no timeout by default.

Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.

#### Response</content>
</page>

<page>
  <title>Crawl - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-post</url>
  <content>    curl --request POST \
      --url https://api.firecrawl.dev/v2/crawl \
      --header 'Authorization: Bearer <token>' \
      --header 'Content-Type: application/json' \
      --data '{
      "url": "<string>",
      "prompt": "<string>",
      "excludePaths": [
        "<string>"
      ],
      "includePaths": [
        "<string>"
      ],
      "maxDiscoveryDepth": 123,
      "sitemap": "include",
      "ignoreQueryParameters": false,
      "limit": 10000,
      "crawlEntireDomain": false,
      "allowExternalLinks": false,
      "allowSubdomains": false,
      "delay": 123,
      "maxConcurrency": 123,
      "webhook": {
        "url": "<string>",
        "headers": {},
        "metadata": {},
        "events": [
          "completed"
        ]
      },
      "scrapeOptions": {
        "formats": [
          "markdown"
        ],
        "onlyMainContent": true,
        "includeTags": [
          "<string>"
        ],
        "excludeTags": [
          "<string>"
        ],
        "maxAge": 172800000,
        "headers": {},
        "waitFor": 0,
        "mobile": false,
        "skipTlsVerification": true,
        "timeout": 123,
        "parsers": [
          "pdf"
        ],
        "actions": [
          {
            "type": "wait",
            "milliseconds": 2,
            "selector": "#my-element"
          }
        ],
        "location": {
          "country": "US",
          "languages": [
            "en-US"
          ]
        },
        "removeBase64Images": true,
        "blockAds": true,
        "proxy": "auto",
        "storeInCache": true
      },
      "zeroDataRetention": false
    }'</content>
</page>

<page>
  <title>Cancel Batch Scrape - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-delete</url>
  <content>Cancel a batch scrape job

    curl --request DELETE \
      --url https://api.firecrawl.dev/v2/batch/scrape/{id} \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "message": "Batch scrape job successfully cancelled."
    }

Cancel a batch scrape job

    curl --request DELETE \
      --url https://api.firecrawl.dev/v2/batch/scrape/{id} \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "message": "Batch scrape job successfully cancelled."
    }

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

The ID of the batch scrape job

#### Response

Example:

`"Batch scrape job successfully cancelled."`</content>
</page>

<page>
  <title>Get Crawl Status - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-get</url>
  <content>#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

#### Response

The current status of the crawl. Can be `scraping`, `completed`, or `failed`.

The total number of pages that were attempted to be crawled.

The number of pages that have been successfully crawled.

The number of credits used for the crawl.

The date and time when the crawl will expire.

The URL to retrieve the next 10MB of data. Returned if the crawl is not completed or if the response is larger than 10MB.</content>
</page>

<page>
  <title>Crawl Params Preview - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-params-preview</url>
  <content>What’s New in v2
----------------

### Crawl Params Preview

    {
      "url": "https://example.com",
      "prompt": "Crawl the entire website but exclude /admin and /api"
    }   
    

### Response

    {
      "url": "https://example.com",
      "prompt": "Crawl the entire website",
      "crawlEntireDomain": true,
      "excludePaths": ["/admin/.*", "/api/.*"],
      "sitemap": "include"
    }
    

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

Natural language prompt describing what you want to crawl

Maximum length: `10000`

#### Response

Successful response with generated crawl parameters</content>
</page>

<page>
  <title>Cancel Crawl - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-delete</url>
  <content>Cancel a crawl job

    curl --request DELETE \
      --url https://api.firecrawl.dev/v2/crawl/{id} \
      --header 'Authorization: Bearer <token>'

    {
      "status": "cancelled"
    }

Crawl Endpoints

DELETE

/

crawl

/

{id}

Cancel a crawl job

    curl --request DELETE \
      --url https://api.firecrawl.dev/v2/crawl/{id} \
      --header 'Authorization: Bearer <token>'

    {
      "status": "cancelled"
    }

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-id)

id

string<uuid>

required

The ID of the crawl job

#### Response

Successful cancellation

[​](#response-status)

status

enum<string>

Available options:

`cancelled`

Example:

`"cancelled"`

[Suggest edits](https://github.com/firecrawl/firecrawl-docs/edit/main/api-reference/endpoint/crawl-delete.mdx)[Raise issue](https://github.com/firecrawl/firecrawl-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/crawl-delete)

[

Crawl Params Preview

Previous





](https://docs.firecrawl.dev/api-reference/endpoint/crawl-params-preview)[

Get Crawl Errors

Next





](https://docs.firecrawl.dev/api-reference/endpoint/crawl-get-errors)</content>
</page>

<page>
  <title>Get Crawl Errors - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-get-errors</url>
  <content>#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

#### Response

Errored scrape jobs and error details

List of URLs that were attempted in scraping but were blocked by robots.txt</content>
</page>

<page>
  <title>Get Active Crawls - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/crawl-active</url>
  <content>    {
      "success": true,
      "crawls": [
        {
          "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
          "teamId": "<string>",
          "url": "<string>",
          "options": {
            "scrapeOptions": {
              "formats": [
                "markdown"
              ],
              "onlyMainContent": true,
              "includeTags": [
                "<string>"
              ],
              "excludeTags": [
                "<string>"
              ],
              "maxAge": 172800000,
              "headers": {},
              "waitFor": 0,
              "mobile": false,
              "skipTlsVerification": true,
              "timeout": 123,
              "parsers": [
                "pdf"
              ],
              "actions": [
                {
                  "type": "wait",
                  "milliseconds": 2,
                  "selector": "#my-element"
                }
              ],
              "location": {
                "country": "US",
                "languages": [
                  "en-US"
                ]
              },
              "removeBase64Images": true,
              "blockAds": true,
              "proxy": "auto",
              "storeInCache": true
            }
          }
        }
      ]
    }</content>
</page>

<page>
  <title>Extract - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/extract</url>
  <content>    curl --request POST \
      --url https://api.firecrawl.dev/v2/extract \
      --header 'Authorization: Bearer <token>' \
      --header 'Content-Type: application/json' \
      --data '{
      "urls": [
        "<string>"
      ],
      "prompt": "<string>",
      "schema": {},
      "enableWebSearch": false,
      "ignoreSitemap": false,
      "includeSubdomains": true,
      "showSources": false,
      "scrapeOptions": {
        "formats": [
          "markdown"
        ],
        "onlyMainContent": true,
        "includeTags": [
          "<string>"
        ],
        "excludeTags": [
          "<string>"
        ],
        "maxAge": 172800000,
        "headers": {},
        "waitFor": 0,
        "mobile": false,
        "skipTlsVerification": true,
        "timeout": 123,
        "parsers": [
          "pdf"
        ],
        "actions": [
          {
            "type": "wait",
            "milliseconds": 2,
            "selector": "#my-element"
          }
        ],
        "location": {
          "country": "US",
          "languages": [
            "en-US"
          ]
        },
        "removeBase64Images": true,
        "blockAds": true,
        "proxy": "auto",
        "storeInCache": true
      },
      "ignoreInvalidURLs": true
    }'</content>
</page>

<page>
  <title>Get Extract Status - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/extract-get</url>
  <content>#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

The ID of the extract job

#### Response

The current status of the extract job

Available options:

`completed`,

`processing`,

`failed`,

`cancelled`

The number of tokens used by the extract job. Only available if the job is completed.</content>
</page>

<page>
  <title>Historical Credit Usage - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/credit-usage-historical</url>
  <content>Get historical credit usage for the authenticated team

    curl --request GET \
      --url https://api.firecrawl.dev/v2/team/credit-usage/historical \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "periods": [
        {
          "startDate": "2025-01-01T00:00:00Z",
          "endDate": "2025-01-31T23:59:59Z",
          "apiKey": "<string>",
          "totalCredits": 1000
        }
      ]
    }

GET

/

team

/

credit-usage

/

historical

Get historical credit usage for the authenticated team

    curl --request GET \
      --url https://api.firecrawl.dev/v2/team/credit-usage/historical \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "periods": [
        {
          "startDate": "2025-01-01T00:00:00Z",
          "endDate": "2025-01-31T23:59:59Z",
          "apiKey": "<string>",
          "totalCredits": 1000
        }
      ]
    }

Returns historical credit usage on a month-by-month basis. The endpoint can also breaks usage down by API key optionally.

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

Get historical credit usage by API key

#### Response</content>
</page>

<page>
  <title>Credit Usage - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/credit-usage</url>
  <content>    {
      "success": true,
      "data": {
        "remainingCredits": 1000,
        "planCredits": 500000,
        "billingPeriodStart": "2025-01-01T00:00:00Z",
        "billingPeriodEnd": "2025-01-31T23:59:59Z"
      }
    }</content>
</page>

<page>
  <title>Token Usage - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/token-usage</url>
  <content>What’s New in v2
----------------

### See Where Your Tokens Go

*   Track tokens used by FIRE-1 agent
*   See costs for URL-free extractions
*   Monitor tokens for complex data extraction
*   Better tracking for batch extractions

### More Token Details

*   See tokens for complex web interactions
*   Track extra tokens for JavaScript-heavy sites
*   Monitor tokens for improved accuracy
*   See costs for automatic pagination

### Faster and More Accurate

*   Quicker access to token usage data
*   Better cost breakdowns for Extract features
*   More precise tracking of FIRE-1 operations

Same API as v1, better visibility into token usage for v2 Extract features.

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response</content>
</page>

<page>
  <title>Scrape | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/scrape</url>
  <content>Firecrawl converts web pages into markdown, ideal for LLM applications.

*   It manages complexities: proxies, caching, rate limits, js-blocked content
*   Handles dynamic content: dynamic websites, js-rendered sites, PDFs, images
*   Outputs clean markdown, structured data, screenshots or html.

For details, see the [Scrape Endpoint API Reference](https://docs.firecrawl.dev/api-reference/endpoint/scrape).

Scraping a URL with Firecrawl
-----------------------------

### /scrape endpoint

Used to scrape a URL and get its content.

### Installation

### Usage

For more details about the parameters, refer to the [API Reference](https://docs.firecrawl.dev/api-reference/endpoint/scrape).

### Response

SDKs will return the data object directly. cURL will return the payload exactly as shown below.

    {
      "success": true,
      "data" : {
        "markdown": "Launch Week I is here! [See our Day 2 Release 🚀](https://www.firecrawl.dev/blog/launch-week-i-day-2-doubled-rate-limits)[💥 Get 2 months free...",
        "html": "<!DOCTYPE html><html lang=\"en\" class=\"light\" style=\"color-scheme: light;\"><body class=\"__variable_36bd41 __variable_d7dc5d font-inter ...",
        "metadata": {
          "title": "Home - Firecrawl",
          "description": "Firecrawl crawls and converts any website into clean markdown.",
          "language": "en",
          "keywords": "Firecrawl,Markdown,Data,Mendable,Langchain",
          "robots": "follow, index",
          "ogTitle": "Firecrawl",
          "ogDescription": "Turn any website into LLM-ready data.",
          "ogUrl": "https://www.firecrawl.dev/",
          "ogImage": "https://www.firecrawl.dev/og.png?123",
          "ogLocaleAlternate": [],
          "ogSiteName": "Firecrawl",
          "sourceURL": "https://firecrawl.dev",
          "statusCode": 200
        }
      }
    }
    

Scrape Formats
--------------

You can now choose what formats you want your output in. You can specify multiple output formats. Supported formats are:

*   Markdown (`markdown`)
*   Summary (`summary`)
*   HTML (`html`)
*   Raw HTML (`rawHtml`) (with no modifications)
*   Screenshot (`screenshot`, with options like `fullPage`, `quality`, `viewport`)
*   Links (`links`)
*   JSON (`json`) - structured output

Output keys will match the format you choose.

### /scrape (with json) endpoint

Used to extract structured data from scraped pages.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
            "supports_sso": true,
            "is_open_source": true,
            "is_in_yc": true
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

You can now extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

### JSON format options

When using the `json` format, pass an object inside `formats` with the following parameters:

*   `schema`: JSON Schema for the structured output.
*   `prompt`: Optional prompt to help guide extraction when a schema is present or when you prefer light guidance.

Interacting with the page with Actions
--------------------------------------

Firecrawl allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction. Here is an example of how to use actions to navigate to google.com, search for Firecrawl, click on the first result, and take a screenshot. It is important to almost always use the `wait` action before/after executing other actions to give enough time for the page to load.

### Example

### Output

For more details about the actions parameters, refer to the [API Reference](https://docs.firecrawl.dev/api-reference/endpoint/scrape).

Location and Language
---------------------

Specify country and preferred languages to get relevant content based on your target location and language preferences.

### How it works

When you specify the location settings, Firecrawl will use an appropriate proxy if available and emulate the corresponding language and timezone settings. By default, the location is set to ‘US’ if not specified.

### Usage

To use the location and language settings, include the `location` object in your request body with the following properties:

*   `country`: ISO 3166-1 alpha-2 country code (e.g., ‘US’, ‘AU’, ‘DE’, ‘JP’). Defaults to ‘US’.
*   `languages`: An array of preferred languages and locales for the request in order of priority. Defaults to the language of the specified location.

For more details about supported locations, refer to the [Proxies documentation](https://docs.firecrawl.dev/features/proxies).

Caching and maxAge
------------------

To make requests faster, Firecrawl serves results from cache by default when a recent copy is available.

*   **Default freshness window**: `maxAge = 172800000` ms (2 days). If a cached page is newer than this, it’s returned instantly; otherwise, the page is scraped and then cached.
*   **Performance**: This can speed up scrapes by up to 5x when data doesn’t need to be ultra-fresh.
*   **Always fetch fresh**: Set `maxAge` to `0`.
*   **Avoid storing**: Set `storeInCache` to `false` if you don’t want Firecrawl to cache/store results for this request.

Example (force fresh content):

Example (use a 10-minute cache window):

Batch scraping multiple URLs
----------------------------

You can now batch scrape multiple URLs at the same time. It takes the starting URLs and optional parameters as arguments. The params argument allows you to specify additional options for the batch scrape job, such as the output formats.

### How it works

It is very similar to how the `/crawl` endpoint works. It submits a batch scrape job and returns a job ID to check the status of the batch scrape. The sdk provides 2 methods, synchronous and asynchronous. The synchronous method will return the results of the batch scrape job, while the asynchronous method will return a job ID that you can use to check the status of the batch scrape.

### Usage

### Response

If you’re using the sync methods from the SDKs, it will return the results of the batch scrape job. Otherwise, it will return a job ID that you can use to check the status of the batch scrape.

#### Synchronous

    {
      "status": "completed",
      "total": 36,
      "completed": 36,
      "creditsUsed": 36,
      "expiresAt": "2024-00-00T00:00:00.000Z",
      "next": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789?skip=26",
      "data": [
        {
          "markdown": "[Firecrawl Docs home page![light logo](https://mintlify.s3-us-west-1.amazonaws.com/firecrawl/logo/light.svg)!...",
          "html": "<!DOCTYPE html><html lang=\"en\" class=\"js-focus-visible lg:[--scroll-mt:9.5rem]\" data-js-focus-visible=\"\">...",
          "metadata": {
            "title": "Build a 'Chat with website' using Groq Llama 3 | Firecrawl",
            "language": "en",
            "sourceURL": "https://docs.firecrawl.dev/learn/rag-llama3",
            "description": "Learn how to use Firecrawl, Groq Llama 3, and Langchain to build a 'Chat with your website' bot.",
            "ogLocaleAlternate": [],
            "statusCode": 200
          }
        },
        ...
      ]
    }
    

#### Asynchronous

You can then use the job ID to check the status of the batch scrape by calling the `/batch/scrape/{id}` endpoint. This endpoint is meant to be used while the job is still running or right after it has completed **as batch scrape jobs expire after 24 hours**.

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789"
    }
    

Stealth Mode
------------

For websites with advanced anti-bot protection, Firecrawl offers a stealth proxy mode that provides better success rates at scraping challenging sites. Learn more about [Stealth Mode](https://docs.firecrawl.dev/features/stealth-mode).</content>
</page>

<page>
  <title>Proxies | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/proxies</url>
  <content>Firecrawl provides different proxy types to help you scrape websites with varying levels of anti-bot protection. The proxy type can be specified using the `proxy` parameter.

> By default, Firecrawl routes all requests through proxies to help ensure reliability and access, even if you do not specify a proxy type or location.

Location-Based Proxy Selection
------------------------------

Firecrawl automatically selects the best proxy based on your specified or detected location. This helps optimize scraping performance and reliability. However, not all locations are currently supported. The following locations are available:

| Country Code | Country Name | Stealth Mode Support |
| --- | --- | --- |
| AE | United Arab Emirates | No |
| AU | Australia | Yes |
| BR | Brazil | Yes |
| CA | Canada | No |
| CN | China | No |
| CZ | Czechia | No |
| DE | Germany | Yes |
| FR | France | Yes |
| GB | United Kingdom | No |
| IL | Israel | No |
| IN | India | No |
| IT | Italy | No |
| JP | Japan | No |
| PL | Poland | No |
| PT | Portugal | No |
| QA | Qatar | No |
| TR | Turkey | No |
| US | United States | Yes |
| VN | Vietnam | No |

If you need proxies in a location not listed above, please [contact us](mailto:help@firecrawl.com) and let us know your requirements. If you do not specify a proxy or location, Firecrawl will automatically select the best option based on the target site and your request.

How to Specify Proxy Location
-----------------------------

You can request a specific proxy location by setting the `location.country` parameter in your request. For example, to use a Brazilian proxy, set `location.country` to `BR`. For full details, see the [API reference for `location.country`](https://docs.firecrawl.dev/api-reference/endpoint/scrape#body-location).

Proxy Types
-----------

Firecrawl supports three types of proxies:

*   **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.
*   **stealth**: Stealth proxies for scraping sites with advanced anti-bot solutions, or for sites that block regular proxies. Slower, but more reliable on certain sites. [Learn more about Stealth Mode →](https://docs.firecrawl.dev/features/stealth-mode)
*   **auto**: Firecrawl will automatically retry scraping with stealth proxies if the basic proxy fails. If the retry with stealth is successful, 5 credits will be billed for the scrape. If the first attempt with basic is successful, only the regular cost will be billed.

* * *

> **Note:** For detailed information on using stealth proxies, including credit costs and retry strategies, see the [Stealth Mode documentation](https://docs.firecrawl.dev/features/stealth-mode).</content>
</page>

<page>
  <title>Product & E-commerce - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/product-ecommerce</url>
  <content>E-commerce teams use Firecrawl to monitor pricing, track inventory, and migrate product catalogs between platforms.

Start with a Template
---------------------

[

Firecrawl Migrator
------------------

Migrate product catalogs and e-commerce data between platforms



](https://github.com/mendableai/firecrawl-migrator)

How It Works
------------

Transform e-commerce websites into structured product data. Monitor competitor pricing in real-time, track inventory levels across suppliers, and seamlessly migrate product catalogs between platforms.

*   **Product Data**: Title, SKU, specs, descriptions, categories
*   **Pricing**: Current price, discounts, shipping, tax
*   **Inventory**: Stock levels, availability, lead times
*   **Reviews**: Ratings, customer feedback, Q&A sections

Use Cases in Action
-------------------

FAQs
----

*   [Lead Enrichment](https://docs.firecrawl.dev/use-cases/lead-enrichment) - Enrich B2B e-commerce leads
*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Track competitor strategies
*   [Data Migration](https://docs.firecrawl.dev/use-cases/data-migration) - Migrate between platforms</content>
</page>

<page>
  <title>Content Generation - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/content-generation</url>
  <content>Content teams use Firecrawl to generate personalized presentations, emails, marketing materials, and news-driven updates with real-time web data.

Start with a Template
---------------------

[

Open Lovable
------------

Clone and recreate any website as a modern React app



](https://github.com/mendableai/open-lovable)

How It Works
------------

Firecrawl extracts insights from websites in multiple formats — including structured HTML, Markdown, JSON, and screenshots. It can also capture images and surface relevant news stories as part of your request. This means your AI content is both factually grounded and visually enriched with the latest context.

What You Can Create
-------------------

*   **Sales Decks**: Custom presentations with prospect data
*   **Email Campaigns**: Personalized outreach at scale
*   **Marketing Content**: Data-driven blog posts and reports
*   **Social Media**: Trending topic and news-driven content generation
*   **Documentation**: Auto-updated technical content
*   **Newsletters**: Curated updates from industry and competitor news
*   **Visual Content**: Posts and reports enriched with extracted images and screenshots

FAQs
----

*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Build AI-powered content tools
*   [Lead Enrichment](https://docs.firecrawl.dev/use-cases/lead-enrichment) - Personalize with prospect data
*   [SEO Platforms](https://docs.firecrawl.dev/use-cases/seo-platforms) - Optimize generated content</content>
</page>

<page>
  <title>Queue Status - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/queue-status</url>
  <content>Metrics about your team's scrape queue

Metrics about your team’s scrape queue.

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

Number of jobs currently in your queue

Number of jobs currently active

Number of jobs currently waiting

Maximum number of concurrent active jobs based on your plan

Timestamp of the most recent successful job</content>
</page>

<page>
  <title>Developers & MCP - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/developers-mcp</url>
  <content>Developers use Firecrawl’s MCP server to add web scraping to Claude Desktop, Cursor, and other AI coding assistants.

Start with a Template
---------------------

How It Works
------------

Integrate Firecrawl directly into your AI coding workflow. Research documentation, fetch API specs, and access web data without leaving your development environment through Model Context Protocol.

Why Developers Choose Firecrawl MCP
-----------------------------------

### Build Smarter AI Assistants

Give your AI real-time access to documentation, APIs, and web resources. Reduce outdated information and hallucinations by providing your assistant with the latest data.

### Zero Infrastructure Required

No servers to manage, no crawlers to maintain. Just configure once and your AI assistant can access websites instantly through the Model Context Protocol.

Customer Stories
----------------

FAQs
----

*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Build AI-powered dev tools
*   [Deep Research](https://docs.firecrawl.dev/use-cases/deep-research) - Complex technical research
*   [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation) - Generate documentation</content>
</page>

<page>
  <title>Historical Token Usage - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/api-reference/endpoint/token-usage-historical</url>
  <content>Get historical token usage for the authenticated team (Extract only)

    curl --request GET \
      --url https://api.firecrawl.dev/v2/team/token-usage/historical \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "periods": [
        {
          "startDate": "2025-01-01T00:00:00Z",
          "endDate": "2025-01-31T23:59:59Z",
          "apiKey": "<string>",
          "totalTokens": 1000
        }
      ]
    }

GET

/

team

/

token-usage

/

historical

Get historical token usage for the authenticated team (Extract only)

    curl --request GET \
      --url https://api.firecrawl.dev/v2/team/token-usage/historical \
      --header 'Authorization: Bearer <token>'

    {
      "success": true,
      "periods": [
        {
          "startDate": "2025-01-01T00:00:00Z",
          "endDate": "2025-01-31T23:59:59Z",
          "apiKey": "<string>",
          "totalTokens": 1000
        }
      ]
    }

Returns historical token usage on a month-by-month basis. The endpoint can also breaks usage down by API key optionally.

#### Authorizations

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

Get historical token usage by API key

#### Response</content>
</page>

<page>
  <title>Investment & Finance - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/investment-finance</url>
  <content>Hedge funds, VCs, and financial analysts use Firecrawl to monitor portfolio companies and gather market intelligence.

Start with a Template
---------------------

[

Firecrawl Observer
------------------

Monitor portfolio companies for material changes and trigger events



](https://github.com/mendableai/firecrawl-observer)

How It Works
------------

Extract financial signals from across the web. Monitor portfolio companies, track market movements, and support due diligence workflows with real-time web data extraction.

What You Can Track
------------------

*   **Company Metrics**: Growth indicators, team changes, product launches, funding rounds
*   **Market Signals**: Industry trends, competitor moves, sentiment analysis, regulatory changes
*   **Risk Indicators**: Leadership changes, legal issues, regulatory mentions, customer complaints
*   **Financial Data**: Pricing updates, revenue signals, partnership announcements
*   **Alternative Data**: Job postings, web traffic, social signals, news mentions

Customer Stories
----------------

FAQs
----

*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Track market competitors
*   [Deep Research](https://docs.firecrawl.dev/use-cases/deep-research) - Comprehensive market analysis
*   [Lead Enrichment](https://docs.firecrawl.dev/use-cases/lead-enrichment) - B2B investment opportunities</content>
</page>

<page>
  <title>Competitive Intelligence - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/competitive-intelligence</url>
  <content>Business intelligence teams use Firecrawl to monitor competitors and get alerts on strategic changes.

Start with a Template
---------------------

How It Works
------------

Stay ahead of the competition with automated monitoring. Track product launches, pricing changes, marketing campaigns, and strategic moves across competitor websites and online properties.

What You Can Track
------------------

*   **Products**: New launches, features, specs, pricing, documentation
*   **Marketing**: Messaging changes, campaigns, case studies, testimonials
*   **Business**: Job postings, partnerships, funding, press releases
*   **Strategy**: Positioning, target markets, pricing approaches, go-to-market
*   **Technical**: API changes, integrations, technology stack updates

FAQs
----

*   [Product & E-commerce](https://docs.firecrawl.dev/use-cases/product-ecommerce) - Track competitor products
*   [Investment & Finance](https://docs.firecrawl.dev/use-cases/investment-finance) - Market intelligence
*   [SEO Platforms](https://docs.firecrawl.dev/use-cases/seo-platforms) - SERP competitor tracking</content>
</page>

<page>
  <title>Data Migration - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/data-migration</url>
  <content>Migration teams use Firecrawl to transfer content between platforms and streamline customer onboarding from competitors.

Start with a Template
---------------------

[

Firecrawl Migrator
------------------

Efficiently migrate data between platforms and systems



](https://github.com/mendableai/firecrawl-migrator)

How It Works
------------

Use Firecrawl to extract data from existing websites for migration projects. Pull content, structure, and metadata from your current platform, then transform and import it into your new system using your preferred migration tools.

What You Can Migrate
--------------------

*   **Content**: Pages, posts, articles, media files, metadata
*   **Structure**: Hierarchies, categories, tags, taxonomies
*   **Users**: Profiles and user-related data where publicly accessible
*   **Settings**: Configurations, custom fields, workflows
*   **E-commerce**: Products, catalogs, inventory, orders

Common Migration Use Cases
--------------------------

Users build migration tools with Firecrawl to extract data from various platforms:

### CMS Content Extraction

*   Extract content from WordPress, Drupal, Joomla sites
*   Pull data from custom CMS platforms
*   Preserve content structure and metadata
*   Export for import into new systems like Contentful, Strapi, or Sanity

*   Extract product catalogs from Magento, WooCommerce stores
*   Pull inventory and pricing data
*   Capture product descriptions and specifications
*   Format data for import into Shopify, BigCommerce, or other platforms

FAQs
----

*   [Product & E-commerce](https://docs.firecrawl.dev/use-cases/product-ecommerce) - Catalog migrations
*   [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation) - Content transformation
*   [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms) - Knowledge base migration</content>
</page>

<page>
  <title>Observability & Monitoring - Firecrawl Docs</title>
  <url>https://docs.firecrawl.dev/use-cases/observability</url>
  <content>DevOps and SRE teams use Firecrawl to monitor websites, track availability, and detect critical changes across their digital infrastructure.

Start with a Template
---------------------

[

Firecrawl Observer
------------------

Real-time website monitoring and intelligent change detection



](https://github.com/mendableai/firecrawl-observer)

How It Works
------------

Use Firecrawl’s extraction capabilities to build observability systems for your websites. Extract page content, analyze changes over time, validate deployments, and create monitoring workflows that ensure your sites function correctly.

What You Can Monitor
--------------------

*   **Availability**: Uptime, response times, error rates
*   **Content**: Text changes, image updates, layout shifts
*   **Performance**: Page load times, resource sizes, Core Web Vitals
*   **Security**: SSL certificates, security headers, misconfigurations
*   **SEO Health**: Meta tags, structured data, sitemap validity

Monitoring Types
----------------

### Synthetic Monitoring

*   User journey validation
*   Transaction monitoring
*   Multi-step workflows
*   Cross-browser testing

### Content Monitoring

*   Text change detection
*   Visual regression testing
*   Dynamic content validation
*   Internationalization checks

FAQs
----

*   [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence) - Monitor competitor changes
*   [Product & E-commerce](https://docs.firecrawl.dev/use-cases/product-ecommerce) - Track inventory and pricing
*   [Data Migration](https://docs.firecrawl.dev/use-cases/data-migration) - Validate migrations</content>
</page>

<page>
  <title>Batch Scrape | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/batch-scrape</url>
  <content>Batch scraping multiple URLs
----------------------------

You can now batch scrape multiple URLs at the same time. It takes the starting URLs and optional parameters as arguments. The params argument allows you to specify additional options for the batch scrape job, such as the output formats.

### How it works

It is very similar to how the `/crawl` endpoint works. You can either start the batch and wait for completion, or start it and handle completion yourself.

*   `batchScrape` (JS) / `batch_scrape` (Python): starts a batch job and waits for it to complete, returning the results.
*   `startBatchScrape` (JS) / `start_batch_scrape` (Python): starts a batch job and returns the job ID so you can poll or use webhooks.

### Usage

### Response

Calling `batchScrape`/`batch_scrape` returns the full results when the batch completes.

    {
      "status": "completed",
      "total": 36,
      "completed": 36,
      "creditsUsed": 36,
      "expiresAt": "2024-00-00T00:00:00.000Z",
      "next": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789?skip=26",
      "data": [
        {
          "markdown": "[Firecrawl Docs home page![light logo](https://mintlify.s3-us-west-1.amazonaws.com/firecrawl/logo/light.svg)!...",
          "html": "<!DOCTYPE html><html lang=\"en\" class=\"js-focus-visible lg:[--scroll-mt:9.5rem]\" data-js-focus-visible=\"\">...",
          "metadata": {
            "title": "Build a 'Chat with website' using Groq Llama 3 | Firecrawl",
            "language": "en",
            "sourceURL": "https://docs.firecrawl.dev/learn/rag-llama3",
            "description": "Learn how to use Firecrawl, Groq Llama 3, and Langchain to build a 'Chat with your website' bot.",
            "ogLocaleAlternate": [],
            "statusCode": 200
          }
        },
        ...
      ]
    }
    

Calling `startBatchScrape`/`start_batch_scrape` returns a job ID you can track via `getBatchScrapeStatus`/`get_batch_scrape_status`, using the API endpoint `/batch/scrape/{id}`, or webhooks. This endpoint is intended for in-progress checks or immediately after completion, **as batch jobs expire after 24 hours**.

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789"
    }
    

You can also use the batch scrape endpoint to extract structured data from the pages. This is useful if you want to get the same structured data from a list of URLs.

### Response

`batchScrape`/`batch_scrape` returns full results:

    {
      "status": "completed",
      "total": 36,
      "completed": 36,
      "creditsUsed": 36,
      "expiresAt": "2024-00-00T00:00:00.000Z",
      "next": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789?skip=26",
      "data": [
        {
          "json": {
            "title": "Build a 'Chat with website' using Groq Llama 3 | Firecrawl",
            "description": "Learn how to use Firecrawl, Groq Llama 3, and Langchain to build a 'Chat with your website' bot."
          }
        },
        ...
      ]
    }
    

`startBatchScrape`/`start_batch_scrape` returns a job ID:

    {
      "success": true,
      "id": "123-456-789",
      "url": "https://api.firecrawl.dev/v2/batch/scrape/123-456-789"
    }
    

Batch scrape with webhooks
--------------------------

You can configure webhooks to receive real-time notifications as each URL in your batch is scraped. This allows you to process results immediately instead of waiting for the entire batch to complete.

    curl -X POST https://api.firecrawl.dev/v2/batch/scrape \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer YOUR_API_KEY' \
        -d '{
          "urls": [
            "https://example.com/page1",
            "https://example.com/page2",
            "https://example.com/page3"
          ],
          "webhook": {
            "url": "https://your-domain.com/webhook",
            "metadata": {
              "any_key": "any_value"
            },
            "events": ["started", "page", "completed"]
          }
        }' 
    

For comprehensive webhook documentation including event types, payload structure, and implementation examples, see the [Webhooks documentation](https://docs.firecrawl.dev/webhooks/overview).

### Quick Reference

**Event Types:**

*   `batch_scrape.started` - When the batch scrape begins
*   `batch_scrape.page` - For each URL successfully scraped
*   `batch_scrape.completed` - When all URLs are processed
*   `batch_scrape.failed` - If the batch scrape encounters an error

**Basic Payload:**

    {
      "success": true,
      "type": "batch_scrape.page",
      "id": "batch-job-id",
      "data": [...], // Page data for 'page' events
      "metadata": {}, // Your custom metadata
      "error": null
    }</content>
</page>

<page>
  <title>Faster Scraping | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/fast-scraping</url>
  <content>How It Works
------------

Firecrawl caches previously scraped pages and, by default, returns a recent copy when available.

*   **Default freshness**: `maxAge = 172800000` ms (2 days). If the cached copy is newer than this, it’s returned instantly; otherwise, Firecrawl scrapes fresh and updates the cache.
*   **Force fresh**: Set `maxAge: 0` to always scrape.
*   **Skip caching**: Set `storeInCache: false` if you don’t want to store results for a request.

Get your results **up to 500% faster** when you don’t need the absolute freshest data. Control freshness via `maxAge`:

1.  **Return instantly** if we have a recent version of the page
2.  **Scrape fresh** only if our version is older than your specified age
3.  **Save you time** - results come back in milliseconds instead of seconds

When to Use This
----------------

**Great for:**

*   Documentation, articles, product pages
*   Bulk processing jobs
*   Development and testing
*   Building knowledge bases

**Skip for:**

*   Real-time data (stock prices, live scores, breaking news)
*   Frequently updated content
*   Time-sensitive applications

Usage
-----

Add `maxAge` to your scrape request. Values are in milliseconds (e.g., `3600000` = 1 hour).

Common maxAge values
--------------------

Here are some helpful reference values:

*   **5 minutes**: `300000` - For semi-dynamic content
*   **1 hour**: `3600000` - For content that updates hourly
*   **1 day**: `86400000` - For daily-updated content
*   **1 week**: `604800000` - For relatively static content

Performance impact
------------------

With `maxAge` enabled:

*   **500% faster response times** for recent content
*   **Instant results** instead of waiting for fresh scrapes

Important notes
---------------

*   **Default**: `maxAge` is `172800000` (2 days)
*   **Fresh when needed**: If our data is older than `maxAge`, we scrape fresh automatically
*   **No stale data**: You’ll never get data older than your specified `maxAge`

Faster crawling
---------------

The same speed benefits apply when crawling multiple pages. Use `maxAge` within `scrapeOptions` to get cached results for pages we’ve seen recently.

When crawling with `maxAge`, each page in your crawl will benefit from the 500% speed improvement if we have recent cached data for that page. Start using `maxAge` today for dramatically faster scrapes and crawls!</content>
</page>

<page>
  <title>JSON mode | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/llm-extract</url>
  <content>Scrape and extract structured data with Firecrawl
-------------------------------------------------

Firecrawl uses AI to get structured data from web pages in 3 steps:

1.  **Set the Schema (optional):** Define a JSON schema (using OpenAI’s format) to specify the data you want, or just provide a `prompt` if you don’t need a strict schema, along with the webpage URL.
2.  **Make the Request:** Send your URL and schema to our scrape endpoint using JSON mode. See how here: [Scrape Endpoint Documentation](https://docs.firecrawl.dev/api-reference/endpoint/scrape)
3.  **Get Your Data:** Get back clean, structured data matching your schema that you can use right away.

This makes getting web data in the format you need quick and easy.

### JSON mode via /scrape

Used to extract structured data from scraped pages.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
            "supports_sso": true,
            "is_open_source": true,
            "is_in_yc": true
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

### Structured data without schema

You can also extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

Output:

    {
        "success": true,
        "data": {
          "json": {
            "company_mission": "AI-powered web scraping and data extraction",
          },
          "metadata": {
            "title": "Firecrawl",
            "description": "AI-powered web scraping and data extraction",
            "robots": "follow, index",
            "ogTitle": "Firecrawl",
            "ogDescription": "AI-powered web scraping and data extraction",
            "ogUrl": "https://firecrawl.dev/",
            "ogImage": "https://firecrawl.dev/og.png",
            "ogLocaleAlternate": [],
            "ogSiteName": "Firecrawl",
            "sourceURL": "https://firecrawl.dev/"
          },
        }
    }
    

### JSON format options

When using JSON mode, include an object in `formats`, for example: `formats: [{ type: 'json', schema: { ... }, prompt: '...' }]` Parameters:

*   `schema`: JSON Schema describing the structured output you want.
*   `prompt`: Optional prompt to guide extraction (also used for no-schema extraction).</content>
</page>

<page>
  <title>Change tracking | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/change-tracking</url>
  <content>Change tracking allows you to monitor and detect changes in web content over time. This feature is available in both the JavaScript and Python SDKs.

Overview
--------

Change tracking enables you to:

*   Detect if a webpage has changed since the last scrape
*   View the specific changes between scrapes
*   Get structured data about what has changed
*   Control the visibility of changes

Using the `changeTracking` format, you can monitor changes on a website and receive information about:

*   `previousScrapeAt`: The timestamp of the previous scrape that the current page is being compared against (`null` if no previous scrape)
*   `changeStatus`: The result of the comparison between the two page versions
    *   `new`: This page did not exist or was not discovered before (usually has a `null` `previousScrapeAt`)
    *   `same`: This page’s content has not changed since the last scrape
    *   `changed`: This page’s content has changed since the last scrape
    *   `removed`: This page was removed since the last scrape
*   `visibility`: The visibility of the current page/URL
    *   `visible`: This page is visible, meaning that its URL was discovered through an organic route (through links on other visible pages or the sitemap)
    *   `hidden`: This page is not visible, meaning it is still available on the web, but no longer discoverable via the sitemap or crawling the site. We can only identify invisible links if they had been visible, and captured, during a previous crawl or scrape

SDKs
----

### Basic Usage

To use change tracking, include `'changeTracking'` in the formats when scraping a URL:

Example Response:

    {
      "url": "https://firecrawl.dev",
      "markdown": "# AI Agents for great customer experiences\n\nChatbots that delight your users...",
      "changeTracking": {
        "previousScrapeAt": "2025-04-10T12:00:00Z",
        "changeStatus": "changed",
        "visibility": "visible"
      }
    }
    

### Advanced Options

You can configure change tracking by passing an object in the `formats` array:

### Git-Diff Results Example:

     **April, 13 2025**
     
    -**05:55:05 PM**
    +**05:58:57 PM**
    
    ...
    

### JSON Comparison Results Example:

    {
      "time": { 
        "previous": "2025-04-13T17:54:32Z", 
        "current": "2025-04-13T17:55:05Z" 
      }
    }
    

### Data Models

The change tracking feature includes the following data models:

The change tracking feature supports two modes:

### Git-Diff Mode

The `git-diff` mode provides a traditional diff format similar to Git’s output. It shows line-by-line changes with additions and deletions marked. Example output:

    @@ -1,1 +1,1 @@
    -old content
    +new content
    

The structured JSON representation of the diff includes:

*   `files`: Array of changed files (in web context, typically just one)
*   `chunks`: Sections of changes within a file
*   `changes`: Individual line changes with type (add, delete, normal)

### JSON Mode

The `json` mode provides a structured comparison of specific fields extracted from the content. This is useful for tracking changes in specific data points rather than the entire content. Example output:

    {
      "title": {
        "previous": "Old Title",
        "current": "New Title"
      },
      "price": {
        "previous": "$19.99",
        "current": "$24.99"
      }
    }
    

To use JSON mode, you need to provide a schema that defines the fields to extract and compare.

Important Facts
---------------

Here are some important details to know when using the change tracking feature:

*   **Comparison Method**: Scrapes are always compared via their markdown response.
    *   The `markdown` format must also be specified when using the `changeTracking` format. Other formats may also be specified in addition.
    *   The comparison algorithm is resistant to changes in whitespace and content order. iframe source URLs are currently ignored for resistance against captchas and antibots with randomized URLs.
*   **Matching Previous Scrapes**: Previous scrapes to compare against are currently matched on the source URL, the team ID, the `markdown` format, and the `tag` parameter.
    *   For an effective comparison, the input URL should be exactly the same as the previous request for the same content.
    *   Crawling the same URLs with different `includePaths`/`excludePaths` will have inconsistencies when using `changeTracking`.
    *   Scraping the same URLs with different `includeTags`/`excludeTags`/`onlyMainContent` will have inconsistencies when using `changeTracking`.
    *   Compared pages will also be compared against previous scrapes that only have the `markdown` format without the `changeTracking` format.
    *   Comparisons are scoped to your team. If you scrape a URL for the first time with your API key, its `changeStatus` will always be `new`, even if other Firecrawl users have scraped it before.
*   **Beta Status**: While in Beta, it is recommended to monitor the `warning` field of the resulting document, and to handle the `changeTracking` object potentially missing from the response.
    *   This may occur when the database lookup to find the previous scrape to compare against times out.

Examples
--------

### Basic Scrape Example

    // Request
    {
        "url": "https://firecrawl.dev",
        "formats": ["markdown", "changeTracking"]
    }
    
    // Response
    {
      "success": true,
      "data": {
        "markdown": "...",
        "metadata": {...},
        "changeTracking": {
          "previousScrapeAt": "2025-03-30T15:07:17.543071+00:00",
          "changeStatus": "same",
          "visibility": "visible"
        }
      }
    }
    

### Crawl Example

    // Request
    {
        "url": "https://firecrawl.dev",
        "scrapeOptions": {
            "formats": ["markdown", "changeTracking"]
        }
    }
    

### Tracking Product Price Changes

### Monitoring Content Changes with Git-Diff

Billing
-------

The change tracking feature is currently in beta. Using the basic change tracking functionality and `git-diff` mode has no additional cost. However, if you use the `json` mode for structured data comparison, the page scrape will cost 5 credits per page.</content>
</page>

<page>
  <title>Stealth Mode | Firecrawl</title>
  <url>https://docs.firecrawl.dev/features/stealth-mode</url>
  <content>Firecrawl provides different proxy types to help you scrape websites with varying levels of anti-bot protection. The proxy type can be specified using the `proxy` parameter.

### Proxy Types

Firecrawl supports three types of proxies:

*   **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.
*   **stealth**: Stealth proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites.
*   **auto**: Firecrawl will automatically retry scraping with stealth proxies if the basic proxy fails. If the retry with stealth is successful, 5 credits will be billed for the scrape. If the first attempt with basic is successful, only the regular cost will be billed.

If you do not specify a proxy, Firecrawl will default to auto.

### Using Stealth Mode

When scraping websites with advanced anti-bot protection, you can use the stealth proxy mode to improve your success rate.

**Note:** Stealth proxy requests cost 5 credits per request when used.

Using Stealth as a Retry Mechanism
----------------------------------

A common pattern is to first try scraping with the default proxy settings, and then retry with stealth mode if you encounter specific error status codes (401, 403, or 500) in the `metadata.statusCode` field of the response. These status codes can be indicative of the website blocking your request.

This approach allows you to optimize your credit usage by only using stealth mode when necessary.</content>
</page>