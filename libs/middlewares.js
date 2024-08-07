import express from "express";

/**
 * helper.
 * @param {express.Express} api api.
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: "200mb" }));
};

export default injectMiddlewares;
