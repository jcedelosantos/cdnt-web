import requests
import os

# Directorio de destino
output_dir = "/home/ubuntu/cedanet_solutions/nextjs_space/public/assets/"

# Imágenes a descargar con sus URLs y nombres
images = [
    {
        "url": "https://cdn11.bigcommerce.com/s-vlgafmoq9r/product_images/uploaded_images/rising-rack-server.jpg",
        "filename": "racks-organizados.jpg",
        "description": "Organización de racks de red - 960x698 (4:3)"
    },
    {
        "url": "https://www.dashlane.com/_next/image?url=https%3A%2F%2Fripleyprd.wpenginepowered.com%2Fwp-content%2Fuploads%2F2024%2F02%2FWhat-is-network-segmentation-1024x788.png&w=3840&q=90",
        "filename": "segmentacion-redes.png",
        "description": "Segmentación de redes corporativas - 1024x788 (4:3)"
    },
    {
        "url": "https://downtoearthtech.net/media/blog/it-network-support-technician.jpg",
        "filename": "soporte-tecnico.jpg",
        "description": "Soporte tecnológico empresarial - 960x720 (4:3 perfecto)"
    },
    {
        "url": "https://www.supermicro.com/sites/default/files/content_resources/static_resources/solutions/dcbbs/v2/data-center-fit-out-service.jpg",
        "filename": "infraestructura-oficinas.jpg",
        "description": "Infraestructura de oficinas - 883x600 (cerca de 4:3)"
    }
]

# Descargar cada imagen
for img in images:
    try:
        print(f"Descargando: {img['description']}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(img['url'], headers=headers, timeout=30)
        response.raise_for_status()
        
        filepath = os.path.join(output_dir, img['filename'])
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Guardada: {img['filename']}")
        
    except Exception as e:
        print(f"✗ Error descargando {img['filename']}: {str(e)}")

print("\n¡Descarga completada!")
