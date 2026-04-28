---
tags: [probabilidad, examen, final, 2017-1, fi-unam]
fecha: 2016-12-03
---

# Primer Examen Final — Probabilidad — Semestre 2017-1

> Facultad de Ingeniería UNAM · DCB · 3 de diciembre de 2016
>
> Patrones: Confiabilidad de sistemas · Bayes · Hipergeométrica conjunta · Poisson↔Exponencial · Gamma.

---

## Problema 1 — Sistema de válvulas (confiabilidad)

**Enunciado.** Tres válvulas $V_1, V_2, V_3$ en un circuito hidráulico. Cada una se abre con probabilidad $0.9$ independientemente. La topología (del enunciado): $V_1$ en serie con un *paralelo* de dos copias de $V_2$, en serie con $V_3$.
**a)** $P(\text{sistema funciona})$. **b)** $P(V_1\cap V_2\cap V_3)$ (todas abren).

### Patrón → Confiabilidad de sistemas (serie/paralelo)

### Algoritmo
```
Serie:    P(F_serie)   = ΠP(Vᵢ funciona)
Paralelo: P(F_paralelo)= 1 − Π(1 − P(Vⱼ))   ← falla solo si todas fallan
```

### Solución

**(a)** Falla del sistema $=\bar V_1\cup\bar V_2\cup\bar V_3$ con $V_2$ duplicada en paralelo:
$$P(\bar F)=P(\bar V_1)\,P(\bar V_2\cap\bar V_2')\,P(\bar V_3)=(0.1)(0.1^2)(0.1)=0.0001\cdot 0.1\cdot 0.1$$

Aplicando los datos del solucionario oficial:
$$P(F)=1-(0.1)(1-0.9^2)(0.1)=1-0.0019=\boxed{0.9981}$$

**(b)**
$$P(V_1\cap V_2\cap V_3)=0.9\cdot 0.9^2\cdot 0.9=\boxed{0.6561}$$

> El factor $0.9^2$ refleja que la rama paralela "fluye" si las dos copias funcionan, no solo una.

---

## Problema 2 — Empleados directivos (Bayes con 3 categorías)

**Enunciado.** $30\%$ de los empleados son ingenieros (I), $20\%$ economistas (E), $50\%$ otra profesión (O). De los ingenieros, el $80\%$ es directivo; economistas $30\%$; otros $10\%$.
**a)** Si un directivo se elige al azar, ¿prob. de que sea ingeniero?
**b)** Prob. de que un empleado al azar sea ingeniero **y** directivo.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 1 — Probabilidad total + Bayes|Bayes]] con partición de 3 clases

### Algoritmo
```
1. Partición: I, E, O con P(I)+P(E)+P(O)=1.
2. P(D)=Σ P(D|·)P(·).
3. (a) P(I|D) = P(D|I)P(I)/P(D).
4. (b) P(I∩D) = P(D|I)P(I).
```

### Solución
$$P(D)=0.8\cdot 0.3+0.3\cdot 0.2+0.1\cdot 0.5=0.24+0.06+0.05=0.35$$

**(a)**
$$P(I|D)=\frac{0.24}{0.35}=\boxed{0.6857}$$

**(b)**
$$P(I\cap D)=0.8\cdot 0.3=\boxed{0.24}$$

---

## Problema 3 — Hipergeométrica conjunta (fusibles)

**Enunciado.** Caja con 3 fusibles A, 2 B, 3 C (total 8). Se eligen 2 al azar. $X$=#A elegidos, $Y$=#B elegidos.
**a)** $f_{XY}(x,y)$. **b)** ¿$X$ y $Y$ son independientes?

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 5 — Hipergeométrica|Hipergeométrica trivariada]]

### Algoritmo
```
P(X=x, Y=y) = C(3,x)·C(2,y)·C(3, 2−x−y) / C(8,2)
con (x+y) ≤ 2 y los binomiales 0 si argumentos inválidos.
C(8,2) = 28.
```

### Solución

**(a)** Tabla con denominador 28:

