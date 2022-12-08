// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
// import { PDFDocument } from "https://cdn.skypack.dev/pdf-lib@^1.11.1?dts";
import { html, tokens } from "https://deno.land/x/rusty_markdown/mod.ts";
// import pdfMake from "https://esm.sh/pdfmake"

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.2";

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Methods": "POST",
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
console.log("create-pdf edge function initialized.");

// create a ReadableStream from a Uint8Array
function toReadableStream(value:Uint8Array) { 
	return new ReadableStream({
		start(controller) {
			controller.enqueue(value);
			controller.close();
		},
	});
}

serve(async (req) => {
  console.log("function called");
  // read a text file from storage and print its contents
  // This is needed if you're planning to invoke your function from a browser.

  if (req.method === 'OPTIONS') {
    console.log("return corsHeaders (Preflight)");
    return new Response('ok', { headers: corsHeaders });
  }
  console.log("awaiting req.json()");
  
  const { name } = await req.json();

  console.log("create a new pdf");

  // create html from markdown
  const markdown = "# Testament\n## Kapitel 1\n Das ist mein Testament";
  const tokenized = tokens(markdown);
  const renderedHtml = html(tokenized);

  
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")!},
        },
      },
    );
    console.log("supabaseClient", supabaseClient);
    const { data: { user } } = await supabaseClient.auth.getUser()
    const uid =  user?.id
    if (uid) {
        supabaseClient.storage.from("documents").upload(`${uid}/Testament.html`, renderedHtml);
    } else {
      supabaseClient.storage.from("documents").upload(`_forTestingAndDebugging/Testament.html`, renderedHtml);
    }

    return new Response(JSON.stringify({ message: 'success', testament: renderedHtml }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  // // Done! 💥
  console.log("PDF file written to create.pdf");

});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
