export const getDefaultFilters = (params) => ({
  search: params.search || '',
  priceFrom: params.priceFrom || '',
  priceTo: params.priceTo || '',
  alcoholFrom: params.alcoholFrom || '',
  alcoholTo: params.alcoholTo || '',
  category_id: params.category_id || '',
});
