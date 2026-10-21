import { DataTypeQuizQuestion, Flashcard } from '@/types';

export const CLASS_1_FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    term: 'Dato vs Información',
    category: 'Fundamentos',
    definition: 'Un dato es una representación simbólica (numérica, alfabética) sin sentido semántico por sí mismo. Al ser procesado en contexto, se transforma en información útil para la toma de decisiones.',
    ugmNote: 'Slide 4: Los datos pueden ser comprimidos, encriptados, transmitidos y almacenados.',
    iconName: 'FileText'
  },
  {
    id: 'f2',
    term: 'Entidad',
    category: 'Modelado',
    definition: 'Cualquier "cosa" u "objeto" del mundo real que es distinguible de otros objetos y sobre el cual nos interesa guardar información (ej. Alumno, Vehículo, Habitación).',
    ugmNote: 'Slide 6: En el diagrama E/R se representa comúnmente con un rectángulo.',
    iconName: 'Box'
  },
  {
    id: 'f3',
    term: 'Atributo',
    category: 'Modelado',
    definition: 'Propiedad o característica descriptiva que posee una entidad (ej. el Alumno tiene RUT, Nombre, Fecha de Nacimiento).',
    ugmNote: 'Slide 6: En el diagrama conceptual se representa comúnmente con óvalos/elipses.',
    iconName: 'Tag'
  },
  {
    id: 'f4',
    term: 'Tupla',
    category: 'Modelo Relacional',
    definition: 'Corresponde exactamente a una fila o registro dentro de una tabla relacional. Representa una instancia única de la entidad.',
    ugmNote: 'Slide 6: Cada tupla almacena los valores de los atributos de una sola ocurrencia.',
    iconName: 'Rows'
  },
  {
    id: 'f5',
    term: 'Clave Primaria (Primary Key)',
    category: 'Integridad',
    definition: 'Atributo (o combinación de atributos) que identifica de manera única y unívoca cada tupla/registro de una tabla. No permite valores nulos (NOT NULL) y genera un índice único.',
    ugmNote: 'Slide 6 & 10: Es la columna que garantiza que no existan registros duplicados.',
    iconName: 'Key'
  },
  {
    id: 'f6',
    term: 'Cardinalidad',
    category: 'Relaciones',
    definition: 'Indica el número de ocurrencias de una entidad que pueden asociarse con ocurrencias de otra entidad (1:1, 1:N, N:M).',
    ugmNote: 'Slide 6 & 9: Por ejemplo, un Cliente puede tener 1 a N Reservaciones de hotel.',
    iconName: 'GitBranch'
  },
  {
    id: 'f7',
    term: 'Índice',
    category: 'Rendimiento',
    definition: 'Estructura de datos optimizada (generalmente árboles B+) sobre una o más columnas que permite ubicar y recuperar registros velozmente sin recorrer toda la tabla.',
    ugmNote: 'Slide 6: Acelera las búsquedas y ordenamientos en SQL Server.',
    iconName: 'Zap'
  },
  {
    id: 'f8',
    term: 'Modelo de Datos',
    category: 'Arquitectura',
    definition: 'Conjunto de abstracciones conceptuales y reglas matemáticas que definen cómo se estructuran, relacionan y restringen los datos. No se refiere al almacenamiento físico.',
    ugmNote: 'Slide 5: Existen 3 niveles de diseño: Conceptual (E/R), Lógico (Relacional) y Físico (SQL Server).',
    iconName: 'Layers'
  }
];

export const SQL_SERVER_DATA_TYPES_QUESTIONS: DataTypeQuizQuestion[] = [
  {
    id: 'q1',
    title: 'Registro de RUT o Identificación Chilena',
    scenario: 'Necesitas almacenar el RUT de los alumnos en la tabla `Alumnos` de SQL Server (ejemplo: "19876543-K"). ¿Cuál es el tipo de dato correcto?',
    options: ['INT', 'VARCHAR(12)', 'FLOAT', 'BIT'],
    correctAnswer: 'VARCHAR(12)',
    sqlServerNote: 'En SQL Server, `VARCHAR(n)` almacena cadenas alfanuméricas de longitud variable. Como el RUT chileno incluye guión y la letra "K", no puede ser un número entero.',
    explanation: 'El RUT contiene caracteres no numéricos ("-" y "K"). Usar `VARCHAR(12)` optimiza el almacenamiento ya que solo ocupa los bytes realmente utilizados.',
    category: 'Alfanuméricos'
  },
  {
    id: 'q2',
    title: 'Estado de Matrícula (Activo / Retirado)',
    scenario: 'Quieres una columna `EsActivo` para saber si un estudiante está vigente (1) o retirado (0). ¿Qué tipo de dato nativo se usa en SQL Server?',
    options: ['BOOLEAN', 'BIT', 'VARCHAR(2)', 'INT'],
    correctAnswer: 'BIT',
    sqlServerNote: '¡Atención con SQL Server! A diferencia de PostgreSQL o MySQL, SQL Server no tiene el tipo de dato `BOOLEAN`. En su lugar utiliza `BIT`, que almacena 1 (TRUE), 0 (FALSE) o NULL.',
    explanation: '`BIT` ocupa solo 1 byte en disco (o incluso 1 bit agrupado cuando hay múltiples columnas bit), siendo la forma canónica de representar flags de encendido/apagado en T-SQL.',
    category: 'Lógicos'
  },
  {
    id: 'q3',
    title: 'Calificación de Examen Universitario',
    scenario: 'Vas a registrar la nota de la Cátedra Nº 2, que va de 1.0 a 7.0 con un decimal (por ejemplo: 5.8, 6.5). ¿Qué tipo de dato numérico es el más adecuado?',
    options: ['FLOAT', 'INT', 'DECIMAL(3,1)', 'BIT'],
    correctAnswer: 'DECIMAL(3,1)',
    sqlServerNote: 'En SQL Server, `DECIMAL(p,s)` o `NUMERIC(p,s)` es de precisión exacta. `FLOAT` es de coma flotante aproximada y puede generar errores de redondeo como 5.79999999.',
    explanation: '`DECIMAL(3,1)` permite hasta 3 dígitos en total con 1 decimal (ejemplo: 7.0 o 10.0), ideal para notas y finanzas donde la precisión exacta es mandatoria.',
    category: 'Numéricos'
  },
  {
    id: 'q4',
    title: 'Fecha de Reserva Hotelera',
    scenario: 'En el sistema hotelero de la lámina 9, debes registrar el día exacto de entrada del huésped (`fecha_de_entrada`), sin necesidad de guardar la hora ni minutos.',
    options: ['VARCHAR(10)', 'DATE', 'DATETIME', 'FLOAT'],
    correctAnswer: 'DATE',
    sqlServerNote: 'En SQL Server, `DATE` almacena fechas en formato YYYY-MM-DD (rango 0001-01-01 a 9999-12-31) ocupando solo 3 bytes.',
    explanation: 'Siempre se deben usar tipos de fecha nativos en lugar de texto `VARCHAR`, para permitir ordenamiento cronológico, validación de fechas reales y cálculos de días de estadía.',
    category: 'Fecha'
  },
  {
    id: 'q5',
    title: 'Cantidad en Stock / Existencias',
    scenario: 'En la tabla de productos de la lámina 10, la columna `Existencia` guarda valores como 50, 20, 35 unidades físicas de cervezas o abarrotes.',
    options: ['BIT', 'FLOAT', 'INT', 'VARCHAR(50)'],
    correctAnswer: 'INT',
    sqlServerNote: '`INT` ocupa 4 bytes y almacena enteros entre -2,147,483,648 y 2,147,483,647.',
    explanation: 'Al ser cantidades enteras no fraccionables de productos en bodega, un número entero `INT` (o `SMALLINT`) es la opción estándar y óptima para operaciones aritméticas.',
    category: 'Numéricos'
  }
];

