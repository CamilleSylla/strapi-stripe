'use strict';

const productBySlug = require("./api/product/gql-extension/product-by-slug");
const createOrderBySlug = require("./api/order/gql-extension/create-order-by-slug")
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(productBySlug)
    extensionService.use(createOrderBySlug)
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
