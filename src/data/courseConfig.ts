export interface CourseClassInfo {
  id: string;
  number: number;
  catedraNumber: string;
  title: string;
  shortTitle: string;
  unit: number;
  description: string;
  defaultPublished: boolean;
}

export const ALL_COURSE_CLASSES: CourseClassInfo[] = [
  {
    id: 'clase1',
    number: 1,
    catedraNumber: 'Cátedra Nº 2',
    title: 'Clase 1: Conceptos Básicos, Glosario y Tipos de Datos (SQL Server)',
    shortTitle: 'Clase 1',
    unit: 1,
    description: 'Equivalencia entre hoja de cálculo (Excel) y modelo relacional, selección de tipos de datos en SQL Server y términos fundamentales.',
    defaultPublished: true
  },
  {
    id: 'clase2',
    number: 2,
    catedraNumber: 'Cátedra Nº 3',
    title: 'Clase 2: Fundamentos de Sistemas de Información, Modelos y Requerimientos',
    shortTitle: 'Clase 2',
    unit: 1,
    description: 'Los 9 bloques del Modelo Canvas (Caso Netflix), ciclo de vida SDLC de 7 etapas, Cascada vs Scrum, y clasificación de Requerimientos Funcionales y No Funcionales.',
    defaultPublished: true
  },
  {
    id: 'clase3',
    number: 3,
    catedraNumber: 'Cátedra Nº 4',
    title: 'Clase 3: Modelos de Datos: Conceptual, Lógico y Físico (MER)',
    shortTitle: 'Clase 3',
    unit: 1,
    description: 'Los 3 niveles de abstracción: Modelo Conceptual (entidades y relaciones), Modelo Lógico (atributos, PK y FK) y Modelo Físico (tablas y tipos en SQL Server).',
    defaultPublished: false
  },
  {
    id: 'clase4',
    number: 4,
    catedraNumber: 'Cátedra Nº 5',
    title: 'Clase 4: Modelos Gráficos UML: Casos de Uso y Diagramas de Clases',
    shortTitle: 'Clase 4',
    unit: 1,
    description: 'Representación visual del comportamiento del sistema: Actores, Casos de Uso (include / extend) y Diagramas de Clases con atributos y métodos.',
    defaultPublished: false
  },
  {
    id: 'clase5',
    number: 5,
    catedraNumber: 'Cátedra Nº 5 (Parte 2)',
    title: 'Clase 5: Normalización de Bases de Datos: 1FN, 2FN y 3FN',
    shortTitle: 'Clase 5',
    unit: 1,
    description: 'Eliminación de redundancias y anomalías paso a paso: 1FN (atomicidad), 2FN (dependencia funcional completa) y 3FN (eliminación de dependencias transitivas).',
    defaultPublished: false
  },
  {
    id: 'clase6',
    number: 6,
    catedraNumber: 'Cátedra Nº 7',
    title: 'Clase 6: Lenguaje DDL en SQL Server (CREATE, ALTER, DROP, TRUNCATE)',
    shortTitle: 'Clase 6',
    unit: 2,
    description: 'Construcción de objetos en SQL Server: creación de bases de datos y tablas, modificación de columnas (ALTER) y la gran diferencia entre DROP vs TRUNCATE vs DELETE.',
    defaultPublished: false
  },
  {
    id: 'clase7',
    number: 7,
    catedraNumber: 'Cátedra Nº 8',
    title: 'Clase 7: Lenguaje DML, Consultas SELECT, Índices y Vistas',
    shortTitle: 'Clase 7',
    unit: 2,
    description: 'Manipulación de datos (INSERT, UPDATE, DELETE), consultas SELECT avanzadas con WHERE, LIKE y BETWEEN, creación de Índices (atajo del motor) y Vistas (seguridad).',
    defaultPublished: false
  }
];
