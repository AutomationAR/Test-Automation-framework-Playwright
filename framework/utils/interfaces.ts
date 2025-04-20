export interface Member {
  memid: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Facility {
  facid: number;
  name: string;
  member_cost: number;
}

export interface Booking {
  bookid: number;
  facid: number;
  memid: number;
  starttime: Date;
  slots: number;
}