import { api } from '../config/api';
import { Package } from '../types';

export const packageService = {
  async getAllPackages(): Promise<Package[]> {
    try {
      const { data } = await api.get<Package[]>('/packages');
      return data.map(pkg => ({
        ...pkg,
        id: pkg.id.toString(), // Ensure ID is string for frontend
        price: Number(pkg.price) // Ensure price is number
      }));
    } catch (error) {
      console.error('Error fetching packages:', error);
      return [];
    }
  },

  async getPackageById(id: string): Promise<Package | null> {
    try {
      const { data } = await api.get<Package>(`/packages/${id}`);
      return {
        ...data,
        id: data.id.toString(),
        price: Number(data.price)
      };
    } catch (error) {
      console.error('Error fetching package:', error);
      return null;
    }
  },

  async createPackage(packageData: Omit<Package, 'id'>): Promise<Package | null> {
    try {
      const { data } = await api.post<Package>('/packages', packageData);
      return {
        ...data,
        id: data.id.toString(),
        price: Number(data.price)
      };
    } catch (error) {
      console.error('Error creating package:', error);
      return null;
    }
  },

  async updatePackage(id: string, packageData: Partial<Package>): Promise<Package | null> {
    try {
      const { data } = await api.put<Package>(`/packages/${id}`, packageData);
      return {
        ...data,
        id: data.id.toString(),
        price: Number(data.price)
      };
    } catch (error) {
      console.error('Error updating package:', error);
      return null;
    }
  },

  async deletePackage(id: string): Promise<boolean> {
    try {
      await api.delete(`/packages/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting package:', error);
      return false;
    }
  }
};