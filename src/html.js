import React from 'react'

export const Html = ({ content, paths, state }) =>
  <html lang="en">
    <body>
      <div id="root">
        ${content}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }}
      />
      <script src={`/static/${paths.vendor.path}`} integrity={`${paths.vendor.sri}`} />
      <script src={`/static/${paths.production.path}`} integrity={`${paths.production.sri}`} />
    </body>
  </html>
