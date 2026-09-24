import requests
import os

output_dir = "/home/ubuntu/cedanet_solutions/nextjs_space/public/assets/"

# Alternativa para la cuarta imagen
img = {
    "url": "https://www.beacontelecom.com/wp-content/uploads/2019/11/DataCenter.jpg",
    "filename": "infraestructura-oficinas.jpg",
    "description": "Infraestructura de oficinas - 800x517"
}

try:
    print(f"Descargando alternativa: {img['description']}")
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
    print(f"✗ Error: {str(e)}")

