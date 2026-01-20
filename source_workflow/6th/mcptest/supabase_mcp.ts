import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve(async (req)=>{
  if (req.method === "POST") {
    try {
      const { url } = await req.json();
      if (!url) {
        return new Response(JSON.stringify({
          error: "URL is required"
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      const htmlResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive'
        }
      });
      if (!htmlResponse.ok) {
        throw new Error(`Failed to fetch URL: ${htmlResponse.status} ${htmlResponse.statusText}`);
      }
      const html = await htmlResponse.text();
      const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
      if (!openaiApiKey) {
        throw new Error("OPENAI_API_KEY environment variable is not set");
      }
      const completionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that extracts structured information from recipe webpages. Respond only with valid JSON."
            },
            {
              role: "user",
              content: `Extract the following information from this recipe HTML in JSON format with keys: title (string), description (string), ingredients (array of strings), method (array of strings).

Always return a valid JSON object even if some fields are missing.

HTML: ${html.substring(0, 8000)}`
            }
          ],
          response_format: {
            type: "json_object"
          },
          temperature: 0
        })
      });
      if (!completionResponse.ok) {
        throw new Error(`OpenAI API error: ${completionResponse.statusText}`);
      }
      const completion = await completionResponse.json();
      const recipe = JSON.parse(completion.choices[0]?.message?.content || "{\"title\":\"\",\"description\":\"\",\"ingredients\":[],\"method\":[]}");
      return new Response(JSON.stringify(recipe), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } else {
    return new Response("Only POST method is allowed", {
      status: 405
    });
  }
});
