import type { Ticket } from "../../../domain/entities/Ticket";

import type {
  CreateTicketData,
  TicketRepository,
} from "../../../domain/repositories/TicketRepository";

class CreateTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(data: CreateTicketData): Promise<Ticket> {
    return this.ticketRepository.createTicket(data);
  }
}
export = CreateTicket;