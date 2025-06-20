
import jsPDF from 'jspdf';
import { PrintConfig } from '@/pages/Index';

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const generatePrintPDF = async (
  frontImage: string,
  backImage: string,
  config: PrintConfig
): Promise<Blob> => {
  const { paperSize, copies } = config;
  
  // Paper dimensions in mm
  const paperDimensions = {
    A4: { width: 210, height: 297 },
    A3: { width: 297, height: 420 }
  };
  
  const dimensions = paperDimensions[paperSize];
  
  // Create PDF with specified paper size
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [dimensions.width, dimensions.height]
  });

  // Load images
  const frontImg = await loadImage(frontImage);
  const backImg = await loadImage(backImage);

  // Calculate image dimensions to fit page while maintaining aspect ratio
  const getImageDimensions = (img: HTMLImageElement) => {
    const imgAspectRatio = img.width / img.height;
    const pageAspectRatio = dimensions.width / dimensions.height;
    
    let width, height;
    
    if (imgAspectRatio > pageAspectRatio) {
      // Image is wider relative to page
      width = dimensions.width - 20; // 10mm margin on each side
      height = width / imgAspectRatio;
    } else {
      // Image is taller relative to page
      height = dimensions.height - 20; // 10mm margin on top and bottom
      width = height * imgAspectRatio;
    }
    
    return {
      width,
      height,
      x: (dimensions.width - width) / 2,
      y: (dimensions.height - height) / 2
    };
  };

  const frontDimensions = getImageDimensions(frontImg);
  const backDimensions = getImageDimensions(backImg);

  // Generate pages
  for (let copy = 0; copy < copies; copy++) {
    // Add front page (odd page number)
    if (copy > 0) pdf.addPage();
    
    pdf.addImage(
      frontImg,
      'JPEG',
      frontDimensions.x,
      frontDimensions.y,
      frontDimensions.width,
      frontDimensions.height
    );

    // Add back page (even page number)
    pdf.addPage();
    
    pdf.addImage(
      backImg,
      'JPEG',
      backDimensions.x,
      backDimensions.y,
      backDimensions.width,
      backDimensions.height
    );
  }

  return pdf.output('blob');
};
