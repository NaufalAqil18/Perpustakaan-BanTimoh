import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Users, Crown, GraduationCap } from 'lucide-react';

const StrukturManagement = () => {
  const [strukturData, setStrukturData] = useState({
    penanggungJawab: {
      title: "Keuchik Gampong Ulee Kareung",
      name: "Ikhtiar, S.Pd.I"
    },
    pengurus: [
      { id: 1, title: "I. Kepala Perpustakaan Desa", name: "Zulfadli, S.Pd.I", color: "purple" },
      { id: 2, title: "II. Bidang Data Dan Administrasi", name: "M. Fadhil, S.H", color: "blue" },
      { id: 3, title: "III. Bidang Layanan Dan Informasi", name: "Nurul Fiana, S.Pd", color: "cyan" },
      { id: 4, title: "IV. Bidang Humas Dan Kemitraan", name: "Muazzir Idris, S.Pd.M.Pd", color: "pink" }
    ],
    mahasiswaKKN: [
      "Nanda Ofinda",
      "Nadya Barossa Bahri", 
      "Amalia",
      "Intan Yulisa",
      "Annisa Fitria Rahmi",
      "Naufal Aqil",
      "Raiful Fata",
      "Khoirun Nisa Harahap",
      "Fira Agusdinadila",
      "Rizki Aulia"
    ]
  });

  const [editingSection, setEditingSection] = useState(null);
  const [showAddPengurus, setShowAddPengurus] = useState(false);
  const [showAddKKN, setShowAddKKN] = useState(false);
  const [newPengurus, setNewPengurus] = useState({
    title: '',
    name: '',
    color: 'blue'
  });
  const [newKKN, setNewKKN] = useState('');

  const colors = [
    { value: 'purple', label: 'Ungu' },
    { value: 'blue', label: 'Biru' },
    { value: 'cyan', label: 'Cyan' },
    { value: 'pink', label: 'Pink' },
    { value: 'green', label: 'Hijau' },
    { value: 'orange', label: 'Oranye' }
  ];

  const handleSavePenanggungJawab = () => {
    setEditingSection(null);
  };

  const handleAddPengurus = () => {
    if (newPengurus.title && newPengurus.name) {
      const pengurus = {
        id: Date.now(),
        ...newPengurus
      };
      
      setStrukturData(prev => ({
        ...prev,
        pengurus: [...prev.pengurus, pengurus]
      }));
      
      setNewPengurus({
        title: '',
        name: '',
        color: 'blue'
      });
      setShowAddPengurus(false);
    }
  };

  const handleEditPengurus = (id, field, value) => {
    setStrukturData(prev => ({
      ...prev,
      pengurus: prev.pengurus.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleDeletePengurus = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengurus ini?')) {
      setStrukturData(prev => ({
        ...prev,
        pengurus: prev.pengurus.filter(p => p.id !== id)
      }));
    }
  };

  const handleAddKKN = () => {
    if (newKKN.trim()) {
      setStrukturData(prev => ({
        ...prev,
        mahasiswaKKN: [...prev.mahasiswaKKN, newKKN.trim()]
      }));
      setNewKKN('');
      setShowAddKKN(false);
    }
  };

  const handleDeleteKKN = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mahasiswa KKN ini?')) {
      setStrukturData(prev => ({
        ...prev,
        mahasiswaKKN: prev.mahasiswaKKN.filter((_, i) => i !== index)
      }));
    }
  };

  const getColorClass = (color) => {
    const colorMap = {
      purple: 'text-purple-400',
      blue: 'text-blue-400',
      cyan: 'text-cyan-400',
      pink: 'text-pink-400',
      green: 'text-green-400',
      orange: 'text-orange-400'
    };
    return colorMap[color] || 'text-blue-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Struktur Organisasi</h1>
      </div>

      {/* Penanggung Jawab */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Crown className="h-5 w-5 text-blue-400" />
            <span>A. Penanggung Jawab</span>
          </h2>
          <button
            onClick={() => setEditingSection('penanggungJawab')}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-400/20">
          {editingSection === 'penanggungJawab' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Jabatan
                </label>
                <input
                  type="text"
                  value={strukturData.penanggungJawab.title}
                  onChange={(e) => setStrukturData(prev => ({
                    ...prev,
                    penanggungJawab: { ...prev.penanggungJawab, title: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={strukturData.penanggungJawab.name}
                  onChange={(e) => setStrukturData(prev => ({
                    ...prev,
                    penanggungJawab: { ...prev.penanggungJawab, name: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSavePenanggungJawab}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">{strukturData.penanggungJawab.title}</span>
              <span className="text-white font-bold text-lg">{strukturData.penanggungJawab.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pengurus Perpustakaan */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-400" />
            <span>B. Pengurus Perpustakaan</span>
          </h2>
          <button
            onClick={() => setShowAddPengurus(true)}
            className="flex items-center space-x-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {strukturData.pengurus.map((pengurus) => (
            <div key={pengurus.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className={`${getColorClass(pengurus.color)} font-semibold mb-2 text-sm`}>
                    {pengurus.title}
                  </h5>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Jabatan</span>
                    <span className="text-white font-semibold">{pengurus.name}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditPengurus(pengurus.id, 'name', prompt('Masukkan nama baru:', pengurus.name))}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePengurus(pengurus.id)}
                    className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mahasiswa KKN */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-pink-400" />
            <span>Mahasiswa KKN yang Berkontribusi</span>
          </h2>
          <button
            onClick={() => setShowAddKKN(true)}
            className="flex items-center space-x-2 px-3 py-1 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strukturData.mahasiswaKKN.map((name, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl border border-pink-400/10 hover:border-pink-400/30 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-300 font-medium">{name}</span>
              </div>
              <button
                onClick={() => handleDeleteKKN(index)}
                className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Pengurus Modal */}
      {showAddPengurus && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tambah Pengurus</h2>
                <button
                  onClick={() => setShowAddPengurus(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    value={newPengurus.title}
                    onChange={(e) => setNewPengurus(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Masukkan jabatan"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={newPengurus.name}
                    onChange={(e) => setNewPengurus(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Masukkan nama"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Warna
                  </label>
                  <select
                    value={newPengurus.color}
                    onChange={(e) => setNewPengurus(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    {colors.map(color => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddPengurus(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddPengurus}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add KKN Modal */}
      {showAddKKN && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tambah Mahasiswa KKN</h2>
                <button
                  onClick={() => setShowAddKKN(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nama Mahasiswa KKN
                  </label>
                  <input
                    type="text"
                    value={newKKN}
                    onChange={(e) => setNewKKN(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Masukkan nama mahasiswa KKN"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddKKN(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddKKN}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrukturManagement; 