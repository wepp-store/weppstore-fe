import Image from 'next/image';
import styles from './page.module.css';
import MainSection from '@/sections/main/MainSection';
import { MainLayout } from '@/layouts/main';

export default function Home() {
  async function uploadFile(e: any) {
    const file = e.target.files[0];
    const response = await fetch('http://localhost:8000/api/v1/wepp/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="filename.png"',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE5OTM0NjkxLCJleHAiOjE3MTk5MzgyOTF9.Za_7u3VBwU_UVXn_F3IP6T4Nn9jcPGjOZYpFW6Ban88',
      },
      body: file,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } else {
      console.error('File upload failed:', response.statusText);
    }
  }

  return (
    <MainLayout>
      <MainSection />
      <div
        style={{
          backgroundColor: '#f9f9f9',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {/* <input type="file" onChange={uploadFile} /> */}
      </div>
    </MainLayout>
  );
}
