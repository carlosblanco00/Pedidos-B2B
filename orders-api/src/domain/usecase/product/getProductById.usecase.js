export const getProductById = (repo) => async (id) => {
    const product = await repo.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  };
  