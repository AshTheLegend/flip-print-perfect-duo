
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { PrintConfig } from '@/pages/Index';

interface MarginSettingsProps {
  config: PrintConfig;
  onConfigChange: (config: PrintConfig) => void;
}

const MarginSettings: React.FC<MarginSettingsProps> = ({ config, onConfigChange }) => {
  const handleMarginChange = (side: keyof PrintConfig['margins'], value: number) => {
    onConfigChange({
      ...config,
      margins: {
        ...config.margins,
        [side]: value
      }
    });
  };

  const handleFitToPrintableAreaChange = (checked: boolean) => {
    if (checked) {
      onConfigChange({
        ...config,
        fitToPrintableArea: true,
        margins: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      });
    } else {
      onConfigChange({
        ...config,
        fitToPrintableArea: false
      });
    }
  };

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-semibold text-black">
          Margin Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="fit-to-printable"
            checked={config.fitToPrintableArea}
            onCheckedChange={handleFitToPrintableAreaChange}
          />
          <Label htmlFor="fit-to-printable" className="text-sm font-medium text-black">
            Fit to printable area
          </Label>
        </div>

        {!config.fitToPrintableArea && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="margin-top" className="text-sm font-medium text-black mb-2 block">
                Top: {config.margins.top}mm
              </Label>
              <Slider
                id="margin-top"
                min={0}
                max={50}
                step={1}
                value={[config.margins.top]}
                onValueChange={(value) => handleMarginChange('top', value[0])}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="margin-right" className="text-sm font-medium text-black mb-2 block">
                Right: {config.margins.right}mm
              </Label>
              <Slider
                id="margin-right"
                min={0}
                max={50}
                step={1}
                value={[config.margins.right]}
                onValueChange={(value) => handleMarginChange('right', value[0])}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="margin-bottom" className="text-sm font-medium text-black mb-2 block">
                Bottom: {config.margins.bottom}mm
              </Label>
              <Slider
                id="margin-bottom"
                min={0}
                max={50}
                step={1}
                value={[config.margins.bottom]}
                onValueChange={(value) => handleMarginChange('bottom', value[0])}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="margin-left" className="text-sm font-medium text-black mb-2 block">
                Left: {config.margins.left}mm
              </Label>
              <Slider
                id="margin-left"
                min={0}
                max={50}
                step={1}
                value={[config.margins.left]}
                onValueChange={(value) => handleMarginChange('left', value[0])}
                className="w-full"
              />
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-black mb-2">Margin Preview</h4>
          <div className="relative bg-white border-2 border-gray-300 w-full h-32 rounded">
            <div 
              className="absolute bg-pink-100 border border-pink-300 rounded"
              style={{
                top: `${(config.margins.top / 50) * 100}%`,
                right: `${(config.margins.right / 50) * 100}%`,
                bottom: `${(config.margins.bottom / 50) * 100}%`,
                left: `${(config.margins.left / 50) * 100}%`
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-xs text-pink-700 font-medium">
                Image Area
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {config.fitToPrintableArea 
              ? "Using standard printable area margins (10mm all sides)"
              : "Preview shows how margins affect image placement on paper"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginSettings;
