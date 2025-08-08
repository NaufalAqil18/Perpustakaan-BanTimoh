import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  X,
  Edit,
  BookOpen,
  Users,
  Camera,
  MapPin,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import GalleryManager from './GalleryManager';

const AdminPanel = ({ isVisible, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isEditing, setIsEditing] = useState(false);
  const [showGalleryManager, setShowGalleryManager] = useState(false);
  const [formData, setFormData] = useState({
    hero: {
      title: 'Perpustakaan Ban Timoh',
      subtitle: 'Jendela pengetahuan yang menghubungkan masa lalu, masa kini, dan masa depan melalui teknologi modern dan koleksi yang kaya.',
      button1Text: 'Jelajahi Katalog',
      button2Text: 'Coba AR Experience'
    },
    stats: [
      { id: 1, value: '25', title: 'Anggota Aktif', description: 'Komunitas pembaca yang berkembang' },
      { id: 2, value: '1000+', title: 'Koleksi Buku', description: 'Dari berbagai genre dan kategori' },
      { id: 3, value: '2', title: 'Tahun Pengalaman', description: 'Melayani masyarakat dengan dedikasi' }
    ],
    contact: {
      phone: '-------------',
      email: '-------------',
      address: 'Ulee Kareung Kec. Indrapuri Kabupaten Aceh Besar'
    }
  });

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setOriginalData(JSON.parse(JSON.stringify(formData)));
    }
  }, [isVisible]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    localStorage.setItem('libraryContent', JSON.stringify(formData));
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setIsEditing(false);
  };

  const renderHeroSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Judul Utama</label>
        <input
          type="text"
          value={formData.hero.title}
          onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          disabled={!isEditing}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
        <textarea
          value={formData.hero.subtitle}
          onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          disabled={!isEditing}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Teks Tombol 1</label>
          <input
            type="text"
            value={formData.hero.button1Text}
            onChange={(e) => handleInputChange('hero', 'button1Text', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Teks Tombol 2</label>
          <input
            type="text"
            value={formData.hero.button2Text}
            onChange={(e) => handleInputChange('hero', 'button2Text', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderStatsSection = () => (
    <div className="space-y-6">
      {formData.stats.map((stat, index) => (
        <div key={stat.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Statistik {index + 1}</h4>
            {isEditing && (
              <button
                onClick={() => {
                  const newStats = formData.stats.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, stats: newStats }));
                }}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nilai</label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
              <input
                type="text"
                value={stat.title}
                onChange={(e) => handleArrayChange('stats', index, 'title', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi</label>
              <input
                type="text"
                value={stat.description}
                onChange={(e) => handleArrayChange('stats', index, 'description', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      ))}
      
      {isEditing && (
        <button
          onClick={() => {
            const newStat = {
              id: Date.now(),
              value: '0',
              title: 'Statistik Baru',
              description: 'Deskripsi statistik baru'
            };
            setFormData(prev => ({
              ...prev,
              stats: [...prev.stats, newStat]
            }));
          }}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Tambah Statistik
        </button>
      )}
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Informasi Kontak</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Telepon</label>
            <input
              type="text"
              value={formData.contact.phone}
              onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Alamat</label>
          <textarea
            value={formData.contact.address}
            onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: BookOpen },
    { id: 'stats', label: 'Statistik', icon: Users },
    { id: 'contact', label: 'Kontak', icon: MapPin },
    { id: 'gallery', label: 'Galeri Foto', icon: ImageIcon }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return renderHeroSection();
      case 'stats':
        return renderStatsSection();
      case 'contact':
        return renderContactSection();
      case 'gallery':
        return renderGallerySection();
      default:
        return renderHeroSection();
    }
  };

  const renderGallerySection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ImageIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Kelola Galeri Foto</h3>
        <p className="text-gray-400 mb-6">
          Upload, edit, dan hapus foto kegiatan perpustakaan
        </p>
        <button
          onClick={() => setShowGalleryManager(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2 mx-auto"
        >
          <ImageIcon className="h-5 w-5" />
          <span>Buka Gallery Manager</span>
        </button>
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Panel Admin</h2>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Batal</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Manager Modal */}
      <GalleryManager
        isVisible={showGalleryManager}
        onClose={() => setShowGalleryManager(false)}
      />
    </div>
  );
};

export default AdminPanel;