export const EXCEL_VS_DB_PARTS = [
  {
    id: 'db',
    name: 'Base de Datos',
    concept: 'El conjunto integral de todas las hojas, tablas y metadatos relacionados entre sí.',
    color: 'border-indigo-500 bg-indigo-50/50 text-indigo-700'
  },
  {
    id: 'sgbd',
    name: 'Sistema de Gestión (SGBD / DBMS)',
    concept: 'El software que administra el acceso, seguridad y almacenamiento (en Excel sería la aplicación Excel; en la cátedra es Microsoft SQL Server).',
    color: 'border-blue-500 bg-blue-50/50 text-blue-700'
  },
  {
    id: 'tabla',
    name: 'Tabla (Entidad)',
    concept: 'La matriz bidimensional completa que agrupa un conjunto de registros de la misma naturaleza (ej: la tabla Productos).',
    color: 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
  },
  {
    id: 'campo',
    name: 'Campo / Atributo (Columna)',
    concept: 'Cada una de las características verticales definidas en la tabla (ej: Codigo, Nombre, Unidad Medida, Costo).',
    color: 'border-red-500 bg-red-50/50 text-red-700'
  },
  {
    id: 'registro',
    name: 'Registro / Tupla (Fila)',
    concept: 'Una ocurrencia horizontal completa correspondiente a un producto específico con todos sus atributos.',
    color: 'border-amber-500 bg-amber-50/50 text-amber-700'
  },
  {
    id: 'pk',
    name: 'Clave Primaria (PK)',
    concept: 'El campo único que distingue cada registro de los demás (en este caso, la columna "Codigo" 102030, 402536).',
    color: 'border-yellow-500 bg-yellow-50/50 text-yellow-700'
  },
  {
    id: 'dato',
    name: 'Dato Atómico (Celda)',
    concept: 'El valor individual contenido en la intersección de una fila y una columna (ej: "2,100", "Litro", "Arroz Marfil").',
    color: 'border-cyan-500 bg-cyan-50/50 text-cyan-700'
  }
];

export const HOTEL_ER_SAMPLE = {
  title: 'Caso Práctico: Sistema Hotelero (Lámina 9)',
  description: 'Observa cómo el modelo conceptual (rectángulos y óvalos) se traduce a tablas relacionales normalizadas para SQL Server.',
  entities: [
    {
      name: 'Cliente_Habitual',
      type: 'Entidad',
      attributes: ['Rut (PK)', 'Nombre', 'Apellido', 'Direccion', 'Telefono', 'Email'],
      sqlServerTable: 'CREATE TABLE Clientes (Rut VARCHAR(12) PRIMARY KEY, Nombre VARCHAR(100), ...)'
    },
    {
      name: 'Reservacion',
      type: 'Entidad / Relación',
      attributes: ['id_reserva (PK)', 'fecha_de_entrada', 'numero_de_dias', 'Rut_Cliente (FK)', 'id_habitacion (FK)'],
      sqlServerTable: 'CREATE TABLE Reservaciones (IdReserva INT IDENTITY(1,1) PRIMARY KEY, RutCliente VARCHAR(12) FOREIGN KEY REFERENCES Clientes(Rut), ...)'
    },
    {
      name: 'Habitacion',
      type: 'Entidad',
      attributes: ['id_habitacion (PK)', 'numero', 'tipo', 'precio'],
      sqlServerTable: 'CREATE TABLE Habitaciones (IdHabitacion INT PRIMARY KEY, Numero INT, Tipo VARCHAR(50), Precio DECIMAL(10,2))'
    }
  ]
};
