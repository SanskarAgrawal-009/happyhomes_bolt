import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';

interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      title: 'Modern Living Space',
      description: 'A contemporary apartment design featuring clean lines and minimalist aesthetics.',
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      title: 'Minimalist Kitchen',
      description: 'Clean and functional kitchen design with modern appliances.',
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      title: 'Scandinavian Bedroom',
      description: 'Peaceful and minimal bedroom design with natural materials.',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      url: newUrl,
      title: newTitle,
      description: newDescription,
    };
    setPortfolioItems([...portfolioItems, newItem]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewUrl('');
  };

  const handleDelete = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-600 mt-1">Showcase your best work to attract clients.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} hover className="overflow-hidden">
            <div className="relative group">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </div>
          </Card>
        ))}

        <Card
          hover
          className="flex items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Add New Project</p>
          </div>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Portfolio Item">
        <form onSubmit={handleAddItem} className="space-y-6">
          <Input
            label="Project Title"
            placeholder="e.g., Modern Living Space"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />

          <TextArea
            label="Description"
            placeholder="Describe your project..."
            rows={4}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Add to Portfolio
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
