import type {
  GameType,
  TicketStatus,
} from "../../domain/entities/Ticket";

export interface TicketDto {
  title: string;
  gameType: GameType;
  gameDate: string;
  status: TicketStatus;

  gameNumber?: string;
  amount?: number;
  place?: string;
  notes?: string;
}

export interface TicketFiltersDto {
  status?: TicketStatus;
  gameType?: GameType;
  q?: string;
  page?: number;
  pageSize?: number;
}