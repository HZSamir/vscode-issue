import * as RxDB from "rxdb";
import timestamps from "rxdb-utils/timestamps";
import { heroSchema } from "./Schema";
import AppConfig from "../Config/AppConfig";

RxDB.plugin(require("pouchdb-adapter-asyncstorage").default);
RxDB.plugin(require("pouchdb-adapter-http"));
RxDB.plugin(timestamps);

const collections = [
  {
    name: "heroes",
    schema: heroSchema,
    sync: true
  }
];

let dbPromise = null;

const _create = async () => {
  console.log("DatabaseService: creating database..");
  const db = await RxDB.create({
    name: "olscrm",
    adapter: "asyncstorage",
    multiInstance: false,
    queryChangeDetection: true
  });
  console.log("DatabaseService: created database");
  // create collections
  console.log("DatabaseService: create collections");
  await Promise.all(collections.map(colData => db.collection(colData)));

  // Hooks
  /**
   * Build search field
   */

  // sync
  console.log("DatabaseService: sync");
  collections
    .filter(col => col.sync)
    .map(col => col.name)
    .map(colName =>
      db[colName].sync({
        remote: AppConfig.couchdbUrl + colName + "/"
      })
    );

  return db;
};

export const get = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};
