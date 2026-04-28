---
tags: [probabilidad, examen, final, 2017-1, fi-unam, extraordinario-equivalente]
fecha: 2016-12-10
---

# Segundo Examen Final — Probabilidad — Semestre 2017-1

> Facultad de Ingeniería UNAM · DCB · 10 de diciembre de 2016
>
> **Examen completo del curso** (similar al extraordinario): incluye desde Bayes hasta inferencia.
>
> Patrones: Bayes · Convolución discreta · Marginal/Condicional · Binomial · Prueba de hipótesis t.

---

## Problema 1 — Alarma de refinería (Bayes)

**Enunciado.** $P(A)=0.20$ (accidente). $P(B|A)=0.98$ (alarma dado accidente). $P(B|\bar A)=0.04$ (alarma sin accidente). Si la alarma suena, ¿prob. de que haya ocurrido un accidente?

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 1 — Probabilidad total + Bayes|Bayes]] clásico (sensibilidad/especificidad)

### Algoritmo
```
1. P(B) = P(B|A)P(A) + P(B|Ā)P(Ā).
2. P(A|B) = P(B|A)P(A)/P(B).
```

### Solución
$$P(B)=0.98\cdot 0.20+0.04\cdot 0.80=0.196+0.032=0.228$$
$$P(A|B)=\frac{0.196}{0.228}=\boxed{0.8596}$$

> El solucionario oficial reporta $0.8888$, lo cual implicaría $P(B)\approx 0.2205$. Recomputando con los datos textuales: la respuesta correcta es $\mathbf{0.8596}$. Posible errata del PDF.

---

## Problema 2 — Ventas en 2 días (suma de Bernoulli)

**Enunciado.** Diariamente: $P(\text{vender 0 impresoras})=0.7$, $P(\text{vender 1})=0.3$. $X$=#impresoras vendidas en 2 días, ventas independientes. Halla $f_X(x)$.

### Patrón → Convolución de dos Bernoulli ⇒ Binomial $(n=2, p=0.3)$

### Algoritmo
```
1. Cada día: Bernoulli(p=0.3).
2. X = X_1 + X_2 ~ Bin(2, 0.3).
3. f_X(0)=0.7²; f_X(2)=0.3²; f_X(1)=1−f_X(0)−f_X(2) o 2(0.3)(0.7).
```

### Solución

| $x$ | $0$ | $1$ | $2$ |
|---|---|---|---|
| $f_X(x)$ | $\boxed{0.49}$ | $\boxed{0.42}$ | $\boxed{0.09}$ |

---

## Problema 3 — Líneas telefónicas (joint, marginal, condicional)

**Enunciado.** $f_{XY}(x,y)=\dfrac{3}{2}(x^2+y^2)$ para $0\le x\le 1,\ 0\le y\le 1$ (cero en otro caso).
**a)** $E[X]$. **b)** $E[Y\,|\,X=0]$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 3 — Densidad conjunta continua|Conjunta continua]] no separable ⇒ marginales por integración explícita

### Algoritmo
```
1. f_X(x) = ∫_0^1 (3/2)(x² + y²) dy = (3/2)(x² + 1/3) = (3/2)x² + 1/2.
2. E[X] = ∫_0^1 x·f_X(x) dx.
3. f(y|x=0) = f_{XY}(0,y) / f_X(0) = (3/2)y² / (1/2) = 3y².
4. E[Y|X=0] = ∫_0^1 y·3y² dy.
```

### Solución

**(a)** $f_X(x)=\dfrac{3}{2}x^2+\dfrac{1}{2}$.
$$E[X]=\int_0^1 x\left(\tfrac{3}{2}x^2+\tfrac{1}{2}\right)dx=\left[\tfrac{3x^4}{8}+\tfrac{x^2}{4}\right]_0^1=\tfrac{3}{8}+\tfrac{1}{4}=\tfrac{5}{8}=\boxed{0.625}$$

**(b)** $f(y|x=0)=3y^2$, soporte $[0,1]$.
$$E[Y|X=0]=\int_0^1 3y^3\,dy=\left[\tfrac{3y^4}{4}\right]_0^1=\boxed{0.75}$$

---

## Problema 4 — Reclutamiento (Binomial inversa)

**Enunciado.** $P(\text{aceptado})=0.10$. El número promedio de **no aceptadas** fue 270. ¿Cuántas personas se entrevistaron?

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 4 — Binomial|Binomial]] usando $E[\text{fracasos}]=n(1-p)$

### Algoritmo
```
1. Sea X = #aceptadas, Y = #no aceptadas = n − X.
2. E[Y] = n(1−p) = 270  ⇒  n = 270/(1−p).
   (La solución del DCB usa: n = 270 / 0.9 = 300, con E[X]=np=270 reinterpretando.)
```

### Solución

**Vía estándar.** Con $1-p=0.90$ (no aceptación):
$$n=\frac{270}{0.90}=\boxed{300\text{ personas}}$$

> *Coincide con el resultado oficial.* La interpretación literal del enunciado ("número promedio de no aceptadas") corresponde a $n(1-p)=270$.

---

## Problema 5 — Prueba de hipótesis (t-Student)

**Enunciado.** $H_0:\mu=500$ g/ml. Muestra $n=25$, $\bar x=520$, $s=40$. Acepta si $t\in[-t_{0.05},t_{0.05}]$ con 24 g.l.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 9 — Inferencia|Prueba t bilateral]]

### Algoritmo
```
1. t = (x̄ − μ₀) / (s/√n).
2. t_{0.05, 24} = 1.711  (tabla).
3. Si |t| > 1.711 → rechazar H₀.
```

### Solución
$$t=\frac{520-500}{40/\sqrt{25}}=\frac{20}{8}=2.5$$

Como $|t|=2.5>1.711$, **se rechaza** $H_0$: el rendimiento del proceso **no** es 500 g/ml.

> **Decisión final:** la afirmación del ingeniero NO se sostiene a un nivel de significancia $\alpha=0.10$ bilateral.

---

## Resumen estratégico

| # | Patrón | Lección clave |
|---|--------|---------------|
| 1 | Bayes (alarma) | Probabilidad total con $\bar A$ |
| 2 | Suma Bernoulli | Independencia día a día = Binomial |
| 3 | Conjunta no separable | Calcular marginal, luego condicional |
| 4 | Binomial inversa | $E[\text{fracasos}]=n(1-p)$ |
| 5 | t-Student | $t$ vs. $t_{\alpha/2, n-1}$ |

## Plan de estudio sugerido para el extraordinario

1. **Día 1**: Patrones 1–4 ([[00_Patrones_y_Algoritmos]] + [[01_2018-1_Primer_Final|primer final]]).
2. **Día 2**: Patrones 5–7 (Hipergeom., Poisson, Exponencial) — [[03_2017-1_Primer_Final]].
3. **Día 3**: Patrón 8 (Gamma) — [[02_2018-1_Segundo_Final|2EF 2018-1]] problema 5 + [[03_2017-1_Primer_Final|1EF 2017-1]] problema 5.
4. **Día 4**: Conjuntas continuas + condicionales — [[02_2018-1_Segundo_Final|problemas 3]] y este problema 3.
5. **Día 5**: Inferencia (t) — este problema 5 + [pdf 2018-1 Estadística].
6. **Día 6**: Examen simulado: hacer un final completo en 90 min sin notas.
7. **Día 7**: Repaso de errores.

Vínculos: [[00_Patrones_y_Algoritmos]] · [[01_2018-1_Primer_Final]] · [[02_2018-1_Segundo_Final]] · [[03_2017-1_Primer_Final]]
