const gcp_key = require('../gcp-key.json');
module.exports = {
    upload: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
            bucketName: 'media-sto',
            publicFiles: false,
            uniform: false,
            serviceAccount: gcp_key, // replace `{}` with your serviceAccount JSON object
            basePath: '',
        },
      },
    },
}