import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { mockCredits } from '../data/mockData';

const CertifierDashboard: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const pendingRequests = mockCredits.filter(credit => credit.status === 'Pending');
  const certifiedCredits = mockCredits.filter(credit => credit.status === 'Certified' || credit.status === 'For Sale' || credit.status === 'Sold');

  const handleApprove = (creditId: string) => {
    alert(`Credit ${creditId} has been approved and certified. Blockchain record created.`);
    setSelectedRequest(null);
  };

  const handleReject = (creditId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert(`Credit ${creditId} has been rejected. Reason: ${reason}`);
      setSelectedRequest(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certifier Dashboard</h1>
          <p className="text-gray-600">Review and certify green hydrogen production claims</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Pending Requests</p>
                <p className="text-3xl font-bold">{pendingRequests.length}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Certified Credits</p>
                <p className="text-3xl font-bold">{certifiedCredits.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Units Certified</p>
                <p className="text-3xl font-bold">{certifiedCredits.reduce((sum, credit) => sum + credit.units, 0)}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-200" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Verification Requests */}
          <Card title="Pending Verification Requests">
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.id}</h4>
                      <p className="text-sm text-gray-600">{request.producerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{request.units} units</p>
                      <p className="text-sm text-gray-500">Requested: {request.requestDate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{request.description}</p>
                  
                  {selectedRequest === request.id ? (
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Verification Checklist:</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Production method verified as green
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Energy source documentation valid
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Production quantities verified
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Compliance with standards confirmed
                          </label>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="success" size="sm" onClick={() => handleApprove(request.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(request.id)}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setSelectedRequest(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button size="sm" onClick={() => setSelectedRequest(request.id)}>
                      Review Request
                    </Button>
                  )}
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>No pending requests at this time.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Recently Certified */}
          <Card title="Recently Certified Credits">
            <div className="space-y-4">
              {certifiedCredits.slice(0, 5).map((credit) => (
                <div key={credit.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{credit.id}</h4>
                      <p className="text-sm text-gray-600">{credit.producerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{credit.units} units</p>
                      <p className="text-sm text-gray-500">{credit.certificationDate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{credit.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Certified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertifierDashboard;