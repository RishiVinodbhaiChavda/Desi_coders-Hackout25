export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Producer' | 'Buyer' | 'Certifier' | 'Regulator';
  certifiedStatus?: boolean;
}

export interface Credit {
  id: string;
  producerId: string;
  producerName: string;
  units: number;
  status: 'Pending' | 'Certified' | 'For Sale' | 'Sold' | 'Retired';
  requestDate: string;
  certificationDate?: string;
  price?: number;
  description: string;
}

export interface Transaction {
  id: string;
  creditId: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
  price: number;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Flagged' | 'Verified';
  blockHash: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
}