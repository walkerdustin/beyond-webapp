# Beyond Web App
Web app for our beyond Service

www.service-beyond.de

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