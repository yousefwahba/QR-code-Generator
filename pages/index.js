import Head from 'next/head';
import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import QRCode from 'react-qr-code';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function Home() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setCopied(false);
  };

  const handleDownloadClick = () => {
    // Generate data URL for QR code image
    const qrCodeSvg = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
    const canvas = document.createElement('canvas');
    const svgSize = qrCodeSvg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.width = svgSize.width; //need to handle that
    img.height = svgSize.height;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');

      // Create link element and click it to download QR code image
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'qr-code.png';
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">
          QR Code Generator
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter URL here"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full mr-4"
          />
          <QRCode value={url} size={64} />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleDownloadClick}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
