export type TicketStatus = "Pendiente" | "Ganado" | "Perdido";

export type GameType =
  | "Lotería"
  | "Rifa"
  | "Sorteo"
  | "Boleta"
  | "Juego ocasional";

export interface TicketOwner {
  id: string;
  name: string;
  email: string;
}

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
  owner?: TicketOwner; // ← solo llega desde /admin/tickets
  createdAt: string;
  updatedAt: string;
}