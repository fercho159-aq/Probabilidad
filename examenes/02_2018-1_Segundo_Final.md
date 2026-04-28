---
tags: [probabilidad, examen, final, 2018-1, fi-unam, extraordinario-equivalente]
fecha: 2017-12-13
codigo: PROBA_2EF_MAT_2018-1
---

# Segundo Examen Final — Probabilidad — Semestre 2018-1

> Facultad de Ingeniería UNAM · DCB · 13 de diciembre de 2017
>
> **Este examen es el más cercano en formato y temario al extraordinario.** Estúdialo con prioridad alta.
>
> Patrones: Bayes · Independencia · Conjunta continua · Poisson · Gamma.

---

## Problema 1 — Tres máquinas (Bayes + intersección)

**Enunciado.** Máquinas A, B, C producen una pieza. Defectos: 6%, 7%, 3% respectivamente. Producción: 35% A, 25% B, 40% C.
**a)** Si la pieza es defectuosa, ¿prob. de que provenga de B?
**b)** ¿Prob. de que NO esté defectuosa **y** provenga de A?

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 1 — Probabilidad total + Bayes|Bayes]] (a) + Producto (b)

### Algoritmo
```
1. P(A)=0.35, P(B)=0.25, P(C)=0.40 (partición de Ω).
2. P(D|A)=0.06, P(D|B)=0.07, P(D|C)=0.03.
3. (a) P(D)=ΣP(D|·)P(·);   P(B|D)=P(D|B)P(B)/P(D).
4. (b) P(A∩D̄) = P(D̄|A)P(A) = (1−0.06)(0.35).
```

### Solución
$$P(D)=0.35\cdot 0.06+0.25\cdot 0.07+0.40\cdot 0.03=0.0505$$

**(a)**
$$P(B|D)=\frac{0.07\cdot 0.25}{0.0505}=\frac{0.0175}{0.0505}=\boxed{0.3465}$$

**(b)**
$$P(A\cap\bar D)=0.94\cdot 0.35=\boxed{0.329}$$

---

## Problema 2 — Componentes eléctricos independientes

**Enunciado.** $P(\text{funciona})=0.9$ por componente; el aparato tiene **2** componentes independientes.
**a)** ¿Prob. de que ningún componente falle? **b)** Función de probabilidad de $X$ = #componentes que funcionan.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 4 — Binomial|Binomial]] $\text{Bin}(n=2,p=0.9)$

### Algoritmo
```
1. X ~ Bin(2, 0.9).
2. f(k)=C(2,k) 0.9^k 0.1^{2-k}.
```

### Solución

**(a)** $P(X=2)=0.9^2=\boxed{0.81}$.

**(b)**

| $x$ | 0 | 1 | 2 |
|-----|----|----|----|
| $f(x)$ | $0.01$ | $0.18$ | $0.81$ |

---

## Problema 3 — Densidad conjunta $f(x,y)=xy/9$

**Enunciado.** $f(x,y)=\dfrac{xy}{9}$ para $0<x<3,\ 0<y<2$ y $0$ en otro caso.
**a)** $P(X<2,\ Y>1)$. **b)** $E[Y]$. **c)** $P(0.5\le Y\le 2)$. **d)** $P(X>2\,|\,Y=1)$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 3 — Densidad conjunta continua|Conjunta continua]] (factorizable ⇒ independencia)

> **Truco** $f(x,y)=xy/9 = (x/?)\cdot(y/?)$ — sí es separable; las marginales son independientes, pero el ejercicio te pide aplicar las definiciones.

### Algoritmo
```
1. P((x,y)∈R) = ∬_R f(x,y) dx dy.
2. Marginal: f_Y(y) = ∫_0^3 (xy/9) dx = y/2.
3. f_X(x) = x/9 · ∫_0^2 y dy = x · 2 / 9 = 2x/9.
4. Condicional: f(x|y)= f(x,y)/f_Y(y).
```

### Solución

**(a)**
$$P(X<2,Y>1)=\int_0^2\int_1^2 \frac{xy}{9}\,dy\,dx=\frac{1}{9}\int_0^2 x\cdot\frac{4-1}{2}\,dx=\frac{3}{18}\cdot\left[\tfrac{x^2}{2}\right]_0^2=\frac{2}{6}=\boxed{0.3333}$$

