export default (html, css) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>MERN Skeleton</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
