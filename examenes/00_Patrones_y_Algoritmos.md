---
tags: [probabilidad, patrones, algoritmos, diagnostico]
---

# Patrones de problemas y algoritmos de solución

Esta nota es un **árbol de decisión** y un *cookbook* de algoritmos para identificar rápido qué tipo de problema te están planteando. Memoriza el flujo y aplícalo antes de hacer cuentas.

## Flujo de diagnóstico (30 segundos)

```
¿El problema da una probabilidad condicional invertida (P(A|B) preguntando P(B|A))?
├── Sí → PATRÓN 1 · Bayes / Probabilidad total
└── No
    ├── ¿Habla de "al menos N", "ninguno", "exactamente N éxitos"?
    │   ├── Tamaño fijo n y p constante → PATRÓN 4 · Binomial
    │   ├── Sin reemplazo de N objetos → PATRÓN 5 · Hipergeométrica
    │   ├── Tasa por unidad (tiempo/área) → PATRÓN 6 · Poisson
    │   └── "Hasta el k-ésimo éxito" → Geométrica / Bin. Negativa
    ├── ¿Da una f(x) o f(x,y) con integrales?
    │   ├── 1 variable → PATRÓN 2 · Densidad univariada
    │   └── 2 variables → PATRÓN 3 · Densidad conjunta
    ├── ¿Habla de "tiempo entre", "vida útil", "tiempo hasta falla"?
    │   ├── Memoryless / 1 evento → PATRÓN 7 · Exponencial
    │   └── α-ésimo evento → PATRÓN 8 · Gamma (χ² si α=k/2, β=2)
    └── ¿Da media muestral, n y pregunta si μ=μ₀?
        └── PATRÓN 9 · Inferencia (t-Student)
```

---

## PATRÓN 1 — Probabilidad total + Bayes

**Pista textual**: "dado que ocurrió X", "si la pieza es defectuosa, ¿cuál es la prob. de que venga de…", "si la alarma suena…".

### Algoritmo
```
1. Etiqueta los eventos (A₁,…,Aₙ partición de Ω; B = evento condicionante).
2. Escribe los datos:    P(Aᵢ) y P(B|Aᵢ).
3. Probabilidad total:   P(B) = Σᵢ P(B|Aᵢ) P(Aᵢ).
4. Bayes:                P(Aⱼ|B) = P(B|Aⱼ) P(Aⱼ) / P(B).
5. Si te piden P(A∩B):   = P(B|A) P(A).
```

### Trampas frecuentes
- Confundir $P(A|B)$ con $P(B|A)$.
- Olvidar que $P(B|\bar A)$ se obtiene de "responde *al azar*" → reparte uniforme entre alternativas.

---

## PATRÓN 2 — Densidad univariada (constante de normalización + esperanza)

**Pista textual**: figura triangular, gráfica de $f(x)$, "determine $k$".

### Algoritmo
```
1. ∫₋∞^∞ f(x) dx = 1 → despeja k.
   • Si f es geométrica simple (triángulo, rectángulo): usa Área = 1.
2. E[X] = ∫ x f(x) dx.
3. E[X²] = ∫ x² f(x) dx; Var(X) = E[X²] − (E[X])².
4. F(x) = ∫₋∞^x f(t) dt para probabilidades.
```

### Truco
Para un triángulo de base $b$ y altura $h$: $\int f = \tfrac{bh}{2} = 1 \Rightarrow h = 2/b$.

---

## PATRÓN 3 — Densidad conjunta continua

**Pista textual**: $f_{XY}(x,y)$ con dominio rectangular o triangular.

### Algoritmo
```
1. Verifica/halla constante: ∬ f(x,y) dx dy = 1.
2. Marginal de X:        f_X(x) = ∫ f(x,y) dy   (sobre el soporte de Y).
3. Marginal de Y:        f_Y(y) = ∫ f(x,y) dx.
4. Condicional:           f(x|y) = f(x,y) / f_Y(y).
5. Independencia:        f(x,y) = f_X(x) f_Y(y) ∀(x,y) en el soporte.
   ⚠ Basta UN punto donde falle para concluir NO independencia.
6. P(X<a, Y>b) = ∬_{x<a,y>b} f(x,y) dx dy.
7. E[g(X,Y)] = ∬ g(x,y) f(x,y) dx dy.
8. E[Y|X=x] = ∫ y f(y|x) dy.
```

---

## PATRÓN 4 — Binomial $X\sim\text{Bin}(n,p)$

**Pista textual**: "n ensayos independientes", "probabilidad $p$ de éxito", "exactamente $k$".

### Algoritmo
```
1. Identifica n, p y la variable X = #éxitos.
2. P(X=k) = C(n,k) p^k (1-p)^{n-k}.
3. E[X]=np ; Var(X)=np(1-p).
4. P(X≥1) = 1 − P(X=0) = 1−(1−p)^n.
5. Para "encontrar n" dado E[fracaso]: usa que E[#fracasos] = n(1-p).
```

