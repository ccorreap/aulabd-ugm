export interface RequirementItem {
  id: string;
  statement: string;
  type: 'Funcional' | 'No Funcional';
  justification: string;
  category: 'Seguridad' | 'Operación' | 'Rendimiento' | 'Gestión de Datos';
}

export interface CanvasBlock {
  id: string;
  name: string;
  number: number;
  description: string;
  netflixExample: string;
  dbRelation: string;
  icon: string;
}

export const CLASS_2_CANVAS_BLOCKS: CanvasBlock[] = [
  {
    id: 'b1',
    number: 1,
    name: 'Propuesta de Valor',
    description: '¿Qué valor entregamos al cliente? El núcleo del modelo de negocio.',
    netflixExample: 'Streaming ilimitado de películas y series sin anuncios, accesible en cualquier dispositivo con recomendación personalizada.',
    dbRelation: 'Define el catálogo de contenidos y algoritmos que consultan la base de datos de películas.',
    icon: 'Sparkles'
  },
  {
    id: 'b2',
    number: 2,
    name: 'Segmentos de Clientes',
    description: '¿Para quién creamos valor? ¿Quiénes son nuestros clientes más importantes?',
    netflixExample: 'Mercado masivo: familias, cinéfilos, personas que buscan sustituir el cable tradicional.',
    dbRelation: 'Se traduce en la tabla `Usuarios` y `Perfiles` con atributos demográficos y preferencias.',
    icon: 'Users'
  },
  {
    id: 'b3',
    number: 3,
    name: 'Canales',
    description: '¿A través de qué canales hacemos llegar nuestra propuesta de valor?',
    netflixExample: 'Aplicaciones móviles (iOS/Android), web (Netflix.com), Smart TVs, decodificadores y consolas.',
    dbRelation: 'Determina las APIs y endpoints que interactúan y leen de la base de datos central.',
    icon: 'Tv'
  },
  {
    id: 'b4',
    number: 4,
    name: 'Relación con los Clientes',
    description: '¿Qué tipo de vínculo establecemos con cada segmento de clientes?',
    netflixExample: 'Servicio automatizado y autoservicio, con soporte digital y recomendaciones algorítmicas.',
    dbRelation: 'Historial de visualización y logs de actividad que alimentan la personalización en la BD.',
    icon: 'HeartHandshake'
  },
  {
    id: 'b5',
    number: 5,
    name: 'Fuentes de Ingresos',
    description: '¿Cómo y cuánto están dispuestos a pagar nuestros clientes?',
    netflixExample: 'Planes de suscripción mensual recurrente (Básico, Estándar, Premium con 4K).',
    dbRelation: 'Tablas de `Suscripciones`, `Facturación`, `Planes` y pagos procesados.',
    icon: 'CreditCard'
  },
  {
    id: 'b6',
    number: 6,
    name: 'Recursos Clave',
    description: '¿Qué activos esenciales requiere la propuesta de valor?',
    netflixExample: 'Contenido propio (Netflix Originals), algoritmo de recomendación, infraestructura de streaming y servidores de BD.',
    dbRelation: 'La base de datos relacional y cluster de almacenamiento son los recursos clave de información.',
    icon: 'Database'
  },
  {
    id: 'b7',
    number: 7,
    name: 'Actividades Clave',
    description: '¿Qué acciones críticas debemos realizar para que el negocio funcione?',
    netflixExample: 'Producción y licencia de contenidos, desarrollo y mantenimiento de software, optimización de servidores.',
    dbRelation: 'Optimización de consultas SQL, creación de índices, respaldos periódicos y mantenimiento del SGBD.',
    icon: 'Zap'
  },
  {
    id: 'b8',
    number: 8,
    name: 'Socios Clave',
    description: '¿Quiénes son nuestros aliados y proveedores estratégicos?',
    netflixExample: 'Estudios cinematográficos, proveedores de servicios en la nube (AWS), fabricantes de Smart TVs y procesadores de pago.',
    dbRelation: 'Integraciones e intercambio de datos mediante webhooks y servicios externos.',
    icon: 'Building2'
  },
  {
    id: 'b9',
    number: 9,
    name: 'Estructura de Costes',
    description: '¿Cuáles son los principales gastos para sostener la operación?',
    netflixExample: 'Licencias y derechos de autor, costos de infraestructura en la nube/servidores, marketing y sueldos de ingeniería.',
    dbRelation: 'Monitoreo de costos de almacenamiento de datos por terabyte y consumo de cómputo en la nube.',
    icon: 'Calculator'
  }
];

