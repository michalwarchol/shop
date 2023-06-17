export const formatItems = (items) => items.map((item) => ({
  id: item.id,
  name: item.name,
  src: item.image,
  price: item.price
}));

export const formatParams = (params) => {
  if (!params.search && !params.priceFrom && !params.priceTo && !params.alcoholFrom && !params.alcoholTo && !params.category_id) {
    return ''; 
  }

  let queryString = `filters=`;

  if (params.search) {
    queryString += `name:${params.search},`;
  }

  if (params.priceFrom) {
    queryString += `price_min:${params.priceFrom},`;
  }

  if (params.priceTo) {
    queryString += `price_max:${params.priceTo},`;
  }

  if (params.alcoholFrom) {
    queryString += `alcohol_content_min:${params.alcoholFrom},`;
  }

  if (params.alcoholTo) {
    queryString += `alcohol_content_max:${params.alcoholTo},`;
  }

  if (params.category_id) {
    queryString += `category_id:${params.category_id},`;
  }

  queryString = queryString.slice(0, queryString.length);  

  queryString += '&';

  return queryString;
};
