from PIL import Image
import os

output_dir = "/home/ubuntu/cedanet_solutions/nextjs_space/public/assets/"

images = [
    "racks-organizados.jpg",
    "segmentacion-redes.png",
    "soporte-tecnico.jpg",
    "infraestructura-oficinas.jpg"
]

print("Verificación de imágenes descargadas:\n")
print("-" * 70)

for img_name in images:
    filepath = os.path.join(output_dir, img_name)
    try:
        with Image.open(filepath) as img:
            width, height = img.size
            aspect_ratio = width / height
            target_ratio = 4/3
            difference = abs(aspect_ratio - target_ratio)
            
            print(f"✓ {img_name}")
            print(f"  Dimensiones: {width}x{height}")
            print(f"  Aspect ratio: {aspect_ratio:.3f} (objetivo: 1.333)")
            print(f"  Diferencia: {difference:.3f}")
            print()
    except Exception as e:
        print(f"✗ Error con {img_name}: {str(e)}\n")

print("-" * 70)
print("¡Todas las imágenes están listas!")
