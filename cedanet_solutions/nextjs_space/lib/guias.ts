// Guías que responden búsquedas concretas ("beeper para restaurante", "menú QR", "entradas con QR")
// y llevan a la página de cada producto en integ.cedanet.net. Pedido del dueño el 2026-10-15, después
// de ver en Search Console que solo nos encontraban por el nombre ("cedanet", "integ").
//
// Los precios son los de la lista en pesos de integ-app (api/src/lib/azul-prices.ts). Si cambian allá,
// hay que cambiarlos acá también. Hey! Med es de uso NO clínico: nunca "atención médica".

export type SeccionGuia = { titulo: string; parrafos?: string[]; lista?: string[] }
export type PreguntaGuia = { pregunta: string; respuesta: string }

export type Guia = {
  slug: string
  producto: string
  urlProducto: string
  titulo: string
  tituloBuscador: string
  descripcion: string
  intro: string
  secciones: SeccionGuia[]
  preguntas: PreguntaGuia[]
  publicada: string
}

export const GUIAS: Guia[] = [
  {
    slug: 'beeper-digital-para-restaurantes',
    producto: 'Hey! Bee',
    urlProducto: 'https://integ.cedanet.net/hey-bee?src=guia',
    titulo: 'Beeper digital para restaurantes y food courts en República Dominicana',
    tituloBuscador: 'Beeper digital para restaurantes en RD: cómo funciona y precio',
    descripcion:
      'Cómo funciona un beeper digital en el celular del cliente, qué ventajas tiene frente al beeper físico y cuánto cuesta en República Dominicana.',
    intro:
      'Un beeper digital hace lo mismo que el aparato que vibra cuando la comida está lista, pero usa el celular del cliente. El cliente paga, escanea un código QR en el mostrador y se va a sentar. Cuando la orden está lista, su celular suena y pasa a retirarla.',
    secciones: [
      {
        titulo: 'Cómo funciona paso a paso',
        lista: [
          'El cliente paga en caja como siempre y recibe su recibo o ticket.',
          'Escanea el QR del mostrador con la cámara del celular. No descarga ninguna app.',
          'Escribe el número de su recibo y se va a sentar.',
          'Cuando la cocina marca la orden como lista en el tablero, el celular del cliente suena y le muestra el número.',
          'El local puede tener además una pantalla en TV con los números listos.',
        ],
      },
      {
        titulo: 'Beeper digital frente al beeper físico',
        parrafos: [
          'Los beepers físicos hay que comprarlos, cargarlos y reponerlos cuando se pierden o se dañan. Con un beeper digital el aparato es el celular que el cliente ya trae, y el local deja de manejar inventario de beepers.',
          'Tampoco hace falta gritar nombres ni números: el aviso le llega a la persona correcta aunque esté sentada lejos del mostrador, algo muy útil en food courts, plazas y ferias.',
        ],
      },
      {
        titulo: 'Para qué negocios sirve',
        lista: [
          'Food courts y plazas de comida.',
          'Comida rápida y cafeterías de mostrador.',
          'Ferias, eventos y puestos temporales.',
          'Restaurantes que despachan comida para llevar.',
        ],
      },
      {
        titulo: 'Pedidos para retirar desde Instagram o WhatsApp',
        parrafos: [
          'Con Hey! Bee el local también puede compartir un enlace en su Instagram o WhatsApp. El cliente pide antes de llegar, el local confirma la orden y el cliente la retira con un código, sin hacer fila.',
        ],
      },
      {
        titulo: 'Cuánto cuesta en República Dominicana',
        parrafos: [
          'Hey! Bee cuesta RD$1,500 al mes por sucursal, con ITBIS incluido y sin contrato, o RD$16,000 al año pagando por adelantado. No hay que comprar equipos: funciona con el celular del cliente y cualquier tableta o computadora para el personal. Hay una prueba gratis de 7 días, sin tarjeta.',
        ],
      },
    ],
    preguntas: [
      { pregunta: '¿El cliente necesita descargar una app?', respuesta: 'No. Escanea el QR con la cámara del celular y el aviso le llega en el navegador.' },
      { pregunta: '¿Funciona con mi caja o punto de venta actual?', respuesta: 'Sí. Hey! Bee no reemplaza tu sistema de cobro: el cliente paga como siempre y usa el número de su recibo.' },
      { pregunta: '¿Y si tengo restaurante con mesas?', respuesta: 'Para restaurantes con mesas está Hey! Rest, que incluye el mostrador de Hey! Bee sin costo extra.' },
    ],
    publicada: '2026-10-15',
  },
  {
    slug: 'menu-qr-para-restaurantes',
    producto: 'Hey! Rest',
    urlProducto: 'https://integ.cedanet.net/hey-rest?src=guia',
    titulo: 'Menú QR para restaurantes en República Dominicana',
    tituloBuscador: 'Menú QR para restaurantes en RD: cómo funciona y precio',
    descripcion:
      'Qué es un menú QR, cómo se instala en las mesas de un restaurante, cómo llamar al mesero y pedir la cuenta desde el celular, y cuánto cuesta en RD.',
    intro:
      'Un menú QR es un código pegado en cada mesa que el cliente escanea con la cámara del celular para ver el menú. Con Hey! Rest ese mismo QR sirve además para llamar al mesero, hacer pedidos y pedir la cuenta, y el personal lo ve todo en un tablero en vivo.',
    secciones: [
      {
        titulo: 'Qué puede hacer el cliente desde la mesa',
        lista: [
          'Ver el menú con descripciones y precios, organizado por categorías.',
          'Llamar al mesero con un toque, sin tener que levantar la mano.',
          'Pedir al bar o a la cocina.',
          'Pedir la cuenta y elegir cómo pagar: efectivo, tarjeta o transferencia con comprobante.',
          'Calificar el servicio al terminar.',
        ],
      },
      {
        titulo: 'Qué ve el personal',
        parrafos: [
          'Cada solicitud aparece en un tablero en vivo con el número de mesa y el tiempo que lleva esperando. Así el equipo sabe qué mesa atender primero, y el dueño puede ver los tiempos de respuesta del día y las calificaciones de los clientes.',
        ],
      },
      {
        titulo: 'Cómo se instala',
        lista: [
          'Se crea la cuenta del restaurante y se carga el menú (también se puede importar).',
          'Se registran las mesas y se imprime un QR para cada una.',
          'El personal entra al tablero desde una tableta, computadora o celular.',
          'No hace falta cambiar el punto de venta: Hey! Rest lo complementa.',
        ],
      },
      {
        titulo: 'Cuánto cuesta en República Dominicana',
        parrafos: [
          'Hey! Rest cuesta RD$2,000 al mes con hasta 25 mesas incluidas y RD$100 por cada mesa adicional, con ITBIS incluido y sin contrato. Incluye el mostrador de Hey! Bee para comida para llevar. Hay un restaurante de ejemplo para probarlo sin registrarse y una prueba gratis de 7 días, sin tarjeta.',
        ],
      },
    ],
    preguntas: [
      { pregunta: '¿El cliente tiene que descargar una app?', respuesta: 'No. Escanea el QR de la mesa con la cámara y se abre en el navegador del celular.' },
      { pregunta: '¿Reemplaza a los meseros?', respuesta: 'No. Les ayuda a atender mejor: saben qué mesa pidió qué y cuánto lleva esperando.' },
      { pregunta: '¿Puedo cambiar el menú cuando quiera?', respuesta: 'Sí. Los cambios de platos y precios se ven al momento en todas las mesas.' },
    ],
    publicada: '2026-10-15',
  },
  {
    slug: 'entradas-con-qr-para-eventos',
    producto: 'INTEG',
    urlProducto: 'https://integ.cedanet.net/site-web?src=guia',
    titulo: 'Entradas con QR y control de acceso para eventos en República Dominicana',
    tituloBuscador: 'Entradas con QR para eventos en RD: venta y control de acceso',
    descripcion:
      'Cómo vender entradas con código QR, registrar invitados y validar el acceso en varias puertas a la vez en un evento en República Dominicana, y cuánto cuesta.',
    intro:
      'Con entradas QR cada asistente recibe un código único por correo y lo muestra en la puerta desde el celular. El personal lo escanea y en un segundo sabe si la entrada es válida o si ya se usó. INTEG reúne la venta, el registro de invitados y el control de acceso en un solo lugar.',
    secciones: [
      {
        titulo: 'Cómo funciona',
        lista: [
          'Creas el evento con fecha, lugar, tipos de entrada y, si quieres, un mapa de asientos.',
          'Vendes en línea o abres un formulario de registro para socios o invitados.',
          'Cada asistente recibe su entrada con QR por correo automáticamente.',
          'En la puerta, uno o varios escáneres validan las entradas al mismo tiempo.',
          'Ves en tiempo real cuántos han entrado, las ventas y el aforo.',
        ],
      },
      {
        titulo: 'Ventajas frente a la boleta impresa',
        parrafos: [
          'Una entrada QR no se puede duplicar: cada código se valida una sola vez, así que la fotocopia o la captura reenviada no entra dos veces. Tampoco hay que imprimir boletas ni llevar listas en papel, y al final del evento tienes el reporte de asistencia completo.',
        ],
      },
      {
        titulo: 'Para qué eventos sirve',
        lista: [
          'Conferencias, congresos y eventos corporativos.',
          'Fiestas, conciertos y actividades de clubes.',
          'Torneos, carreras y eventos deportivos.',
          'Actividades de colegios, iglesias y asociaciones con registro.',
        ],
      },
      {
        titulo: 'Cuánto cuesta en República Dominicana',
        parrafos: [
          'INTEG tiene planes mensuales en pesos con ITBIS incluido: Básico RD$3,500 (hasta 75 asistentes por evento), Intermedio RD$6,000 (hasta 200) y Avanzado RD$10,500 (hasta 500). Para un solo evento sin mensualidad, desde RD$6,500 hasta 100 asistentes. Pagando el año completo se ahorra un 10%.',
        ],
      },
    ],
    preguntas: [
      { pregunta: '¿Los asistentes necesitan una app?', respuesta: 'No. Reciben la entrada por correo y la muestran desde el celular, o impresa.' },
      { pregunta: '¿Puedo validar en varias puertas a la vez?', respuesta: 'Sí. Varios escáneres trabajan al mismo tiempo y una entrada usada en una puerta queda marcada en todas.' },
      { pregunta: '¿Puedo hacer un solo evento sin pagar mensualidad?', respuesta: 'Sí. El plan de evento único se paga una sola vez según la cantidad de asistentes.' },
    ],
    publicada: '2026-10-15',
  },
  {
    slug: 'solicitudes-de-pacientes-por-qr',
    producto: 'Hey! Med',
    urlProducto: 'https://integ.cedanet.net/hey-med?src=guia',
    titulo: 'Solicitudes del paciente por QR desde la habitación',
    tituloBuscador: 'Solicitudes del paciente por QR en clínicas de RD',
    descripcion:
      'Cómo una clínica u hospital recibe por QR las solicitudes no clínicas del paciente (limpieza, mantenimiento, cafetería, hotelería) y mide los tiempos de respuesta.',
    intro:
      'En muchas clínicas, cuando un paciente necesita una toalla, que arreglen el aire o que le suban la comida, la solicitud pasa por el timbre de enfermería o por una llamada que nadie registra. Con un QR en la habitación, el paciente o su acompañante pide el servicio y la solicitud llega directo al departamento que le toca.',
    secciones: [
      {
        titulo: 'Qué se puede pedir',
        parrafos: [
          'Solo solicitudes no clínicas: hotelería (toallas, almohadas, artículos de higiene), limpieza, mantenimiento (aire acondicionado, TV, luz, baño) y cafetería. Hey! Med no reemplaza el sistema de llamado de enfermería ni se usa para necesidades médicas.',
        ],
      },
      {
        titulo: 'Cómo funciona',
        lista: [
          'Cada habitación tiene su QR.',
          'El paciente o su acompañante lo escanea con el celular y elige qué necesita. No descarga ninguna app.',
          'La solicitud llega solo al departamento correspondiente.',
          'El tablero por piso muestra con colores cuánto lleva esperando cada habitación.',
          'Al cerrar, el paciente califica el servicio y, si la nota es baja, dice el motivo.',
        ],
      },
      {
        titulo: 'Qué gana la clínica',
        lista: [
          'Menos interrupciones al personal de enfermería por temas que no son clínicos.',
          'Tiempos de respuesta medidos por departamento.',
          'Calificaciones de los pacientes con el motivo concreto para mejorar.',
        ],
      },
      {
        titulo: 'Cuánto cuesta en República Dominicana',
        parrafos: [
          'Hey! Med cuesta RD$4,500 al mes con hasta 20 habitaciones incluidas y RD$300 por habitación adicional, con ITBIS incluido. Hay una prueba gratis de 7 días, sin tarjeta.',
        ],
      },
    ],
    preguntas: [
      { pregunta: '¿Reemplaza el llamado de enfermería?', respuesta: 'No. Hey! Med es solo para solicitudes no clínicas: hotelería, limpieza, mantenimiento y cafetería.' },
      { pregunta: '¿El paciente necesita una app?', respuesta: 'No. Escanea el QR de la habitación con la cámara del celular.' },
    ],
    publicada: '2026-10-15',
  },
]

export function guiaPorSlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug)
}