export const REQUIREMENTS_PRACTICE_ITEMS: RequirementItem[] = [
  {
    id: 'r1',
    statement: 'El sistema debe permitir que el alumno matriculado registre su postulación a asignaturas mediante un formulario web.',
    type: 'Funcional',
    justification: 'Es una función específica y observable que el software realiza: "El QUÉ" debe hacer el sistema para atender al usuario.',
    category: 'Operación'
  },
  {
    id: 'r2',
    statement: 'Todas las contraseñas de los usuarios deben ser almacenadas en SQL Server con encriptación hash SHA-256 o superior.',
    type: 'No Funcional',
    justification: 'Es un atributo de calidad y seguridad ("El CÓMO"). No describe una acción visible del usuario, sino una restricción técnica.',
    category: 'Seguridad'
  },
  {
    id: 'r3',
    statement: 'La base de datos debe generar un reporte diario en PDF con las transacciones de ventas consolidadas.',
    type: 'Funcional',
    justification: 'Es una salida directa de información y una función que el software procesa a solicitud.',
    category: 'Gestión de Datos'
  },
  {
    id: 'r4',
    statement: 'El sistema gestor de base de datos debe responder las consultas de búsqueda de productos en menos de 1.5 segundos.',
    type: 'No Funcional',
    justification: 'Es un requisito de rendimiento y eficiencia temporal medible numéricamente.',
    category: 'Rendimiento'
  },
  {
    id: 'r5',
    statement: 'La plataforma debe soportar al menos 500 alumnos conectados concurrentemente sin caída del servicio.',
    type: 'No Funcional',
    justification: 'Es un atributo de escalabilidad y capacidad de concurrencia de la infraestructura.',
    category: 'Rendimiento'
  },
  {
    id: 'r6',
    statement: 'El docente debe poder calificar las evaluaciones con notas de 1.0 a 7.0 y publicar retroalimentación a cada grupo.',
    type: 'Funcional',
    justification: 'Describe una acción operativa concreta que un rol específico puede ejecutar en la plataforma.',
    category: 'Operación'
  }
];

export const SDLC_STAGES = [
  { step: 1, name: 'Planificación', desc: 'Investigación preliminar, factibilidad y delimitación del alcance.' },
  { step: 2, name: 'Análisis', desc: 'Determinación y levantamiento de requerimientos con el cliente (El QUÉ).' },
  { step: 3, name: 'Diseño', desc: 'Modelado conceptual (E/R), lógico y físico de la base de datos (El CÓMO).' },
  { step: 4, name: 'Implementación', desc: 'Desarrollo de software y creación de tablas/scripts DDL en SQL Server.' },
  { step: 5, name: 'Prueba', desc: 'Pruebas de integridad referencial, rendimiento, seguridad y validación de datos.' },
  { step: 6, name: 'Instalación o Despliegue', desc: 'Puesta en marcha, migración de datos y evaluación inicial en producción.' },
  { step: 7, name: 'Uso y Mantenimiento', desc: 'Operación continua, respaldos (backups), optimización de índices y soporte.' }
];

export const WORKSHOP_DETAILS = {
  title: 'Taller Evaluativo: Diseño de Negocios Sistémicos y Requerimientos TI',
  deadline: 'Sábado 28/03 hasta las 23:59 hrs.',
  weight: '20% de la nota de talleres',
  pillars: [
    {
      title: '1. Propuesta de Negocio Sistémico',
      requirement: 'Diseñar un modelo de negocio bajo enfoque sistémico identificando Entradas, Procesos, Salidas y Retroalimentación.'
    },
    {
      title: '2. Modelo Canvas (9 Bloques)',
      requirement: 'Definir con coherencia total la Propuesta de Valor, Segmentos de Clientes y Canales de distribución.'
    },
    {
      title: '3. Especificaciones Técnicas (Requerimientos)',
      requirement: 'Identificar al menos 5 Requerimientos Funcionales (RF) y al menos 5 Requerimientos No Funcionales (RNF).'
    }
  ],
  rubric: [
    { criterion: 'Enfoque Sistémico', maxPts: 20, description: 'Define el negocio con precisión: Entradas, Procesos, Salidas y Retroalimentación.' },
    { criterion: 'Modelo Canvas', maxPts: 20, description: 'Lienzo completo con coherencia total entre la Propuesta de Valor y el Segmento de Clientes.' },
    { criterion: 'Requerimientos Funcionales', maxPts: 20, description: 'Identifica 5 o más requerimientos que describen acciones claras del sistema ("El qué").' },
    { criterion: 'Requerimientos No Funcionales', maxPts: 20, description: 'Identifica 5 o más atributos de calidad (seguridad, escala, velocidad) con métricas o estándares claros.' },
    { criterion: 'Presentación y Video', maxPts: 20, description: 'PPT visualmente atractiva y exposición en video clara, fluida y con buen audio.' }
  ]
};
