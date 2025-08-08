import React, { useState } from 'react';
import { 
  Upload, 
  Edit, 
  Trash2, 
  X, 
  Plus, 
  Image as ImageIcon,
  Calendar,
  Tag
} from 'lucide-react';
import useGalleryManager from '../hooks/useGalleryManager';

const GalleryManager = ({ isVisible, onClose }) => {
  const { 
    photos, 
    isLoading, 
    error, 
    uploading, 
    uploadPhoto, 
    updatePhoto, 
    deletePhoto,
    resetToDefault
  } = useGalleryManager();
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'KKN Literasi',
    date: new Date().toISOString().split('T')[0]
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      await uploadPhoto(selectedFile, uploadForm);
      setUploadForm({
        title: '',
        description: '',
        category: 'KKN Literasi',
        date: new Date().toISOString().split('T')[0]
      });
      setSelectedFile(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleEdit = (photo) => {
    setSelectedPhoto(photo);
    setEditForm({
      title: photo.title,
      description: photo.description,
      category: photo.category,
      date: photo.date
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePhoto(selectedPhoto.id, editForm);
      setIsEditing(false);
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async (photo) => {
    if (window.confirm('Yakin ingin menghapus foto ini?')) {
      try {
        await deletePhoto(photo.id, photo.filename);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <ImageIcon className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Kelola Galeri Foto</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (window.confirm('Yakin ingin mengembalikan ke foto default? Semua foto yang diupload akan hilang.')) {
                  resetToDefault();
                }
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Reset ke Default</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Upload Section */}
          <div className="w-1/3 p-6 border-r border-gray-700 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Upload Foto Baru</h3>
            
            <form onSubmit={handleUpload} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pilih Foto
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">
                      {selectedFile ? selectedFile.name : 'Klik untuk memilih foto'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Judul Foto
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  rows="3"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                >
                  <option value="KKN Literasi">KKN Literasi</option>
                  <option value="Program Literasi">Program Literasi</option>
                  <option value="Event">Event</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={uploadForm.date}
                  onChange={(e) => setUploadForm({...uploadForm, date: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>

              {/* Upload Button */}
              <button
                type="submit"
                disabled={!selectedFile || uploading}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Foto</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Photos List */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Foto yang Diupload</h3>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">{photo.title}</h4>
                      <p className="text-gray-400 text-sm">{photo.description}</p>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{photo.date}</span>
                        <Tag className="h-3 w-3 ml-2" />
                        <span>{photo.category}</span>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => handleEdit(photo)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors flex items-center space-x-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(photo)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedPhoto && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Edit Foto</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 hover:bg-gray-800 rounded"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Judul Foto
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  rows="3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                >
                  <option value="KKN Literasi">KKN Literasi</option>
                  <option value="Program Literasi">Program Literasi</option>
                  <option value="Event">Event</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
