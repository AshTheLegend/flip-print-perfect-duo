
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrintConfig } from '@/pages/Index';

interface PreviewPanelProps {
  frontImage: string | null;
  backImage: string | null;
  config: PrintConfig;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ frontImage, backImage, config }) => {
  const totalPages = config.copies * 2;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Print Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Paper Size:</span>
            <span className="font-medium">{config.paperSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Copies:</span>
            <span className="font-medium">{config.copies}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Pages:</span>
            <span className="font-medium">{totalPages}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3">Page Layout</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              const isOdd = pageNumber % 2 === 1;
              const currentImage = isOdd ? frontImage : backImage;
              const pageType = isOdd ? 'Front' : 'Back';

              return (
                <div key={pageNumber} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800">
                    {pageNumber}
                  </div>
                  <div className="flex-shrink-0 w-12 h-16 bg-white border rounded shadow-sm overflow-hidden">
                    {currentImage && (
                      <img
                        src={currentImage}
                        alt={`Page ${pageNumber}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{pageType}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentImage ? 'Image loaded' : 'No image'}
                    </p>
                  </div>
                </div>
              );
            })}
            {totalPages > 6 && (
              <div className="text-center text-xs text-gray-500 py-2">
                ... and {totalPages - 6} more pages
              </div>
            )}
          </div>
        </div>

        {(!frontImage || !backImage) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              Upload both front and back images to generate your PDF
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
