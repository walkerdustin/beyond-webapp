# Beyond Web App
Web app for our beyond Service

www.service-beyond.de  
[![Netlify Status](https://api.netlify.com/api/v1/badges/45ba1b8d-677f-4139-a2bf-1cabdbd4eaaf/deploy-status)](https://app.netlify.com/sites/service-beyond/deploys)

# Installation
I use git lfs for large binary files like images and other media  
install https://git-lfs.github.com/  

git clone   link_to_repository  

install dependencies and run server
```bash
cd app  
npm install  
npm run dev -- --open
```
create your theme files with smui-theme > `npx smui-theme template src/theme`
Whenever you add a new SMUI package, run > `npm run prepare` again to rebuild your CSS file with the new component’s styles included.

## VS Code extensions
These extensions are neccessary
- German - Code Spell Checker
- HTML CSS Support
- Svelte for VS Code
- Svelte 3 Snippets
- Tailwind CSS IntelliSense
- Markdown Preview Mermaid Support
- Mermaid Markdown Syntax Highlighting
- deno

# Usage

## How to do Icons
choose icon from here https://materialdesignicons.com/  
and import it in the script as follows   
`import { mdiMenu } from '@mdi/js';`  
`import { Svg } from '@smui/common/elements';`  
`import { Icon } from '@smui/common';`
and then:
```html
<Icon component={Svg} viewBox="0 0 24 24" width="20px" height="20px">
    <path fill="currentColor" d={mdiMenu} />
</Icon>
```

## supabase edge functions
For this to work some stuff needs to be installed and set up:
- docker  
 https://www.docker.com/products/docker-desktop/
- deno (language server) 
 https://deno.land/#installation
- setup deno extension in vs code  
 run the Deno: Initialize Workspace Configuration command.
- 

### usage
```sh
supabase functions -h
```
  delete      Delete a Function from Supabase  
  deploy      Deploy a Function to Supabase  
  new         Create a new Function locally  
  serve       Serve a Function locally  
```sh
supabase start
```

to start the local supabase docker server
## material UI colors
need to be set in src/variables.scss and src/theme/_smui-theme.scss



# Architecture

![architecture](docs/images/architecture.PNG)

## netlify
hosts static files (js, html, css, images, media)

## sveltekit
Startet with the SvelteKit demo app (simple ToDo app)  
Typescript - Yes
ESLint - Yes
Prettier - Yes
Playwright - Yes

# What data does my database need to store?

- progress [0%, 100%] für die cards in nachlassplan
- link von user zu seinen dokumenten

# developement Journey

## install sveltekit
---
https://kit.svelte.dev/  
Startet with the SvelteKit demo app (simple ToDo app)  
Typescript - Yes
ESLint - Yes
Prettier - Yes
Playwright - Yes

## setup static adapter
---
https://github.com/sveltejs/kit/tree/master/packages/adapter-static  
npm i -D @sveltejs/adapter-static  

## deploy with netlify
---
very easy 
just specify the base dir as "app/"  
thats it....
build time for the sceleton app with routes and an image.  __Build time:__ 16s

## setup git LFS
---
https://git-lfs.github.com/  

I found out, that it actually works with netlify even though, i couldnt find any posts online, that suggest so
I did NOT use netlify Large Media

### error when deploying
deploying only works when I manually use "clear cache and retry deploy"  
there is a fix available  
https://answers.netlify.com/t/builds-fail-after-new-commit-to-git-lfs/1362  
set environment variable: https://docs.netlify.com/configure-builds/environment-variables/#netlify-configuration-variables  

The following variables should be set in the Netlify UI rather than in netlify.toml. This is because the Netlify configuration file is read after your repository has been cloned.

__GIT_LFS_ENABLED:__ value that is undefined by default. If set, we’ll use git lfs clone to check out your repository — otherwise we use git clone.



## try out reusable components and routing
---
https://www.youtube.com/watch?v=5IajHJULs5I&list=PL4cUxeGkcC9hpM9ARM59Ve3jqcb54dqiP&index=5  

## check out UI Framworks
https://www.youtube.com/watch?v=RkD88ARvucM  


## link our custom domain
---
we want app.service-beyond to be the domain  
use a cname https://fixed.net/blog/cname-a-record-difference?gclid=Cj0KCQjwxb2XBhDBARIsAOjDZ35IOSvvas90sGRQxwRdl2JdNpHchOk4aZDuKQuKyPsQM07DaCESfr0aAq98EALw_wcB   
setting up cname on Google cloud DNS was very easy.  
it took affect instantlly
setting up ssl certificate took just 1 click on netlify. 
it worked after (less then) 2 min


## Evaluate UI Library
| Library      | link                                                                                      | note                                                                                        | gitHub Stars |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------ |
| Svelte UI    | [link](https://svelte-headlessui.goss.io/docs)                                            | very barebones                                                                              |              |
| Attractions  | [link](https://www.svelteui.org/)                                                         | very barebones                                                                              |              |
| Smelt        | [link](https://smeltejs.com/)                                                             | Smelte is a UI framework built on top of Svelte and Tailwind CSS using Material Design spec | 1.3k         |
| SMUI         | [link](https://sveltematerialui.com/)                                                     |                                                                                             | 2.6k         |
| Svelterial   | [link](https://svelterialjs.github.io/svelterial/?path=/story/introduction--introduction) |                                                                                             |              |
| Svelma       | link                                                                                      |                                                                                             | 152          |
| Svelte Strap | link                                                                                      |                                                                                             |              |
| Svelte Atoms | link                                                                                      |                                                                                             |              |
| Agnostic UI  | link                                                                                      |                                                                                             |              |
| Framework 7  | link                                                                                      |                                                                                             |              |

---
## Trello Aufgaben überlegen
https://svelte.dev/tutorial/basics
---
## migrate Sveltekit
https://github.com/sveltejs/kit/discussions/5774

one fix was needed  
https://github.com/sveltejs/svelte-preprocess

---
## setup SMUI
https://sveltematerialui.com/SVELTEKIT.md

one Issue due to the new sveltekit version  needed to be fixed.  
https://github.com/hperrin/svelte-material-ui/issues/507

### Learn SCSS and SASS
https://www.youtube.com/watch?v=Zz6eOVaaelI  
https://www.youtube.com/watch?v=TymGwiNMlh0&t=389s  

### figure out and setup icons
https://youtu.be/OyjZ7dezADw?t=859  
https://materialdesignicons.com/  
`npm i -D @mdi/js`

### scss thing was not working
`@use 'smui-theme';` had to be put in some scss thing.  
There was one thing missing in the `npm run prepare` script  
`"site-light": "sass --no-source-map -I src/theme -I node_modules -I ../smui-theme/node_modules -I ../../node_modules src/site.scss static/site.css"`  

## setup tailwind 

with https://github.com/svelte-add/tailwindcss

## reset css styles

user agent stylesheet is anoying me  
i copyed the reset style thing from https://github.com/filipelinhares/ress 
into my scss
and added some resets for the \<a> element

## stupid links are draggable and mess with dem being abel to be clicked.
that is stupid  
fixed it with this css in my reset.scss  
from https://github.com/hammerjs/hammer.js/issues/641#issuecomment-397554017  

## make the footer stick to bottom
https://www.youtube.com/watch?v=yc2olxLgKLk&t=143s


## try out the official tailwind installation, to fix bug
https://tailwindcss.com/docs/guides/sveltekit  
but it didnt change anything

## check out supabase ui
https://ui.supabase.io/components/auth  
https://github.com/supabase-community/supabase-ui-svelte  

But this is not really customizable and kinda wierd and kinda ugly
so, ... no thank you.

## do auth based on the supabase-js documentation
make sure you use the v2 version

https://supabase.com/docs/reference/javascript/

## connect supabase with my email server (mail.zoho.eu)

It just worked! first try! I am in disbelief!

https://www.zoho.com/zeptomail/help/smtp-api.html#alink1
SMTP Hostname is smtp.zoho.eu  
Port number   is 465  
SMTP username is email  
SMTP password is password  


I also decreased delay and increased the rate limit, because   
Zoho probably has solid servers I guess...  

Also all of this is somehow free?


## stupid problem with supabase auth.
I can not signOut() There are still cookies left in the browser.
sb-refresh-token  2ZvVVGcpuMJjc-mOAUxXqA  
sb-access-token   jwt Token  

User is thus still not really signed out.  
signOut Docs
Inside a browser context, signOut() will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a "SIGNED_OUT" event.

I cant manually delete the cookie, because it is from the supabase domain.  


## setup protected route with svelte await blocks

https://svelte.dev/tutorial/await-blocks

## implement static optimized tailwind for production
https://tailwindcss.com/docs/optimizing-for-production  

with this we dont need the @tailwind utilities and @tailwind components thing 
but for local develpopement we still want to use it, because else we have to recompile the tailwind
everytime we add a new class.

## make the password field have the correct type and have hidden characters
i used a checkbox and some svelte interactivity


## figure out how to make the storage for the questions
To create the Testamentgenerator I need a set of questions and answer options.
These Questions may be layed out in a DAG (directed asyclic graph).
For example, there are more questions to answer, if you are married.

### Requirements for storage
- content needs to be accessible in the code in this repo.
so either an api interface, or the data is saved in this repository.
- content should be modifyable by my collegues
- changes in shema need to be versioned

## How do I generate a document from the data
RPC comes from user pressing a button  
    user gets shown a loading bar
    maybe we use some fake processing time, to make the service of creating the document seem more valuable.
create a supabase edge function  
create a pdf from html with deno  
upload the pdf to supabase storage  
rpc request from client resolves 
depending on the processing processing time, the client inserts some extra waiting time

## What do I need to create the pdf
I need the answers from the Testamentgenerator  
I need extra data, like the name of the user 
I need a pdf layout   
    (maybe with header and footer)
    numbered pages  
    simple typography  
    beyond logo  

### ways to create a pdf in a deno function 
- pdf-lib

    https://gist.github.com/Hopding/8304b9f07c52904587f7b45fae4bcb8c 
    https://medium.com/swlh/how-to-create-and-modify-pdf-files-in-deno-ffaad7099b0

- oder jsPDF https://github.com/parallax/jsPDF


### supabase edge functions
use the best practices described here
https://supabase.com/docs/guides/functions/best-practices  

ther is also a snippet to handle CORS, so that you can call your functions from any URL
like localhost or netlify previews

#### write to storage (from cloud function)


