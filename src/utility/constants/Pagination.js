export const filterParamters = { display_name: "dn", org_id: "org", tags: "tg", all: "all" };

export const defaultFilterData = {
  display_name: {
    title: "Display name",
    name: "display_name",
    items: [],
  },
  org_id: {
    title: "Organization id",
    name: "org_id",
    items: [],
  },
  tags: {
    title: "Tag name",
    name: "tags",
    items: [],
  },
};

export const defaultActiveFilterItem = {
  display_name: "",
  org_id: "",
  tags: "",
};

export const sortByCategories = [{ value: "display_name", label: "Display Name" }];

export const defaultPaginationParameters = {
  q: "",
  limit: 10,
  offset: 0,
  total_count: 0,
};

export const defaultFilterParameters = {
  s: "all",
};

export const defaultSortParameters = {
  sort_by: "display_name",
  order_by: "desc",
};

export const defaultPaginationFilterSortSearch = {
  ...defaultPaginationParameters,
  ...defaultFilterParameters,
  ...defaultSortParameters,
};
