import { User, Credit, Transaction } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Green Energy Co.',
    email: 'producer@greenhydrogen.com',
    role: 'Producer',
    certifiedStatus: true
  },
  {
    id: '2',
    name: 'EcoTech Industries',
    email: 'buyer@ecotech.com',
    role: 'Buyer'
  },
  {
    id: '3',
    name: 'Carbon Trust',
    email: 'certifier@carbontrust.org',
    role: 'Certifier'
  },
  {
    id: '4',
    name: 'Environmental Agency',
    email: 'regulator@envagency.gov',
    role: 'Regulator'
  }
];

export const mockCredits: Credit[] = [
  {
    id: 'CR001',
    producerId: '1',
    producerName: 'Green Energy Co.',
    units: 1000,
    status: 'Certified',
    requestDate: '2024-01-15',
    certificationDate: '2024-01-20',
    price: 50,
    description: 'Green hydrogen produced via electrolysis using solar power'
  },
  {
    id: 'CR002',
    producerId: '1',
    producerName: 'Green Energy Co.',
    units: 750,
    status: 'For Sale',
    requestDate: '2024-01-22',
    certificationDate: '2024-01-25',
    price: 48,
    description: 'Green hydrogen from wind-powered electrolysis facility'
  },
  {
    id: 'CR003',
    producerId: '1',
    producerName: 'Green Energy Co.',
    units: 500,
    status: 'Pending',
    requestDate: '2024-02-01',
    description: 'Hydrogen production from new solar array installation'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TX001',
    creditId: 'CR001',
    fromId: '1',
    fromName: 'Green Energy Co.',
    toId: '2',
    toName: 'EcoTech Industries',
    amount: 500,
    price: 25000,
    timestamp: '2024-02-05T10:30:00Z',
    status: 'Completed',
    blockHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
  },
  {
    id: 'TX002',
    creditId: 'CR002',
    fromId: '1',
    fromName: 'Green Energy Co.',
    toId: '2',
    toName: 'EcoTech Industries',
    amount: 250,
    price: 12000,
    timestamp: '2024-02-08T14:15:00Z',
    status: 'Verified',
    blockHash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567'
  }
];