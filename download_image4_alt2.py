import requests
import os

output_dir = "/home/ubuntu/cedanet_solutions/nextjs_space/public/assets/"

# Segunda alternativa - Wikipedia suele ser más accesible
img = {
    "url": "https://upload.wikimedia.org/wikipedia/commons/2/26/Datove_centrum_TCP.jpg",
    "filename": "infraestructura-oficinas.jpg",
    "description": "Infraestructura de oficinas - 1800x1201"
}

try:
    print(f"Descargando desde Wikipedia: {img['description']}")
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

