const { stripe } = require("../../../../stripe/stripe");

module.exports = {

  async afterCreate() {
   await buildTree()
  },
  async afterUpdate(){
    await buildTree()
  },
  async afterDelete() {
    await buildTree()
  },
};

const buildTree = async () => {
  strapi.log.info("trigger api to build tree");
  try {
    return await fetch(`${process.env.API_BASE_URL}/categories-tree/webhook/build`, {
      method: "POST",
    })
  } catch (error) {
    strapi.log.error(error);
    throw error;
  }
}
