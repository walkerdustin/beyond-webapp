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
create your theme files with smiu-theme > `npx smui-theme template src/theme`
Whenever you add a new SMUI package, run > `npm run prepare` again to rebuild your CSS file with the new component’s styles included.

## VS Code extensions
These extensions are neccessary
- German - Code Spell Checker
- HTML CSS Support
- Svelte for VS Code
- Svelte 3 Snippets
- Tailwind CSS IntelliSense

# Usage

## How to do Icons
choose icon from here https://materialdesignicons.com/  
and import it in the script as follows `import { mdiMenu } from '@mdi/js';`  
and then:
```html
<Icon component={Svg} viewBox="0 0 24 24">
    <path fill="currentColor" d={mdiMenu} />
</Icon>
```

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