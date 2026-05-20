export type TicketStatus = "Pendiente" | "Ganado" | "Perdido";

export type GameType =
  | "Lotería"
  | "Rifa"
  | "Sorteo"
  | "Boleta"
  | "Juego ocasional";

export interface Ticket {
  id: string;
  title: string;
  gameType: GameType;
  gameNumber?: string;
  gameDate: string;
  amount?: number;
  place?: string;
  status: TicketStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}