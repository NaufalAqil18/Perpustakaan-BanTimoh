import React, { useState } from 'react';
import { Save, Edit, BookOpen, Users, Globe } from 'lucide-react';

const ProfilManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Statistik
    anggotaAktif: 25,
    koleksiBuku: 1000,
    tahunPengalaman: 2,
    
    // Sejarah
    sejarah: `Keberadaan Perpustakaan Gampong Ulee Kareung diawali dengan munculnya keinginan dari sebagian Tokoh Masyarakat yang melihat bangunan yang sudah oleh pemerintahan gampong yang tidak difungsikan secara maksimal dan keinginan untuk mengembangkan Potensi Masyarakat Gampong terutama anak usia sekolah dalam bidang Literasi sebagai budaya masyarakat guna pengembangan diri.`,
    skPendirian: 'Nomor 450/20//ulk/2022',
    sejarahLanjutan: `Berdirinya perpustakaan Gampong Ulee Kareung pada tahun 2022. Perpustakaan dikelola oleh pemerintah Gampong secara Tanggung Jawab dibawah Kasi Pelayanan. Pada Tahun 2024 Perpustakaan Gampong Ulee Kareung mendapatkan respon positif dari Perpustakaan Nasional dengan mendapatkan Bantuan 1000 buku bacaan sekaligus dengan Rak bukunya.`,
    
    // Visi
    visi: `Perpustakaan Desa sebagai Sarana Transformasi Berbasis Inklusi Sosial Dan Pusat Literasi Yang berkelanjutan untuk membangun masyarakat yang cerdas, kreatif, dan mandiri yang berasaskan Syariat Islam`,
    
    // Misi
    misi: [
      "Meningkatkan Akses Literasi dengan berbagai koleksi bacaan yang relevan dan mudah diakses oleh seluruh lapisan masyarakat",
      "Turut serta Memotivasi Untuk Meningkatkan Keimanan Dan Ketaqwaan Dalam Bingkai Syariat Islam melalui Literasi",
      "Mendorong Masyarakat Mandiri Dengan Pengembangan Sumber Daya Manusia melalui program kegiatan edukatif untuk meningkatkan keterampilan dan pengetahuan Serta sebagai sarana berdiskusi dalam mengembangkan minat serta bakat",
      "Menjalin kemitraan dengan pemerintah, dan lembaga serta organisasi lainnya untuk meningkatkan kualitas layanan perpustakaan",
      "Memotivasi Masyarakat Desa Untuk Terus Membaca dan Belajar sebagai Budaya serta mendukung pembelajaran sepanjang hayat"
    ]
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMisiChange = (index, value) => {
    const newMisi = [...formData.misi];
    newMisi[index] = value;
    setFormData(prev => ({
      ...prev,
      misi: newMisi
    }));
  };

  const addMisi = () => {
    setFormData(prev => ({
      ...prev,
      misi: [...prev.misi, '']
    }));
  };

  const removeMisi = (index) => {
    setFormData(prev => ({
      ...prev,
      misi: prev.misi.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Implementasi save logic di sini
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Simpan ke database atau localStorage
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Profil Perpustakaan</h1>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <span>Batal</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Statistik */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-400" />
          <span>Statistik Perpustakaan</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Anggota Aktif
            </label>
            <input
              type="number"
              value={formData.anggotaAktif}
              onChange={(e) => handleInputChange('anggotaAktif', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Koleksi Buku
            </label>
            <input
              type="number"
              value={formData.koleksiBuku}
              onChange={(e) => handleInputChange('koleksiBuku', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Tahun Pengalaman
            </label>
            <input
              type="number"
              value={formData.tahunPengalaman}
              onChange={(e) => handleInputChange('tahunPengalaman', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Sejarah */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-purple-400" />
          <span>Sejarah Perpustakaan</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Sejarah Berdiri
            </label>
            <textarea
              value={formData.sejarah}
              onChange={(e) => handleInputChange('sejarah', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              SK Pendirian
            </label>
            <input
              type="text"
              value={formData.skPendirian}
              onChange={(e) => handleInputChange('skPendirian', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Sejarah Lanjutan
            </label>
            <textarea
              value={formData.sejarahLanjutan}
              onChange={(e) => handleInputChange('sejarahLanjutan', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-green-400" />
          <span>Visi & Misi</span>
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Visi
            </label>
            <textarea
              value={formData.visi}
              onChange={(e) => handleInputChange('visi', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-300 text-sm font-medium">
                Misi
              </label>
              {isEditing && (
                <button
                  onClick={addMisi}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-colors"
                >
                  + Tambah Misi
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {formData.misi.map((misi, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-2">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={misi}
                      onChange={(e) => handleMisiChange(index, e.target.value)}
                      disabled={!isEditing}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    />
                  </div>
                  {isEditing && formData.misi.length > 1 && (
                    <button
                      onClick={() => removeMisi(index)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors mt-2"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilManagement; 