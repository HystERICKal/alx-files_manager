import { promisify } from "util";
import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on("error", (err) => {
      console.error(
        "Redis client failed to connect:",
        err.message || err.toString()
      );
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      this.isClientConnected = true;
    });
  }

  /**
   * function
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * function.
   * @param {String} key key.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * function.
   * @param {String} key key.
   * @param {String | Number | Boolean} value value.
   * @param {Number} duration duration.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * function.
   * @param {String} key key.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
