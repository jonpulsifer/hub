import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import axios from 'axios';
import path from 'path';
import fs from 'fs';

import {App} from '../App';
import {HTTP} from 'cloudevents';

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const blinkyUrl = "http://blinkypi0:3000";
const radioUrl = "http://radiopi0:3000";
const server = express();

server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

server.use(express.static('dist'));
server.post("/cloudevent", (req, res) => {
  const ce = HTTP.toEvent({ headers: req.headers, body: req.body });
  const message = HTTP.binary(ce); // Or HTTP.structured(ce)
  let url: string
  switch (ce.type) {
    case "dev.pulsifer.blinky.request":
      url = blinkyUrl;
      break;
    case "dev.pulsifer.radio.request":
      url = radioUrl;
      break;
    default:
      return res.sendStatus(501)
  }
  axios({
    method: "post",
    url: url,
    data: message.body,
    headers: message.headers,
  }).catch(error => {
    console.log(error.response)
    return res.sendStatus(error.response.status)
  });
  return res.sendStatus(204)
});
server.get('*', (req, res) => {
  const sheet = new ServerStyleSheet();
  const context: any = {};
  const app = ReactDOMServer.renderToString(sheet.collectStyles(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  ));
  const styles = sheet.getStyleTags();

  const indexFile = path.resolve('index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`error opening index file ${indexFile}: `, err);
      return res.sendStatus(500);
    }
    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
    } else {
      res.write(
        data
          .replace('<meta lol />', styles)
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
      res.end();
    }
    return 
  });
});

server.listen(Number(PORT), HOSTNAME, () => {
  console.log(`Server is listening on port ${PORT}`);
});
