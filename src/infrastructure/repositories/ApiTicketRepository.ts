import api from "../api/axios";

import type { Ticket } from "../../domain/entities/Ticket";

import type {
  CreateTicketData,
  PaginatedTickets,
  TicketFilters,
  TicketRepository,
  UpdateTicketData,
} from "../../domain/repositories/TicketRepository";

export class ApiTicketRepository implements TicketRepository {
  async getTickets(
    filters?: TicketFilters
  ): Promise<PaginatedTickets> {
    const response = await api.get("/tickets", {
      params: filters,
    });

    return response.data;
  }

  async getTicketById(id: string): Promise<Ticket> {
    const response = await api.get(`/tickets/${id}`);

    return response.data.data;
  }

  async createTicket(
    data: CreateTicketData
  ): Promise<Ticket> {
    const response = await api.post("/tickets", data);

    return response.data.data;
  }

  async updateTicket(
    id: string,
    data: UpdateTicketData
  ): Promise<Ticket> {
    const response = await api.put(`/tickets/${id}`, data);

    return response.data.data;
  }

  async deleteTicket(id: string): Promise<void> {
    await api.delete(`/tickets/${id}`);
  }

  async getAdminTickets(
    filters?: TicketFilters
  ): Promise<PaginatedTickets> {
    const response = await api.get("/admin/tickets", {
      params: filters,
    });

    return response.data;
  }
}