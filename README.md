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

## developement Journey

### install sveltekit
https://kit.svelte.dev/  
Startet with the SvelteKit demo app (simple ToDo app)  
Typescript - Yes
ESLint - Yes
Prettier - Yes
Playwright - Yes

## setup git LFC

## setup static adapter
https://github.com/sveltejs/kit/tree/master/packages/adapter-static
npm i -D @sveltejs/adapter-static