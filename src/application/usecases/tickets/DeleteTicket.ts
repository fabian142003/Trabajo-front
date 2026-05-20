import type {
  TicketRepository,
} from "../../../domain/repositories/TicketRepository";

class DeleteTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string): Promise<void> {
    return this.ticketRepository.deleteTicket(id);
  }
}
export = DeleteTicket;