import { useState, useEffect } from 'react';

const useGalleryManager = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Default photos from images folder
  const defaultPhotos = [
    {
      id: 1,
      src: "/images/gallery/membacaNyaring.jpg",
      alt: "Kegiatan Membaca Nyaring",
      title: "Kegiatan Membaca Nyaring",
      date: "10 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Membaca Nyaring di Gampong Ulee Kareung",
      url: "/images/gallery/membacaNyaring.jpg"
    },
    {
      id: 2,
      src: "/images/gallery/mengulasBuku.jpg",
      alt: "Kegiatan Mengulas Buku",
      title: "Kegiatan Mengulas Buku",
      date: "11 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Mengulas Buku di Gampong Ulee Kareung",
      url: "/images/gallery/mengulasBuku.jpg"
    },
    {
      id: 3,
      src: "/images/gallery/menulisCerita.jpg",
      alt: "Kegiatan Menulis Cerita",
      title: "Kegiatan Menulis Cerita",
      date: "12 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Menulis Cerita di Gampong Ulee Kareung",
      url: "/images/gallery/menulisCerita.jpg"
    },
    {
      id: 4,
      src: "/images/gallery/proyekBerbasisBuku.jpg",
      alt: "Kegiatan Proyek Berbasis Buku",
      title: "Kegiatan Proyek Berbasis Buku",
      date: "16 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Membuat Proyek Berbasis Buku di Gampong Ulee Kareung",
      url: "/images/gallery/proyekBerbasisBuku.jpg"
    },
    {
      id: 5,
      src: "/images/gallery/membacaBuku.jpg",
      alt: "Kegiatan Membaca Buku",
      title: "Kegiatan Membaca Buku",
      date: "10 Juli 2025",
      category: "Program Literasi",
      description: "Kegiatan Membaca Buku di Gampong Ulee Kareung untuk meningkatkan literasi masyarakat",
      url: "/images/gallery/membacaBuku.jpg"
    },
    {
      id: 6,
      src: "/images/gallery/les.jpg",
      alt: "Kegiatan Les Literasi",
      title: "Kegiatan Les KKN Literasi",
      date: "12 Juli 2025",
      category: "KKN Literasi",
      description: "Kegiatan Les Literasi di Gampong Ulee Kareung",
      url: "/images/gallery/les.jpg"
    }
  ];

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    try {
      setIsLoading(true);
      const savedPhotos = localStorage.getItem('libraryGalleryPhotos');
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      } else {
        // If no saved photos, use default photos
        setPhotos(defaultPhotos);
        localStorage.setItem('libraryGalleryPhotos', JSON.stringify(defaultPhotos));
      }
      setError(null);
    } catch (error) {
      console.error('Error loading photos from localStorage:', error);
      setError('Failed to load photos from localStorage');
      // Fallback to default photos
      setPhotos(defaultPhotos);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPhoto = (file, photoData) => {
    return new Promise((resolve, reject) => {
      try {
        setUploading(true);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result;
          const newPhoto = {
            id: Date.now().toString(),
            title: photoData.title,
            description: photoData.description,
            category: photoData.category,
            date: photoData.date,
            url: base64String,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
          localStorage.setItem('libraryGalleryPhotos', JSON.stringify([newPhoto, ...photos]));
          setError(null);
          setUploading(false);
          resolve(newPhoto);
        };
        
        reader.onerror = () => {
          setUploading(false);
          setError('Failed to read file');
          reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        setUploading(false);
        console.error('Error uploading photo:', error);
        setError('Failed to upload photo');
        reject(error);
      }
    });
  };

  const updatePhoto = (photoId, updateData) => {
    try {
      const updatedPhotos = photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, ...updateData, updatedAt: new Date().toISOString() }
          : photo
      );
      setPhotos(updatedPhotos);
      localStorage.setItem('libraryGalleryPhotos', JSON.stringify(updatedPhotos));
      setError(null);
    } catch (error) {
      console.error('Error updating photo:', error);
      setError('Failed to update photo');
      throw error;
    }
  };

  const deletePhoto = (photoId) => {
    try {
      const updatedPhotos = photos.filter(photo => photo.id !== photoId);
      setPhotos(updatedPhotos);
      localStorage.setItem('libraryGalleryPhotos', JSON.stringify(updatedPhotos));
      setError(null);
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError('Failed to delete photo');
      throw error;
    }
  };

  const getPhotosByCategory = (category) => {
    try {
      return photos.filter(photo => photo.category === category);
    } catch (error) {
      console.error('Error getting photos by category:', error);
      setError('Failed to get photos by category');
      throw error;
    }
  };

  const refreshPhotos = () => {
    loadPhotos();
  };

  const resetToDefault = () => {
    try {
      setPhotos(defaultPhotos);
      localStorage.setItem('libraryGalleryPhotos', JSON.stringify(defaultPhotos));
      setError(null);
    } catch (error) {
      console.error('Error resetting to default photos:', error);
      setError('Failed to reset to default photos');
    }
  };

  return {
    photos,
    isLoading,
    error,
    uploading,
    uploadPhoto,
    updatePhoto,
    deletePhoto,
    getPhotosByCategory,
    refreshPhotos,
    resetToDefault
  };
};

export default useGalleryManager;
