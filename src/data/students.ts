export interface StudentUser {
  id: string;
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  career: string;
  enrolledAt: string;
  status: 'Activo' | 'Inactivo';
}

export const INITIAL_STUDENTS: StudentUser[] = [
  { id: '1', lastName: 'ACEVEDO MEDEL', firstName: 'CHRISTOPHER ANDRÉS', fullName: 'CHRISTOPHER ANDRÉS ACEVEDO MEDEL', email: 'christopher.acevedo@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '2', lastName: 'ALVARADO CARRASCO', firstName: 'SEBASTIAN IGNACIO', fullName: 'SEBASTIAN IGNACIO ALVARADO CARRASCO', email: 'sebastian.alvarado@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '3', lastName: 'BADILLA MUÑOZ', firstName: 'CRISTIAN DANIEL', fullName: 'CRISTIAN DANIEL BADILLA MUÑOZ', email: 'cristian.badilla@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '4', lastName: 'CARRION SUAZO', firstName: 'FELIPE ESTEBAN', fullName: 'FELIPE ESTEBAN CARRION SUAZO', email: 'felipe.carrion@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '5', lastName: 'CARVAJAL HERRERA', firstName: 'CHRISTIAN ALBERTO', fullName: 'CHRISTIAN ALBERTO CARVAJAL HERRERA', email: 'christian.carvajal@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '6', lastName: 'DEL VILLAR ISPERGUERTT', firstName: 'JOSE PABLO', fullName: 'JOSE PABLO DEL VILLAR ISPERGUERTT', email: 'jose.del@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '7', lastName: 'DONOSO SOTO', firstName: 'SERGIO MAGNO', fullName: 'SERGIO MAGNO DONOSO SOTO', email: 'sergio.donoso@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '8', lastName: 'GONZALEZ VERGARA', firstName: 'JAIME ESTEBAN', fullName: 'JAIME ESTEBAN GONZALEZ VERGARA', email: 'jaime.gonzalez.v@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '9', lastName: 'JIMENEZ ROJO', firstName: 'YULFER NICOLLE', fullName: 'YULFER NICOLLE JIMENEZ ROJO', email: 'yulfer.jimenez@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '10', lastName: 'MARDONES TORRES', firstName: 'BASTIAN ALEXIS', fullName: 'BASTIAN ALEXIS MARDONES TORRES', email: 'bastian.mardones@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '11', lastName: 'MORA TOLEDO', firstName: 'NATALIA ANDREA', fullName: 'NATALIA ANDREA MORA TOLEDO', email: 'natalia.mora@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '12', lastName: 'MUNOZ CABEZAS', firstName: 'IGNACIO EMILIO', fullName: 'IGNACIO EMILIO MUNOZ CABEZAS', email: 'ignacio.munoz@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '13', lastName: 'MUÑOZ MOLINA', firstName: 'PAULINA ALEJANDRA', fullName: 'PAULINA ALEJANDRA MUÑOZ MOLINA', email: 'paulina.munoz.m@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '14', lastName: 'OLATE OLATE', firstName: 'JOHNNY ARIEL', fullName: 'JOHNNY ARIEL OLATE OLATE', email: 'johnny.olate@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '15', lastName: 'ORTEGA FUENZALIDA', firstName: 'BASTIAN', fullName: 'BASTIAN ORTEGA FUENZALIDA', email: 'bastian.ortega@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '16', lastName: 'PONCE DE LEÓN CASTILLO', firstName: 'LUIS MIGUEL', fullName: 'LUIS MIGUEL PONCE DE LEÓN CASTILLO', email: 'luis.ponce@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' },
  { id: '17', lastName: 'REAL BAHAMONDE', firstName: 'OSCAR EDUARDO', fullName: 'OSCAR EDUARDO REAL BAHAMONDE', email: 'oscar.real@estudiante.ugm.cl', career: 'Ingeniería en Computación e Informática', enrolledAt: '2026-03-01', status: 'Activo' }
];

export const TEACHER_OFFICIAL_EMAIL = 'CRISTIAN.CORREA@academico.ugm.cl';
