import { api } from '../config/api';
import { Membership } from '../types';

export const membershipService = {
  async getAllMemberships(): Promise<Membership[]> {
    const { data } = await api.get('/memberships');
    return data;
  },

  async getMembershipById(id: string): Promise<Membership> {
    const { data } = await api.get(`/memberships/${id}`);
    return data;
  },

  async getMembershipsByMemberId(memberId: string): Promise<Membership[]> {
    const { data } = await api.get(`/memberships/member/${memberId}`);
    return data;
  },

  async createMembership(membershipData: Omit<Membership, 'id'>): Promise<Membership> {
    const { data } = await api.post('/memberships', membershipData);
    return data;
  },

  async updateMembership(id: string, membershipData: Partial<Membership>): Promise<Membership> {
    const { data } = await api.put(`/memberships/${id}`, membershipData);
    return data;
  },
};