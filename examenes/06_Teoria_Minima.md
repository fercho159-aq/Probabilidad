---
tags: [probabilidad, teoria, formulario, minimo-imprescindible]
---

# Teoría mínima necesaria — Probabilidad FI-UNAM

> Conjunto **mínimo** de definiciones, axiomas y fórmulas para resolver cualquier final/extraordinario. Si no recuerdas algo en el examen, debe estar aquí.

## 1. Cimientos: espacio de probabilidad

### 1.1 Axiomas de Kolmogórov
Para todo evento $A\subseteq\Omega$:
1. $0\le P(A)\le 1$.
2. $P(\Omega)=1$.
3. Si $\{A_i\}$ son disjuntos: $P\left(\bigcup A_i\right)=\sum P(A_i)$.

### 1.2 Consecuencias inmediatas
- $P(\bar A)=1-P(A)$.
- $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.
- $P(\varnothing)=0$.

### 1.3 Probabilidad condicional y producto
$$P(A\,|\,B)=\frac{P(A\cap B)}{P(B)},\quad P(B)>0$$
$$P(A\cap B)=P(A)P(B\,|\,A)=P(B)P(A\,|\,B)$$

### 1.4 Independencia
$A\perp B \iff P(A\cap B)=P(A)P(B) \iff P(A\,|\,B)=P(A)$.

### 1.5 Probabilidad total y Bayes
Si $\{A_i\}$ es **partición** de $\Omega$:
$$P(B)=\sum_i P(B\,|\,A_i)P(A_i)\qquad\text{(prob. total)}$$
$$P(A_j\,|\,B)=\frac{P(B\,|\,A_j)P(A_j)}{\sum_i P(B\,|\,A_i)P(A_i)}\qquad\text{(Bayes)}$$

## 2. Variables aleatorias univariadas

### 2.1 Discreta
- **fmp**: $f(x)=P(X=x)$, con $f(x)\ge 0$ y $\sum f(x)=1$.
- **fda**: $F(x)=P(X\le x)=\sum_{t\le x}f(t)$.

### 2.2 Continua
- **fdp**: $f(x)\ge 0$ y $\int_{-\infty}^{\infty} f(x)\,dx=1$.
- **fda**: $F(x)=\int_{-\infty}^{x}f(t)\,dt$; $f(x)=F'(x)$.
- $P(a\le X\le b)=F(b)-F(a)=\int_a^b f(x)\,dx$.

### 2.3 Esperanza, varianza, momentos
$$E[X]=\sum x\,f(x)\quad\text{ó}\quad \int x f(x)\,dx$$
$$\text{Var}(X)=E[(X-\mu)^2]=E[X^2]-(E[X])^2$$
$$\sigma_X=\sqrt{\text{Var}(X)}$$

**Propiedades** (sea $a,b\in\mathbb R$):
- $E[aX+b]=a\,E[X]+b$.
- $\text{Var}(aX+b)=a^2\text{Var}(X)$.
- $E[g(X)]=\int g(x)f(x)\,dx$.

## 3. Variables aleatorias conjuntas

### 3.1 Conjunta y marginales
**Discreta**:  $f_{XY}(x,y)=P(X=x,Y=y)$,  $f_X(x)=\sum_y f_{XY}(x,y)$.

**Continua**:  $\iint f(x,y)\,dx\,dy=1$,  $f_X(x)=\int f(x,y)\,dy$.

### 3.2 Condicional
$$f(x\,|\,y)=\frac{f_{XY}(x,y)}{f_Y(y)},\quad f_Y(y)>0$$

### 3.3 Independencia (caso conjunto)
$$X\perp Y \iff f_{XY}(x,y)=f_X(x)f_Y(y)\quad\forall(x,y)\in\text{soporte}$$

### 3.4 Esperanza condicional
$$E[Y\,|\,X=x]=\int y\,f(y\,|\,x)\,dy$$

