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

export const defaultPaginationFilterSortSearch = {
  q: "",
  limit: 10,
  offset: 0,
  sort_by: "display_name",
  order_by: "desc",
  total_count: 0,
  s: "all",
};
