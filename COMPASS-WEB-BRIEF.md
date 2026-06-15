# COMPASS — Brief de construcción del sitio web

Documento autocontenido para que un agente construya el sitio de difusión de **COMPASS**. Incluye objetivo, stack, sistema visual, inventario de assets, y **cada sección con copy bilingüe (ES/EN), layout, imágenes y animaciones**.

---

## 0. Resumen ejecutivo

- **Producto:** COMPASS — *Competency & Profiling Simulation System*. Plataforma de simulación interactiva para la **medición profunda y trazable** de competencias socioemocionales. Mide **lo que la persona hace**, no lo que dice (psicometría conductual, no autorreporte).
- **Idea central:** motor modular (núcleo: captura conductual + analítica + IA) → muchas **versiones** por dominio. **Gestión en Salud** es la versión activa (nombrarla explícitamente; es prueba tangible).
- **Dos usos del mismo motor:** **Evaluar** (selección/medición) y **Entrenar** (capacitación/educación). COMPASS **democratiza** el acceso a formación y evaluación rigurosa.
- **Objetivo del sitio:** comunicar valor y convertir a "Solicita una demo" / contacto. Audiencia: organizaciones (RRHH, salud, sector público, educación), partners, early adopters. **No** es un sitio académico.
- **Origen científico:** investigación del **HCI Lab** (Human-Computer Interaction Lab) y **GIIA** de la **Universidad de Concepción**. Mencionar en sección Nosotros/Equipo.
- **Idiomas:** **bilingüe ES/EN**, con conmutador. ES por defecto.

---

## 1. Stack, estructura y despliegue

- **Stack recomendado:** **Astro + Tailwind CSS** (estático, SEO, casi-cero JS, rápido). Animaciones con CSS + una librería ligera de scroll-reveal (p. ej. Intersection Observer propio, o `@motionone/dom` / `aos`). Evitar dependencias pesadas.
- **i18n:** usar el routing i18n de Astro (`/` = ES, `/en/` = EN) o `astro-i18n`. Todo el copy en archivos de traducción (`src/i18n/es.json`, `src/i18n/en.json`); **no** hardcodear texto. Conmutador de idioma en header y footer.
- **Estructura:**
  ```
  web/
    src/
      pages/            (index.astro = ES, en/index.astro = EN)
      components/       (Header, Hero, Story, DiceVsHace, Platform, Solutions,
                         Democratize, HowItWorks, Versions, Savings, Future,
                         Backing, CTA, Footer, LangSwitch)
      i18n/             (es.json, en.json)
      styles/           (tailwind + tokens)
    public/             (assets; ver inventario abajo)
  ```
- **Despliegue:** estático → Vercel / Netlify / GitHub Pages, o subdominio del servidor (`compass.giia.udec.cl` aparte del backend del simulador). HTTPS. Sin backend salvo el form de contacto (usar Formspree/Netlify Forms o `mailto:`).
- **Accesibilidad:** semántica correcta, `alt` en todas las imágenes, contraste AA, foco visible, respetar `prefers-reduced-motion` (desactivar animaciones no esenciales).
- **Rendimiento:** imágenes en `webp`/`avif`, lazy-load, SVG inline para logos animados.

---

## 2. Sistema visual

- **Tono:** tecnológico-premium, confiable, serio. No clínico-frío ni caricaturesco.
- **Paleta (oscura, "data/cockpit"):**
  - Fondo base: azul noche `#070B14` / `#0B1220`.
  - Superficies: `#111827` / `slate-900`.
  - Acento primario: cian eléctrico `#22D3EE` (cyan-400) / `#38BDF8`.
  - Acento secundario: índigo/violeta `#6366F1` para IA/ML.
  - Acentos de sector (solo en visuales del juego): Azul `#3B82F6`, Rojo `#EF4444`, Amarillo `#F59E0B`.
  - Texto: `#E5E7EB` (gris claro), titulares blancos.
- **Tipografía:** sans moderna — **Inter** o **Geist**. Titulares grandes y con peso (700–800), cuerpo 400–500. Buen tracking en mayúsculas pequeñas (kickers).
- **Estética:** fondos con malla de puntos / líneas tipo red neuronal; glows sutiles cian; tarjetas con borde `white/10` y sombra profunda; bordes redondeados `rounded-2xl`.
- **Motion global:** scroll-reveal suave (fade + slide-up 12–18px, 300–500ms, ease-out, stagger). Contadores numéricos al entrar en viewport. Hover-lift en tarjetas. **Siempre** envolver en `@media (prefers-reduced-motion: reduce)` para desactivar.

