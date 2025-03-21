export function createQueryString(filters: any) {
  const queryString = new URLSearchParams();

  // Loop through the filters object and append each value
  Object.keys(filters).forEach((key) => {
    if (Array.isArray(filters[key])) {
      filters[key].forEach((value) => {
        queryString.append(key, value);
      });
    } else {
      queryString.set(key, filters[key]);
    }
  });

  return queryString.toString();
}