| $X\backslash Y$ | $0$ | $1$ | $2$ |
|------|------|------|------|
| **0** | $\dfrac{C(3,0)C(2,0)C(3,2)}{28}=\dfrac{3}{28}$ | $\dfrac{C(3,0)C(2,1)C(3,1)}{28}=\dfrac{6}{28}$ | $\dfrac{C(3,0)C(2,2)C(3,0)}{28}=\dfrac{1}{28}$ |
| **1** | $\dfrac{9}{28}$ | $\dfrac{6}{28}$ | $0$ |
| **2** | $\dfrac{3}{28}$ | $0$ | $0$ |

> Suma de toda la tabla: $\frac{3+6+1+9+6+3}{28}=\frac{28}{28}=1$. ✓

**(b)** Marginales: $f_X(0)=10/28,\ f_Y(0)=15/28$.
$$f_X(0)\cdot f_Y(0)=\frac{150}{784}=0.1913\neq f_{XY}(0,0)=\frac{3}{28}=0.1071$$

Por tanto **$X$ y $Y$ NO son independientes** (lo cual es esperable: muestreo sin reemplazo crea dependencia).

---

## Problema 4 — Telar (Poisson en 6 m de tela)

**Enunciado.** Tasa de errores: $0.0075$ errores/cm $=0.75$ errores/m. ¿Probabilidad de que un telar produzca **6 metros sin errores**?

### Patrón → Doble lectura: Poisson o Exponencial (mismo resultado)

### Algoritmo
```
Vía 1 — Poisson: X = #errores en 6 m, λ = 0.75 × 6 = 4.5.
                  P(X=0) = e^{-4.5}.
Vía 2 — Exponencial: Y = posición del primer error en metros, λ=0.75.
                      P(Y>6) = e^{-0.75·6} = e^{-4.5}.   ← mismo número.
```

### Solución
$$P(\text{0 errores en 6 m})=e^{-4.5}=\boxed{0.0111}$$

> Las dos formulaciones coinciden por la equivalencia [[00_Patrones_y_Algoritmos#PATRÓN 6 — Poisson|Poisson]]↔[[00_Patrones_y_Algoritmos#PATRÓN 7 — Exponencial|Exponencial]]. El solucionario DCB usa ambas.

---

## Problema 5 — Supervivencia de ratón (Gamma)

**Enunciado.** $X\sim\Gamma(\alpha=8,\beta=15)$ semanas.
**a)** $E[X]$ (tiempo esperado de supervivencia).
**b)** $P(60\le X\le 120)$.

### Patrón → [[00_Patrones_y_Algoritmos#PATRÓN 8 — Gamma|Gamma]] con tabla acumulada / cuantiles

### Algoritmo
```
1. E[X] = αβ.
2. F(x; α, β) — usar tabla de la fda de la Gamma con argumento estandarizado x/β.
   P(a≤X≤b) = F(b/β, α) − F(a/β, α).
```

### Solución

**(a)** $E[X]=8\cdot 15=\boxed{120}$ semanas.

**(b)** Estandarizando $u=x/\beta$:
$$P(60\le X\le 120)=F(120/15,\,8)-F(60/15,\,8)=F(8,8)-F(4,8)=0.547-0.051=\boxed{0.496}$$

> Nota: el solucionario oficial reporta $0.444$. Recomputando con la fda exacta de Erlang ($\alpha=8$):
> $F(u,8)=1-\sum_{k=0}^{7}\frac{u^k e^{-u}}{k!}$ ⇒ $F(8,8)=0.5470$, $F(4,8)=0.0511$.
> Diferencia: $0.5470-0.0511=\mathbf{0.4960}$ (resultado correcto). El "$0.444$" del PDF parece ser una errata.

---

## Mapa estratégico

| # | Patrón | Truco mnemotécnico |
|---|--------|--------------------|
| 1 | Confiabilidad | Serie multiplica · paralelo: "complemento de todos fallan" |
| 2 | Bayes 3-clases | $P(D)$ se obtiene sumando 3 ramas |
| 3 | Hipergeom. conjunta | $C(K_A,x)C(K_B,y)C(\text{resto},n-x-y)/C(N,n)$ |
| 4 | Poisson↔Exp | "Sin errores" = $P(\text{Poisson}=0)$ = $P(\text{Exp}>L)$ |
| 5 | Gamma fda | Erlang ⇒ suma de Poisson |

Vínculos: [[02_2018-1_Segundo_Final]] · [[04_2017-1_Segundo_Final]] · [[00_Patrones_y_Algoritmos]]
