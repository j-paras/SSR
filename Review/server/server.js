import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import App from "../src/App";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "../src/store/store";
import { fetchData } from "../src/store/store";


const app = express();
app.get("/*", async (req, res) => {
  const store = createStore();
  store.dispatch(fetchData()).then(() => {
    let reduxState = store.getState();
    const jsx = (
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    );
    const reactDom = renderToString(jsx);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(reactDom, reduxState));
  });
});

function htmlTemplate(reactDom, reduxState) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${reactDom}</div>
          <script>
            window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
        </script>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}
app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});