import { useEffect, useState, useMemo } from "react";
import type { Ticket } from "../../domain/entities/Ticket";
import { ApiTicketRepository } from "../../infrastructure/repositories/ApiTicketRepository";

export function useAdminTickets() {
  const repository = useMemo(() => new ApiTicketRepository(), []);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await repository.getAdminTickets();
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, loading, fetchTickets };
}