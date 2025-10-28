import { GetCustomerByIdUseCase } from '../../../domain/usecase/getCustomerById.usecase.js';
import { CustomerRepository } from "../../database/customer.repository.js";

const repository = new CustomerRepository();
const getCustomerByIdUseCase = new GetCustomerByIdUseCase(repository);

export const getInternalCustomerByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerByIdUseCase.execute(id);

    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(customer);
  } catch (error) {
    console.error('[getInternalCustomerByIdController]', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
