require("babel-register")({
  presets: ["es2015", "react"],
});

const axios = require("axios");

const defaultPagination = {
  q: "",
  limit: 50,
  offset: 0,
  total_count: 0,
  s: "all",
  sort_by: "ranking",
  order_by: "asc",
  filters: [],
};

var services = [];

async function fetchServices(pagination = defaultPagination, step = 50) {
  try {
    const {
      data: { data },
    } = await axios.post("https://ropsten-marketplace.singularitynet.io/contract-api/service", pagination);
    const { result } = data;
    services = services.concat(result);
    if (services.length < data.total_count) {
      const enhancedPagination = Object.assign({}, pagination, {
        offset: pagination.offset + step,
      });
      await fetchServices(enhancedPagination);
    } else {
      return services;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
  }
}

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
  await fetchServices();
  const idMap = services.map(service => ({
    orgId: service.org_id,
    serviceId: service.service_id,
  }));

  const activeUserTabsMap = ["account", "settings", "transactions"].map(tab => ({ "activeTab?": tab }));

  const paramsConfig = {
    "/servicedetails/org/:orgId/service/:serviceId": idMap,
    "/userprofile/:activeTab?": activeUserTabsMap,
  };

  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build("https://www.beta.singularitynet.io")
    .save("./public/sitemap.xml");
}

generateSitemap();