---

## PATRÓN 5 — Hipergeométrica (extracción sin reemplazo)

**Pista textual**: "se extraen *k* de *N* objetos sin reemplazo", varias clases.

### Algoritmo
```
P(X=x, Y=y) = C(K_A, x)·C(K_B, y)·C(K_C, n−x−y) / C(N, n)
donde N=K_A+K_B+K_C y n es el tamaño de la muestra.
Marginales: cada variable es Hipergeom. univariada.
```

---

## PATRÓN 6 — Poisson $X\sim\text{Po}(\lambda)$

**Pista textual**: "promedio de … por unidad de tiempo/área/longitud".

### Algoritmo
```
1. λ = (tasa por unidad) × (tamaño del intervalo).  ← escala lineal en t.
2. P(X=k) = λ^k e^{-λ} / k!.
3. P(X≥k) = 1 − Σ_{j<k} P(X=j).
4. Vínculo Poisson↔Exponencial: si llegadas son Poisson(λ),
   el tiempo entre llegadas es Exp(λ).
```

---

## PATRÓN 7 — Exponencial $X\sim\text{Exp}(\lambda)$

**Pista textual**: "tiempo hasta el siguiente fallo", *memoryless*.

### Algoritmo
```
f(x) = λ e^{-λx}, x>0;  F(x) = 1 − e^{-λx}.
P(X>a) = e^{-λa};  E[X]=1/λ;  Var(X)=1/λ².
Sin memoria: P(X>s+t | X>s) = P(X>t).
```

---

## PATRÓN 8 — Gamma $X\sim\Gamma(\alpha,\beta)$ (FI-UNAM: $\mu=\alpha\beta$)

**Pista textual**: "tiempo hasta el α-ésimo evento", "mantenimiento", "supervivencia".

### Algoritmo
```
f(x) = x^{α−1} e^{−x/β} / (β^α Γ(α)),  x>0.
E[X]=αβ ;  Var(X)=αβ² ;  σ=β√α.
Si α∈ℕ: P(X>a) = Σ_{k=0}^{α−1} (a/β)^k e^{−a/β} / k!  (forma Erlang ↔ Poisson).
χ² con ν gl  ≡  Γ(α=ν/2, β=2).
```

### Truco para $\alpha$ pequeña
Integra $\int_a^\infty x^{\alpha-1}e^{-x/\beta}dx$ por partes (IBP) o usa la equivalencia Erlang ↔ suma Poisson.

---

## PATRÓN 9 — Inferencia: prueba de hipótesis para $\mu$ (t-Student)

**Pista textual**: "muestra de n=…", "media muestral", "$\sigma$ desconocida", "decida si $\mu=\mu_0$".

### Algoritmo
```
1. H₀: μ = μ₀  vs  H₁: μ ≠ μ₀.
2. Estadístico: t = (x̄ − μ₀) / (s/√n)   con (n−1) gl.
3. Región de aceptación al nivel α: [−t_{α/2,n−1}, t_{α/2,n−1}].
4. Si t obs ∈ región → no se rechaza H₀;  si no → se rechaza.
```

---

## Tabla relámpago de momentos

| Distribución | $E[X]$ | $\text{Var}(X)$ |
|---|---|---|
| Bin($n,p$) | $np$ | $np(1-p)$ |
| Hipergeom($N,K,n$) | $nK/N$ | $\tfrac{nK(N-K)(N-n)}{N^2(N-1)}$ |
| Poisson($\lambda$) | $\lambda$ | $\lambda$ |
| Geom($p$) | $1/p$ | $(1-p)/p^2$ |
| Exp($\lambda$) | $1/\lambda$ | $1/\lambda^2$ |
| Gamma($\alpha,\beta$) | $\alpha\beta$ | $\alpha\beta^2$ |
| Normal($\mu,\sigma^2$) | $\mu$ | $\sigma^2$ |
| $\chi^2_\nu$ | $\nu$ | $2\nu$ |
| $t_\nu$ | $0$ | $\nu/(\nu-2)$ |

## Errores típicos en exámenes (ahorra puntos)

1. **Olvidar el dominio en una marginal**: la integral va sobre el rango donde $f(x,y)>0$, no $(-\infty,\infty)$.
2. **Mezclar parametrizaciones de Gamma**: en FI se usa $\beta$ como escala; en otros textos se usa $\beta$ como tasa. Verifica que $E[X]=\alpha\beta$.
3. **Usar Z en lugar de t**: si $\sigma$ es desconocida y $n$ pequeña → t de Student.
4. **Doble conteo en Bayes**: $P(B)$ debe sumar **todas** las ramas de la partición.
5. **Independencia conjunta vs. condicional**: en variables dependientes, $f(x|y)\neq f(x)$ siempre.

---

Vínculos cruzados: [[01_2018-1_Primer_Final]] · [[02_2018-1_Segundo_Final]] · [[03_2017-1_Primer_Final]] · [[04_2017-1_Segundo_Final]]
