import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { AlertTriangle, BarChart3, Eye, Shield, TrendingUp } from 'lucide-react';
import { mockTransactions, mockCredits } from '../data/mockData';

const RegulatorDashboard: React.FC = () => {
  const [flaggedTransactions, setFlaggedTransactions] = useState<Set<string>>(new Set());

  const totalCredits = mockCredits.length;
  const totalTransactions = mockTransactions.length;
  const totalVolume = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalValue = mockTransactions.reduce((sum, tx) => sum + tx.price, 0);

  const handleFlagTransaction = (transactionId: string) => {
    const newFlagged = new Set(flaggedTransactions);
    if (newFlagged.has(transactionId)) {
      newFlagged.delete(transactionId);
      alert(`Transaction ${transactionId} has been unmarked as suspicious.`);
    } else {
      newFlagged.add(transactionId);
      alert(`Transaction ${transactionId} has been flagged for investigation.`);
    }
    setFlaggedTransactions(newFlagged);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulator Dashboard</h1>
          <p className="text-gray-600">Monitor and oversee the green hydrogen credit ecosystem</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Credits</p>
                <p className="text-3xl font-bold">{totalCredits}</p>
              </div>
              <Shield className="w-12 h-12 text-purple-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Transactions</p>
                <p className="text-3xl font-bold">{totalTransactions}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Volume</p>
                <p className="text-3xl font-bold">{totalVolume} kg</p>
              </div>
              <BarChart3 className="w-12 h-12 text-green-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Flagged Items</p>
                <p className="text-3xl font-bold">{flaggedTransactions.size}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-200" />
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Transaction Verification */}
          <Card title="Transaction Verification">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">From</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">To</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id} className={`border-b border-gray-100 hover:bg-gray-50 ${flaggedTransactions.has(transaction.id) ? 'bg-red-50' : ''}`}>
                      <td className="py-3 px-4 font-medium text-gray-900">{transaction.id}</td>
                      <td className="py-3 px-4 text-gray-600">{transaction.fromName}</td>
                      <td className="py-3 px-4 text-gray-600">{transaction.toName}</td>
                      <td className="py-3 px-4 text-gray-600">{transaction.amount} kg</td>
                      <td className="py-3 px-4 text-gray-600">${transaction.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                          transaction.status === 'Flagged' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {flaggedTransactions.has(transaction.id) ? 'Flagged' : transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant={flaggedTransactions.has(transaction.id) ? "success" : "warning"}
                            onClick={() => handleFlagTransaction(transaction.id)}
                          >
                            {flaggedTransactions.has(transaction.id) ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Unflag
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Flag
                              </>
                            )}
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* System Statistics */}
          <Card title="System Overview">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Credit Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Credits Issued:</span>
                    <span className="font-semibold">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Volume:</span>
                    <span className="font-semibold">{mockCredits.reduce((sum, credit) => sum + credit.units, 0)} kg H2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Verification:</span>
                    <span className="font-semibold">{pendingRequests.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Market Activity</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Transactions:</span>
                    <span className="font-semibold">{totalTransactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Trading Volume:</span>
                    <span className="font-semibold">{totalVolume} kg H2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Trading Value:</span>
                    <span className="font-semibold">${totalValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegulatorDashboard;