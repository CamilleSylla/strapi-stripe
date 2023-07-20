const { stripe } = require("../../../../stripe/stripe");

module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    try {
      const gallery = data.Gallery.map(item => item.url);
      const stripePrice = Number(data.Price) * 100;
      const product = await stripe.products.create({
        name: data.Name,
        description: data.Exerpt,
        images: gallery,
      })
      strapi.log.info(`Product created ${product.name}(id:${product.id})`);
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: stripePrice,
        currency: "eur",
      })
      strapi.log.info(`Price created id:${price.id} and added to product id:${product.id}`);
      event.params.data = { ...data, stripe_id: product.id, price_id: price.id, Media: gallery };
    } catch(error) {
      strapi.log.error(error);
    }
  },
};