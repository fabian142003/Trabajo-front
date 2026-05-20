import type {
  PaginatedTickets,
  TicketFilters,
  TicketRepository,
} from "../../../domain/repositories/TicketRepository";

class GetAdminTickets {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(
    filters?: TicketFilters
  ): Promise<PaginatedTickets> {
    return this.ticketRepository.getAdminTickets(filters);
  }
}
export = GetAdminTickets;