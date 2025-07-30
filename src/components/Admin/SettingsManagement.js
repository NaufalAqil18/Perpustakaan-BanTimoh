import React, { useState } from 'react';
import { Save, Settings, User, Lock, Bell, Shield, Database, Download, Upload } from 'lucide-react';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    // User Settings
    username: 'admin',
    email: 'admin@perpustakaan-bantimoh.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    maintenanceAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    
    // System Settings
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving settings:', settings);
    setIsSaving(false);
    // Show success message
  };

  const handleExportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      settings: settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `perpustakaan-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.settings) {
            setSettings(data.settings);
            alert('Data berhasil diimpor!');
          }
        } catch (error) {
          alert('Error: File tidak valid');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'system', label: 'Sistem', icon: Settings },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Pengaturan</h1>
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-xl transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <User className="h-6 w-6 text-blue-400" />
                  <span>Pengaturan Profil</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={settings.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Ubah Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Password Saat Ini
                      </label>
                      <input
                        type="password"
                        value={settings.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          value={settings.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Konfirmasi Password
                        </label>
                        <input
                          type="password"
                          value={settings.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-green-400" />
                  <span>Pengaturan Keamanan</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Tambahkan lapisan keamanan ekstra</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Timeout Sesi (menit)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Maksimal Percobaan Login
                      </label>
                      <input
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Masa Berlaku Password (hari)
                    </label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleInputChange('passwordExpiry', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Bell className="h-6 w-6 text-yellow-400" />
                  <span>Pengaturan Notifikasi</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Terima notifikasi melalui email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">Notifikasi real-time di browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Weekly Reports</h3>
                      <p className="text-gray-400 text-sm">Laporan mingguan otomatis</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.weeklyReports}
                        onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Maintenance Alerts</h3>
                      <p className="text-gray-400 text-sm">Peringatan maintenance sistem</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceAlerts}
                        onChange={(e) => handleInputChange('maintenanceAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-purple-400" />
                  <span>Pengaturan Sistem</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Maintenance Mode</h3>
                      <p className="text-gray-400 text-sm">Aktifkan mode maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">Auto Backup</h3>
                      <p className="text-gray-400 text-sm">Backup otomatis data sistem</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Frekuensi Backup
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                      >
                        <option value="daily">Harian</option>
                        <option value="weekly">Mingguan</option>
                        <option value="monthly">Bulanan</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Retensi Data (hari)
                      </label>
                      <input
                        type="number"
                        value={settings.dataRetention}
                        onChange={(e) => handleInputChange('dataRetention', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Database className="h-6 w-6 text-cyan-400" />
                  <span>Backup & Restore</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Download className="h-5 w-5 text-green-400" />
                      <span>Export Data</span>
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Export semua data website dalam format JSON
                    </p>
                    <button
                      onClick={handleExportData}
                      className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                    >
                      Export Data
                    </button>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Upload className="h-5 w-5 text-blue-400" />
                      <span>Import Data</span>
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Import data dari file JSON yang sudah di-export
                    </p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                      id="import-file"
                    />
                    <label
                      htmlFor="import-file"
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer text-center block"
                    >
                      Import Data
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                  <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Peringatan</h4>
                  <p className="text-gray-300 text-sm">
                    Pastikan untuk selalu melakukan backup data secara berkala. 
                    Import data akan menimpa data yang ada saat ini.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement; 