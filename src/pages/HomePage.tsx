import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, TrendingUp, Users } from 'lucide-react';
import Button from '../components/UI/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">H2Credits</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link to="/public-ledger">
                <Button>View Public Ledger</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Green Hydrogen Credit System
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A blockchain-based platform ensuring traceable, transparent, and trustworthy 
            green hydrogen credits. Connect producers, buyers, certifiers, and regulators 
            in a unified ecosystem for sustainable energy trading.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/public-ledger">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Ledger
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Traceable</h3>
            <p className="text-gray-600">Every credit tracked from production to retirement with immutable blockchain records.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent</h3>
            <p className="text-gray-600">Public ledger ensures complete transparency and accountability for all stakeholders.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficient</h3>
            <p className="text-gray-600">Streamlined certification and trading process with automated smart contracts.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborative</h3>
            <p className="text-gray-600">Multi-stakeholder platform connecting the entire green hydrogen value chain.</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Produce & Request</h3>
              <p className="text-gray-600">Hydrogen producers create credits and submit certification requests with production data.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certify & Verify</h3>
              <p className="text-gray-600">Certified bodies verify production methods and issue blockchain-backed credits.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trade & Track</h3>
              <p className="text-gray-600">Buyers purchase credits while regulators monitor all transactions for compliance.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;