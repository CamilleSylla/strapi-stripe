// @ts-ignore
const {Stripe} = require('stripe');

module.exports = {
    stripe : new Stripe(process.env.STRIPE_SK, {apiVersion: '2022-11-15'})
}