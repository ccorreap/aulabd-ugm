# AulaBD UGM - Cátedra de Base de Datos

Plataforma web interactiva para la asignatura de **Base de Datos (Cátedra Nº 2)** de la carrera de **Ingeniería en Computación e Informática** en la **Universidad Gabriela Mistral**.

**Docente:** Mag. Cristian Correa Pacheco.

---

## 🚀 Características Principales

1. **Acceso Institucional:**
   - Diseñado para autenticación con correos institucionales de la universidad (`@ugm.cl` y `@alumnos.ugm.cl`).
   - Modo de acceso rápido (Alumno y Docente) para pruebas instantáneas.

2. **Módulo Interactivo - Clase 1 (Fundamentos y Modelado):**
   - **Laboratorio Excel vs BD (Lámina 10):** Permite a los estudiantes identificar y asociar Campo, Registro/Tupla, Dato, Clave Primaria (PK), Tabla, Base de Datos y SGBD sobre una matriz interactiva.
   - **Simulador de Tipos de Datos (Láminas 7 y 8):** Retos orientados a **Microsoft SQL Server** con retroalimentación pedagógica y notas técnicas (ej. uso de `BIT` en lugar de `BOOLEAN`, precisión de `DECIMAL` vs `FLOAT`).
   - **Glosario y Flashcards 3D (Láminas 4, 5 y 6):** Tarjetas interactivas con vuelta tridimensional y autoevaluación.
   - **Explorador Caso Hotel (Láminas 9 y 11):** Visualización del paso del modelo conceptual E/R a scripts DDL para SQL Server Management Studio (SSMS).

3. **Plan Semestral (Roadmap):**
   - **Unidad 1:** Fundamentos, Modelo Conceptual (E/R), Modelo Lógico y Normalización (1FN, 2FN, 3FN).
   - **Unidad 2:** SQL Server Práctico (DDL, DML, Consultas SELECT, INNER/LEFT JOINs, GROUP BY y Subconsultas).

4. **Panel Exclusivo Docente:**
   - Analítica en tiempo real de errores comunes de los estudiantes para retroalimentar la siguiente clase.
   - Diagnóstico automático pedagógico.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Estilos:** Tailwind CSS.
- **Iconos & Feedback:** Lucide React & Canvas Confetti.
- **Despliegue:** Preparado para contenedor Docker en **Google Cloud Run** o Vercel.

---

## 💻 Ejecución Local

Para levantar la plataforma en tu máquina:

```bash
# Entrar al directorio
cd "/Users/cristiancorrea/Documents/Proyectos GCP/Aula"

# Instalar dependencias (si no se han instalado)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## ☁️ Despliegue en Google Cloud Platform (Cloud Run)

Al estar en `Proyectos GCP`, puedes desplegarlo directamente como servicio administrado en Cloud Run:

```bash
gcloud run deploy aulabd-ugm \
  --source . \
  --platform managed \
  --region southamerica-west1 \
  --allow-unauthenticated
```
