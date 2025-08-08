import { useState, useEffect } from 'react';

const useContentManager = () => {
  const [content, setContent] = useState({
    hero: {
      title: "Selamat Datang di Perpustakaan Digital",
      subtitle: "Temukan ribuan buku digital, audio book, dan sumber belajar interaktif untuk semua usia",
      button1Text: "Mulai Membaca",
      button2Text: "Pelajari Lebih Lanjut"
    },
    stats: [
      {
        id: 1,
        title: "Buku Digital",
        value: "1000+",
        description: "Koleksi buku digital terlengkap"
      },
      {
        id: 2,
        title: "Audio Book",
        value: "500+",
        description: "Buku audio untuk pembelajaran"
      },
      {
        id: 3,
        title: "Pengguna Aktif",
        value: "2000+",
        description: "Masyarakat yang telah bergabung"
      }
    ],
    contact: {
      phone: "+62 812-3456-7890",
      email: "info@perpustakaan-bantimoh.com",
      address: "Jl. BanTimoh No. 123, BanTimoh, Surabaya"
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = () => {
      try {
        setIsLoading(true);
        const savedContent = localStorage.getItem('libraryContent');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        }
        setError(null);
      } catch (error) {
        console.error('Error loading content from localStorage:', error);
        setError('Failed to load content from localStorage');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const saveContent = (newContent) => {
    try {
      setContent(newContent);
      localStorage.setItem('libraryContent', JSON.stringify(newContent));
      setError(null);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setError('Failed to save content to localStorage');
    }
  };

  const updateSection = (section, data) => {
    try {
      const newContent = { ...content, [section]: data };
      setContent(newContent);
      localStorage.setItem('libraryContent', JSON.stringify(newContent));
      setError(null);
    } catch (error) {
      console.error('Error updating section in localStorage:', error);
      setError('Failed to update content in localStorage');
    }
  };

  const resetContent = () => {
    try {
      const defaultContent = {
        hero: {
          title: "Selamat Datang di Perpustakaan Digital",
          subtitle: "Temukan ribuan buku digital, audio book, dan sumber belajar interaktif untuk semua usia",
          button1Text: "Mulai Membaca",
          button2Text: "Pelajari Lebih Lanjut"
        },
        stats: [
          {
            id: 1,
            title: "Buku Digital",
            value: "1000+",
            description: "Koleksi buku digital terlengkap"
          },
          {
            id: 2,
            title: "Audio Book",
            value: "500+",
            description: "Buku audio untuk pembelajaran"
          },
          {
            id: 3,
            title: "Pengguna Aktif",
            value: "2000+",
            description: "Masyarakat yang telah bergabung"
          }
        ],
        contact: {
          phone: "+62 812-3456-7890",
          email: "info@perpustakaan-bantimoh.com",
          address: "Jl. BanTimoh No. 123, BanTimoh, Surabaya"
        }
      };
      setContent(defaultContent);
      localStorage.setItem('libraryContent', JSON.stringify(defaultContent));
      setError(null);
    } catch (error) {
      console.error('Error resetting content in localStorage:', error);
      setError('Failed to reset content in localStorage');
    }
  };

  return { content, isLoading, error, saveContent, updateSection, resetContent };
};

export default useContentManager;
