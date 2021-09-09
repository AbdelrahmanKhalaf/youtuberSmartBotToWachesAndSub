import 'zone.js/dist/zone-node';
import 'localstorage-polyfill';
// tslint:disable-next-line: ordered-imports
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
// tslint:disable-next-line:prefer-const
const domino = require('domino');
import { join } from 'path';
const compression = require('compression');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const mkdirp = require('mkdirp');
const fs = require('fs');
import { AppServerModule } from './src/main.server';
// The Express app is exported so that it can be used by serverless Functions.
const template = fs
  .readFileSync('./dist/youtuberF/browser/index.html')
  .toString();
const win = domino.createWindow(template);
global.window = win;
global.document = win.document;
process.on('uncaughtException', (err) => {});

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/youtuberF/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.get('/api/**', (req, res) => {
    res.status(404).send('data requests are not yet supported');
  });
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // server.get('/sitemap.xml', async (req: Request, res: Response) => {
  //   sitemap(req, res);
  // });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}
async function sitemap(req: Request, res: Response) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  const data = axios.get('https://jsonplaceholder.typicode.com/posts');
  data
    .then((siteData) => {
      const dynamicUrls = siteData.data.map((item) => {
        return `
                  <url>
                  <loc>https://jsonplaceholder.typicode.com/posts/${
                    item.id
                  }</loc>
                  <lastmod>${new Date().toLocaleString()}</lastmod>
                  <priority>0.80</priority>
                </url>`;
      });

      const items = sitemapDynamicData(dynamicUrls);
      generateFile(items, 'sitemap.xml');
    })
    .catch((err) => console.log(err));

  // to create sitemap data dynamically
  const sitemapDynamicData = (dynamicUrls) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>https://jsonplaceholder.typicode.com</loc>
        <lastmod>2020-06-20T19:44:57+00:00</lastmod>
        <priority>1.00</priority>
      </url>

      ${dynamicUrls}
      </urlset>
          `;
  };
  // to generate and save file
  // tslint:disable-next-line:no-shadowed-variable
  function generateFile(data: any, fileName: any) {
    mkdirp(__dirname).then((_) => {
      fs.writeFile(`${__dirname}/${fileName}`, data, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log(`${fileName} was saved!`);
      });
    });
  }
}
function run() {
  const port = process.env.PORT || 80;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
