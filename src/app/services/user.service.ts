import axios, { AxiosError } from 'axios';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';

  async getAllUsers() {
    try {
      const response = await axios.get(this.baseUrl, {
        params: { per_page: 100 },
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Erro ao obter todos os usuários');
    }
  }

  async getUserById(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error, `Erro ao obter usuário com ID ${id}`);
    }
  }

  async createUser(userData: User) {
    try {
      const response = await axios.post(this.baseUrl, userData);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Erro ao criar usuário');
    }
  }

  async updateUser(id: number, userData: Partial<User>) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error, `Erro ao atualizar usuário com ID ${id}`);
    }
  }

  async deleteUser(id: number) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      this.handleError(error, `Erro ao excluir usuário com ID ${id}`);
    }
  }

  private handleError(error: unknown, context: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(`${context}:`, axiosError.message);
      if (axiosError.response) {
        const status = axiosError.response.status;
        const data = axiosError.response.data;
        console.error(`Status: ${status}, Response:`, data);
      } else {
        console.error('Erro sem resposta da API:', axiosError.message);
      }
    } else {
      console.error(`${context}:`, error);
    }
    throw error; 
  }
}