---

## 3. Inventario de assets (entregados por el cliente)

**Ruta de origen (carpeta del cliente):** `C:\Users\gusta\OneDrive\Escritorio\Página Web Proyecto COMPASS`
Copiar estos archivos al proyecto en `public/assets/` (o `src/assets/` si se importan/optimizan) antes de construir.

| Archivo | Uso |
|---|---|
| `logo-compass.svg` | Logo completo (header, footer). Vectorial. |
| `logo-compass.png` | Fallback raster del logo. |
| `icono-compass.svg` | Isotipo / favicon / icono suelto (brújula). |
| `icono-compass.png` | Fallback raster del isotipo. |
| `logo-animado-compass.svg` | **Logo animado** (draw-stroke + fill). Úsalo **inline** en el Hero y/o en el preloader; se anima solo al cargar (`@keyframes drawStroke`, `fillSolid`). No lo metas en `<img>` (perdería la animación) — incrústalo como SVG inline. |
| `Competency & Profiling Simulation System.png` | Arte/banner del nombre completo (165 KB). Úsalo en hero, sección Plataforma u Open Graph. Renombrar sin espacios al copiar (p. ej. `compass-fullname.png`). |

**Faltantes que debe pedir al cliente / dejar placeholder:**
- 5–8 screenshots/GIF reales del simulador: (a) oficina con sprites, (b) mapa del CESFAM, (c) tarjetas de decisión, (d) reporte/perfil conductual, (e) feedback de entrenamiento ("buena decisión / aquí perdiste apoyo").
- Logos institucionales: **UdeC**, **HCI Lab** (hcilab.udec.cl), **GIIA**, y opcional **ANID/VIU**. Si no llegan, usar texto/placeholder.
- Favicon: derivar de `icono-compass.svg`.

---

## 4. Header / Navegación (sticky)

- Izquierda: `logo-compass.svg` (link a inicio).
- Centro/derecha: nav. CTA botón destacado. Conmutador **ES/EN**.
- Móvil: hamburguesa → drawer.
- **Animación:** transparente sobre el hero; al scrollear >80px → fondo `#0B1220` + sombra + blur (transición 200ms). Underline animado en hover de links.

| Link (ES) | Link (EN) | Ancla |
|---|---|---|
| Plataforma | Platform | #plataforma |
| Soluciones | Solutions | #soluciones |
| Cómo funciona | How it works | #como-funciona |
| Versiones | Versions | #versiones |
| Nosotros | About | #nosotros |
| Contacto | Contact | #contacto |
| **Solicita una demo** (botón) | **Request a demo** | #contacto |

---

## 5. Secciones (copy ES + EN, layout, imágenes, animación)

> Convención: cada sección lleva un **kicker** (etiqueta pequeña en cian, mayúsculas), **titular**, **cuerpo**. Copy listo para pegar en `es.json` / `en.json`.

### 5.1 HERO  `#inicio`
**Objetivo:** claim en 5s + doble promesa (evaluar + entrenar).

- **ES**
  - Titular: **Mide lo que *hacen*, no lo que *dicen*.**
  - Sub: **COMPASS** es la plataforma de simulación que **evalúa y entrena** competencias socioemocionales observando la **conducta real** de las personas bajo presión — no su autorreporte.
  - CTA primario: **Solicita una demo** · CTA secundario: **Ver cómo funciona**
- **EN**
  - Headline: **Measure what they *do*, not what they *say*.**
  - Sub: **COMPASS** is the simulation platform that **assesses and trains** socio-emotional competencies by observing how people **actually behave** under pressure — not their self-report.
  - CTA: **Request a demo** · **See how it works**
- **Layout:** texto izquierda, visual derecha (mockup navegador/tablet con GIF del simulador).
- **Imágenes:** `logo-animado-compass.svg` inline arriba del titular (o como marca); screenshot/GIF del juego en marco.
- **Animación:** "hacen/do" con typewriter; "dicen/say" tachado al aparecer. Fondo malla neuronal con parallax leve al mouse. Mockup fade+slide-up; logo animado se dibuja al cargar.

### 5.2 LA HISTORIA  `#historia`
**Objetivo:** gancho emocional, lo catastrófico de medir mal, anclado en datos reales.

