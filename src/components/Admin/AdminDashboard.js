import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Camera,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Home,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const adminSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profil', label: 'Profil Perpustakaan', icon: BookOpen },
    { id: 'galeri', label: 'Galeri & Event', icon: Camera },
    { id: 'testimoni', label: 'Testimoni', icon: Heart },
    { id: 'struktur', label: 'Struktur Organisasi', icon: Users },
    { id: 'kontak', label: 'Kontak & Lokasi', icon: MapPin },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Implementasi login logic di sini
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 max-w-md w-full">
          <div className="text-center mb-8">
            <BookOpen className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Perpustakaan Ban Timoh</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Masukkan username"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Masukkan password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel - Perpustakaan Ban Timoh
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800/80 backdrop-blur-xl border-r border-gray-700 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {adminSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span>{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && <DashboardOverview />}
          {activeSection === 'profil' && <ProfilManagement />}
          {activeSection === 'galeri' && <GaleriManagement />}
          {activeSection === 'testimoni' && <TestimoniManagement />}
          {activeSection === 'struktur' && <StrukturManagement />}
          {activeSection === 'kontak' && <KontakManagement />}
          {activeSection === 'settings' && <SettingsManagement />}
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString('id-ID')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-400/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Anggota</p>
              <p className="text-2xl font-bold text-blue-400">25</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-400/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Koleksi Buku</p>
              <p className="text-2xl font-bold text-purple-400">1000+</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-2xl border border-green-400/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Foto Galeri</p>
              <p className="text-2xl font-bold text-green-400">6</p>
            </div>
            <Camera className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-6 rounded-2xl border border-pink-400/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Testimoni</p>
              <p className="text-2xl font-bold text-pink-400">10</p>
            </div>
            <Heart className="h-8 w-8 text-pink-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
            <Plus className="h-5 w-5" />
            <span>Tambah Foto Galeri</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
            <Plus className="h-5 w-5" />
            <span>Tambah Testimoni</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors">
            <Edit className="h-5 w-5" />
            <span>Edit Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Import management components
import ProfilManagement from './ProfilManagement';
import GaleriManagement from './GaleriManagement';
import TestimoniManagement from './TestimoniManagement';
import StrukturManagement from './StrukturManagement';
import KontakManagement from './KontakManagement';
import SettingsManagement from './SettingsManagement';

export default AdminDashboard; 