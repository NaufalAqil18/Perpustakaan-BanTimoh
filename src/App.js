import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Search,
  Camera,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Calendar,
  Heart,
  ExternalLink,
  ChevronRight,
  Star,
  Globe,
  Smartphone,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import AdminDashboard from "./components/Admin/AdminDashboard";

const LibraryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrollY, setScrollY] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we're in admin mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // If in admin mode, show admin dashboard
  if (isAdminMode) {
    return <AdminDashboard />;
  }

  const navItems = [
    { id: "beranda", label: "Beranda", icon: BookOpen },
    { id: "profil", label: "Profil", icon: Users },
    { id: "opac", label: "OPAC", icon: Search },
    { id: "ar", label: "AR", icon: Smartphone },
    { id: "galeri", label: "Galeri & Event", icon: Camera },
    { id: "testimoni", label: "Testimoni", icon: Heart },
    { id: "kontak", label: "Kontak & Lokasi", icon: MapPin },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black -z-10"></div>
      <FloatingParticles />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection("beranda")}>
              <div className="relative">
                <BookOpen className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-400/30 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-blue-300 transition-all duration-300">
                Perpustakaan Ban Timoh
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-all duration-300 ${
                    activeSection === item.id ? "scale-110" : "group-hover:scale-110"
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/98 backdrop-blur-xl border-t border-gray-800/50 animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-400"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeSection === item.id ? "bg-blue-400/20" : "bg-gray-700/50"
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="beranda"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-bounce mb-8">
            <BookOpen className="h-24 w-24 mx-auto text-blue-400 mb-4" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Perpustakaan Ban Timoh
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed px-4">
            Jendela pengetahuan yang menghubungkan masa lalu, masa kini, dan
            masa depan melalui teknologi modern dan koleksi yang kaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => scrollToSection("opac")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base"
            >
              Jelajahi Katalog
            </button>
            <button
              onClick={() => scrollToSection("ar")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-400 rounded-full text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Coba AR Experience
            </button>
          </div>
        </div>
      </section>

      {/* Profil Section */}
      <section
        id="profil"
        className="py-20 bg-gradient-to-r from-gray-900 to-slate-900 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
              <BookOpen className="h-10 w-10 text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Profil Perpustakaan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mengenal lebih dekat sejarah, visi, misi, dan pencapaian Perpustakaan Ban Timoh
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-blue-400">25</div>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Anggota Aktif</h4>
              <p className="text-gray-400 text-sm">Komunitas pembaca yang berkembang</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-12 w-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-purple-400">1000+</div>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Koleksi Buku</h4>
              <p className="text-gray-400 text-sm">Dari berbagai genre dan kategori</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-8 rounded-2xl border border-green-400/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="flex items-center justify-between mb-4">
                <Globe className="h-12 w-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-green-400">2</div>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Tahun Pengalaman</h4>
              <p className="text-gray-400 text-sm">Melayani masyarakat dengan dedikasi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Sejarah Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl shadow-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-500 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-400">
                      Sejarah Berdiri
                    </h3>
                  </div>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Keberadaan Perpustakaan Gampong Ulee Kareung diawali dengan
                      munculnya keinginan dari sebagian Tokoh Masyarakat yang
                      melihat bangunan yang sudah oleh pemerintahan gampong yang
                      tidak difungsikan secara maksimal dan keinginan untuk
                      mengembangkan Potensi Masyarakat Gampong terutama anak usia
                      sekolah dalam bidang Literasi sebagai budaya masyarakat guna
                      pengembangan diri.
                    </p>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-400/20">
                      <p className="font-semibold text-blue-400 mb-2">SK Pendirian:</p>
                      <p className="text-sm">Nomor 450/20//ulk/2022</p>
                    </div>
                    <p>
                      Berdirinya perpustakaan Gampong Ulee Kareung pada tahun 2022. 
                      Perpustakaan dikelola oleh pemerintah Gampong secara Tanggung 
                      Jawab dibawah Kasi Pelayanan. Pada Tahun 2024 Perpustakaan 
                      Gampong Ulee Kareung mendapatkan respon positif dari 
                      Perpustakaan Nasional dengan mendapatkan Bantuan 1000 buku 
                      bacaan sekaligus dengan Rak bukunya.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visi & Misi Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl shadow-2xl border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-400">
                      Visi & Misi
                    </h3>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-400/20 mb-6">
                    <h4 className="font-semibold text-purple-400 mb-2">Visi:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Perpustakaan Desa sebagai Sarana Transformasi Berbasis Inklusi
                      Sosial Dan Pusat Literasi Yang berkelanjutan untuk membangun
                      masyarakat yang cerdas, kreatif, dan mandiri yang berasaskan
                      Syariat Islam
                    </p>
                  </div>

                  <h4 className="font-semibold text-purple-400 mb-4">Misi:</h4>
                  <div className="space-y-3">
                    {[
                      "Meningkatkan Akses Literasi dengan berbagai koleksi bacaan yang relevan dan mudah diakses oleh seluruh lapisan masyarakat",
                      "Turut serta Memotivasi Untuk Meningkatkan Keimanan Dan Ketaqwaan Dalam Bingkai Syariat Islam melalui Literasi",
                      "Mendorong Masyarakat Mandiri Dengan Pengembangan Sumber Daya Manusia melalui program kegiatan edukatif untuk meningkatkan keterampilan dan pengetahuan Serta sebagai sarana berdiskusi dalam mengembangkan minat serta bakat",
                      "Menjalin kemitraan dengan pemerintah, dan lembaga serta organisasi lainnya untuk meningkatkan kualitas layanan perpustakaan",
                      "Memotivasi Masyarakat Desa Untuk Terus Membaca dan Belajar sebagai Budaya serta mendukung pembelajaran sepanjang hayat"
                    ].map((misi, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{misi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPAC Section */}
      <section
        id="opac"
        className="py-20 bg-gradient-to-l from-gray-900 to-black relative"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Online Public Access Catalog
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Akses katalog lengkap koleksi perpustakaan melalui sistem
            terintegrasi dengan Perpusnas
          </p>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl shadow-2xl border border-gray-700 max-w-4xl mx-auto">
            <Search className="h-20 w-20 text-green-400 mx-auto mb-8" />
            <h3 className="text-2xl font-bold mb-6">Cari & Temukan Buku</h3>
            <p className="text-gray-400 mb-8">
              Gunakan sistem pencarian canggih untuk menemukan buku, jurnal, dan
              referensi yang Anda butuhkan
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pusgam.usk.ac.id/ulee_kareung/opac/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Buka OPAC</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AR Section */}
      <section
        id="ar"
        className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Augmented Reality Experience
            </h2>
            <p className="text-xl text-gray-300">
              Jelajahi perpustakaan dengan teknologi AR yang menakjubkan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-400/20">
                <Smartphone className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Interactive Card
                </h3>
                <p className="text-gray-300">
                  Gunakan smartphone Anda untuk menikmati interaktifitas dengan bahan bacaan kartu di dalam
                  perpustakaan dengan secara AR real-time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8 rounded-2xl border border-pink-400/20">
                <BookOpen className="h-12 w-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Card Information</h3>
                <p className="text-gray-300">
                  Scan kartu barcode untuk mendapatkan informasi mengenai planet-planet
                  di tata surya kita secara interaktif
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Cara Menggunakan AR
              </h3>
              <div className="space-y-4">
                {[
                  "Scan barcode AR Perpustakaan ( jika berada di dalam pustaka )",
                  "Aktifkan kamera dan izin rotasi kamera",
                  "Arahkan kamera ke marker AR",
                  "Nikmati pengalaman interaktif!",
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://ar-github-io.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-center block"
              >
                Masuk ke AR App
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="galeri"
        className="py-20 bg-gradient-to-l from-blue-900/30 to-gray-900 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mb-6">
              <Camera className="h-10 w-10 text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Galeri Foto & Event
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dokumentasi kegiatan dan momen berharga di perpustakaan
            </p>
          </div>



          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              // TEMPLATE: Copy dan sesuaikan data foto Anda di sini
              {
                id: 1,
                src: "/images/gallery/membacaNyaring.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Membaca Nyaring",
                title: "Kegiatan Membaca Nyaring",
                date: "10 Juli 2025",
                category: "KKN Literasi",
                description: "Kegiatan Membaca Nyaring di Gampong Ulee Kareung"
              },
              {
                id: 2,
                src: "/images/gallery/mengulasBuku.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Mengulas Buku",
                title: "Kegiatan Mengulas Buku",
                date: "11 Juli 2025",
                category: "KKN Literasi",
                description: "Kegiatan Mengulas Buku di Gampong Ulee Kareung"
              },
              {
                id: 3,
                src: "/images/gallery/menulisCerita.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Menulis Cerita",
                title: "Kegiatan Menulis Cerita",
                date: "12 Juli 2025",
                category: "KKN Literasi",
                description: "Kegiatan Menulis Cerita di Gampong Ulee Kareung"
              },
              {
                id: 4,
                src: "/images/gallery/proyekBerbasisBuku.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Proyek Berbasis Buku",
                title: "Kegiatan Proyek Berbasis Buku",
                date: "16 Juli 2025",
                category: "KKN Literasi",
                description: "Kegiatan Membuat Proyek Berbasis Buku di Gampong Ulee Kareung"
              },
              {
                id: 5,
                src: "/images/gallery/membacaBuku.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Membaca Buku",
                title: "Kegiatan Membaca Buku",
                date: "10 Juli 2025",
                category: "Program Literasi",
                description: "Kegiatan Membaca Buku di Gampong Ulee Kareung untuk meningkatkan literasi masyarakat"
              },
              {
                id: 6,
                src: "/images/gallery/les.jpg", // Ganti dengan path foto Anda
                alt: "Kegiatan Les Literasi",
                title: "Kegiatan Les KKN Literasi",
                date: "12 Juli 2025",
                category: "KKN Literasi",
                description: "Kegiatan Les Literasi di Gampong Ulee Kareung"
              }
            ].map((photo) => (
                                              <div
                  key={photo.id}
                  className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                    photo.category === "KKN Literasi" 
                      ? "border-purple-500/50 hover:border-purple-400/80" 
                      : photo.category === "Program Literasi"
                      ? "border-green-500/50 hover:border-green-400/80"
                      : "border-gray-700 hover:border-blue-400/50"
                  }`}
                  onClick={() => openModal(photo)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback jika foto tidak ditemukan */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-400 text-sm">Foto belum ditambahkan</p>
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    photo.category === "KKN Literasi" 
                      ? "bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100" 
                      : photo.category === "Program Literasi"
                      ? "bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  }`} />
                  
                                     {/* Overlay Info */}
                   <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                     <div className="space-y-2">
                       <span className={`text-xs px-2 py-1 rounded-full ${
                         photo.category === "KKN Literasi" 
                           ? "bg-purple-500/80 text-white" 
                           : photo.category === "Program Literasi"
                           ? "bg-green-500/80 text-white"
                           : "bg-blue-500/80 text-white"
                       }`}>
                         {photo.category}
                       </span>
                       <h3 className="text-sm font-semibold text-white truncate">
                         {photo.title}
                       </h3>
                       <p className="text-xs text-gray-300 flex items-center space-x-1">
                         <Calendar className="h-3 w-3" />
                         <span>{photo.date}</span>
                       </p>
                     </div>
                   </div>

                  {/* View Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-colors duration-200 ${
                      photo.category === "KKN Literasi" 
                        ? "bg-purple-500/80 hover:bg-purple-500" 
                        : photo.category === "Program Literasi"
                        ? "bg-green-500/80 hover:bg-green-500"
                        : "bg-blue-500/80 hover:bg-blue-500"
                    }`}>
                      <Eye className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Photo Modal */}
        {isModalOpen && selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="w-full max-h-[70vh] object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback untuk modal */}
                  <div className="hidden w-full h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-400">Foto belum ditambahkan</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-gray-400 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPhoto.date}</span>
                      </p>
                    </div>
                    
                                         <span className={`text-xs px-3 py-1 rounded-full ${
                       selectedPhoto.category === "KKN Literasi" 
                         ? "bg-purple-500/20 text-purple-400" 
                         : selectedPhoto.category === "Program Literasi"
                         ? "bg-green-500/20 text-green-400"
                         : "bg-blue-500/20 text-blue-400"
                     }`}>
                       {selectedPhoto.category}
                     </span>
                  </div>
                  
                  <p className="text-gray-300">
                    {selectedPhoto.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonial Section */}
      <section
        id="testimoni"
        className="py-20 bg-gradient-to-r from-gray-900 via-purple-900/30 to-gray-900 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Testimoni & Struktur Organisasi
            </h2>
            <p className="text-xl text-gray-300">
              Suara dari mahasiswa KKN dan struktur organisasi perpustakaan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="space-y-8">
              {[
                {
                  name: "Raiful Fata",
                  role: "Mahasiswa KKN",
                  text: "Perpustakaan Ban Timoh Ulee Kareung memiliki anak-anak yang sangat antusias, walau dengan fasilitas yang minim.",
                  rating: 5,
                },
                {
                  name: "Rizki Aulia",
                  role: "Mahasiswa KKN",
                  text: "Perpustakaan Ban Timoh adalah tempat yang tepat untuk meningkatkan minat literasi anak-anak di gampong Ulee Kareung.",
                  rating: 5,
                },
                {
                  name: "Naufal Aqil",
                  role: "Mahasiswa KKN",
                  text: "Selama berada di Perpustakaan Ban Timoh, saya mendapatkan pengalaman baru dalam mengajari adik-adik di Gampong Ulee Kareung.",
                  rating: 5,
                },
                {
                  name: "Nanda Ofinda",
                  role: "Mahasiswa KKN",
                  text: "Pengalaman mengajar di perpustakaan ini sangat berharga, melihat semangat belajar anak-anak yang luar biasa.",
                  rating: 5,
                },
                {
                  name: "Nadya Barossa Bahri",
                  role: "Mahasiswa KKN",
                  text: "Program literasi di sini benar-benar membantu meningkatkan kemampuan membaca dan menulis anak-anak.",
                  rating: 5,
                },
                {
                  name: "Amalia",
                  role: "Mahasiswa KKN",
                  text: "Saya senang bisa berkontribusi dalam pengembangan literasi masyarakat di Gampong Ulee Kareung.",
                  rating: 5,
                },
                {
                  name: "Intan Yulisa",
                  role: "Mahasiswa KKN",
                  text: "Perpustakaan ini menjadi pusat pembelajaran yang sangat bermanfaat bagi masyarakat sekitar.",
                  rating: 5,
                },
                {
                  name: "Annisa Fitria Rahmi",
                  role: "Mahasiswa KKN",
                  text: "Kegiatan di perpustakaan ini memberikan dampak positif yang besar bagi perkembangan anak-anak.",
                  rating: 5,
                },
                {
                  name: "Khoirun Nisa Harahap",
                  role: "Mahasiswa KKN",
                  text: "Saya bangga bisa menjadi bagian dari pengembangan literasi di Gampong Ulee Kareung.",
                  rating: 5,
                },
                {
                  name: "Fira Agusdinadila",
                  role: "Mahasiswa KKN",
                  text: "Perpustakaan Ban Timoh adalah contoh nyata bagaimana perpustakaan desa bisa berkembang dengan baik.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-pink-400/50 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-3xl border border-purple-400/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Struktur Organisasi Perpustakaan Desa "Ban Timoh"
                </h3>
              </div>
              
              <div className="space-y-8">
                {/* Penanggung Jawab */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h4 className="font-bold text-blue-400 text-lg">A. Penanggung Jawab</h4>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4 rounded-xl border border-blue-400/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Keuchik Gampong Ulee Kareung</span>
                      <span className="text-white font-bold text-lg">Ikhtiar, S.Pd.I</span>
                    </div>
                  </div>
                </div>

                {/* Pengurus Perpustakaan */}
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h4 className="font-bold text-green-400 text-lg">B. Pengurus Perpustakaan</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "I. Kepala Perpustakaan Desa", name: "Zulfadli, S.Pd.I", color: "purple" },
                      { title: "II. Bidang Data Dan Administrasi", name: "M. Fadhil, S.H", color: "blue" },
                      { title: "III. Bidang Layanan Dan Informasi", name: "Nurul Fiana, S.Pd", color: "cyan" },
                      { title: "IV. Bidang Humas Dan Kemitraan", name: "Muazzir Idris, S.Pd.M.Pd", color: "pink" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                        <h5 className={`text-${item.color}-400 font-semibold mb-2 text-sm`}>{item.title}</h5>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Jabatan</span>
                          <span className="text-white font-semibold">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mahasiswa KKN */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-6 rounded-2xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <h4 className="font-bold text-pink-400 text-lg">Mahasiswa KKN yang Berkontribusi</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
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
                    ].map((name, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl border border-pink-400/10 hover:border-pink-400/30 transition-all duration-300">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-gray-300 font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="kontak"
        className="py-20 bg-gradient-to-br from-gray-900 to-black relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Kontak & Lokasi
            </h2>
            <p className="text-xl text-gray-300">
              Hubungi kami atau kunjungi perpustakaan langsung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-green-400">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-green-400" />
                    <div>
                      <p className="font-semibold">Telepon</p>
                      <p className="text-gray-400">-------------</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-400">-------------</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Alamat</p>
                      <p className="text-gray-400">
                        Ulee Kareung Kec. Indrapuri Kabupaten Aceh Besar  
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-semibold mb-4">Jam Operasional</h4>
                  <div className="space-y-2 text-gray-400">
                    <p>Sabtu : 14:00 - 17:30</p>
                    <p>Minggu: 09:00 - 12:00</p>
                    <p>Minggu: 15:00 - 17:30</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>WhatsApp</span>
                </button>
                <button className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">
                Lokasi Kami
              </h3>
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
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ulee Kareung, Kec. Indrapuri,<br />
                    Kabupaten Aceh Besar, Aceh
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-xl border border-green-400/20">
                  <h4 className="font-semibold text-green-400 mb-2">🚗 Cara Mencapai Lokasi</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    • Dari Banda Aceh: ±45 menit dengan kendaraan<br />
                    • Dari Indrapuri: ±15 menit dengan kendaraan<br />
                    • Akses mudah melalui jalan utama gampong<br />
                    • Letaknya disamping kantor Keuchik
                  </p>
                </div>
                
                <a
                  href="https://maps.app.goo.gl/QVrJibUbyRk1q9Es9?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>🗺️ Buka di Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Perpustakaan Ban Timoh
              </span>
            </div>

            <div className="flex items-center space-x-6 text-gray-400">
              <span>© 2025 Perpustakaan Ban Timoh. All rights reserved.</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>Dibuat dengan ❤️ untuk kemajuan literasi Indonesia oleh kelompok KKN L-XXVII163 </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryWebsite;
