export const mockServiceDetails = {
  status: "success",
  data: {
    orgId: "haasorg",
    serviceId: "haas10",
    organizationName: "haasorg",
    orgImageUrl:
      "https://dev-fet-marketplace-service-assets.s3.amazonaws.com/assets/haasorg/QmeFaLmWNbWTr2zqTCDusQjBADiKakdtsxGkqGQDRtGurf_hero_image",
    supportContacts: {
      email: "www@gmail.com",
      phone: "",
    },
    displayName: "haas10",
    description: "haas10",
    shortDescription: "haas10",
    url: "www.github.com",
    rating: 0.0,
    numberOfRatings: 0,
    contributors: ["me"],
    media: [
      {
        url: "https://dev-fet-marketplace-service-assets.s3.us-east-1.amazonaws.com/b2ffd669b48c4f27aea4f012a764d708/services/0c5538dc88414a9c94c6d3e7967c2dde/assets/20251212092413_asset.png",
        assetType: "hero_image",
      },
      {
        url: "https://dev-fet-service-components.s3.us-east-1.amazonaws.com/assets/haasorg/haas10/stubs/python.zip",
        assetType: "grpc-stub/dadadadad",
      },
    ],
    tags: ["me"],
    isAvailable: true,
    groups: [
      {
        groupId: "cNca0Qrk+c28TPVEiWm22mkBkoOL5cpVQ1+qB1Axr+4=",
        groupName: "default_group",
        freeCallSignerAddress: "0x0B9c6aA843AbD6b056d12A26a280564C9A2F5c2c",
        freeCalls: 3,
        pricing: [
          {
            default: true,
            price_model: "fixed_price",
            price_in_cogs: 1000000000000000,
          },
        ],
        endpoints: [
          {
            endpoint: "https://haasorg-haas10-sepolia.haas.singularitynet.dev",
            isAvailable: true,
          },
        ],
        payment: {
          payment_address: "0xe5D1fA424DE4689F9d2687353b75D7a8987900fD",
          payment_channel_storage_type: "etcd",
          payment_expiration_threshold: 40320,
          payment_channel_storage_client: {
            endpoints: ["https://www.com"],
            request_timeout: "5s",
            connection_timeout: "5s",
          },
        },
      },
    ],
    demoComponentRequired: true,
  },
};