### 3.5 Esperanza total y covarianza
- $E[X+Y]=E[X]+E[Y]$ (siempre).
- $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)+2\,\text{Cov}(X,Y)$.
- Si $X\perp Y$: $\text{Cov}(X,Y)=0$ y $E[XY]=E[X]E[Y]$.
- $\text{Cov}(X,Y)=E[XY]-E[X]E[Y]$.

## 4. Distribuciones discretas (las que CAEN)

### 4.1 Bernoulli$(p)$
$f(x)=p^x(1-p)^{1-x}$, $x\in\{0,1\}$.    $E=p$, $\text{Var}=p(1-p)$.

### 4.2 Binomial$(n,p)$
$$f(x)=\binom{n}{x}p^x(1-p)^{n-x},\quad x=0,1,\dots,n$$
$$E=np,\quad\text{Var}=np(1-p)$$

### 4.3 Geométrica$(p)$
$f(x)=(1-p)^{x-1}p$, $x=1,2,\dots$    $E=1/p$, $\text{Var}=(1-p)/p^2$.

### 4.4 Binomial negativa$(r,p)$ (hasta el $r$-ésimo éxito)
$f(x)=\binom{x-1}{r-1}p^r(1-p)^{x-r}$, $x=r,r+1,\dots$.    $E=r/p$.

### 4.5 Hipergeométrica$(N,K,n)$
$$f(x)=\frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}}$$
$$E=\frac{nK}{N},\quad\text{Var}=\frac{nK(N-K)(N-n)}{N^2(N-1)}$$

### 4.6 Poisson$(\lambda)$
$$f(x)=\frac{\lambda^x e^{-\lambda}}{x!},\quad x=0,1,2,\dots$$
$$E=\text{Var}=\lambda$$

> **Escalado lineal**: si la tasa es $r$ por unidad y observas $t$ unidades, $\lambda=r\,t$.

## 5. Distribuciones continuas (las que CAEN)

### 5.1 Uniforme$(a,b)$
$f(x)=\dfrac{1}{b-a}$ en $[a,b]$.    $E=\dfrac{a+b}{2}$, $\text{Var}=\dfrac{(b-a)^2}{12}$.

### 5.2 Exponencial$(\lambda)$
$$f(x)=\lambda e^{-\lambda x},\quad x>0$$
$$F(x)=1-e^{-\lambda x},\quad E=1/\lambda,\quad\text{Var}=1/\lambda^2$$

**Sin memoria**: $P(X>s+t\,|\,X>s)=P(X>t)$.

### 5.3 Gamma$(\alpha,\beta)$ — convenio FI: $\beta$ = escala
$$f(x)=\frac{x^{\alpha-1}e^{-x/\beta}}{\beta^\alpha\,\Gamma(\alpha)},\quad x>0$$
$$E=\alpha\beta,\quad\text{Var}=\alpha\beta^2$$

**Atajo Erlang** (cuando $\alpha\in\mathbb N$):
$$P(X>a)=\sum_{k=0}^{\alpha-1}\frac{(a/\beta)^k e^{-a/\beta}}{k!}$$

### 5.4 Ji-cuadrada$(\nu)$
Caso especial de Gamma con $\alpha=\nu/2$, $\beta=2$.    $E=\nu$, $\text{Var}=2\nu$.

Notación de tabla (FI-UNAM): $\chi^2_{\nu,\alpha}$ = valor que deja **área $\alpha$ a la derecha**.

### 5.5 Normal$(\mu,\sigma^2)$
$$f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$
**Estandarización**: $Z=(X-\mu)/\sigma\sim N(0,1)$.

### 5.6 t-Student$_\nu$
Si $Z\sim N(0,1)$ y $V\sim\chi^2_\nu$ independientes: $T=Z/\sqrt{V/\nu}\sim t_\nu$.    $E=0$, $\text{Var}=\nu/(\nu-2)$ para $\nu>2$.

Notación: $t_{\alpha,\nu}$ = área $\alpha$ a la derecha con $\nu$ g.l.

## 6. Estadística inferencial

### 6.1 Estadísticos muestrales
$$\bar X=\frac{1}{n}\sum X_i,\qquad S^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$$

