import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Heart, Star, User } from 'lucide-react';

const TestimoniManagement = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Raiful Fata",
      role: "Mahasiswa KKN",
      text: "Perpustakaan Ban Timoh Ulee Kareung memiliki anak-anak yang sangat antusias, walau dengan fasilitas yang minim.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rizki Aulia",
      role: "Mahasiswa KKN",
      text: "Perpustakaan Ban Timoh adalah tempat yang tepat untuk meningkatkan minat literasi anak-anak di gampong Ulee Kareung.",
      rating: 5,
    },
    {
      id: 3,
      name: "Naufal Aqil",
      role: "Mahasiswa KKN",
      text: "Selama berada di Perpustakaan Ban Timoh, saya mendapatkan pengalaman baru dalam mengajari adik-adik di Gampong Ulee Kareung.",
      rating: 5,
    },
    {
      id: 4,
      name: "Nanda Ofinda",
      role: "Mahasiswa KKN",
      text: "Pengalaman mengajar di perpustakaan ini sangat berharga, melihat semangat belajar anak-anak yang luar biasa.",
      rating: 5,
    },
    {
      id: 5,
      name: "Nadya Barossa Bahri",
      role: "Mahasiswa KKN",
      text: "Program literasi di sini benar-benar membantu meningkatkan kemampuan membaca dan menulis anak-anak.",
      rating: 5,
    },
    {
      id: 6,
      name: "Amalia",
      role: "Mahasiswa KKN",
      text: "Saya senang bisa berkontribusi dalam pengembangan literasi masyarakat di Gampong Ulee Kareung.",
      rating: 5,
    },
    {
      id: 7,
      name: "Intan Yulisa",
      role: "Mahasiswa KKN",
      text: "Perpustakaan ini menjadi pusat pembelajaran yang sangat bermanfaat bagi masyarakat sekitar.",
      rating: 5,
    },
    {
      id: 8,
      name: "Annisa Fitria Rahmi",
      role: "Mahasiswa KKN",
      text: "Kegiatan di perpustakaan ini memberikan dampak positif yang besar bagi perkembangan anak-anak.",
      rating: 5,
    },
    {
      id: 9,
      name: "Khoirun Nisa Harahap",
      role: "Mahasiswa KKN",
      text: "Saya bangga bisa menjadi bagian dari pengembangan literasi di Gampong Ulee Kareung.",
      rating: 5,
    },
    {
      id: 10,
      name: "Fira Agusdinadila",
      role: "Mahasiswa KKN",
      text: "Perpustakaan Ban Timoh adalah contoh nyata bagaimana perpustakaan desa bisa berkembang dengan baik.",
      rating: 5,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: 'Mahasiswa KKN',
    text: '',
    rating: 5
  });

  const roles = ['Mahasiswa KKN', 'Pengunjung', 'Anggota Perpustakaan', 'Relawan', 'Lainnya'];

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.text) {
      const testimonial = {
        id: Date.now(),
        ...newTestimonial
      };
      
      setTestimonials(prev => [...prev, testimonial]);
      setNewTestimonial({
        name: '',
        role: 'Mahasiswa KKN',
        text: '',
        rating: 5
      });
      setShowAddModal(false);
    }
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleSaveEdit = () => {
    if (editingTestimonial) {
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === editingTestimonial.id ? editingTestimonial : testimonial
      ));
      setEditingTestimonial(null);
    }
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Testimoni</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 hover:border-pink-400/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              {renderStars(testimonial.rating)}
            </div>
            
            <p className="text-gray-300 italic">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tambah Testimoni Baru</h2>
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
                    Nama
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Masukkan nama"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Peran/Jabatan
                  </label>
                  <select
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewTestimonial(prev => ({ ...prev, rating }))}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= newTestimonial.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 ml-2">{newTestimonial.rating}/5</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Testimoni
                  </label>
                  <textarea
                    value={newTestimonial.text}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="Masukkan testimoni"
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
                  onClick={handleAddTestimonial}
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

      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Testimoni</h2>
                <button
                  onClick={() => setEditingTestimonial(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Peran/Jabatan
                  </label>
                  <select
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setEditingTestimonial(prev => ({ ...prev, rating }))}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= editingTestimonial.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 ml-2">{editingTestimonial.rating}/5</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Testimoni
                  </label>
                  <textarea
                    value={editingTestimonial.text}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, text: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingTestimonial(null)}
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

export default TestimoniManagement; 