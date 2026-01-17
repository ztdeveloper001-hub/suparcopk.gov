
import React, { useState } from 'react';
import { Share2, Camera, Download, Settings, X } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareButtonProps {
  title: string;
  text: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, className }) => {
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState({
    addWatermark: true,
    addTimestamp: true,
    quality: 0.95,
    format: 'png' as 'png' | 'jpeg'
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(`${title}: ${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  const takeScreenshot = async () => {
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => {
          // Ignore certain elements that might interfere
          return element.classList.contains('screenshot-ignore');
        }
      });

      const ctx = canvas.getContext('2d');
      if (ctx && customizations.addWatermark) {
        // Add SUPARCO watermark
        ctx.fillStyle = 'rgba(0, 33, 71, 0.1)';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SUPARCO', canvas.width / 2, canvas.height / 2);
      }

      if (ctx && customizations.addTimestamp) {
        // Add timestamp
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.font = '16px Arial';
        ctx.textAlign = 'right';
        const timestamp = new Date().toLocaleString();
        ctx.fillText(`Captured: ${timestamp}`, canvas.width - 20, canvas.height - 20);
      }

      const imageData = canvas.toDataURL(`image/${customizations.format}`, customizations.quality);
      setCapturedImage(imageData);
      setShowScreenshotModal(true);
    } catch (error) {
      console.error('Screenshot failed:', error);
      alert('Failed to capture screenshot. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadImage = () => {
    if (!capturedImage) return;

    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `suparco-${Date.now()}.${customizations.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async () => {
    if (!capturedImage) return;

    try {
      // Convert base64 to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `suparco-screenshot.${customizations.format}`, { type: `image/${customizations.format}` });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'SUPARCO Website Screenshot',
          text: 'Check out this SUPARCO website screenshot!',
          files: [file]
        });
      } else {
        // Fallback to download
        downloadImage();
        alert('Image downloaded! Sharing not supported on this device.');
      }
    } catch (error) {
      console.error('Share failed:', error);
      downloadImage();
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
          title="Share Link"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button
          onClick={takeScreenshot}
          disabled={isCapturing}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className} ${isCapturing ? 'opacity-50' : ''}`}
          title="Take Screenshot"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>

      {/* Screenshot Modal */}
      {showScreenshotModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowScreenshotModal(false)} />
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

            {/* Header */}
            <div className="bg-[#002147] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Camera className="w-6 h-6" />
                <div>
                  <h3 className="font-black text-lg">Website Screenshot</h3>
                  <p className="text-xs opacity-80">Customize and share your capture</p>
                </div>
              </div>
              <button onClick={() => setShowScreenshotModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors" aria-label="Close screenshot modal">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Customization Panel */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Settings className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-[#002147] dark:text-white">Customize</h4>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={customizations.addWatermark}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, addWatermark: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-sm font-medium">Add SUPARCO Watermark</span>
                    </label>

                    <label className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={customizations.addTimestamp}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, addTimestamp: e.target.checked }))}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-sm font-medium">Add Timestamp</span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium mb-2">Quality: {Math.round(customizations.quality * 100)}%</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={customizations.quality}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="format-select" className="block text-sm font-medium mb-2">Format</label>
                      <select
                        id="format-select"
                        value={customizations.format}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, format: e.target.value as 'png' | 'jpeg' }))}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        aria-describedby="format-description"
                      >
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                      </select>
                      <div id="format-description" className="text-xs text-gray-500 mt-1">Choose image format (PNG for transparency, JPEG for smaller files)</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-3">
                    <button
                      onClick={downloadImage}
                      className="w-full py-3 bg-[#002147] text-white rounded-xl font-bold flex items-center justify-center space-x-2 space-x-reverse hover:opacity-90 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={shareImage}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 space-x-reverse hover:opacity-90 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4">
                    <h4 className="font-bold text-[#002147] dark:text-white mb-4">Preview</h4>
                    {capturedImage && (
                      <div className="relative">
                        <img
                          src={capturedImage}
                          alt="Website Screenshot"
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {customizations.format.toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
