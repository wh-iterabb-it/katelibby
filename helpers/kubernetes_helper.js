const express = require('express');
const {toDDHHMMSS} = require('../utils/format');

/**
 * Kubernetes Helper
 * This helper will be used to make any application able to be deployable
 * in Kubernetes eviroments by making it meet liveness and readiness probes.
 * liveness is used by the kubelet to know when to restart a container,
 * readiness is used by the kubelet to know when a container is ready to
 * start accepting traffic - when a pod is not ready, it is removed
 * from the Service load balancers.
**/

function createRouter(payload) {
  const router = express.Router();
  router.get('/', function (req, res, next) {
    res.json(payload);
  });
  return router;
}

module.exports = function(app) {
  /**
   * Health Endpoint Logic
   * Health checks provide a simple mechanism to determine whether
   * a server-side application is behaving properly. They're typically
   * consumed over HTTP and use standard return codes to indicate UP or
   * DOWN status. The return value of a health check is variable
   * GET to /health
   * @return 200 status code json containing uptime
  **/
  const readyPayload = {uptime: toDDHHMMSS(process.uptime() + '')};
  const readyRouter = createRouter(ready_payload);

  app.use("/ready", readyRouter);
}
