export const searchProducts = (repo) => async (params) => {
    return repo.search(params);
  };