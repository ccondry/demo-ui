# dCloud Demo UI
This is the website UI code for the dCloud demo configuration page inside the
PCCE and UCCX scheduled demos. This service lives on the "branding" VM insde
each demo session.

## Installation
```sh
git clone https://gitlab.com/dcloud-collab/dcloud-demo-ui.git
cd dcloud-demo-ui
npm install
```

## Build/Run in Development
```sh
npm run dev
```

## Build/Run in Production
Copy files to your www/html folder (or wherever you have your web server pointing to).
```sh
npm run build
cp dcloud-demo-ui/dist/* /var/www/html/
```
