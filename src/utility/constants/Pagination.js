export const filterParamters = { display_name: "dn", org_id: "org", tags: "tg", all: "all" };

export const filterAttributes = ["display_name", "organization", "tags"];

export const defaultFilterData = {
  tags: {
    title: "Tag name",
    name: "tags",
    items: [],
  },
};

export const defaultActiveFilterItem = {
  display_name: [],
  organization: [],
  tags: [],
};

export const generateFilterObject = filterData => {
  const filterObject = [];
  const filter = { filter: [] };
  Object.entries(filterData).map(([attribute, values]) => {
    const filterCondition = { filter_condition: { attr: attribute, operator: "IN", value: [] } };
    values.map(value => {
      filterCondition.filter_condition.value.push(value);
    });
    filter.filter.push(filterCondition);
  });
  filterObject.push(filter);
  return filterObject;
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

export const defaultListingConfig = {
  ...defaultPaginationParameters,
  ...defaultFilterParameters,
  ...defaultSortParameters,
};