### 6.2 Distribución de $\bar X$
- Si $X_i\sim N(\mu,\sigma^2)$, $\sigma$ conocida: $\dfrac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1)$.
- Si $\sigma$ desconocida: $\dfrac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}$.

### 6.3 Intervalos de confianza para $\mu$
- $\sigma$ conocida: $\bar x\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$.
- $\sigma$ desconocida: $\bar x\pm t_{\alpha/2,n-1}\dfrac{s}{\sqrt n}$.

### 6.4 Prueba de hipótesis para $\mu$ (bilateral)
$$H_0:\mu=\mu_0\quad\text{vs}\quad H_1:\mu\neq\mu_0$$
$$t=\frac{\bar x-\mu_0}{s/\sqrt n}\quad(\text{con }n-1\text{ g.l.})$$
**Decisión**: rechaza $H_0$ si $|t|>t_{\alpha/2,n-1}$.

## 7. Confiabilidad de sistemas (apariciones recurrentes)

### 7.1 Componentes en **serie** (todos deben funcionar)
$$R_{\text{serie}}=\prod_{i=1}^k R_i$$

### 7.2 Componentes en **paralelo** (basta uno funcionando)
$$R_{\text{par}}=1-\prod_{i=1}^k(1-R_i)$$

### 7.3 Mixtos: descomponer recursivamente.

## 8. Tabla maestra de momentos

| Distribución | $E[X]$ | $\text{Var}(X)$ |
|---|---|---|
| Bernoulli$(p)$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $np$ | $np(1-p)$ |
| Geom$(p)$ | $1/p$ | $(1-p)/p^2$ |
| Bin. Neg.$(r,p)$ | $r/p$ | $r(1-p)/p^2$ |
| Hipergeom$(N,K,n)$ | $nK/N$ | $\tfrac{nK(N-K)(N-n)}{N^2(N-1)}$ |
| Poisson$(\lambda)$ | $\lambda$ | $\lambda$ |
| Uniforme$(a,b)$ | $(a+b)/2$ | $(b-a)^2/12$ |
| Exp$(\lambda)$ | $1/\lambda$ | $1/\lambda^2$ |
| Gamma$(\alpha,\beta)$ | $\alpha\beta$ | $\alpha\beta^2$ |
| Normal$(\mu,\sigma^2)$ | $\mu$ | $\sigma^2$ |
| $\chi^2_\nu$ | $\nu$ | $2\nu$ |
| $t_\nu$ ($\nu>2$) | $0$ | $\nu/(\nu-2)$ |

## 9. Identidades útiles que SÍ aparecen en exámenes

- **Triángulo (densidad)**: base $b$, altura $h$ ⇒ área = $bh/2$.
- $\int_0^\infty x^n e^{-x/\beta}\,dx=\beta^{n+1}\,n!$ (para $n\in\mathbb N$).
- $\Gamma(\alpha+1)=\alpha\,\Gamma(\alpha)$, $\Gamma(n)=(n-1)!$ para $n\in\mathbb N$.
- $\sum_{k=0}^{\infty}\dfrac{\lambda^k}{k!}=e^\lambda$ (verificación de Poisson).

## 10. Errores habituales (pierde puntos)

1. Integrar la marginal sobre $(-\infty,\infty)$ en vez del **soporte**.
2. Confundir $\beta$ tasa vs. $\beta$ escala en Gamma. (FI: $E=\alpha\beta$ ⇒ escala.)
3. Usar $z$ cuando $\sigma$ es desconocida y $n$ pequeño (debe ser $t$).
4. No verificar que $\sum f(x)=1$ o $\int f=1$ tras hallar la constante.
5. En Bayes, olvidar una rama de la partición.
6. Usar $P(X<x)$ en lugar de $P(X\le x)$ para discretas (cambia la respuesta).
7. Olvidar el ajuste de continuidad al ir de discreta a continua.

---

Vínculos: [[00_Patrones_y_Algoritmos]] · [[05_Algoritmo_General]] · [[README]]
