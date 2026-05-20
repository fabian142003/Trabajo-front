import type {
  PaginatedTickets,
  TicketRepository,
  TicketFilters,
} from "../../../domain/repositories/TicketRepository";

class GetTickets {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(
    filters?: TicketFilters
  ): Promise<PaginatedTickets> {
    return this.ticketRepository.getTickets(filters);
  }
}
export = GetTickets;    