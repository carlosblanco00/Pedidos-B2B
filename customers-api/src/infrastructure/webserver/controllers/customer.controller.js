import { CreateCustomerUseCase } from "../../../domain/usecase/customer.usecase.js";
import { GetCustomerByIdUseCase } from "../../../domain/usecase/getCustomerById.usecase.js";
import { SearchCustomersUseCase } from "../../../domain/usecase/searchCustomers.usecase.js";
import { UpdateCustomerUseCase } from "../../../domain/usecase/updateCustomers.usecase.js";
import { CustomerRepository } from "../../database/customer.repository.js";

const customerRepository = new CustomerRepository();
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
const searchCustomersUseCase = new SearchCustomersUseCase(customerRepository);

export const createCustomerController = async (req, res) => {
  try {
    const customer = await createCustomerUseCase.execute(req.body);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getCustomerByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerByIdUseCase.execute(id);
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error getting customer by id:', error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const searchCustomersController = async (req, res) => {
  try {
    const { search = '', cursor = 0, limit = 10 } = req.query;
    const result = await searchCustomersUseCase.execute({ search, cursor, limit });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

export const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'name, email y phone son requeridos' });
    }

    const updated = await updateCustomerUseCase.execute(id, { name, email, phone });
    if (!updated) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ success: true, ...updated });
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    console.error('[updateCustomerController]', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};