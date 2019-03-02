const express = require('express');
const {toDDHHMMSS} = require('../utils/format');

/**
 * Kubernetes Helper
 * This helper will be used to make any application able to be deployable
 * in Kubernetes eviroments by making it meet liveness and readiness probes.
 * liveness is used by the kubelet to know when to restart a container,
 * NOTE: this helper assumes that you don't have any other express / HTTP
 *     being served from this application.
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
   * a server-side application is behaving properly.
   * GET to /health
   * @return 200 status code json containing uptime
  **/
  const healthPayload = {uptime: toDDHHMMSS(process.uptime() + '')};
  const healthRouter = createRouter(healthPayload);
  app.use("/health", healthRouter);

  const statusPayload = {status: 'ok'};
  const statusRouter = createRouter(statusPayload);
  app.use("/status", statusRouter);

  /**
   * Ready Endpoint Logic
   * readiness is used by the kubelet to know when a container is ready to
   * start accepting traffic - when a pod is not ready, it is removed
   * from the Service load balancers. For right now, this will just turn
   * the endpoint on after we have started the application.
   * Readiness can be considered to only be ready
   * if both liveness(status) and Health are 200 OK.
   * GET to /ready
   * @return 200 status is ok
  **/
  const readyPayload = {};
  const readyRouter = createRouter(readyPayload);
  app.use("/ready", readyRouter);


}