- **ES**
  - Kicker: EL COSTO DE EQUIVOCARSE
  - Titular: **La entrevista perfecta. La decisión equivocada.**
  - Cuerpo: *En el papel era impecable: CV pulido, entrevista brillante, test con todas las respuestas "correctas". Lo promovieron sin dudar.*
    *Seis meses después, el equipo estaba en crisis. No por falta de conocimiento técnico — eso le sobraba. Falló en lo que ningún test detectó: bajo presión decidía solo, ignoraba a su gente, rompía los acuerdos que él mismo proponía. La rotación se disparó. Llegaron las licencias, los reclamos, el conflicto. Lo que el currículum nunca dijo, lo pagó la organización entera.*
    **No es un caso aislado. Es un patrón documentado:**
  - Stat 1: **3×** — Una mala contratación cuesta hasta tres veces el salario anual del cargo.
  - Stat 2: **70%** — de los trabajadores en Chile declara haber sufrido acoso laboral; muchas veces el origen es un mal liderazgo.
  - Stat 3: **Mortalidad** — En salud, la capacidad de gestión de quien dirige impacta directamente los resultados clínicos.
  - Cierre: *Las organizaciones toman sus decisiones más caras con su evidencia más débil.*
- **EN**
  - Kicker: THE COST OF GETTING IT WRONG
  - Headline: **The perfect interview. The wrong decision.**
  - Body: *On paper, flawless: polished résumé, brilliant interview, a personality test with every "right" answer. They promoted him without hesitation.*
    *Six months later, the team was in crisis. Not for lack of technical knowledge — he had plenty. He failed at what no test caught: under pressure he decided alone, ignored his people, broke the very agreements he proposed. Turnover spiked. Sick leave, complaints, conflict followed. What the résumé never revealed, the whole organization paid for.*
    **Not an isolated case. A documented pattern:**
  - Stat 1: **3×** — A bad hire costs up to three times the role's annual salary.
  - Stat 2: **70%** — of workers in Chile report having suffered workplace harassment; poor leadership is often the root.
  - Stat 3: **Mortality** — In healthcare, a manager's leadership ability directly affects clinical outcomes.
  - Close: *Organizations make their most expensive decisions with their weakest evidence.*
- **Layout:** narrativa centrada (ancho de lectura), 3 stat-cards grandes debajo.
- **Imágenes:** ilustración sobria o foto con tratamiento oscuro; mini-gráfico de rotación cayendo.
- **Animación:** reveal secuencial del texto; **contadores** (0→3×, 0→70%); línea de tiempo "mes 0 → mes 6" que se dibuja y vira de verde a rojo.

### 5.3 DICE vs HACE  `#problema`
**Objetivo:** instalar el diferencial (corazón del pitch).

- **ES**
  - Kicker: EL PROBLEMA
  - Titular: **El autorreporte miente. La conducta no.**
  - Cuerpo: *Lo que una persona declara no predice lo que hará frente a un dilema real, con información incompleta, presión y tiempo límite. En papel o en un chatbot, el autorreporte premia a quien responde "bonito", no a quien actúa bien.*
  - Tabla (col A "Dice" / col B "COMPASS ve que hace"):
    - "Soy un líder colaborativo" → Decidió en 2s. Consultó a 0 de 9.
    - "Cumplo mis compromisos" → Prometió 4. Cumplió 1.
    - "Priorizo a mi equipo" → Visitó al de mayor cargo. Ignoró al sobrecargado.
    - "Decido con datos" → No abrió ningún documento antes de elegir.
- **EN**
  - Kicker: THE PROBLEM
  - Headline: **Self-report lies. Behavior doesn't.**
  - Body: *What people declare doesn't predict what they'll do facing a real dilemma — incomplete information, pressure, a ticking clock. On paper or via a chatbot, self-report rewards those who answer "nicely," not those who act well.*
  - Table (col A "Says" / col B "COMPASS sees them do"):
    - "I'm a collaborative leader" → Decided in 2s. Consulted 0 of 9.
    - "I keep my commitments" → Promised 4. Kept 1.
    - "I prioritize my team" → Visited the most senior. Ignored the overloaded one.
    - "I decide with data" → Opened no document before choosing.
