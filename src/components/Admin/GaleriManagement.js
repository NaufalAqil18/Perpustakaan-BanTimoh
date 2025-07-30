import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Camera, Calendar, Tag } from 'lucide-react';

const GaleriManagement = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      src: "/images/gallery/membacaNyaring.jpg",
      alt: "Kegiatan Membaca Nyaring",
      title: "Kegiatan Membaca Nyaring",
      date: "10 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Membaca Nyaring di Gampong Ulee Kareung"
    },
    {
      id: 2,
      src: "/images/gallery/mengulasBuku.jpg",
      alt: "Kegiatan Mengulas Buku",
      title: "Kegiatan Mengulas Buku",
      date: "11 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Mengulas Buku di Gampong Ulee Kareung"
    },
    {
      id: 3,
      src: "/images/gallery/menulisCerita.jpg",
      alt: "Kegiatan Menulis Cerita",
      title: "Kegiatan Menulis Cerita",
      date: "12 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Menulis Cerita di Gampong Ulee Kareung"
    },
    {
      id: 4,
      src: "/images/gallery/proyekBerbasisBuku.jpg",
      alt: "Kegiatan Proyek Berbasis Buku",
      title: "Kegiatan Proyek Berbasis Buku",
      date: "16 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Membuat Proyek Berbasis Buku di Gampong Ulee Kareung"
    },
    {
      id: 5,
      src: "/images/gallery/membacaBuku.jpg",
      alt: "Kegiatan Membaca Buku",
      title: "Kegiatan Membaca Buku",
      date: "10 Juli 2025",
      category: "Program Literasi",
      description: "Kegiatan Membaca Buku di Gampong Ulee Kareung untuk meningkatkan literasi masyarakat"
    },
    {
      id: 6,
      src: "/images/gallery/les.jpg",
      alt: "Kegiatan Les Literasi",
      title: "Kegiatan Les KKN Literasi",
      date: "12 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Les Literasi di Gampong Ulee Kareung"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    date: '',
    category: 'KKN Literasi',
    description: '',
    imageFile: null
  });

  const categories = ['KKN Literasi', 'Program Literasi', 'Event', 'Kegiatan Umum'];

  const handleAddPhoto = () => {
    if (newPhoto.title && newPhoto.date && newPhoto.description) {
      const photo = {
        id: Date.now(),
        src: newPhoto.imageFile ? URL.createObjectURL(newPhoto.imageFile) : '/images/gallery/placeholder.jpg',
        alt: newPhoto.title,
        title: newPhoto.title,
        date: newPhoto.date,
        category: newPhoto.category,
        description: newPhoto.description
      };
      
      setPhotos(prev => [...prev, photo]);
      setNewPhoto({
        title: '',
        date: '',
        category: 'KKN Literasi',
        description: '',
        imageFile: null
      });
      setShowAddModal(false);
    }
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
  };

  const handleSaveEdit = () => {
    if (editingPhoto) {
      setPhotos(prev => prev.map(photo => 
        photo.id === editingPhoto.id ? editingPhoto : photo
      ));
      setEditingPhoto(null);
    }
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      setPhotos(prev => prev.filter(photo => photo.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Galeri & Event</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Foto</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-400/50 transition-all duration-300"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditPhoto(photo)}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  photo.category === "KKN Literasi" 
                    ? "bg-purple-500/80 text-white" 
                    : photo.category === "Program Literasi"
                    ? "bg-green-500/80 text-white"
                    : "bg-blue-500/80 text-white"
                }`}>
                  {photo.category}
                </span>
                <div className="flex items-center space-x-1 text-gray-400 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{photo.date}</span>
                </div>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{photo.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tambah Foto Baru</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Upload Foto
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Klik untuk upload foto</p>
                      <p className="text-gray-500 text-sm">JPG, PNG, atau GIF (Max 5MB)</p>
                    </label>
                  </div>
                  {newPhoto.imageFile && (
                    <p className="text-green-400 text-sm mt-2">✓ {newPhoto.imageFile.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Judul Foto
                  </label>
                  <input
                    type="text"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Masukkan judul foto"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={newPhoto.date}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Kategori
                    </label>
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="Masukkan deskripsi foto"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddPhoto}
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

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Foto</h2>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={editingPhoto.src}
                    alt={editingPhoto.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Judul Foto
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.title}
                    onChange={(e) => setEditingPhoto(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tanggal
                    </label>
                    <input
                      type="text"
                      value={editingPhoto.date}
                      onChange={(e) => setEditingPhoto(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Kategori
                    </label>
                    <select
                      value={editingPhoto.category}
                      onChange={(e) => setEditingPhoto(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={editingPhoto.description}
                    onChange={(e) => setEditingPhoto(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
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

export default GaleriManagement; 