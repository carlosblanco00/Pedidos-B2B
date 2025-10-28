export class SearchCustomersUseCase {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute({ search, cursor, limit }) {
      const results = await this.customerRepository.search({
        search,
        cursor: Number(cursor) || 0,
        limit: Number(limit) || 10,
      });
  
      const nextCursor = results.length ? results[results.length - 1].id : null;
  
      return {
        data: results,
        nextCursor,
        hasMore: results.length === Number(limit),
      };
    }
  }
  