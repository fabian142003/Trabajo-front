import { useEffect, useState, useMemo } from "react";
import type { Ticket } from "../../domain/entities/Ticket";
import type { CreateTicketData, UpdateTicketData } from "../../domain/repositories/TicketRepository";
import { ApiTicketRepository } from "../../infrastructure/repositories/ApiTicketRepository";

export function useTickets() {
  const repository = useMemo(() => new ApiTicketRepository(), []);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await repository.getTickets();
      setTickets(response.data);
    } catch {
      setError("Error al cargar los tickets.");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (data: CreateTicketData) => {
    try {
      const newTicket = await repository.createTicket(data);
      setTickets((prev) => [newTicket, ...prev]); // lo agrega al inicio
    } catch {
      setError("Error al crear el ticket.");
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      await repository.deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Error al eliminar el ticket.");
    }
  };

  const updateTicket = async (id: string, data: UpdateTicketData) => {
    try {
      const updated = await repository.updateTicket(id, data);
      setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("Error al actualizar el ticket.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    deleteTicket,
    updateTicket,
  };
}