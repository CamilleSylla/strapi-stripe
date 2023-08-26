const { NotFoundError } = require('@strapi/utils').errors;
module.exports = ({ nexus }) => {
    const createOrderBySlug = nexus.extendType({
        type: 'Mutation',
        definition(t) {
            // definition
            t.field('createOrderBySlug', {
                // Response type
                type: nexus.nonNull('Order'),

                // Args definition
                args: {
                    slugs: nexus.list('String')
                },
                // Resolver definition
                async resolve(parent, args) {
                    const { slugs, publicationState = 'live' } = args;
                    const orderContentType = strapi.getModel("api::order.order");
                    const productContentType = strapi.getModel("api::product.product");
                    const params = {
                        publicationState,
                        pagination: {
                            limit: 1
                        }
                    };
                    const slugsFilter = slugs.map((slug, i) => {
                        return { Slug: slug };
                    });
                    const products = await strapi.db.query('api::product.product').findMany({
                        where: {
                            $or: slugsFilter    
                        }
                    });
                    console.log(products);
                    const order = await strapi.entityService.create('api::order.order', {
                        data: {
                            products: products,
                            ShippingAmount: 5,
                            SubTotal: 105,
                            Total: 105,
                            Date: new Date()
                        }
                    })
                    if (order) {
                        return order
                    }
                    throw new NotFoundError(`News "${slugs}" not found`)
                }
            });
        }
    });
    return { types: [createOrderBySlug] };
}