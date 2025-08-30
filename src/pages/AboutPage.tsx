import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const AboutPage: React.FC = () => {
  const roles = [
    {
      title: 'Producer',
      description: 'Green hydrogen producers who generate credits through sustainable production methods.',
      responsibilities: ['Submit production data for certification', 'List certified credits for sale', 'Maintain production records'],
      icon: Leaf,
      color: 'green'
    },
    {
      title: 'Buyer',
      description: 'Organizations purchasing green hydrogen credits to meet sustainability goals.',
      responsibilities: ['Purchase certified credits', 'Trade credits in marketplace', 'Track credit portfolio'],
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Certifier',
      description: 'Accredited bodies that verify and certify green hydrogen production claims.',
      responsibilities: ['Verify production methods', 'Issue blockchain certificates', 'Maintain certification standards'],
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'Regulator',
      description: 'Government and regulatory bodies overseeing the credit system integrity.',
      responsibilities: ['Monitor all transactions', 'Investigate suspicious activity', 'Ensure compliance'],
      icon: TrendingUp,
      color: 'red'
    }
  ];

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About H2Credits</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            A revolutionary blockchain-based platform that brings transparency, traceability, 
            and trust to the green hydrogen credit ecosystem.
          </p>
        </div>

        {/* How Blockchain Adds Transparency */}
        <Card title="How Blockchain Ensures Transparency" className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Immutable Records</h3>
              <p className="text-gray-600">
                Every transaction is permanently recorded on the blockchain, creating an 
                unchangeable history of all credit movements from production to retirement.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Public Verification</h3>
              <p className="text-gray-600">
                Anyone can verify transactions and trace credits back to their origin, 
                ensuring complete transparency in the supply chain.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Smart Contracts</h3>
              <p className="text-gray-600">
                Automated execution of agreements ensures consistent application of 
                rules and reduces the possibility of human error or manipulation.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Decentralized Trust</h3>
              <p className="text-gray-600">
                No single entity controls the system, creating a trustless environment 
                where verification comes from cryptographic proof rather than authority.
              </p>
            </div>
          </div>
        </Card>

        {/* System Roles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">System Participants</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <Card key={role.title}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-${role.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <role.icon className={`w-6 h-6 text-${role.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-gray-600 mb-4">{role.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {role.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <ArrowRight className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <Card title="System Benefits" className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Trust</h3>
              <p className="text-gray-600">Blockchain technology eliminates the need for intermediaries and creates cryptographic proof of authenticity.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Efficiency</h3>
              <p className="text-gray-600">Automated processes and transparent pricing create a more efficient marketplace for green hydrogen credits.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Standards</h3>
              <p className="text-gray-600">Standardized processes and verification methods enable global adoption and interoperability.</p>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card title="Technology & Standards">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Technology</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  Ethereum-compatible smart contracts
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  IPFS for document storage
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  Proof-of-stake consensus mechanism
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  End-to-end encryption
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certification Standards</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  ISO 14067 carbon footprint standards
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  CertifHy green hydrogen certification
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  EU renewable energy directive compliance
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2" />
                  International sustainability standards
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;