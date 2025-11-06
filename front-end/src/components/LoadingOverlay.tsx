import React from 'react';
import { Spinner } from '@heroui/react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Spinner color="warning" size="lg" />
    </div>
  );
};

export default LoadingOverlay;