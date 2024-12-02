import { api } from '../config/api';
import { Trainer } from '../types';

export const trainerService = {
  async getAllTrainers(): Promise<Trainer[]> {
    const { data } = await api.get('/trainers');
    return data;
  },

  async getTrainerById(id: string): Promise<Trainer> {
    const { data } = await api.get(`/trainers/${id}`);
    return data;
  },

  async createTrainer(trainerData: Omit<Trainer, 'id'>): Promise<Trainer> {
    const { data } = await api.post('/trainers', trainerData);
    return data;
  },

  async updateTrainer(id: string, trainerData: Partial<Trainer>): Promise<Trainer> {
    const { data } = await api.put(`/trainers/${id}`, trainerData);
    return data;
  },

  async deleteTrainer(id: string): Promise<void> {
    await api.delete(`/trainers/${id}`);
  },
};