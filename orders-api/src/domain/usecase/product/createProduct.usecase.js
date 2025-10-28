export const createProduct = (repo) => async (data) => {
    if (!data.sku || !data.name) throw new Error("Missing required fields");
    return repo.create(data);
  };