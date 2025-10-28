export const updateProduct = (repo) => async (id, data) => {
    return repo.update(id, data);
  };
  