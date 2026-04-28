---
tags: [probabilidad, algoritmo-general, metaproceso]
---

# Algoritmo general — válido para los 4 exámenes finales

> **Conclusión tras revisar los 21 problemas de los exámenes 2017-1 y 2018-1**: SÍ existe un algoritmo único que resuelve cualquier problema. Cambia solo la *fórmula* del paso 5 según la distribución.

## El algoritmo (6 pasos)

```
┌────────────────────────────────────────────────────────────────────┐
│  PASO 1.  IDENTIFICAR LA VARIABLE ALEATORIA                       │
│           "Sea X la v.a. que representa ___"                      │
│           Determina su SOPORTE (rango de valores).                 │
├────────────────────────────────────────────────────────────────────┤
│  PASO 2.  CLASIFICAR                                              │
│           ┌─ Discreta vs continua                                  │
│           ├─ Univariada vs conjunta                                │
│           └─ ¿Hay condicionamiento?  (palabras "dado que", "si")   │
├────────────────────────────────────────────────────────────────────┤
│  PASO 3.  ASIGNAR DISTRIBUCIÓN (o usar la f(x) dada)              │
│           Tabla de "palabras gatillo" abajo.                       │
│           Extraer parámetros: n, p, λ, α, β, μ, σ, …               │
├────────────────────────────────────────────────────────────────────┤
│  PASO 4.  TRADUCIR LA PREGUNTA A UNA DE 5 FORMAS                  │
│           ① P(evento)         → integrar/sumar f                   │
│           ② E[g(X)]           → ∫ g(x) f(x) dx                     │
│           ③ Condicional       → P(A|B)=P(A∩B)/P(B), Bayes          │
│           ④ Marginal          → ∫ f(x,y) dy                        │
│           ⑤ Parámetro         → resolver ecuación que liga         │
│                                  dato muestral y parámetro          │
├────────────────────────────────────────────────────────────────────┤
│  PASO 5.  APLICAR LA FÓRMULA del paso 3                           │
│           (ver el "diccionario" en la nota Teoria_Minima)          │
├────────────────────────────────────────────────────────────────────┤
│  PASO 6.  EVALUAR Y VERIFICAR                                     │
│           ☑ ¿La probabilidad cae en [0,1]?                         │
│           ☑ ¿La esperanza tiene unidades correctas?                │
│           ☑ ¿La marginal integra a 1?                              │
└────────────────────────────────────────────────────────────────────┘
```

## Tabla de "palabras gatillo" (paso 3)

| Si el enunciado dice… | Distribución / patrón | Parámetros a extraer |
|---|---|---|
| "dado que ocurrió …" / "si …" | **Bayes** | $P(A_i)$ y $P(B\|A_i)$ |
| "$n$ ensayos independientes, $p$ éxito" | **Binomial** | $n,\,p$ |
| "se eligen $k$ de $N$ sin reemplazo" | **Hipergeométrica** | $N,\,K,\,n$ |
| "promedio $\lambda$ por unidad" | **Poisson** | $\lambda\cdot t$ |
| "tiempo entre / hasta el siguiente" | **Exponencial** | $\lambda$ |
| "tiempo hasta el $\alpha$-ésimo" | **Gamma / Erlang** | $\alpha,\,\beta$ |
| "altura, peso, error de medición" | **Normal** | $\mu,\,\sigma$ |
| "se dan $f(x)$ o $f(x,y)$ con figuras" | **Densidad explícita** | normalizar |
| "muestra de $n$, $\bar x$, $s$" | **Inferencia t** | $\bar x,\,s,\,n,\,\mu_0$ |
| "sistema con válvulas/componentes" | **Confiabilidad** | $p_i$ + topología |

## Verificación: el algoritmo aplicado a un problema de cada exam

### 2018-1, 1EF, Problema 1 (alumno opción múltiple)
1. **VA**: $S$=sabe, $A$=al azar, $C$=correcta.
2. **Clasificar**: eventos discretos, condicionamiento → Bayes.
3. **Distribución**: no aplica; aplica regla.
4. **Traducir**: pregunta es ③ condicional invertida $P(A\,|\,C)$.
5. **Fórmula**: Bayes con $P(C)=P(C\|S)P(S)+P(C\|A)P(A)$.
6. **Verificación**: $0.0588 \in [0,1]$. ✓

### 2018-1, 2EF, Problema 5 (Gamma)
1. **VA**: $X$ = horas de mantenimiento, soporte $(0,\infty)$.
2. **Clasificar**: continua univariada.
3. **Distribución**: Gamma, $\alpha=3,\beta=2$.
4. **Traducir**: ② $E[X]$ y $\sigma$, luego ① $P(X>8)$.
5. **Fórmula**: $E[X]=\alpha\beta=6$; $P(X>8)=\sum_{k=0}^{2}\frac{(8/2)^k e^{-4}}{k!}$.
6. **Verificación**: $0.238 \in [0,1]$, $\sigma=3.46$ h tiene unidades correctas. ✓

### 2017-1, 1EF, Problema 4 (telar)
1. **VA**: $X$ = #errores en 6 m.
2. **Clasificar**: discreta univariada.
3. **Distribución**: Poisson con $\lambda=0.75\cdot 6=4.5$.
4. **Traducir**: ① $P(X=0)$.
5. **Fórmula**: $P(X=0)=e^{-4.5}$.
6. **Verificación**: $0.0111\in[0,1]$. ✓

### 2017-1, 2EF, Problema 5 (prueba t)
1. **VA**: $\bar X$ = rendimiento medio muestral.
2. **Clasificar**: estimador de $\mu$, $\sigma$ desconocida.
3. **Distribución**: $\bar X\sim t_{n-1}$ (estandarizada).
4. **Traducir**: ⑤ Parámetro / decisión sobre $\mu_0$.
5. **Fórmula**: $t=(\bar x-\mu_0)/(s/\sqrt n)$, comparar con $t_{0.05,24}$.
6. **Verificación**: $|t|=2.5>1.711$ ⇒ rechazar $H_0$. ✓

## Patrón meta-frecuencia (los 21 problemas)

| Tipo de pregunta (paso 4) | Frecuencia |
|---|---|
| ③ Condicional / Bayes | 5 (24%) |
| ① Probabilidad de evento | 8 (38%) |
| ② Esperanza / momento | 5 (24%) |
| ④ Marginal o conjunta | 2 (10%) |
| ⑤ Parámetro / inferencia | 1 (5%) |

> **Implicación práctica**: el 62% de tus puntos viene de problemas de prob. de evento o Bayes. Domínalos primero.

## Distribución de familias en los 4 exámenes

| Familia | # apariciones |
|---|---|
| Bayes / Prob. condicional | 5 |
| Poisson | 3 |
| Binomial | 3 |
| Gamma | 2 |
| Conjuntas (discreta + continua) | 4 |
| Densidad explícita | 1 |
| Hipergeométrica | 1 |
| χ² (cuantil) | 1 |
| Inferencia t | 1 |

## Mantra del extraordinario

> **"Variable, soporte, familia, pregunta, fórmula, chequeo."**

Si en menos de 30 segundos puedes responder esas 6 cosas, el problema ya está prácticamente resuelto.

---

Vínculos: [[00_Patrones_y_Algoritmos]] · [[06_Teoria_Minima]] · [[README]]
