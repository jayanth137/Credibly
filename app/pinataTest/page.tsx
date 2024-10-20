'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert('No file selected');
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.append('file', file); // Use append instead of set
      const uploadRequest = await fetch('/api/files', {
        method: 'POST',
        body: data,
      });

      if (!uploadRequest.ok) {
        throw new Error('Upload failed');
      }

      const signedUrl = await uploadRequest.json();
      console.log('Signed URL:', signedUrl);
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      <input type="file" onChange={handleChange} />
      <button disabled={uploading} onClick={uploadFile}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {url && <p>File uploaded: {url}</p>}
    </main>
  );
}
