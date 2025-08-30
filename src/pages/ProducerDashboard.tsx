import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Plus, Zap, DollarSign, CheckCircle } from 'lucide-react';
import { mockCredits } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const ProducerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [formData, setFormData] = useState({
    units: '',
    description: '',
    price: ''
  });

  const myCredits = mockCredits.filter(credit => credit.producerId === user?.id);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('Credit certification request submitted successfully!');
    setShowRequestForm(false);
    setFormData({ units: '', description: '', price: '' });
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('Credits listed for sale successfully!');
    setShowSellForm(false);
    setFormData({ units: '', description: '', price: '' });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Producer Dashboard</h1>
          <p className="text-gray-600">Manage your hydrogen production and credit portfolio</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Credits</p>
                <p className="text-3xl font-bold">{myCredits.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Units</p>
                <p className="text-3xl font-bold">{myCredits.reduce((sum, credit) => sum + credit.units, 0)}</p>
              </div>
              <Zap className="w-12 h-12 text-blue-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100">Revenue Potential</p>
                <p className="text-3xl font-bold">${myCredits.reduce((sum, credit) => sum + (credit.price || 0) * credit.units, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-teal-200" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Request Credit Certification */}
          <Card title="Request Credit Certification">
            {!showRequestForm ? (
              <div className="text-center py-8">
                <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Request New Certification</h3>
                <p className="text-gray-600 mb-6">Submit your hydrogen production data for certification</p>
                <Button onClick={() => setShowRequestForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Production Units (kg H2)
                  </label>
                  <input
                    type="number"
                    value={formData.units}
                    onChange={(e) => setFormData({...formData, units: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter units produced"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Production Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your production method and energy source"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">Submit Request</Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Sell Credits */}
          <Card title="Sell Credits">
            {!showSellForm ? (
              <div className="text-center py-8">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">List Credits for Sale</h3>
                <p className="text-gray-600 mb-6">Put your certified credits on the marketplace</p>
                <Button onClick={() => setShowSellForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  List for Sale
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit ID
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a certified credit</option>
                    {myCredits.filter(c => c.status === 'Certified').map(credit => (
                      <option key={credit.id} value={credit.id}>
                        {credit.id} - {credit.units} units
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter price per unit"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">List for Sale</Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => setShowSellForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* My Certified Credits */}
        <Card title="My Certified Credits" className="mt-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Credit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {myCredits.map((credit) => (
                  <tr key={credit.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{credit.id}</td>
                    <td className="py-3 px-4 text-gray-600">{credit.units} kg</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        credit.status === 'Certified' ? 'bg-green-100 text-green-800' :
                        credit.status === 'For Sale' ? 'bg-blue-100 text-blue-800' :
                        credit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {credit.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{credit.certificationDate || credit.requestDate}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {credit.price ? `$${credit.price}/unit` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;