**(b)** Marginal de $Y$:
$$f_Y(y)=\int_0^3\frac{xy}{9}\,dx=\frac{y}{9}\cdot\frac{9}{2}=\frac{y}{2},\quad 0<y<2$$
$$E[Y]=\int_0^2 y\cdot\frac{y}{2}\,dy=\frac{1}{2}\cdot\frac{8}{3}=\boxed{1.333}$$

**(c)**
$$P(0.5\le Y\le 2)=\int_{0.5}^2\frac{y}{2}\,dy=\left[\frac{y^2}{4}\right]_{0.5}^2=1-\frac{1}{16}=\boxed{0.9375}$$

**(d)** Condicional:
$$f(x|Y=1)=\frac{f(x,1)}{f_Y(1)}=\frac{x/9}{1/2}=\frac{2x}{9},\quad 0<x<3$$
$$P(X>2|Y=1)=\int_2^3\frac{2x}{9}\,dx=\frac{1}{9}\left[x^2\right]_2^3=\frac{9-4}{9}=\boxed{0.5556}$$

---

## Problema 4 — Llamadas telefónicas (Poisson)

**Enunciado.** Llegan 6 llamadas/min en promedio.
**a)** $P(\text{5 llamadas en 2 min})$. **b)** $P(\text{al menos 2 llamadas en 1 min})$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 6 — Poisson|Poisson]] con escala temporal

### Algoritmo
```
(a) λ = 6×2 = 12;  P(X=5)=12^5 e^{-12}/5!.
(b) λ = 6;  P(X≥2)=1−P(X=0)−P(X=1).
```

### Solución

**(a)**
$$P(X=5)=\frac{12^5 e^{-12}}{5!}=\boxed{0.01274}$$

**(b)**
$$P(X=0)=e^{-6}=0.002479,\quad P(X=1)=6e^{-6}=0.014873$$
$$P(X\ge 2)=1-0.002479-0.014873=\boxed{0.98265}$$

---

## Problema 5 — Gamma (mantenimiento de equipo)

**Enunciado.** Tiempo mensual de mantenimiento: $X\sim\Gamma(\alpha=3,\beta=2)$ horas.
**a)** Media y desviación estándar. **b)** $P(X>8)$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 8 — Gamma|Gamma]] con $\alpha\in\mathbb{N}$ ⇒ usar Erlang↔Poisson

### Algoritmo
```
1. μ = αβ ; σ² = αβ²; σ = β√α.
2. P(X>a) = Σ_{k=0}^{α−1} (a/β)^k e^{−a/β} / k!     ← cuando α es entero.
   (equivale a la prob. de que un Poisson con λ = a/β registre < α eventos.)
```

### Solución

**(a)**
$$\mu=3\cdot 2=\boxed{6\text{ h}}\qquad\sigma^2=3\cdot 4=12,\;\sigma=\sqrt{12}=\boxed{3.4641}$$

**(b)** Con $\alpha=3,\beta=2,a=8\Rightarrow a/\beta=4$:
$$P(X>8)=\sum_{k=0}^{2}\frac{4^k e^{-4}}{k!}=e^{-4}\left(1+4+8\right)=13e^{-4}=\boxed{0.23810}$$

> *Verificación analítica (IBP):* $P(X>8)=\int_8^\infty \tfrac{x^2 e^{-x/2}}{2^3\Gamma(3)}dx=\tfrac{13}{e^4}$. ✓

---

## Mapa de patrones

| # | Patrón | Trampa frecuente |
|---|--------|------------------|
| 1 | Bayes / producto | "y además" = intersección, no condicional |
| 2 | Binomial $n=2$ | Listar todos los $k$ |
| 3 | Conjunta continua | Marginal sobre el soporte correcto |
| 4 | Poisson | Escalar $\lambda$ con el intervalo |
| 5 | Gamma | Recordar Erlang↔Poisson para integrar |

Vínculos: [[01_2018-1_Primer_Final]] · [[03_2017-1_Primer_Final]] · [[00_Patrones_y_Algoritmos]]
