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
class doctor {
  constructor() {
    /**
     * Application state requirements:
     * Starting .. (no connections made, default value until updated)
     * Ready (connections and everything is started)
    **/
    this.ready = false;
    this.status = 'Starting...'
  }

  /**
   * Health Endpoint Logic
   * Health checks provide a simple mechanism to determine whether
   * a server-side application is behaving properly.
   * GET to /health
   * @return 200 status code json containing uptime
  **/
  async healthEndpoint(req, res) {
    const health = await this.health();
    health.then((payload) => {
      res.status(200).json(payload);
    });
  }

  health() {
    return new Promise((resolve, reject) => {
      resolve({
        uptime: toDDHHMMSS(process.uptime() + ''),
        version: pkjson.version
      });
    });
  }

  /**
   * Status Endpoint Logic
   * GET to /status
   * @return s
  **/
  async statusEndpoint(req, res) {
    const status = await this.status();
    status.then((payload) => {
      res.status(200).json(payload);
    }).catch((payload) => {
      res.status(500).json(payload);
    });
  }
  updateStatus() {

  }

  status() {
    // somehow i need to allow a passthrough of a callback
    // to have something to check the status of...

    return new Promise((resolve, reject) => {
      reject({status: this.status});
    });
  }

  /**
   * Ready Endpoint Logic
   * readiness is used by the kubelet to know when a container is ready to
   * start accepting traffic - when a pod is not ready, it is removed
   * from the Service load balancers. For right now, this will just turn
   * the endpoint on after we have started the application.
   * Readiness can be considered to only be ready
   * if both liveness(status) and Health are 200 OK.
   * GET to /ready
   * @return s
  **/
  async readyEndpoint(req, res) {
    const ready = await this.ready();
    ready.then((payload) => {
      res.status(200).json(payload);
    }).catch((payload) => {
      res.status(500).json(payload);
    });
  }

  ready() {
    // ready is easy, it only resolves if both health and status resolve.
    return new Promise((resolve, reject) => {
      const health = this.health();
      health.then(() => {
        const status = this.status;
        status.then(() => {
          resolve({ready: this.ready});
        }).catch(() => {
          reject({ready: this.ready});
        });
      }).catch(() => {
        reject({ready: this.ready});
      });
    });
  }
}

module.exports.default = doctor;
