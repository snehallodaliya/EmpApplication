export let initMock = Promise.resolve();

// Enable API mocking only in development
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./browser");
  initMock = worker.start({
    serviceWorker: {
      /**
       * Use a custom Service Worker script URL to resolve
       * the mock worker served by Codesandbox.
       * @note You MAY NOT need this in your application.
       * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
       */
      url: "/mockServiceWorker.js"
    }
  });
}
