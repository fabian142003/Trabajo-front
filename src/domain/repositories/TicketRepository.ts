import type {
  GameType,
  Ticket,
  TicketStatus,
} from "../entities/Ticket";

export interface TicketFilters {
  status?: TicketStatus;
  gameType?: GameType;
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateTicketData {
  title: string;
  gameType: GameType;
  gameDate: string;
  status: TicketStatus;

  gameNumber?: string;
  amount?: number;
  place?: string;
  notes?: string;
}

export interface UpdateTicketData {
  title?: string;
  gameType?: GameType;
  gameDate?: string;
  status?: TicketStatus;

  gameNumber?: string;
  amount?: number;
  place?: string;
  notes?: string;
}

export interface PaginatedTickets {
  data: Ticket[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface TicketRepository {
  getTickets(filters?: TicketFilters): Promise<PaginatedTickets>;

  getTicketById(id: string): Promise<Ticket>;

  createTicket(data: CreateTicketData): Promise<Ticket>;

  updateTicket(
    id: string,
    data: UpdateTicketData
  ): Promise<Ticket>;

  deleteTicket(id: string): Promise<void>;

  getAdminTickets(
    filters?: TicketFilters
  ): Promise<PaginatedTickets>;
}