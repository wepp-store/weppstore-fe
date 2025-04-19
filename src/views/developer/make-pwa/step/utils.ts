export const getManifest = (values: any) =>
  `
{
  "name": "${values.name}",
  "short_name": "${values.shortName}",
  "start_url": "${values.startUrl}",
  "display": "${values.display}",
  "description": "${values.description}",
  "background_color": "${values.backgroundColor}",
  "theme_color": "${values.themeColor}",
  "icons": [
    {
      "src": "/icons/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
`.trim();

export const resizeManifestIcons = (
  file: File
): Promise<
  {
    src: string;
    sizes: string;
    type: string;
  }[]
> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const sizes = [48, 72, 96, 144, 192, 256, 384, 512];
        const resizedIcons = sizes.map((size) => {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          ctx?.drawImage(img, 0, 0, size, size);
          return {
            src: canvas.toDataURL('image/png'),
            sizes: `${size}x${size}`,
            type: 'image/png',
          };
        });

        resolve(resizedIcons);
      };

      img.onerror = (err) => {
        reject(err);
      };
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};
