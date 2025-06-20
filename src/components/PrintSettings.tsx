
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PrintConfig } from '@/pages/Index';

interface PrintSettingsProps {
  config: PrintConfig;
  onConfigChange: (config: PrintConfig) => void;
}

const PrintSettings: React.FC<PrintSettingsProps> = ({ config, onConfigChange }) => {
  const handlePaperSizeChange = (value: 'A4' | 'A3') => {
    onConfigChange({ ...config, paperSize: value });
  };

  const handleCopiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copies = Math.max(1, Math.min(100, parseInt(event.target.value) || 1));
    onConfigChange({ ...config, copies });
  };

  return (
    <Card className="border-pink-200">
      <CardHeader className="bg-pink-50">
        <CardTitle className="text-lg font-semibold text-black">
          Print Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="paper-size" className="text-sm font-medium text-black">
              Paper Size
            </Label>
            <Select value={config.paperSize} onValueChange={handlePaperSizeChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select paper size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                <SelectItem value="A3">A3 (297 × 420 mm)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="copies" className="text-sm font-medium text-black">
              Number of Copies
            </Label>
            <Input
              id="copies"
              type="number"
              min="1"
              max="100"
              value={config.copies}
              onChange={handleCopiesChange}
              className="mt-2"
              placeholder="1"
            />
          </div>
        </div>

        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-4">
          <h4 className="font-medium text-fuchsia-900 mb-2">Print Instructions</h4>
          <ul className="text-sm text-fuchsia-800 space-y-1">
            <li>• Odd pages (1, 3, 5...) contain your front image</li>
            <li>• Even pages (2, 4, 6...) contain your back image</li>
            <li>• Print odd pages first, then flip and print even pages</li>
            <li>• Total pages: {config.copies * 2}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintSettings;
