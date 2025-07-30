import React, { useState } from 'react';
import { Save, Edit, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

const KontakManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [kontakData, setKontakData] = useState({
    // Informasi Kontak
    telepon: '-------------',
    email: '-------------',
    alamat: 'Ulee Kareung Kec. Indrapuri Kabupaten Aceh Besar',
    
    // Jam Operasional
    jamOperasional: [
      { hari: 'Sabtu', jam: '14:00 - 17:30' },
      { hari: 'Minggu', jam: '09:00 - 12:00' },
      { hari: 'Minggu', jam: '15:00 - 17:30' }
    ],
    
    // Link
    whatsappLink: '#',
    emailLink: '#',
    googleMapsLink: 'https://maps.app.goo.gl/QVrJibUbyRk1q9Es9?g_st=iw',
    
    // Informasi Lokasi
    alamatLengkap: 'Ulee Kareung, Kec. Indrapuri, Kabupaten Aceh Besar, Aceh',
    caraMencapai: [
      'Dari Banda Aceh: ±45 menit dengan kendaraan',
      'Dari Indrapuri: ±15 menit dengan kendaraan',
      'Akses mudah melalui jalan utama gampong',
      'Letaknya disamping kantor Keuchik'
    ]
  });

  const handleInputChange = (field, value) => {
    setKontakData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJamOperasionalChange = (index, field, value) => {
    const newJamOperasional = [...kontakData.jamOperasional];
    newJamOperasional[index] = { ...newJamOperasional[index], [field]: value };
    setKontakData(prev => ({
      ...prev,
      jamOperasional: newJamOperasional
    }));
  };

  const addJamOperasional = () => {
    setKontakData(prev => ({
      ...prev,
      jamOperasional: [...prev.jamOperasional, { hari: '', jam: '' }]
    }));
  };

  const removeJamOperasional = (index) => {
    setKontakData(prev => ({
      ...prev,
      jamOperasional: prev.jamOperasional.filter((_, i) => i !== index)
    }));
  };

  const handleCaraMencapaiChange = (index, value) => {
    const newCaraMencapai = [...kontakData.caraMencapai];
    newCaraMencapai[index] = value;
    setKontakData(prev => ({
      ...prev,
      caraMencapai: newCaraMencapai
    }));
  };

  const addCaraMencapai = () => {
    setKontakData(prev => ({
      ...prev,
      caraMencapai: [...prev.caraMencapai, '']
    }));
  };

  const removeCaraMencapai = (index) => {
    setKontakData(prev => ({
      ...prev,
      caraMencapai: prev.caraMencapai.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Implementasi save logic di sini
    console.log('Saving contact data:', kontakData);
    setIsEditing(false);
    // Simpan ke database atau localStorage
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manajemen Kontak & Lokasi</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informasi Kontak */}
        <div className="space-y-6">
          <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-green-400 flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Informasi Kontak</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-green-400" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-300">Telepon</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={kontakData.telepon}
                      onChange={(e) => handleInputChange('telepon', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-400">{kontakData.telepon}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-400" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-300">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={kontakData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-400">{kontakData.email}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-red-400 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-300">Alamat</p>
                  {isEditing ? (
                    <textarea
                      value={kontakData.alamat}
                      onChange={(e) => handleInputChange('alamat', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-400 transition-colors resize-none"
                    />
                  ) : (
                    <p className="text-gray-400">{kontakData.alamat}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="font-semibold mb-4 text-gray-300 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Jam Operasional</span>
              </h4>
              
              <div className="space-y-3">
                {kontakData.jamOperasional.map((jam, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={jam.hari}
                          onChange={(e) => handleJamOperasionalChange(index, 'hari', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                          placeholder="Hari"
                        />
                        <input
                          type="text"
                          value={jam.jam}
                          onChange={(e) => handleJamOperasionalChange(index, 'jam', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                          placeholder="Jam"
                        />
                        <button
                          onClick={() => removeJamOperasional(index)}
                          className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                          Hapus
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-300 font-medium">{jam.hari}</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-gray-400">{jam.jam}</span>
                      </>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button
                    onClick={addJamOperasional}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                  >
                    + Tambah Jam Operasional
                  </button>
                )}
              </div>
            </div>

            {/* Link Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="font-semibold mb-4 text-gray-300">Link Kontak</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Link WhatsApp
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={kontakData.whatsappLink}
                      onChange={(e) => handleInputChange('whatsappLink', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="https://wa.me/..."
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">{kontakData.whatsappLink}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Link Email
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={kontakData.emailLink}
                      onChange={(e) => handleInputChange('emailLink', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="mailto:..."
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">{kontakData.emailLink}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Lokasi */}
        <div className="space-y-6">
          <div className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Lokasi Kami</span>
            </h2>
            
            <div className="h-64 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl mb-6 overflow-hidden relative border border-blue-400/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-20 w-20 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Perpustakaan Ban Timoh</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Ulee Kareung, Kec. Indrapuri<br />
                    Kabupaten Aceh Besar, Aceh
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Lokasi Aktif</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-4 rounded-xl border border-blue-400/20">
                <h4 className="font-semibold text-blue-400 mb-2">📍 Alamat Lengkap</h4>
                {isEditing ? (
                  <textarea
                    value={kontakData.alamatLengkap}
                    onChange={(e) => handleInputChange('alamatLengkap', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">{kontakData.alamatLengkap}</p>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-xl border border-green-400/20">
                <h4 className="font-semibold text-green-400 mb-2">🚗 Cara Mencapai Lokasi</h4>
                <div className="space-y-2">
                  {kontakData.caraMencapai.map((cara, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={cara}
                            onChange={(e) => handleCaraMencapaiChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors"
                            placeholder="Cara mencapai lokasi"
                          />
                          <button
                            onClick={() => removeCaraMencapai(index)}
                            className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            Hapus
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300 text-sm leading-relaxed">{cara}</span>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {isEditing && (
                    <button
                      onClick={addCaraMencapai}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
                    >
                      + Tambah Cara Mencapai
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Link Google Maps
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={kontakData.googleMapsLink}
                    onChange={(e) => handleInputChange('googleMapsLink', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="https://maps.google.com/..."
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a
                      href={kontakData.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakManagement; 