const pagination = (limit, page, data) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.total = {
    pages: Math.ceil(data.length / limit)
  };

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit
    };
  }

  results.results = data.slice(startIndex, endIndex);
  return results;
};

export default pagination;
