const { stripe } = require("../../../../stripe/stripe");

module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    try {
      const stripePrice = Math.trunc(Number(data.Price) * 100);
      const product = await stripe.products.create({
        name: data.Name,
        description: data.Exerpt,
        images: data.Gallery.map((item) => item.url),
      });
      strapi.log.info(`Product created ${product.name}(id:${product.id})`);
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: stripePrice,
        currency: "eur",
      });
      strapi.log.info(
        `Price created id:${price.id} and added to product id:${product.id}`
      );
      event.params.data = {
        ...data,
        Price: stripePrice / 100,
        stripe_id: product.id,
        price_id: price.id,
      };
    } catch (error) {
      strapi.log.error(error);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    const { Exerpt, Name, Price: price, price_id, stripe_id } = data;
    const convertedPrice = Math.trunc(Number(price) * 100);
    try {
      await stripe.prices.update(price_id, {
        active: false,
      });
      strapi.log.info(`Price set inactive id:${price_id}`);
      const newStripePrice = await stripe.prices.create({
        product: stripe_id,
        unit_amount: convertedPrice,
        currency: "eur",
      });
      strapi.log.info(
        `Price updated id:${newStripePrice.id} and added to product id:${stripe_id}`
      );
      await stripe.products.update(stripe_id, {
        description: Exerpt,
        name: Name,
      });
      strapi.log.info(`Updated stripe product id:${stripe_id}`);
      event.params.data = {
        ...data,
        Price: convertedPrice / 100,
        price_id: newStripePrice.id,
      };
    } catch (error) {
      strapi.log.error(error);
    }
  },
};
