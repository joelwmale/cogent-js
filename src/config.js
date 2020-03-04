export const config = customMethods => ({
  where: "filter",
  related: "filter",
  select: "fields",
  include: "include",
  append: "append",
  page: "page",
  limit: "limit",
  sort: "sort",
  withoutConstrains: "without_constrains",
  ...customMethods
});
