---
tags: [probabilidad, examen, final, 2018-1, fi-unam]
fecha: 2017-12-06
codigo: PROBA_1EF_MAT_2018-1
---

# Primer Examen Final — Probabilidad — Semestre 2018-1

> Facultad de Ingeniería UNAM · DCB · 6 de diciembre de 2017
>
> Patrones cubiertos: [[00_Patrones_y_Algoritmos#PATRÓN 1 — Probabilidad total + Bayes|Bayes]] · [[00_Patrones_y_Algoritmos#PATRÓN 2 — Densidad univariada|Densidad univariada]] · [[00_Patrones_y_Algoritmos#PATRÓN 6 — Poisson|Poisson]] · χ² · [[00_Patrones_y_Algoritmos#PATRÓN 3 — Densidad conjunta continua|Conjunta discreta]]

---

## Problema 1 — Examen de opción múltiple (Bayes)

**Enunciado.** Un alumno contesta una pregunta que ofrece cuatro soluciones posibles en un examen de opción múltiple. La probabilidad de que conozca la respuesta correcta es 0.8. Si contesta correctamente, ¿cuál es la probabilidad de que haya respondido al azar?

### Patrón → Bayes con respuesta correcta como evidencia

### Algoritmo
1. Eventos: $S$ = sabe, $A=\bar S$ = al azar, $C$ = contesta correctamente.
2. Datos: $P(S)=0.8$, $P(A)=0.2$, $P(C|S)=1$, $P(C|A)=1/4=0.25$.
3. Probabilidad total: $P(C)=P(C|S)P(S)+P(C|A)P(A)$.
4. Bayes: $P(A|C)=\dfrac{P(C|A)P(A)}{P(C)}$.

### Solución
$$P(C)=1\cdot 0.8+0.25\cdot 0.2=0.85$$
$$P(A|C)=\frac{0.25\cdot 0.2}{0.85}=\frac{0.05}{0.85}=\boxed{0.0588}$$

---

## Problema 2 — Cables A y B (probabilidad condicional)

**Enunciado.** Una carga es levantada por un cable $A$. Por seguridad se usa también un cable $B$ que normalmente no toma carga; pero si $A$ se rompe, $B$ debe tomarla. $P(\text{falla }A)=0.02$ y $P(\text{falla }B\,|\,A\text{ falla})=0.3$. Determine la probabilidad de que ambos cables fallen.

### Patrón → Regla del producto $P(A\cap B)=P(A)P(B|A)$

### Algoritmo
1. La intersección de la información dada es justamente $A\cap B$.
2. Aplica regla del producto.

### Solución
$$P(A\cap B)=P(A)\,P(B|A)=0.02\cdot 0.3=\boxed{0.006}$$

---

## Problema 3 — Densidad triangular: hallar $k$ y $E[X]$

**Enunciado.** $f(x)$ es triangular con vértice en $(1,k)$, base $[0,2]$, $f(0)=f(2)=0$. La recta del origen al vértice es $y=x$ y la recta del vértice al $(2,0)$ es $y=2-x$.
**a)** Determine $k$. **b)** Calcule $E[X]$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 2 — Densidad univariada|Densidad univariada]] (atajo geométrico)

### Algoritmo
```
a) Área del triángulo = 1.   k = 2/base.
b) E[X] = ∫ x f(x) dx, separando por tramos.
```

### Solución

**(a)** Por simetría/área: $\text{Área}=\tfrac{2\cdot k}{2}=k=1\Rightarrow \boxed{k=1}$.

Verificación analítica:
$$\int_0^1 x\,dx+\int_1^2(2-x)\,dx=\tfrac{1}{2}+\tfrac{1}{2}=1.\checkmark$$

**(b)**
$$E[X]=\int_0^1 x\cdot x\,dx+\int_1^2 x(2-x)\,dx=\frac{1}{3}+\left[x^2-\frac{x^3}{3}\right]_1^2=\frac{1}{3}+\frac{2}{3}=\boxed{1}$$

