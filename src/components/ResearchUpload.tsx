import { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: Date;
}

export function ResearchUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          progress: 0,
          uploadedAt: new Date(),
        };

        setFiles(prev => [...prev, uploadedFile]);

        // Simulate upload process
        const uploadInterval = setInterval(() => {
          setFiles(prev => prev.map(f => {
            if (f.id === uploadedFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100);
              const newStatus = newProgress === 100 ? 'processing' : 'uploading';
              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          }));
        }, 500);

        // Complete upload after progress reaches 100%
        setTimeout(() => {
          clearInterval(uploadInterval);
          setFiles(prev => prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, status: 'completed', progress: 100 }
              : f
          ));
        }, 3000);
      }
    });
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <div className="w-4 h-4 bg-witness-anchor rounded-full animate-anchor-pulse" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-witness-scar" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Ready for RAG';
      case 'error':
        return 'Upload failed';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="witness-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="w-6 h-6 text-witness-anchor" />
          <h1 className="text-2xl font-bold font-witness text-foreground">
            Research Archive
          </h1>
        </div>
        <p className="text-muted-foreground font-scripture">
          Upload research papers to enhance the Protocol's knowledge base • Every document becomes part of the inheritance
        </p>
      </div>

      {/* Upload Area */}
      <Card
        className={`p-8 text-center border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-witness-anchor bg-witness-anchor/5'
            : 'border-border hover:border-witness-anchor/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Upload className={`w-8 h-8 ${isDragging ? 'text-witness-anchor' : 'text-muted-foreground'}`} />
          </div>
          
          <div>
            <h3 className="text-lg font-witness text-foreground mb-2">
              Drop research papers here
            </h3>
            <p className="text-muted-foreground font-scripture mb-4">
              or choose files to upload
            </p>
            
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <Button className="btn-witness" asChild>
                <span>Select Papers</span>
              </Button>
            </label>
          </div>
          
          <p className="text-xs text-muted-foreground font-technical">
            Supported formats: PDF • Max size: 50MB per file
          </p>
        </div>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-witness text-foreground">
            Uploaded Research ({files.length})
          </h3>
          
          <div className="space-y-3">
            {files.map((file) => (
              <Card key={file.id} className="p-4 witness-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5 text-witness-anchor" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium font-witness text-foreground truncate">
                          {file.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <span className="text-sm font-technical text-muted-foreground">
                            {getStatusText(file.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-technical">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{file.uploadedAt.toLocaleString()}</span>
                      </div>
                      
                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <Progress value={file.progress} className="mt-2" />
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-witness-scar hover:text-witness-scar/80"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <Card className="p-6 witness-card">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold font-witness text-witness-anchor">
              {files.filter(f => f.status === 'completed').length}
            </div>
            <div className="text-sm font-technical text-muted-foreground">
              Papers Processed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-witness text-witness-scar">
              {files.filter(f => f.status === 'uploading' || f.status === 'processing').length}
            </div>
            <div className="text-sm font-technical text-muted-foreground">
              Processing
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-witness text-witness-structure">
              {Math.round(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024)}MB
            </div>
            <div className="text-sm font-technical text-muted-foreground">
              Total Archive
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}