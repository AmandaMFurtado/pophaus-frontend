import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.12.51.198:3000',
});

//Listar ingressos
export const listTickets = async (startDate) => {
  try {
    const response = await api.get('/listagem-ingressos', { params: { startDate } });
    console.log('Dados recebidos da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar listagem de ingressos:', error);
    throw error;
  }
};

//Contar ingressos por status
export const countTicketsByStatus = async () => {
  try {
    const response = await api.get('/contagem-ingressos-status');
    return response.data;
  } catch (error) {
    console.error('Erro ao contar ingressos por status:', error);
    throw error;
  }
};

//Contar ingressos por unidade 
export const countTicketsByBranch = async () => {
  try {
    const response = await api.get('/contagem-ingressos-unidade');
    return response.data;
  } catch (error) {
    console.error('Erro ao contar ingressos por unidade:', error);
    throw error;
  }
};

//Somar total de vendas por unidade
export const sumTotalSalesByBranch = async () => {
  try {
    const response = await api.get('/soma-total-vendas-unidade');
    return response.data;
  } catch (error) {
    console.error('Erro ao somar total de vendas por unidade:', error);
    throw error;
  }
};

//Contar ingressos por usuario
export const countTicketsByUser = async () => {
  try {
    const response = await api.get('/contagem-ingressos-usuario');
    return response.data;
  } catch (error) {
    console.error('Erro ao contar ingressos por usuário:', error);
    throw error;
  }
};

//Listar horarios por data 
export const listTimetablesByDate = async (data) => {
  try {
    const response = await api.get('/listagem-horarios', {
      params: { data },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar listagem de templates:', error);
    throw error;
  }
};

// listagem de datas em que o usuario esteve no parque
export const listDatesByEmail = async (email) => {
  try {
    const response = await api.get('/datas', { params: { email } });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar listagem de ingressos:', error);
    throw error;
  }
};

export default api;