> Coincide con la simetría de la distribución respecto a $x=1$.

---

## Problema 4 — Barcos de carga (Poisson, escala temporal)

**Enunciado.** Llegan barcos a Veracruz con tasa promedio de **8 barcos/hora**. ¿Probabilidad de que lleguen exactamente 10 barcos en **2 horas**?

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 6 — Poisson|Poisson]] con escalamiento lineal de $\lambda$

### Algoritmo
```
1. λ_total = tasa × intervalo = 8 × 2 = 16.
2. Aplica P(X=k) = λ^k e^{-λ} / k!.
```

### Solución
$$P(X=10)=\frac{16^{10}\,e^{-16}}{10!}=\boxed{0.0341}$$

---

## Problema 5 — χ² inversa (lectura de tabla)

**Enunciado.** $X\sim\chi^2_{25}$. Encuentre $x$ tal que $P(X<x)=0.25$.

### Patrón → Cuantil de χ²

### Algoritmo
```
P(X<x)=0.25 ↔ buscar χ²_{ν, 1−0.25} = χ²_{25, 0.75}  (notación FI: el subíndice
es la probabilidad a la DERECHA).
```

### Solución
$$x=\chi^2_{25,\,0.75}=\boxed{19.939}$$

> Memoriza: en las tablas FI-UNAM, $\chi^2_{\nu,\alpha}$ deja área $\alpha$ a la derecha.

---

## Problema 6 — Distribución conjunta discreta (defectos × fábrica)

**Enunciado.** Tabla de probabilidad conjunta de $X$ (defectos) y $Y$ (fábrica):

| $X\backslash Y$ | $1$  | $2$  |
|-----------------|------|------|
| **0**           | 2/16 | 1/16 |
| **1**           | 1/16 | 1/16 |
| **2**           | 3/16 | 2/16 |
| **3**           | 2/16 | 4/16 |

**a)** ¿$X$ y $Y$ son independientes? **b)** Halle $E[X]$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 3 — Densidad conjunta continua|Conjunta discreta]]: marginales + test de independencia

### Algoritmo
```
1. Calcula marginales: f_X(x)=Σ_y f(x,y),  f_Y(y)=Σ_x f(x,y).
2. Test rápido: elige UN punto y verifica f(x,y) = f_X(x)·f_Y(y).
   Si falla en ese punto → NO son independientes (no hace falta probar todos).
3. E[X] = Σ_x x · f_X(x).
```

### Solución

**Marginales:**
$$f_X(0)=\tfrac{3}{16},\;f_X(1)=\tfrac{2}{16},\;f_X(2)=\tfrac{5}{16},\;f_X(3)=\tfrac{6}{16}$$
$$f_Y(1)=\tfrac{8}{16},\;f_Y(2)=\tfrac{8}{16}$$

**(a) Test en $(x=0,y=1)$:**
$$f_X(0)\,f_Y(1)=\tfrac{3}{16}\cdot\tfrac{8}{16}=\tfrac{24}{256}=\tfrac{3}{32}\neq\tfrac{2}{16}=f(0,1)$$

Como falla en un punto, **$X$ y $Y$ NO son estadísticamente independientes**.

**(b)**
$$E[X]=0\cdot\tfrac{3}{16}+1\cdot\tfrac{2}{16}+2\cdot\tfrac{5}{16}+3\cdot\tfrac{6}{16}=\tfrac{30}{16}=\boxed{1.875}$$

---

## Resumen estratégico de este examen

| # | Patrón aplicado | Concepto clave |
|---|-----------------|----------------|
| 1 | Bayes | Inversión condicional |
| 2 | Producto | $P(A\cap B)=P(A)P(B|A)$ |
| 3 | Densidad | Área = 1 |
| 4 | Poisson | Escalado de $\lambda$ |
| 5 | χ² | Lectura de tabla |
| 6 | Conjunta discreta | Marginales + independencia |

Vínculos: [[00_Patrones_y_Algoritmos]] · [[02_2018-1_Segundo_Final]]
