if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>t(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/651.243d23442247d286.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/959-5c2c07395636d04a.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/main-f7d433f897294a53.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/404-9284d92db0835609.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/_app-fad0492abe9df384.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/_error-2f883067a14f4c4a.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/blog/%5B...slug%5D-3b0507fe01e1f14d.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/blogs-8b561d7d8d059c17.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/forgotPassword-7b4bf200be926caa.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/index-ecec123f2c46451d.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/join/%5Bid%5D-2d7bab472d747275.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/lfg-c8194895cc65759b.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/login-b09c1b8bb57baa2c.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/register-1bd63634e3912c26.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/session-80fd65510f0827b1.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/session/%5Bid%5D-ff58e3d407d2ae5f.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/pages/updateProfile-a20a5fb5c1d56415.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/chunks/webpack-3f3b04075e42503d.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/css/7f49efae3cc1f041.css",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/css/bdb892659a78297a.css",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/sSemt4LLuGGytHJSZMlGz/_buildManifest.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/sSemt4LLuGGytHJSZMlGz/_middlewareManifest.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/_next/static/sSemt4LLuGGytHJSZMlGz/_ssgManifest.js",revision:"sSemt4LLuGGytHJSZMlGz"},{url:"/android-chrome-192x192.png",revision:"568bcb361407e371e37341869fbe9626"},{url:"/android-chrome-512x512.png",revision:"e1e19180af248394012be0ab9552e0e5"},{url:"/apple-touch-icon.png",revision:"97b9ad44c962680cf3dfea307b51be68"},{url:"/favicon-16x16.png",revision:"01728c20fb8fe0a090d362ee94662a5f"},{url:"/favicon-32x32.png",revision:"6f7ae74ee9ab7de235fff2195a4949a4"},{url:"/favicon.ico",revision:"fb27480abfa46e6c3a928ea8171ebf1a"},{url:"/manifest.json",revision:"ab761fd04783b31593cba1e317b53fff"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
