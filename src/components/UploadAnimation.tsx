import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

interface Props {
  isUploading: boolean;
}

export const UploadAnimation: React.FC<Props> = ({ isUploading }) => {
  return (
    <div className="relative">
      <div
        className={`
          transform transition-all duration-500 ease-in-out
          ${isUploading ? 'scale-110' : 'scale-100'}
        `}
      >
        {isUploading ? (
          <div className="relative">
            <Upload className="w-8 h-8 text-blue-600" />
            <div className="absolute inset-0 animate-ping">
              <Upload className="w-8 h-8 text-blue-400 opacity-75" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <Upload className="w-8 h-8 text-blue-500 transition-colors duration-300 hover:text-blue-600" />
        )}
      </div>
    </div>
  );
};