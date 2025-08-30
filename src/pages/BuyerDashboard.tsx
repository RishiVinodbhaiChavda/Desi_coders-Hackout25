import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';
import { mockCredits, mockTransactions } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);

  const availableCredits = mockCredits.filter(credit => credit.status === 'For Sale');
  const myTransactions = mockTransactions.filter(tx => tx.toId === user?.id);
  const myCredits = myTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = myTransactions.reduce((sum, tx) => sum + tx.price, 0);

  const handlePurchase = (creditId: string) => {
    alert(`Purchase initiated for credit ${creditId}. Transaction will be processed on the blockchain.`);
    setSelectedCredit(null);
  };

  const handleResell = (creditId: string) => {
    alert(`Credits from ${creditId} listed for resale on the marketplace.`);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
          <p className="text-gray-600">Purchase and manage your green hydrogen credits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Credits Owned</p>
                <p className="text-3xl font-bold">{myCredits}</p>
              </div>
              <Package className="w-12 h-12 text-blue-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Spent</p>
                <p className="text-3xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100">Transactions</p>
                <p className="text-3xl font-bold">{myTransactions.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-teal-200" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Buy Credits */}
          <Card title="Available Credits for Purchase">
            <div className="space-y-4">
              {availableCredits.map((credit) => (
                <div key={credit.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{credit.id}</h4>
                      <p className="text-sm text-gray-600">{credit.producerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">${credit.price}/unit</p>
                      <p className="text-sm text-gray-500">{credit.units} units available</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{credit.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Certified: {credit.certificationDate}</span>
                    <Button size="sm" onClick={() => handlePurchase(credit.id)}>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Purchase
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* My Owned Credits */}
          <Card title="My Owned Credits">
            <div className="space-y-4">
              {myTransactions.map((transaction) => (
                <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{transaction.creditId}</h4>
                      <p className="text-sm text-gray-600">From: {transaction.fromName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{transaction.amount} units</p>
                      <p className="text-sm text-gray-500">Paid: ${transaction.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Purchased: {new Date(transaction.timestamp).toLocaleDateString()}
                    </span>
                    <Button size="sm" variant="secondary" onClick={() => handleResell(transaction.creditId)}>
                      Resell
                    </Button>
                  </div>
                </div>
              ))}
              {myTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>No credits owned yet. Start by purchasing from the marketplace above.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;