- **Layout:** split-screen — izquierda "Dice" (clara/plana), derecha "Hace" (oscura, datos vivos).
- **Imágenes:** izq. formulario/encuesta; der. dashboard con métricas conductuales reales.
- **Animación:** **slider/cortina** que el usuario arrastra: "Dice" se desvanece y revela "Hace". Filas aparecen en stagger; números del lado "Hace" parpadean como telemetría.

### 5.4 QUÉ ES COMPASS — La plataforma  `#plataforma`
**Objetivo:** dejar claro que es un **motor**, no un solo juego.

- **ES**
  - Kicker: LA PLATAFORMA
  - Titular: **Una plataforma. Un motor. Infinitas aplicaciones.**
  - Cuerpo: *COMPASS — Competency & Profiling Simulation System — mide competencias socioemocionales con una arquitectura modular: separa el **núcleo** (captura conductual, analítica e IA) de la **narrativa** (los escenarios de cada dominio). Eso permite crear una versión para cualquier sector sin reinventar la tecnología.*
- **EN**
  - Kicker: THE PLATFORM
  - Headline: **One platform. One engine. Endless applications.**
  - Body: *COMPASS — Competency & Profiling Simulation System — measures socio-emotional competencies through a modular architecture: it separates the **core** (behavioral capture, analytics and AI) from the **narrative** (each domain's scenarios). That lets us build a version for any sector without reinventing the technology.*
- **Layout:** diagrama central — núcleo "motor" con anillos (Captura · Analítica · Machine Learning · Trazabilidad) y ramas hacia versiones.
- **Imágenes:** diagrama del motor modular (estilo tech/arquitectura).
- **Animación:** núcleo con pulse; ramas se **dibujan** al scrollear; hover en anillo → tooltip.

### 5.5 SOLUCIONES — Evaluar + Entrenar  `#soluciones`
**Objetivo:** dos casos de uso del mismo motor (clave).

- **ES**
  - Kicker: SOLUCIONES
  - Titular: **Un mismo motor, dos formas de generar valor.**
  - **Card A — EVALUAR / SELECCIONAR**
    - Título: *Decisiones de talento con evidencia, no con corazonadas.*
    - Cuerpo: *Para selección, promoción interna y diagnóstico de equipos. COMPASS perfila cómo una persona prioriza, resuelve conflictos, cumple compromisos y decide bajo presión, y entrega reportes comparables y objetivos. Reemplaza assessment centers caros y encuestas manipulables.*
    - Pie: *Ideal para: RRHH, consultoras de selección, instituciones con cargos críticos.*
  - **Card B — ENTRENAR / CAPACITAR**
    - Título: *Un gimnasio seguro para practicar decisiones difíciles.*
    - Cuerpo: *Para formación y certificación de competencias. Las personas enfrentan dilemas reales —conflictos de equipo, ética, seguridad, gestión— en un entorno donde las malas decisiones no tienen consecuencias reales, pero sí retroalimentación. Aprenden haciendo, no leyendo.*
    - Pie: *Ideal para: capacitación ejecutiva, microcredenciales, formación profesional.*
- **EN**
  - Kicker: SOLUTIONS
  - Headline: **One engine, two ways to create value.**
  - **Card A — ASSESS / SELECT**
    - Title: *Talent decisions backed by evidence, not gut feeling.*
    - Body: *For selection, internal promotion and team diagnostics. COMPASS profiles how a person prioritizes, resolves conflict, keeps commitments and decides under pressure, delivering objective, comparable reports. It replaces costly assessment centers and gameable surveys.*
    - Foot: *Ideal for: HR, selection consultancies, organizations with critical roles.*
  - **Card B — TRAIN / UPSKILL**
    - Title: *A safe gym to practice hard decisions.*
    - Body: *For competency training and certification. People face real dilemmas —team conflict, ethics, safety, management— in an environment where bad decisions carry no real consequences, only feedback. They learn by doing, not by reading.*
    - Foot: *Ideal for: executive training, micro-credentials, professional education.*
- **Layout:** dos cards grandes lado a lado, íconos (lupa/perfil vs pesa/escudo).
- **Imágenes:** Evaluar → reporte/perfil; Entrenar → escena con feedback.
- **Animación:** hover-lift + glow; slide-in desde lados opuestos; mini-loop de mecánica en cada card.

### 5.6 DEMOCRATIZAR LA EDUCACIÓN  `#democratiza`
**Objetivo:** impacto/acceso.

- **ES**
  - Kicker: IMPACTO
  - Titular: **Formación de élite, al alcance de todos.**
  - Cuerpo: *Entrenar liderazgo y juicio profesional exigía mentores, assessment centers y jornadas presenciales: caro, lento, para unos pocos. COMPASS lo vuelve digital, remoto y replicable. Un estudiante en una región apartada o una organización sin presupuesto para grandes consultoras accede a la misma experiencia de práctica y evaluación rigurosa. Bajamos la barrera a competencias que antes eran un privilegio.*
  - 3 íconos: **Remoto** · **Escalable** · **Mismo rigor para todos**
- **EN**
  - Kicker: IMPACT
  - Headline: **Elite training, within everyone's reach.**
  - Body: *Training leadership and professional judgment used to require mentors, assessment centers and in-person sessions: expensive, slow, for a few. COMPASS makes it digital, remote and replicable. A student in a remote region or an organization without big-consultancy budgets gets the same rigorous practice and assessment. We lower the barrier to competencies that used to be a privilege.*
  - 3 icons: **Remote** · **Scalable** · **Same rigor for everyone**
- **Layout:** banda full-width con acento de color, texto centrado + 3 íconos.
- **Imágenes:** mapa/figuras conectándose; varias pantallas accediendo a la vez.
- **Animación:** puntos en un mapa que se **encienden** secuencialmente; contador "1 evaluador → ∞ participantes".

### 5.7 CÓMO FUNCIONA — 3 niveles + IA  `#como-funciona`
**Objetivo:** base tecnológica sin jerga.

- **ES**
  - Kicker: CÓMO FUNCIONA
  - Titular: **Capturamos lo que otros no ven.**
  - Cuerpo: *Mientras la persona juega, COMPASS registra tres niveles:*
  - Nivel 1 — **Explícito: lo que elige.** Cada decisión frente a los escenarios, etiquetada por competencia.
  - Nivel 2 — **Implícito: lo que realmente hace.** Si asiste a la reunión que dijo priorizar, cómo reparte recursos, si respeta lo que prometió. Sin saber que se mide.
  - Nivel 3 — **De proceso: cómo lo hace.** Tiempos de decisión, dudas (hover), secuencias de navegación, uso de información.
  - Cierre: *Algoritmos de **machine learning** integran los tres niveles y construyen perfiles conductuales: consistencia entre promesa y acción, equidad de atención, juicio bajo presión.*
- **EN**
  - Kicker: HOW IT WORKS
  - Headline: **We capture what others can't see.**
  - Body: *While the person plays, COMPASS records three levels:*
  - Level 1 — **Explicit: what they choose.** Every decision in the scenarios, tagged by competency.
  - Level 2 — **Implicit: what they actually do.** Whether they attend the meeting they said was a priority, how they allocate resources, whether they honor what they promised. Without knowing they're being measured.
  - Level 3 — **Process: how they do it.** Decision times, hesitation (hover), navigation sequences, use of information.
  - Close: ***Machine learning** integrates the three levels into behavioral profiles: promise-vs-action consistency, fairness of attention, judgment under pressure.*
- **Layout:** 3 escalones (Explícito → Implícito → Proceso) que convergen en bloque "Perfil conductual (IA)".
- **Imágenes:** mini-capturas reales (tarjeta de decisión, calendario/correo, heatmap de hover) → flecha → perfil.
- **Animación:** los 3 flujos viajan como partículas al motor de IA, que "emite" un perfil (scroll-driven).

### 5.8 VERSIONES  `#versiones`
**Objetivo:** escalabilidad; **Gestión en Salud** como caso activo (nombrar explícitamente).

- **ES**
  - Kicker: VERSIONES
  - Titular: **De un motor, muchas versiones.**
  - Card activa: **COMPASS: Gestión en Salud** — *Disponible.* Mide y entrena liderazgo y decisión en directivos clínicos, donde una buena gestión salva vidas y recursos.
  - Próximas: **Selección de Talento** · **Educación Superior** · **Sector Público** · **Liderazgo Corporativo** · **A tu medida**.
- **EN**
  - Kicker: VERSIONS
  - Headline: **From one engine, many versions.**
  - Active card: **COMPASS: Healthcare Management** — *Available.* Measures and trains leadership and decision-making in clinical managers, where good management saves lives and resources.
  - Upcoming: **Talent Selection** · **Higher Education** · **Public Sector** · **Corporate Leadership** · **Custom**.
- **Layout:** grid/carrusel de tarjetas-versión: Salud "activa" a color con badge; el resto atenuadas "Próximamente"; última "A tu medida" con CTA.
- **Imágenes:** ícono/escena por dominio.
- **Animación:** atenuadas desaturadas; Salud con glow + badge "Disponible"; hover → "Ver caso".

### 5.9 POR QUÉ TE AHORRA DINERO  `#ahorro`
**Objetivo:** valor directo al cliente.

- **ES**
  - Kicker: RETORNO
  - Titular: **Tu evaluación más cara, hecha mejor y más barata.**
  - Bloque 1 — **3× / 88%**: *Evita el costo oculto. Una mala contratación cuesta hasta 3× el salario anual; el 88% de quienes evalúan por competencias reduce sus malas contrataciones.*
  - Bloque 2 — **10–25% · 4–16 sem**: *Reemplaza procesos lentos. Un assessment center cuesta 10–25% del salario anual y toma 4 a 16 semanas. COMPASS: una sesión digital, simultánea.*
  - Bloque 3 — **5 → 500**: *Escala sin perder rigor. Mismo estándar para 5 o 500, remoto, resultados comparables.*
- **EN**
  - Kicker: ROI
  - Headline: **Your most expensive evaluation — done better and cheaper.**
  - Block 1 — **3× / 88%**: *Avoid the hidden cost. A bad hire costs up to 3× the annual salary; 88% of organizations evaluating by competency reduce bad hires.*
  - Block 2 — **10–25% · 4–16 wks**: *Replace slow processes. An assessment center costs 10–25% of the annual salary and takes 4 to 16 weeks. COMPASS: one digital, simultaneous session.*
  - Block 3 — **5 → 500**: *Scale without losing rigor. Same standard for 5 or 500, remote, comparable results.*
- **Layout:** 3 bloques con número-ancla grande + frase.
- **Animación:** contadores; barra "Costo tradicional vs COMPASS" que se acorta drásticamente.

### 5.10 POR QUÉ ES EL FUTURO  `#futuro`
- **ES**
  - Kicker: EL FUTURO
  - Titular: **El mundo pasó de "qué título tienes" a "qué sabes hacer".**
  - Bullets:
    - **94%** de empleadores en Latinoamérica ya contrata por habilidades — el más alto del mundo.
    - *Serious games*: **+23,7% anual** hacia **USD 16.700M** (2026), con retención de aprendizaje sobre 90%.
    - La IA rompió el reclutamiento: CVs inflados, filtros manipulables, cajas negras. El autorreporte digital hereda los sesgos del de papel.
  - Cierre: *El mercado pide evidencia conductual real. COMPASS no mejora el test: lo reemplaza.*
- **EN**
  - Kicker: THE FUTURE
  - Headline: **The world shifted from "what's your degree" to "what can you do".**
  - Bullets:
    - **94%** of employers in Latin America already hire by skills — the highest rate in the world.
    - *Serious games*: **+23.7% per year** toward **USD 16.7B** (2026), with learning retention above 90%.
    - AI broke recruitment: inflated résumés, gameable filters, black boxes. Digital self-report inherits the same biases as paper.
  - Close: *The market demands real behavioral evidence. COMPASS doesn't improve the test — it replaces it.*
- **Layout:** línea de tiempo/tendencia ascendente con hitos.
- **Animación:** gráfico de crecimiento que se traza al entrar; chips de estadísticas en cascada.

### 5.11 NOSOTROS / RESPALDO  `#nosotros`
**Objetivo:** credibilidad + equipo (aquí van HCI Lab y GIIA UdeC).

- **ES**
  - Kicker: NOSOTROS
  - Titular: **Ciencia de frontera, no humo.**
  - Cuerpo: *COMPASS nace de la investigación del **Human-Computer Interaction Lab (HCI Lab)** y del **GIIA** de la **Universidad de Concepción**, integrando interacción humano-computador, inteligencia artificial, psicología y ciencias cognitivas. Sus indicadores se validan contra instrumentos de referencia internacionales (p. ej. MLQ-5X para liderazgo).*
  - (Opcional) Mini-bios del equipo: Director, Investigador/Profesor guía, Asociados. *Pídelas al cliente.*
- **EN**
  - Kicker: ABOUT
  - Headline: **Frontier science, not hype.**
  - Body: *COMPASS was born from research at the **Human-Computer Interaction Lab (HCI Lab)** and **GIIA** at **Universidad de Concepción**, blending human-computer interaction, artificial intelligence, psychology and cognitive science. Its indicators are validated against international reference instruments (e.g., MLQ-5X for leadership).*
- **Layout:** texto + franja de logos (UdeC, HCI Lab, GIIA, opcional ANID/VIU). Opcional grilla de tarjetas de equipo.
- **Imágenes:** logos institucionales (pedir); foto del lab/equipo si hay.
- **Animación:** logos grayscale → color al hover; fade-in; tarjetas de equipo con hover-lift.

### 5.12 CTA FINAL + CONTACTO  `#contacto`
- **ES**
  - Titular: **Deja de adivinar quién es buen líder. Míralo.**
  - Sub: *Agenda una demo y te mostramos cómo COMPASS mide lo que tu equipo realmente hace.*
  - Form: Nombre · Organización · Correo · Interés (Evaluar / Entrenar / Ambos) · Mensaje · botón **Enviar**.
- **EN**
  - Headline: **Stop guessing who's a good leader. See it.**
  - Sub: *Book a demo and we'll show you how COMPASS measures what your team actually does.*
  - Form: Name · Organization · Email · Interest (Assess / Train / Both) · Message · **Send**.
- **Layout:** fondo animado (red neuronal), form a un lado, claim al otro.
- **Animación:** botón con pulse sutil; validación inline; estado de envío (loading/success).

### 5.13 FOOTER
- Logo (`logo-compass.svg`) + tagline (*Mide lo que hacen / Measure what they do*).
- Links de nav · Contacto/correo · Redes (si hay) · Conmutador ES/EN.
- Línea legal: *© {año} COMPASS · Universidad de Concepción · HCI Lab · GIIA*.

---

## 6. i18n — guía

- Una sola estructura de claves; dos archivos `es.json` / `en.json` con las mismas keys.
- Claves por sección: `hero.title`, `hero.sub`, `story.stat1`, `dice.rows[]`, etc. (mapear todo el copy de §5).
- Conmutador en header + footer; persistir elección (localStorage) y reflejar en `<html lang>`.
- URLs: ES en `/`, EN en `/en/`. `hreflang` en `<head>`.

## 7. SEO / meta

- `<title>` ES: "COMPASS — Mide competencias por conducta, no por autorreporte". EN: "COMPASS — Measure competencies by behavior, not self-report".
- `meta description` (ambos idiomas), Open Graph (imagen = mockup del simulador o logo sobre fondo oscuro), `og:locale` + `og:locale:alternate`.
- Favicon desde `icono-compass.svg`. JSON-LD `Organization`.

## 8. Checklist de construcción

1. Scaffold Astro + Tailwind + i18n (ES/EN).
2. Tokens de diseño (paleta, fuentes Inter/Geist, motion utils + `prefers-reduced-motion`).
3. Header sticky + LangSwitch + nav móvil.
4. Componentes de §5.1–5.13 con copy desde `i18n`.
5. Animaciones (scroll-reveal, contadores, slider Dice/Hace, motor modular, partículas).
6. Copiar assets desde `C:\Users\gusta\OneDrive\Escritorio\Página Web Proyecto COMPASS` a `public/assets/` (renombrar sin espacios); logo animado **inline** en hero.
7. Placeholders para screenshots/logos institucionales faltantes.
8. SEO/meta/OG/favicon. Accesibilidad (alt, contraste, foco, reduced-motion).
9. Build estático + deploy (Vercel/Netlify o subdominio UdeC).

## 9. Pendiente del cliente (dejar placeholders y listar)

- Screenshots/GIF del simulador (5–8).
- Logos: UdeC, HCI Lab, GIIA, ANID/VIU.
- Mini-bios + fotos del equipo (opcional).
- Correo/redes para footer y form.
- Dominio final (¿`compass.giia.udec.cl`?).

---

### Notas de exactitud
- Las cifras (3×, 70%, 94%, 23,7%, 10–25%, 4–16 sem, 88%) provienen del formulario VIU 2026 del proyecto y sus fuentes citadas. Mantenerlas como están; si el cliente quiere citas visibles, agregar tooltips/footnotes con la referencia.
- "Gestión en Salud" es la versión activa y debe nombrarse; el resto son versiones **proyectadas** (rotularlas "Próximamente").
