'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, AlertCircle, MapPin } from 'lucide-react';
import Link from 'next/link';
import MapLocationPicker from '../../_components/MapLocationPicker';

export default function CreateNewsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    article_url: '',
    source_name: '',
    article_text: '',
    latitude: '',
    longitude: '',
    category_id: '',
    language_id: '',
    delete_after_hours: 24,
    is_high_priority: false,
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [languages, setLanguages] = useState([]);

  // New state variables for admin role and source names
  const [adminRole, setAdminRole] = useState('');
  const [sourceNames, setSourceNames] = useState([]);
  const [customSource, setCustomSource] = useState(false);

  const [newCustomSourceName, setNewCustomSourceName] = useState('');
  const [addingCustomSource, setAddingCustomSource] = useState(false);
  const [editingSourceId, setEditingSourceId] = useState(null);
  const [editingSourceName, setEditingSourceName] = useState('');
  const [sourceActionLoading, setSourceActionLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchLanguages();
    fetchAdminInfo();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/newstech/news-map/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await res.json();
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchLanguages = async () => {
  try {
    const res = await fetch('/api/newstech/news-map/languages');
    if (!res.ok) {
      throw new Error('Failed to fetch languages');
    }
    const data = await res.json();
    setLanguages(data.languages);
  } catch (err) {
    setError(err.message);
  }
};

// Function to fetch admin info and source names
  const fetchAdminInfo = async () => {
    try {
      // Verify token and get admin role
      const tokenRes = await fetch("/api/newstech/verify-token", { method: "GET" });
      if (!tokenRes.ok) {
        throw new Error('Failed to verify authentication');
      }
      const tokenData = await tokenRes.json();
      const adminRole = tokenData.role;
      setAdminRole(adminRole);
      
      // Fetch source names based on admin role
      const sourcesRes = await fetch("/api/newstech/news-map/source-names", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!sourcesRes.ok) {
        throw new Error('Failed to fetch source names');
      }
      const sourcesData = await sourcesRes.json();
      setSourceNames(sourcesData.sourceNames);
      
      // If newsmap_admin, set the source name automatically
      if (adminRole === "newsmap_admin" && sourcesData.currentAdminName) {
        setFormData(prev => ({ ...prev, source_name: sourcesData.currentAdminName }));
      } else if (sourcesData.sourceNames.length > 0) {
        setFormData(prev => ({ ...prev, source_name: sourcesData.sourceNames[0].name }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCustomSource = () => {
    setCustomSource(!customSource);
    if (customSource) {
      // When switching back to dropdown, reset the source name
      if (sourceNames.length > 0) {
        setFormData(prev => ({ ...prev, source_name: sourceNames[0].name }));
      } else {
        setFormData(prev => ({ ...prev, source_name: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, source_name: '' }));
    }
    setAddingCustomSource(false);
    setEditingSourceId(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    }
  };

  const uploadImageToCPanel = async (file) => {
    const formData = new FormData();
    formData.append('coverImage', file);
    
    try {
      setUploading(true);
      const response = await fetch('https://wowfy.in/testusr/upload.php', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.filePath; // This should be the filename returned from PHP
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAddCustomSource = async () => {
    if (!newCustomSourceName.trim()) return;
    
    setSourceActionLoading(true);
    try {
      const res = await fetch('/api/newstech/news-map/custom-sources', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCustomSourceName }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add custom source');
      }
      
      // Refresh source names
      await fetchAdminInfo();
      setNewCustomSourceName('');
      setAddingCustomSource(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSourceActionLoading(false);
    }
  };

   // Start editing a custom source
  const handleStartEditSource = (source) => {
    setEditingSourceId(source.id);
    setEditingSourceName(source.name);
    setAddingCustomSource(false);
  };

  // Update custom source
  const handleUpdateCustomSource = async () => {
    if (!editingSourceName.trim() || !editingSourceId) return;
    
    setSourceActionLoading(true);
    try {
      const res = await fetch('/api/newstech/news-map/custom-sources', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editingSourceId,
          name: editingSourceName 
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update custom source');
      }
      
      // Refresh source names
      await fetchAdminInfo();
      setEditingSourceId(null);
      setEditingSourceName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSourceActionLoading(false);
    }
  };

  // Show delete confirmation
  const confirmDeleteSource = (source) => {
    setSourceToDelete(source);
    setShowConfirmDelete(true);
  };

  // Cancel delete
  const cancelDelete = () => {
    setSourceToDelete(null);
    setShowConfirmDelete(false);
  };

  // Delete custom source
  const handleDeleteCustomSource = async () => {
    if (!sourceToDelete) return;
    
    setSourceActionLoading(true);
    try {
      const res = await fetch(`/api/newstech/news-map/custom-sources?id=${sourceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete custom source');
      }
      
      // Refresh source names
      await fetchAdminInfo();
      setShowConfirmDelete(false);
      setSourceToDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSourceActionLoading(false);
    }
  };

  const handleLocationChange = (lat, lng) => {
    setFormData(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError(null);
    
    try {
      let imageUrl = formData.image_url;
      let finalSourceName = formData.source_name;

      // If it's a file upload, upload to cPanel first
      if (uploadType === 'file' && file) {
        const uploadedFileName = await uploadImageToCPanel(file);
        imageUrl = `https://wowfy.in/testusr/images/${uploadedFileName}`;
      }

      // If it's a custom source name that doesn't exist yet, add it
      if (customSource && !sourceNames.some(source => source.name === finalSourceName)) {
        try {
          const res = await fetch('/api/newstech/news-map/custom-sources', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: finalSourceName }),
          });
          
          if (!res.ok) {
            const errorData = await res.json();
            console.warn("Note: Custom source wasn't saved, but continuing with news creation:", errorData.message);
          }
        } catch (err) {
          console.warn("Note: Custom source wasn't saved, but continuing with news creation:", err.message);
        }
      }
      
      const dataToSubmit = {
        ...formData,
        image_url: imageUrl,
        source_name: finalSourceName,
        article_text: formData.article_text,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        language_id: formData.language_id ? parseInt(formData.language_id) : null,
      };
      
      const res = await fetch('/api/newstech/news-map', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create news');
      }
      
      // Redirect to the news listing page on success
      router.push('/newstech/mapper');
      
    } catch (err) {
      setError(err.message);
      setFormSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/newstech/mapper" 
            className="flex items-center text-red-800 hover:text-red-700 transition mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to News List
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Create News Article</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter news title"
                />
              </div>
              
              {/* Image Upload Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4 mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="uploadType"
                      value="url"
                      checked={uploadType === 'url'}
                      onChange={() => setUploadType('url')}
                      className="h-4 w-4 text-red-800 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Image URL</span>
                  </label>
                  
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="uploadType"
                      value="file"
                      checked={uploadType === 'file'}
                      onChange={() => setUploadType('file')}
                      className="h-4 w-4 text-red-800 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Upload File</span>
                  </label>
                </div>
                
                {uploadType === 'url' ? (
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required={uploadType === 'url'}
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter image URL"
                  />
                ) : (
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg shadow-lg tracking-wide border border-dashed border-gray-400 cursor-pointer hover:bg-gray-50">
                        {filePreview ? (
                          <div className="relative w-full h-48">
                            <img 
                              src={filePreview} 
                              alt="Preview" 
                              className="h-full mx-auto object-contain"
                            />
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-red-800" />
                            <span className="mt-2 text-base">Select an image file</span>
                          </>
                        )}
                        <input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                          required={uploadType === 'file'} 
                        />
                      </label>
                    </div>
                    {file && (
                      <p className="mt-2 text-sm text-gray-500">
                        Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Article URL */}
              <div>
                <label htmlFor="article_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Article URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="article_url"
                  name="article_url"
                  value={formData.article_url}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter article URL"
                />
              </div>
              
              {/* Article Text */}
              <div>
                <label htmlFor="article_text" className="block text-sm font-medium text-gray-700 mb-1">
                    Article Text <span className="text-red-500">*</span>
                    <span className="text-sm text-gray-500 block">
                        (Required to generate AI summary for the news)
                    </span>
                </label>
                <textarea
                    id="article_text"
                    name="article_text"
                    value={formData.article_text}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 resize-none overflow-y-auto"
                    placeholder="Paste the complete article text here. This will be used to generate an AI summary..."
                    style={{ minHeight: '200px', maxHeight: '300px' }}
                />
              </div>

              {/* Source Name */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="source_name" className="block text-sm font-medium text-gray-700">
                    Source Name <span className="text-red-500">*</span>
                  </label>
                  
                  {/* Only show toggle for superadmin and admin */}
                  {(adminRole === "superadmin" || adminRole === "admin") && (
                    <button 
                      type="button"
                      onClick={toggleCustomSource}
                      className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                      {customSource ? "Select from list" : "Enter new source"}
                    </button>
                  )}
                </div>
                
                {!customSource ? (
                  <div className="space-y-3">
                    {/* Dropdown for selecting existing sources */}
                    <select
                      id="source_name"
                      name="source_name"
                      value={formData.source_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      disabled={adminRole === "newsmap_admin"}
                    >
                      <option value="" disabled>Select a source</option>
                      {sourceNames.map((source, index) => (
                        <option key={index} value={source.name}>
                          {source.name} {source.isCustom ? "(Others)" : ""}
                        </option>
                      ))}
                    </select>

                    {/* Source management for admins - only shown when not in custom source entry mode */}
                    {(adminRole === "superadmin" || adminRole === "admin") && (
                      <div className="border rounded-md p-3 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Manage Other Sources</h4>
                        
                        {/* List of custom sources with edit/delete options */}
                        <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                          {sourceNames.filter(source => source.isCustom).length === 0 ? (
                            <p className="text-sm text-gray-500">No other sources yet</p>
                          ) : (
                            sourceNames.filter(source => source.isCustom).map((source) => (
                              <div key={source.id} className="flex items-center justify-between p-2 bg-white border rounded-md">
                                {editingSourceId === source.id ? (
                                  <div className="flex-grow flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={editingSourceName}
                                      onChange={(e) => setEditingSourceName(e.target.value)}
                                      className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded"
                                      placeholder="Source name"
                                    />
                                    <button 
                                      type="button" 
                                      onClick={handleUpdateCustomSource}
                                      disabled={sourceActionLoading}
                                      className="text-xs bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
                                    >
                                      Save
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => setEditingSourceId(null)}
                                      className="text-xs bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-sm">{source.name}</span>
                                    <div className="flex space-x-2">
                                      <button 
                                        type="button" 
                                        onClick={() => handleStartEditSource(source)}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        Edit
                                      </button>
                                      <button 
                                        type="button" 
                                        onClick={() => confirmDeleteSource(source)}
                                        className="text-xs text-red-600 hover:text-red-800"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                        
                        {/* Add new custom source interface */}
                        {/* {addingCustomSource ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={newCustomSourceName}
                              onChange={(e) => setNewCustomSourceName(e.target.value)}
                              className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded"
                              placeholder="New source name"
                            />
                            <button 
                              type="button" 
                              onClick={handleAddCustomSource}
                              disabled={sourceActionLoading || !newCustomSourceName.trim()}
                              className="text-sm bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 disabled:bg-red-300"
                            >
                              Add
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setAddingCustomSource(false)}
                              className="text-sm bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button 
                            type="button" 
                            onClick={() => {
                              setAddingCustomSource(true);
                              setEditingSourceId(null);
                            }}
                            className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300"
                          >
                            + Add New Source
                          </button>
                        )} */}
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    id="source_name"
                    name="source_name"
                    value={formData.source_name}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter new source name"
                  />
                )}
                
                {adminRole === "newsmap_admin" && (
                  <p className="mt-1 text-xs text-gray-500">
                    As a News Page admin, you can only post news under your company name.
                  </p>
                )}
              </div>

              {/* Location */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <MapPin className="h-4 w-4 inline text-red-800 ml-1" />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      placeholder="E.g., 28.6139"
                    />
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      placeholder="E.g., 77.2090"
                    />
                  </div>
                </div>
              </div> */}

              <MapLocationPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onLocationChange={handleLocationChange}
              />
              
              {/* Category */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label htmlFor="language_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language_id"
                  name="language_id"
                  value={formData.language_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select a language</option>
                  {languages.map(language => (
                    <option key={language.id} value={language.id}>
                      {language.name} ({language.code})
                    </option>
                  ))}
                </select>
              </div>

            {/* High Priority Toggle */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                High Priority
              </label>
              <div className="flex items-center">
                <input
                  id="high-priority-toggle"
                  name="is_high_priority"
                  type="checkbox"
                  checked={formData.is_high_priority}
                  onChange={(e) =>
                    setFormData({ ...formData, is_high_priority: e.target.checked })
                  }
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="high-priority-toggle"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mark as high priority
                </label>
              </div>
            </div>

              {/* Delete After Hours */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delete After Hours <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="delete-24"
                      name="delete_after_hours"
                      type="radio"
                      value="24"
                      checked={formData.delete_after_hours === 24}
                      onChange={(e) => setFormData({...formData, delete_after_hours: parseInt(e.target.value)})}
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <label htmlFor="delete-24" className="ml-2 block text-sm text-gray-700">
                      24 hours
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="delete-36"
                      name="delete_after_hours"
                      type="radio"
                      value="36"
                      checked={formData.delete_after_hours === 36}
                      onChange={(e) => setFormData({...formData, delete_after_hours: parseInt(e.target.value)})}
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <label htmlFor="delete-36" className="ml-2 block text-sm text-gray-700">
                      36 hours
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="delete-48"
                      name="delete_after_hours"
                      type="radio"
                      value="48"
                      checked={formData.delete_after_hours === 48}
                      onChange={(e) => setFormData({...formData, delete_after_hours: parseInt(e.target.value)})}
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <label htmlFor="delete-48" className="ml-2 block text-sm text-gray-700">
                      48 hours
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={formSubmitting || uploading}
                  className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {(formSubmitting || uploading) ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      {uploading ? 'Uploading...' : 'Creating...'}
                    </span>
                  ) : (
                    'Create News'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && sourceToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete the custom source &quot;{sourceToDelete.name}&quot;? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCustomSource}
                disabled={sourceActionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}