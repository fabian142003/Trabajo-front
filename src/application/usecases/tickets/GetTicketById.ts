import type { Ticket } from "../../../domain/entities/Ticket";

import type {
  TicketRepository,
} from "../../../domain/repositories/TicketRepository";

class GetTicketById {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string): Promise<Ticket> {
    return this.ticketRepository.getTicketById(id);
  }
}
export = GetTicketById;    