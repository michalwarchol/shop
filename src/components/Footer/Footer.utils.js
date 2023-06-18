export const formatCategories = (categories) => {
  const length = categories.length;
  const resultArray = [];
  for (let i = 0; i <= length; i += 3) {
    resultArray.push(categories.slice(i, i + 3));
  }

  return resultArray;
}
