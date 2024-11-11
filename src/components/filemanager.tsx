'use client'

import React, { useState } from 'react'
import { Folder, Upload, Plus, Search, LogOut, Trash2, Home, File, X, MoveRight } from 'lucide-react'

interface FileManagerProps {
  initialSearchQuery?: string
}

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  selected?: boolean
}

export default function Component({ initialSearchQuery = '' }: FileManagerProps) {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery)
  const [isBulkSelected, setBulkSelected] = useState<boolean>(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
  const userEmail = 'sadhika@relightechnologies.com'
  const userId = '9505178684'

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleBulkSelectChange = () => {
    setBulkSelected(prev => !prev)
    // Reset all selections when turning off bulk select
    if (isBulkSelected) {
      setFiles(files.map(file => ({ ...file, selected: false })))
    }
  }

  const handleSelectAll = () => {
    setFiles(files.map(file => ({ ...file, selected: true })))
  }

  const handleDelete = () => {
    setFiles(files.filter(file => !file.selected))
  }

  const handleMoveTo = () => {
    // Implement move functionality
    console.log('Moving selected files:', files.filter(file => file.selected))
  }

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true)
  }

  const handleFileUpload = (uploadedFiles: FileList) => {
    const newFiles = Array.from(uploadedFiles).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: 'file' as const,
      selected: false,
    }))
    setFiles(prevFiles => [...prevFiles, ...newFiles])
    setIsUploadDialogOpen(false)
  }

  const toggleFileSelection = (fileId: string) => {
    if (!isBulkSelected) return
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, selected: !file.selected } : file
    ))
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900 p-4 flex justify-between items-center">
        <h1 className="text-4xl text-white font-bold">Files Section</h1>
        <div className="flex items-center gap-2 text-white">
          <button className="text-white hover:underline">Howdy, {userId}</button>
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <button className="p-2 hover:bg-slate-800 rounded-full">
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4">
          <div className="mb-8">
            <h2 className="text-gray-700 font-semibold mb-4">Dashboard</h2>
            <button className="flex items-center w-full text-left text-blue-600 hover:bg-blue-50 p-2 rounded">
              <Home className="w-4 h-4 mr-2" />
              All Files
            </button>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold mb-4">Shared with me</h2>
            <button className="flex items-center w-full text-left text-gray-600 hover:bg-gray-100 p-2 rounded mb-2">
              <Folder className="w-4 h-4 mr-2" />
              All Files
            </button>
            <button className="flex items-center w-full text-left text-gray-600 hover:bg-gray-100 p-2 rounded">
              <Trash2 className="w-4 h-4 mr-2" />
              Trash
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Action Buttons */}
          <div className="mb-6 flex gap-4">
            <button 
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleUploadClick}
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </button>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
              <Plus className="w-4 h-4" />
              New Folder
            </button>
            <div className="flex-1 flex gap-4">
              <input
                type="text"
                placeholder="Search Files"
                className="flex-1 px-4 py-2 border rounded"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="bg-gray-700 text-white px-8 py-2 rounded hover:bg-gray-600">
                Search
              </button>
            </div>
          </div>

          {/* File Browser Header */}
          <div className="flex items-center justify-between mb-4">
            <button className="text-blue-600 hover:underline">Home</button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isBulkSelected}
                  onChange={handleBulkSelectChange}
                  id="bulk-select"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="bulk-select">Bulk Select</label>
              </div>
              
              {isBulkSelected && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSelectAll}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={handleMoveTo}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    <MoveRight className="w-4 h-4" />
                    Move To
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:underline">{userEmail}</button>
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Log out</span>
              </button>
            </div>
          </div>

          {/* File List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div 
                  key={file.id} 
                  className={`bg-white p-4 rounded-lg shadow flex items-center cursor-pointer ${
                    file.selected ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-6 h-6 mr-2 text-yellow-500" />
                  ) : (
                    <File className="w-6 h-6 mr-2 text-blue-500" />
                  )}
                  <span className="truncate">{file.name}</span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-8">
                No files / Folders here. Upload a file or create a new folder.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* File Upload Dialog */}
      {isUploadDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-1/2 relative">
            <button
              onClick={() => setIsUploadDialogOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </button>
            <div className="p-6">
              <input
                type="file"
                multiple
                id="file-upload"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-gray-700 text-white px-8 py-2 rounded-md cursor-pointer hover:bg-gray-600"
              >
                Choose Files
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}