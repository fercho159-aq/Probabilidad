---
tags: [probabilidad, unam, fi, examenes, indice]
asignatura: Probabilidad y Estadística
facultad: Ingeniería UNAM
fuente: DCB-FI-UNAM, Sección de Probabilidad y Estadística
---

# Exámenes resueltos — Probabilidad y Estadística (FI-UNAM)

Carpeta de estudio para el **examen extraordinario**. Cada nota contiene el enunciado verbatim, el patrón de problema reconocido, un *algoritmo paso a paso* y la solución desarrollada con justificación.

> **Nota sobre extraordinarios.** El DCB no publica extraordinarios resueltos: el formato y el temario del extraordinario coincide con el del **2° Examen Final** (cubre todo el curso). Por eso la guía pondera con más peso los segundos finales.

## Índice de notas

| # | Examen | Fecha | Problemas | Temas dominantes |
|---|--------|-------|-----------|------------------|
| 00 | [[00_Patrones_y_Algoritmos]] | — | 9 patrones | Atajo de diagnóstico |
| 01 | [[01_2018-1_Primer_Final]] | 6-dic-2017 | 6 | Bayes · Densidad · Poisson · χ² · Conjunta discreta |
| 02 | [[02_2018-1_Segundo_Final]] | 13-dic-2017 | 5 | Bayes · Independencia · Conjunta continua · Poisson · Gamma |
| 03 | [[03_2017-1_Primer_Final]] | 3-dic-2016 | 5 | Confiabilidad · Bayes · Hipergeométrica conjunta · Poisson↔Exp · Gamma |
| 04 | [[04_2017-1_Segundo_Final]] | 10-dic-2016 | 5 | Bayes · Marginal/Condicional · Binomial · Prueba t |
| 05 | [[05_Algoritmo_General]] | — | meta | Algoritmo único de 6 pasos para los 21 problemas |
| 06 | [[06_Teoria_Minima]] | — | teoría | Definiciones, axiomas y fórmulas mínimas |

## Cómo usar esta guía (en 3 pasos)

1. **Diagnóstico** (≤ 30 s): Lee la nota [[00_Patrones_y_Algoritmos]] y aplica el flujo de decisión (¿discreta o continua? ¿condicional? ¿conteo de éxitos?).
2. **Algoritmo**: Cada problema tiene una sección `### Algoritmo` con el patrón exacto a copiar.
3. **Verificación**: La sección `### Solución` desarrolla y deja el resultado oficial DCB en negrita.

## Distribuciones que tienes que dominar

- **Discretas**: Binomial, Hipergeométrica, Poisson, Geométrica, Binomial negativa.
- **Continuas**: Uniforme, Exponencial, Normal, Gamma, χ² (caso de Gamma con $\alpha=k/2,\beta=2$), t-Student.
- **Inferencia**: Estimadores, IC para $\mu$ con $\sigma$ desconocida (t), prueba de hipótesis para $\mu$.

## Convención de notación

- $f(x)$ = fmp/fdp; $F(x)$ = fda; $\bar A$ = complemento de $A$.
- $X\sim\text{Bin}(n,p)$, $X\sim\text{Po}(\lambda)$, $X\sim\text{Exp}(\lambda)$, $X\sim\Gamma(\alpha,\beta)$.
- En FI-UNAM la **Gamma** se parametriza con media $\mu=\alpha\beta$ (es decir $\beta$ es la *escala*, no la tasa).

## Fuente

Coordinación de Ciencias Aplicadas, Sección de Probabilidad y Estadística, DCB-FI-UNAM. Archivos `PROBA_*EF_*.pdf` publicados en [el repositorio de exámenes resueltos del DCB](https://dcb.ingenieria.unam.mx/index.php/coordinaciones/ciencias-aplicadas/probabilidad-estadistica/probabilidad-estadistica/probabilidad-estadistica-examenes/).
