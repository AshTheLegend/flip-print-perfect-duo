
import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import PrintSettings from '@/components/PrintSettings';
import PreviewPanel from '@/components/PreviewPanel';
import MarginSettings from '@/components/MarginSettings';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generatePrintPDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

export interface PrintConfig {
  paperSize: 'A4' | 'A3';
  copies: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const Index = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [config, setConfig] = useState<PrintConfig>({
    paperSize: 'A4',
    copies: 1,
    margins: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  });
  const { toast } = useToast();

  const handleGeneratePDF = async () => {
    if (!frontImage || !backImage) {
      toast({
        title: "Missing Images",
        description: "Please upload both front and back images before generating PDF.",
        variant: "destructive"
      });
      return;
    }

    try {
      const pdfBlob = await generatePrintPDF(frontImage, backImage, config);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `papion-double-sided-print-${config.paperSize}-${config.copies}copies.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "PDF Generated!",
        description: "Your double-sided print PDF has been downloaded successfully."
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isReadyToGenerate = frontImage && backImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            PAPION Double Sided Print Prep
          </h1>
          <p className="text-lg text-gray-700">
            Prepare your images for perfect double-sided printing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Image Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ImageUpload
                title="Front Page"
                image={frontImage}
                onImageChange={setFrontImage}
                placeholder="Upload front page image"
              />
              <ImageUpload
                title="Back Page"
                image={backImage}
                onImageChange={setBackImage}
                placeholder="Upload back page image"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <PrintSettings config={config} onConfigChange={setConfig} />
              <MarginSettings config={config} onConfigChange={setConfig} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <PreviewPanel
              frontImage={frontImage}
              backImage={backImage}
              config={config}
            />
            
            <Button
              onClick={handleGeneratePDF}
              disabled={!isReadyToGenerate}
              className="w-full mt-6 h-12 text-lg font-semibold bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Generate PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
