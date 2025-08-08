const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'content.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(dataFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Default content
const defaultContent = {
  hero: {
    title: 'Perpustakaan Ban Timoh',
    subtitle: 'Jendela pengetahuan yang menghubungkan masa lalu, masa kini, dan masa depan melalui teknologi modern dan koleksi yang kaya.',
    button1Text: 'Jelajahi Katalog',
    button2Text: 'Coba AR Experience'
  },
  stats: [
    { id: 1, value: '25', title: 'Anggota Aktif', description: 'Komunitas pembaca yang berkembang' },
    { id: 2, value: '1000+', title: 'Koleksi Buku', description: 'Dari berbagai genre dan kategori' },
    { id: 3, value: '2', title: 'Tahun Pengalaman', description: 'Melayani masyarakat dengan dedikasi' }
  ],
  contact: {
    phone: '-------------',
    email: '-------------',
    address: 'Ulee Kareung Kec. Indrapuri Kabupaten Aceh Besar'
  }
};

// Read content from file
const readContent = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create with default content
    await writeContent(defaultContent);
    return defaultContent;
  }
};

// Write content to file
const writeContent = async (content) => {
  await ensureDataDir();
  await fs.writeFile(dataFilePath, JSON.stringify(content, null, 2));
};

// Routes
app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const content = req.body;
    await writeContent(content);
    res.json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

app.put('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;
    
    const content = await readContent();
    content[section] = sectionData;
    
    await writeContent(content);
    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Failed to update section' });
  }
});

app.delete('/api/content', async (req, res) => {
  try {
    await writeContent(defaultContent);
    res.json({ message: 'Content reset to default' });
  } catch (error) {
    console.error('Error resetting content:', error);
    res.status(500).json({ error: 'Failed to reset content' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
