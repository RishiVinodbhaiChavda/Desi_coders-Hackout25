import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search, Filter, ExternalLink } from 'lucide-react';
import { mockTransactions } from '../data/mockData';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const PublicLedgerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.toName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">H2Credits</h1>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Blockchain Ledger</h1>
          <p className="text-gray-600">Transparent record of all green hydrogen credit transactions</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Transactions
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search by ID, participant..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <p>Showing {filteredTransactions.length} of {mockTransactions.length} transactions</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card title="All Transactions">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">From</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Block Hash</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{transaction.id}</td>
                    <td className="py-3 px-4 text-blue-600 font-medium">{transaction.creditId}</td>
                    <td className="py-3 px-4 text-gray-600">{transaction.fromName}</td>
                    <td className="py-3 px-4 text-gray-600">{transaction.toName}</td>
                    <td className="py-3 px-4 text-gray-600">{transaction.amount} kg</td>
                    <td className="py-3 px-4 text-gray-600">${transaction.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                        transaction.status === 'Flagged' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {transaction.blockHash.substring(0, 10)}...
                        </code>
                        <button className="text-blue-600 hover:text-blue-800">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Blockchain Info */}
        <Card title="Blockchain Information" className="mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Network Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium text-green-600">Green Hydrogen Chain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Height:</span>
                  <span className="font-medium">1,247,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Block:</span>
                  <span className="font-medium">2 minutes ago</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Transaction Fees</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Standard Transfer:</span>
                  <span className="font-medium">0.001 H2C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification:</span>
                  <span className="font-medium">0.005 H2C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Smart Contract:</span>
                  <span className="font-medium">0.002 H2C</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PublicLedgerPage;