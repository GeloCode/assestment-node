import pagination from '../../src/utils/pagination.js';

describe('Pagination Unitary Testing', () => {
  it('pagination passing LIMIT and PAGE retrieves different results', () => {
    const arrayToPaginate = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15' ];
    const limit5Page3 = {
      total: {
        pages: 3
      },
      previous: {
        page: 2,
        limit: 5
      },
      results: ['11', '12', '13', '14', '15']
    };
    const limit5Page2 = {
      ...limit5Page3,
      previous: { page: 1, limit: 5 },
      next: { page: 3, limit: 5 },
      results: ['6', '7', '8', '9', '10']
    };

    expect(pagination(5, 3, arrayToPaginate)).toEqual(limit5Page3);
    expect(pagination(5, 2, arrayToPaginate)).toEqual(limit5Page2);
  });
});
