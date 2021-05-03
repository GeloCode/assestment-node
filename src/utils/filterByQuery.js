const filterByQuery = (query, field, data) => {
  const regExp = new RegExp(query.trim(), 'i');
  return data.filter((item) => item[`${field}`].match(regExp));
};

export default filterByQuery;
