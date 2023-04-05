console.log("create a new pdf");

// create html from markdown
const markdown = "# Testament\n## Kapitel 1\n Das ist mein Testament";
// const tokenized = tokens(markdown);
// const renderedHtml = html(tokenized);

// call my aws lambda function to create a pdf from markdown
let myHeaders = new Headers();
myHeaders.append("Authorization", "asdfasdfasdf");
myHeaders.append("Accept", "*/*");
myHeaders.append("Content-Type", "text/plain");

let raw = markdown;

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};
let pdf_as_arrayBuffer: ArrayBuffer;
try {
let response = await fetch("https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/", requestOptions)
pdf_as_arrayBuffer = await response.arrayBuffer()
} catch (error) {
  console.log('error', error);
}

// write the pdf to local file system
Deno.writeFile("test2.pdf", new Uint8Array(result));

