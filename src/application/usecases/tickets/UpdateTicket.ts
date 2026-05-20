import type { Ticket } from "../../../domain/entities/Ticket";

import type {
  TicketRepository,
  UpdateTicketData,
} from "../../../domain/repositories/TicketRepository";

class UpdateTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(
    id: string,
    data: UpdateTicketData
  ): Promise<Ticket> {
    return this.ticketRepository.updateTicket(id, data);
  }
}
export = UpdateTicket;