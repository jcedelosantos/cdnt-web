import requests
import os

output_dir = "/home/ubuntu/cedanet_solutions/nextjs_space/public/assets/"

img = {
    "url": "https://cdn.abacus.ai/images/04c37198-397e-45a8-be01-f9bb88878bce.png",
    "filename": "infraestructura-oficinas.jpg",
    "description": "Infraestructura de oficinas (generada)"
}

try:
    print(f"Descargando: {img['description']}")
    response = requests.get(img['url'], timeout=30)
    response.raise_for_status()
    
    filepath = os.path.join(output_dir, img['filename'])
    with open(filepath, 'wb') as f:
        f.write(response.content)
    
    print(f"✓ Guardada: {img['filename']}")
    
except Exception as e:
    print(f"✗ Error: {str(e)}")

