import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://fd1bda06e5a14a929f8b1c2be22be50f@o421901.ingest.sentry.io/5342393",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
