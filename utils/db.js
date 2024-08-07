import mongodb from "mongodb";
import Collection from "mongodb/lib/collection";
import envLoader from "./env_loader";

class DBClient {
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * function.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * function.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection("users").countDocuments();
  }

  /**
   * function.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection("files").countDocuments();
  }

  /**
   * function.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection("users");
  }

  /**
   * function.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection("files");
  }
}

export const dbClient = new DBClient();
export default dbClient;
