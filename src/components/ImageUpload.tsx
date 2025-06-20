
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  title: string;
  image: string | null;
  onImageChange: (image: string | null) => void;
  placeholder: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  image,
  onImageChange,
  placeholder
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="h-full border-gray-200 bg-white">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-semibold text-black">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
            image
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-300 bg-gray-50 hover:border-pink-400 hover:bg-pink-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-contain rounded-lg"
              />
              <Button
                onClick={removeImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-pink-400 mb-4" />
              <p className="text-sm text-black mb-4">{placeholder}</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mb-2 border-gray-300 text-black hover:bg-pink-50"
              >
                Choose File
              </Button>
              <p className="text-xs text-gray-600">or drag and drop here</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
