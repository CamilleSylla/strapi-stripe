const { NotFoundError } = require('@strapi/utils').errors;
module.exports = ({ nexus }) => {
    const productBySlug = nexus.extendType({
        type: 'Query',
        definition(t) {
            // definition
            t.field('productBySlug', {
                // Response type
                type: nexus.nonNull('Product'),

                // Args definition
                args: {
                    slug: 'String',
                },
                // Resolver definition
                async resolve(parent, args) {
                    const { slug, publicationState = 'live' } = args;
                    const contentType = strapi.getModel("api::product.product");
                    const params = {
                        publicationState,
                        pagination: {
                            limit: 1
                        }
                    };
                    const sulgFilter = { Slug: { eq: slug } };
                    // use slug and RBAC filter if exists
                    const { results } = await strapi.service('api::product.product').find({
                        ...params,
                        filters: strapi.plugins.graphql.services.utils.mappers.graphQLFiltersToStrapiQuery(
                                sulgFilter,
                            contentType
                        ),
                    });
                    if (results && results.length === 1) {
                        return results[0]
                    }
                    throw new NotFoundError(`News "${slug}" not found`)
                }
            });
        }
    });
    return { types: [productBySlug] };
}