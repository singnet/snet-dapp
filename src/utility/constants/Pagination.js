export const filterParamters = { orgId: "org" };

export const filterAttributes = ["orgId", "tagName"];

export const defaultFilterData = {
  tags: {
    title: "Tag name",
    name: "tags",
    items: [],
  },
};

export const defaultActiveFilterItem = {
  onlyAvailable: true,
};

export const filterTitles = {
  tags: "Tags",
  displayName: "Display Name",
  orgId: "Organization",
};

export const sortByCategories = [
  { value: "ranking", label: "All" },
  { value: "rating", label: "Rating" },
  { value: "numberOfRatings", label: "Number of ratings" },
];

export const defaultPaginationParameters = {
  q: "",
  limit: 36,
  page: 1,
};

export const defaultSortParameters = {
  sort: "ranking",
  order: "desc",
};

export const defaultListingConfig = {
  ...defaultPaginationParameters,
  // ...defaultFilterParameters,
  ...defaultSortParameters,
};
