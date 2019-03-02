const express = require('express');
const { toDDHHMMSS } = require('../utils/format');

/**
 * Kubernetes
 * This helper will be used to make any application able to be deployable
 * in Kubernetes eviroments by making it meet liveness and readiness probes.
 * liveness is used by the kubelet to know when to restart a container,
 * NOTE: this helper assumes that you don't have any other express / HTTP
 *     being served from this application.
* */
class doctor {
  constructor() {
    /**
     * Application state requirements:
     * Starting .. (no connections made, default value until updated)
     * Ready (connections and everything is started)
     * I want to just have the application's status be ok if Starting
     * If the application is down, 503, if the application has errored 500
    * */
    this.ready = false;
    this.status = 'Starting...';
  }

  /**
   * Health Endpoint Logic
   * Health checks provide a simple mechanism to determine whether
   * a server-side application is behaving properly.
   * GET to /health
   * @return 200 status code json containing uptime
  * */
  async healthEndpoint(req, res) {
    const health = await this.healthCheck();
    health.then((payload) => {
      res.status(200).json(payload);
    });
  }

  healthCheck() {
    return new Promise((resolve, reject) => {
      resolve({
        uptime: toDDHHMMSS(`${process.uptime()}`),
        version: pkjson.version,
      });
    });
  }

  /**
   * Status Endpoint Logic
   * GET to /status
   * @return s
  * */
  async statusEndpoint(req, res) {
    const status = await this.statusCheck();
    status.then((payload) => {
      res.status(200).json(payload);
    }).catch((payload) => {
      res.status(500).json(payload);
    });
  }

  updateStatus() {
    // this should be a small interface to allow the status to resolve
    // sets ready to true
    this.ready = true;
    this.status = 'Ready';
  }

  statusCheck() {
    return new Promise((resolve, reject) => {
      if (this.ready) {
        resolve({ status: this.status });
      } else {
        reject({ status: this.status });
      }
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
  * */
  async readyEndpoint(req, res) {
    const ready = await this.readyCheck();
    ready.then((payload) => {
      res.status(200).json(payload);
    }).catch((payload) => {
      res.status(500).json(payload);
    });
  }

  readyCheck() {
    // ready is easy, it only resolves if both health and status resolve.
    return new Promise((resolve, reject) => {
      const health = this.healthCheck();
      health.then(() => {
        const status = this.statusCheck();
        status.then(() => {
          resolve({ ready: this.ready });
        }).catch(() => {
          reject({ ready: this.ready });
        });
      }).catch(() => {
        reject({ ready: this.ready });
      });
    });
  }
}

module.exports.default = doctor;
