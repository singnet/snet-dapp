export const filterParamters = { org_id: "org" };

export const filterAttributes = ["org_id"];

export const defaultFilterData = {
  tags: {
    title: "Tag name",
    name: "tags",
    items: [],
  },
};

export const defaultActiveFilterItem = {
  org_id: [],
};

export const filterTitles = {
  tags: "Tags",
  display_name: "Display Name",
  org_id: "Organization",
};

export const generateFilterObject = filterData => {
  const filterObject = [];
  const filter = { filter: [] };
  filter.filter = Object.entries(filterData).map(([attribute, values]) => {
    const filterCondition = { filter_condition: { attr: attribute, operator: "IN", value: [] } };
    filterCondition.filter_condition.value = values.map(value => value);
    return filterCondition;
  });
  filterObject.push(filter);
  return filterObject;
};

export const sortByCategories = [{ value: "display_name", label: "Display Name" }];

export const defaultPaginationParameters = {
  q: "",
  limit: 12,
  offset: 0,
  total_count: 0,
};

export const defaultFilterParameters = {
  s: "all",
};

export const defaultSortParameters = {
  sort_by: "ranking",
  order_by: "asc",
};

export const defaultListingConfig = {
  ...defaultPaginationParameters,
  ...defaultFilterParameters,
  ...defaultSortParameters,
};
