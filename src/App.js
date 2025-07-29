import React, { useState, useEffect } from 'react';
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
  Smartphone
} from 'lucide-react';

const LibraryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: BookOpen },
    { id: 'profil', label: 'Profil Pustaka', icon: Users },
    { id: 'opac', label: 'OPAC', icon: Search },
    { id: 'ar', label: 'Augmented Reality', icon: Smartphone },
    { id: 'galeri', label: 'Galeri & Event', icon: Camera },
    { id: 'testimoni', label: 'Testimoni', icon: Heart },
    { id: 'kontak', label: 'Kontak & Lokasi', icon: MapPin }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Perpustakaan Digital
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    activeSection === item.id ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left hover:bg-white/10 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-blue-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-bounce mb-8">
            <BookOpen className="h-24 w-24 mx-auto text-blue-400 mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Perpustakaan Digital
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Jendela pengetahuan yang menghubungkan masa lalu, masa kini, dan masa depan melalui teknologi modern dan koleksi yang kaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('opac')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Jelajahi Katalog
            </button>
            <button 
              onClick={() => scrollToSection('ar')}
              className="px-8 py-4 bg-transparent border-2 border-blue-400 rounded-full text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Coba AR Experience
            </button>
          </div>
        </div>
      </section>

      {/* Profil Section */}
      <section id="profil" className="py-20 bg-gradient-to-r from-gray-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Profil Perpustakaan
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Sejarah</h3>
                <p className="text-gray-300 leading-relaxed">
                  Didirikan pada tahun 1995, perpustakaan kami telah menjadi pusat pembelajaran dan penelitian yang terdepan dalam mengintegrasikan teknologi digital dengan koleksi tradisional.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-purple-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Visi & Misi</h3>
                <p className="text-gray-300 leading-relaxed">
                  Menjadi perpustakaan modern yang menginspirasi pembelajaran sepanjang hayat melalui inovasi teknologi dan pelayanan berkualitas tinggi.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300">
                <Users className="h-12 w-12 text-blue-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">50,000+</h4>
                <p className="text-gray-400">Anggota Aktif</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300">
                <BookOpen className="h-12 w-12 text-purple-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">100,000+</h4>
                <p className="text-gray-400">Koleksi Buku</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-8 rounded-2xl border border-green-400/20 hover:border-green-400/50 transition-all duration-300">
                <Globe className="h-12 w-12 text-green-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">25+</h4>
                <p className="text-gray-400">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPAC Section */}
      <section id="opac" className="py-20 bg-gradient-to-l from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Online Public Access Catalog
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Akses katalog lengkap koleksi perpustakaan melalui sistem terintegrasi dengan Perpusnas
          </p>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl shadow-2xl border border-gray-700 max-w-4xl mx-auto">
            <Search className="h-20 w-20 text-green-400 mx-auto mb-8" />
            <h3 className="text-2xl font-bold mb-6">Cari & Temukan Buku</h3>
            <p className="text-gray-400 mb-8">
              Gunakan sistem pencarian canggih untuk menemukan buku, jurnal, dan referensi yang Anda butuhkan
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>Buka OPAC</span>
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-green-400 rounded-full text-green-400 font-semibold hover:bg-green-400 hover:text-white transition-all duration-300 transform hover:scale-105">
                Panduan Penggunaan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AR Section */}
      <section id="ar" className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
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
                <h3 className="text-2xl font-bold mb-4">Interactive Navigation</h3>
                <p className="text-gray-300">
                  Gunakan smartphone Anda untuk navigasi interaktif di dalam perpustakaan dengan panduan AR real-time.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8 rounded-2xl border border-pink-400/20">
                <BookOpen className="h-12 w-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Book Information</h3>
                <p className="text-gray-300">
                  Scan barcode buku untuk mendapatkan informasi detail, review, dan rekomendasi buku serupa.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Cara Menggunakan AR</h3>
              <div className="space-y-4">
                {[
                  "Download aplikasi AR Perpustakaan",
                  "Aktifkan kamera dan izin lokasi",
                  "Arahkan kamera ke marker AR",
                  "Nikmati pengalaman interaktif!"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                Download AR App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-20 bg-gradient-to-l from-blue-900/30 to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Galeri & Event
            </h2>
            <p className="text-xl text-gray-300">
              Dokumentasi kegiatan dan momen berharga di perpustakaan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Workshop Digital Literacy", date: "15 Juli 2025", category: "Workshop" },
              { title: "Book Fair 2025", date: "10 Juli 2025", category: "Event" },
              { title: "Reading Challenge", date: "5 Juli 2025", category: "Competition" },
              { title: "Author Meet & Greet", date: "1 Juli 2025", category: "Special Event" },
              { title: "Kids Storytelling", date: "28 Juni 2025", category: "Kids Program" },
              { title: "Research Seminar", date: "25 Juni 2025", category: "Academic" }
            ].map((event, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl mb-4 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                  <Camera className="h-16 w-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Lihat Semua Event
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimoni" className="py-20 bg-gradient-to-r from-gray-900 via-purple-900/30 to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Testimoni & Kontribusi
            </h2>
            <p className="text-xl text-gray-300">
              Suara dari komunitas dan kesempatan untuk berkontribusi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              {[
                {
                  name: "Sarah Wijaya",
                  role: "Mahasiswa",
                  text: "Perpustakaan ini benar-benar mengubah cara saya belajar. Fasilitas AR-nya luar biasa!",
                  rating: 5
                },
                {
                  name: "Dr. Ahmad Rahman",
                  role: "Peneliti",
                  text: "Koleksi digital dan sistem OPAC sangat membantu penelitian saya. Highly recommended!",
                  rating: 5
                },
                {
                  name: "Maya Sari",
                  role: "Ibu Rumah Tangga",
                  text: "Program storytelling untuk anak-anak sangat edukatif dan menyenangkan.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-pink-400/50 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-3xl border border-purple-400/20">
              <Heart className="h-16 w-16 text-purple-400 mb-6" />
              <h3 className="text-3xl font-bold mb-6">Bergabung Sebagai Relawan</h3>
              <p className="text-gray-300 mb-8">
                Jadilah bagian dari komunitas perpustakaan dan bantu kami menyebarkan pengetahuan kepada lebih banyak orang.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Mentor program literasi",
                  "Asisten kegiatan workshop",
                  "Content creator media sosial",
                  "Tour guide AR experience"
                ].map((role, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ChevronRight className="h-5 w-5 text-purple-400" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>

              <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                Daftar Jadi Relawan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Kontak & Lokasi
            </h2>
            <p className="text-xl text-gray-300">
              Hubungi kami atau kunjungi perpustakaan langsung
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-green-400">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-green-400" />
                    <div>
                      <p className="font-semibold">Telepon</p>
                      <p className="text-gray-400">+62 812-3456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-400">info@perpustakaan.id</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Alamat</p>
                      <p className="text-gray-400">Jl. Pendidikan No. 123, Jakarta Pusat</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-semibold mb-4">Jam Operasional</h4>
                  <div className="space-y-2 text-gray-400">
                    <p>Senin - Jumat: 08:00 - 20:00</p>
                    <p>Sabtu - Minggu: 09:00 - 17:00</p>
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
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Lokasi Kami</h3>
              <div className="h-64 bg-gray-700 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-400">Google Maps akan ditampilkan di sini</p>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>Buka di Google Maps</span>
              </button>
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
                Perpustakaan Digital
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <span>© 2025 Perpustakaan Digital. All rights reserved.</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>Dibuat dengan ❤️ untuk kemajuan literasi Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryWebsite;