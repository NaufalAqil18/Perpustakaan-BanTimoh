import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    const loadContent = async () => {
      try {
        // Try to load from API first
        const response = await fetch(`${API_BASE_URL}/api/content`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
          // Also save to localStorage as backup
          localStorage.setItem('libraryContent', JSON.stringify(data));
        } else {
          // Fallback to localStorage if API fails
          const savedContent = localStorage.getItem('libraryContent');
          if (savedContent) {
            setContent(JSON.parse(savedContent));
          }
        }
      } catch (error) {
        console.log('API not available, using localStorage');
        // Fallback to localStorage
        const savedContent = localStorage.getItem('libraryContent');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const saveContent = async (newContent) => {
    setContent(newContent);
    // Always save to localStorage first
    localStorage.setItem('libraryContent', JSON.stringify(newContent));
    
    try {
      // Try to save to API if available
      const response = await fetch(`${API_BASE_URL}/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });
      if (!response.ok) throw new Error('Failed to save to API');
    } catch (error) {
      console.log('API not available, content saved to localStorage only');
      // Don't set error for production - this is expected behavior
      if (process.env.NODE_ENV === 'development') {
        setError('Failed to save to server, but saved locally');
      }
    }
  };

  const updateSection = async (section, data) => {
    const newContent = { ...content, [section]: data };
    await saveContent(newContent);
  };

  const resetContent = async () => {
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

    try {
      const response = await fetch(`${API_BASE_URL}/api/content`, { 
        method: 'DELETE' 
      });
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.log('API not available, resetting locally');
      // Fallback to local reset
      await saveContent(defaultContent);
    }
  };

  return { content, isLoading, error, saveContent, updateSection, resetContent };
};

export default useContentManager;
