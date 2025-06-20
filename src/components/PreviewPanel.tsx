
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
    <Card className="border-gray-200 bg-white">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-semibold text-black">
          Print Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="text-sm text-black space-y-1">
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

        {/* Front Page Preview with margins */}
        {frontImage && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-black mb-3">Front Page Preview</h4>
            <div className="relative bg-gray-100 border-2 border-gray-300 w-full h-48 rounded shadow-sm overflow-hidden">
              {config.fitToPrintableArea ? (
                <div className="w-full h-full p-4 bg-white border-4 border-gray-200">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={frontImage}
                      alt="Front page preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div 
                  className="absolute overflow-hidden flex items-center justify-center"
                  style={{
                    top: `${(config.margins.top / 50) * 100}%`,
                    right: `${(config.margins.right / 50) * 100}%`,
                    bottom: `${(config.margins.bottom / 50) * 100}%`,
                    left: `${(config.margins.left / 50) * 100}%`
                  }}
                >
                  <img
                    src={frontImage}
                    alt="Front page preview with custom margins"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {config.fitToPrintableArea 
                ? "White borders show printable area margins (10mm all sides)"
                : `Custom margins: T${config.margins.top} R${config.margins.right} B${config.margins.bottom} L${config.margins.left}mm`
              }
            </p>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-medium text-black mb-3">Page Layout</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              const isOdd = pageNumber % 2 === 1;
              const currentImage = isOdd ? frontImage : backImage;
              const pageType = isOdd ? 'Front' : 'Back';

              return (
                <div key={pageNumber} className="flex items-center gap-3 p-2 bg-pink-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-xs font-medium text-pink-800">
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
                    <p className="text-sm font-medium text-black">{pageType}</p>
                    <p className="text-xs text-gray-600 truncate">
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
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
            <p className="text-sm text-pink-800">
              Upload both front and back images to generate your PDF
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
