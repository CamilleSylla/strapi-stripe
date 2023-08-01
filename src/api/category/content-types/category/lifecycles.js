const fetch = require('node-fetch');

module.exports = {

  async afterCreate() {
    try {
      await buildTree()
    } catch (error) {
      throw error
    }
  },
  async afterUpdate(){
    try {
      await buildTree()
    } catch (error) {
      throw error
    }
  },
  async afterDelete() {
    try {
      await buildTree()
    } catch (error) {
      throw error
    }
  },
};

const buildTree = async () => {
  strapi.log.info("trigger api to build tree");
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/categories-tree/webhook/build`, {
      method: "POST",
      headers: {
        "Authorization": `Simple ${process.env.API_SK}`
      }
    })

    if (!res.ok){
      if (res.status === 403){
        throw new Error('Forbiden')
      }
      throw new Error(res)
    } else {
      return 
    }
  } catch (error) {
    strapi.log.error(error);
    throw error;
  }
}
