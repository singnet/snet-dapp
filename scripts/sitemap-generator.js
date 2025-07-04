require("dotenv").config();
const axios = require("axios");
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const defaultPagination = {
  q: "",
  limit: 50,
  page: 1,
  totalCount: 0,
  s: "all",
  sort: "ranking",
  order: "asc",
  filters: [],
};

var services = [];

async function fetchServices(pagination = defaultPagination, step = 50) {
  const url = `${process.env.REACT_APP_CONTRACT_ENDPOINT}/service`;
  try {
    const {
      data: { data },
    } = await axios.post(url, pagination);
    const { result } = data;
    console.log("page", data.page);
    console.log("limit", data.limit);
    console.log("services length", services.length);
    console.log("total count", data.totalCount);
    console.log("-----****-----");
    services = services.concat(result);
    if (services.length < data.totalCount) {
      const enhancedPagination = Object.assign({}, pagination, {
        page: pagination.page + step,
      });
      if (enhancedPagination.page > data.totalCount) {
        throw new Error("Trying to fetch more than total count");
      }
      await fetchServices(enhancedPagination);
    } else {
      return services;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("fetch service error", error);
  }
}

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
  console.log("fetching service");
  await fetchServices();
  console.log("fetched all services");
  const idMap = services.map((service) => ({
    orgId: service.orgId,
    serviceId: service.serviceId,
  }));

  const activeUserTabsMap = ["account", "settings", "transactions"].map((tab) => ({ "activeTab?": tab }));

  const paramsConfig = {
    "/servicedetails/org/:orgId/service/:serviceId": idMap,
    "/userprofile/:activeTab?": activeUserTabsMap,
  };

  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build(process.env.REACT_APP_BASE_URL)
    .save("./public/sitemap.xml");
}

// if (Number(process.env.REACT_APP_ETH_NETWORK) === 1) {
generateSitemap();
// }
