# Prompt — Claude Designer · Adachi Odontologia

> Cole este prompt inteiro no Claude Designer. Ele foi otimizado para gerar a landing page em uma única passada com hierarquia visual coerente com as referências (Sorria+, ClearDent, Dentora).

---

## 🎯 BRIEF

Crie uma **landing page premium, moderna e humanizada** para a **Adachi Odontologia**, clínica odontológica em Santo André/SP fundada em 2003. O site atual (clinicaadachi.com.br) é arcaico — quero um rebranding completo com UI/UX clean, sofisticado e acolhedor, no nível das melhores clínicas premium do Dribbble (estilo Sorria+ / ClearDent / Dentora).

A página deve transmitir: **confiança médica, atendimento humanizado, exclusividade premium e modernidade tecnológica** — sem cair no clichê genérico de "dentista feliz com paciente".

---

## 🏥 IDENTIDADE DA MARCA

| Campo | Valor |
|---|---|
| Nome | **Adachi Odontologia** |
| Tagline | *"Cuidado que transforma sorrisos desde 2003"* |
| Responsável Técnica | Dra. Patrícia Freitas dos Santos Adachi — CROSP 82.476 |
| Endereço | Rua Gravatá, 291 — Vila América, Santo André/SP |
| Telefone | (11) 4750-2605 |
| Instagram | @adachiodontologia |
| Horário | Seg-Sex · Recepção 08h–18h · Clínica 08h–20h |

**Diferenciais centrais (usar como pilares de mensagem):**
- ⏱️ Consultas de **1 hora** (atendimento dedicado, sem pressa)
- 🌿 **Odontologia biológica** (diferencial raro — implantes de cerâmica, remoção de amálgama)
- 💎 +20 anos de experiência · +15 especialidades
- 👤 100% particular (sem convênio) — posicionamento premium
- 🤝 Atendimento humanizado e personalizado

---

## 🎨 SISTEMA VISUAL

### Paleta
```
Navy profundo      #0A2540   ← headlines, footer, cards de destaque
Azul céu suave     #E8F4F8   ← backgrounds de seção, cards leves
Azul claro médio   #B8DCEC   ← acentos, hover states
Teal vibrante      #14B8A6   ← CTAs principais, ícones-destaque
Branco puro        #FFFFFF   ← base
Cinza claro        #F5F7FA   ← divisões sutis
Cinza texto        #475569   ← parágrafos
```

**Regra de ouro:** azul navy domina headlines e elementos sérios; teal aparece **apenas** em CTAs e micro-destaques (10% do visual). Nada de azul em tudo.

### Tipografia
- **Display/Headlines:** Plus Jakarta Sans ou DM Sans · weight 700 · tracking -0.02em
- **Corpo:** mesma família · weight 400 · line-height 1.6
- **Hierarquia:** H1 64px / H2 40px / H3 24px / body 16px / caption 14px

### Linguagem visual
- Cards com `border-radius: 20px` (24px nos heros, 16px nos pequenos)
- **Muito espaço em branco** — generoso, premium
- Sombras suaves: `0 4px 20px rgba(10,37,64,0.06)`
- Microinterações: hover com `scale(1.02)` + transição 300ms ease
- Blobs orgânicos sutis em SVG no fundo de seções-chave
- **Imagens reais** de pessoas sorrindo (não stock genérico) — estilo editorial, com leve filtro azulado coerente
- Ícones **traço fino** estilo Lucide (stroke 1.5px) — nunca flat genérico

---

## 📐 ESTRUTURA (na ordem)

### 1. NAVBAR (sticky, blur ao rolar)
- Logo Adachi à esquerda
- Menu pill central: `Home · A Clínica · Tratamentos ▾ · Equipe · Blog · Contato`
- Botão CTA teal à direita: **"Agendar Consulta"**

### 2. HERO — full-width, card branco interno sobre fundo `#E8F4F8`
**Layout split (igual Sorria+):**
- **Esquerda:** headline em 2 linhas
  > *"Seu sorriso merece**<br>**cuidado de verdade."*
- Subheadline (cinza texto):
  > *"Há mais de 20 anos cuidando de famílias em Santo André com odontologia humanizada, biológica e tratamentos duradouros."*
- 2 CTAs: `[Agendar Consulta]` (teal) · `[Conhecer a Clínica]` (ghost navy)
- Indicador de carrossel (3 dots) embaixo
- **Direita:** foto vertical de paciente real sorrindo + badge flutuante navy: **"+20 anos · +15 especialidades"**

### 3. BARRA DE CONFIANÇA
4 stats em linha, separados por divisor sutil:
`20+ anos` · `15+ especialidades` · `Consultas de 1h` · `100% particular`

### 4. SOBRE A CLÍNICA (estilo Image 1 — "Conheça a Sorria+")
**Split 60/40:**
- **Esquerda:** título *"Conheça a Adachi Odontologia"* + 2 parágrafos curtos sobre filosofia de atendimento personalizado + CTA `[Saiba mais sobre nós]`
- **Direita:** foto da Dra. Patrícia (vertical) + 2 cards verticais empilhados:
  - Card **navy** `#0A2540`: número grande **"+22"** / "anos de experiência"
  - Card **teal** `#14B8A6`: número grande **"+20k"** / "sorrisos cuidados"

### 5. NOSSOS TRATAMENTOS — carrossel horizontal (estilo Image 2)
**Cabeçalho:** título à esquerda *"Tratamentos completos para toda a família"* · setas de navegação à direita
**Cards-imagem deslizáveis** (5 visíveis por vez no desktop), com label inferior em gradiente escuro + ícone seta:
- Reabilitação Oral
- Implantes Dentários
- Lentes de Contato Dental
- Facetas de Porcelana
- Clareamento Dental
- Ortodontia
- Periodontia
- Odontologia Biológica

### 6. DIFERENCIAIS (grid 3×2 — estilo "Expertise you can trust")
**Título:** *"Por que escolher a Adachi"*
6 cards com ícone teal + título navy + descrição cinza:
- ⏱️ **Consultas Dedicadas** — 1h por paciente, sem pressa
- 👨‍⚕️ **Profissionais Qualificados** — equipe multidisciplinar
- 💎 **Materiais Premium** — somente alta qualidade certificada
- 🚗 **Fácil Acesso** — estacionamento e localização central
- 🦷 **15+ Especialidades** — tudo em um só lugar
- 💙 **Atendimento Humanizado** — você é único pra gente

### 7. ODONTOLOGIA BIOLÓGICA — seção-destaque (diferencial competitivo)
**Split com fundo `#E8F4F8`:**
- **Esquerda:** imagem (procedimento ou implante de cerâmica)
- **Direita:** badge teal *"Diferencial exclusivo"* + título *"Odontologia Biológica: tratamento que respeita seu corpo"* + texto sobre implantes de cerâmica e remoção segura de amálgama + CTA `[Entenda a abordagem biológica →]`

### 8. EQUIPE (estilo Image 3 — "Our team of experts")
**Título:** *"Conheça quem cuida do seu sorriso"* + tag *"Especialistas certificados"*
4 cards com foto circular + nome + especialidade. **Card 1 = Dra. Patrícia Adachi** (Responsável Técnica). Adicionar 3 placeholders para os demais especialistas.

### 9. SEÇÃO DEPOIMENTOS + INSTAGRAM
**Título:** *"Com a palavra, nossos pacientes"*
- Carrossel de cards com avatar + 5 estrelas + depoimento curto + nome
- Abaixo: grid 3×1 ou 4×1 com prints/embeds do feed `@adachiodontologia` + CTA `[Seguir no Instagram]`

### 10. FAQ (estilo Image 3 — accordion + imagem lateral)
**Título:** *"Perguntas frequentes"* + tag teal *"FAQ"*
Itens (todos colapsáveis):
1. Vocês aceitam convênio?
2. Quanto dura uma consulta?
3. O que é odontologia biológica?
4. Como agendar minha primeira consulta?
5. Vocês atendem crianças?
6. Quais formas de pagamento?

À direita do accordion: foto vertical pequena + card teal *"Tem outra dúvida? Fale conosco no WhatsApp"* com CTA.

### 11. CTA FINAL — banner navy full-width
Fundo `#0A2540` com imagem de fundo desbotada (paciente sorrindo) + overlay escuro:
- Título branco grande: *"Transforme seu sorriso hoje, para sorrir sempre."*
- Subtexto branco/70: *"Cuidamos de cada detalhe pra você exibir o sorriso que merece."*
- CTA teal grande: **"Agendar Consulta Agora"**

### 12. LOCALIZAÇÃO + FORMULÁRIO
**Split 50/50:**
- **Esquerda:** mapa Google embed (Rua Gravatá, 291 — Vila América, Santo André/SP) com card flutuante mostrando endereço, telefone e horário
- **Direita:** formulário simples com 3 campos (Nome · Telefone · Mensagem) + botão teal `[Enviar Mensagem]`

### 13. FOOTER (estilo ClearDent — com nome grande)
Fundo `#E8F4F8` ou navy:
- Logo Adachi grande à esquerda + tagline + redes sociais (Instagram · Facebook · YouTube · WhatsApp)
- 4 colunas: **Site** · **Tratamentos** · **Atendimento** · **Contato**
- Linha inferior: nome **"ADACHI"** ocupando largura total em peso bold ultra grande (estilo ClearDent — opcional, fica elegante)
- Sub-rodapé: © 2026 Adachi Odontologia · Responsável Técnica: Dra. Patrícia Freitas dos Santos Adachi · CROSP 82.476 · Política de Privacidade

---

## ✨ DETALHES OBRIGATÓRIOS DE UX

- ✅ Botão **WhatsApp flutuante** fixo (canto inferior direito) com pulse animation suave
- ✅ Animações no scroll: fade-in + slide-up (200ms delay entre elementos)
- ✅ 100% responsivo **mobile-first** — testar breakpoints 375px / 768px / 1440px
- ✅ Lazy-loading em imagens · Otimização para LCP < 2.5s
- ✅ Acessibilidade WCAG AA: contraste, alt texts, focus visíveis
- ✅ SEO: heading hierárquica correta, meta tags pra **"dentista Santo André"** e **"odontologia biológica Santo André"**
- ✅ Cursor custom em CTAs (sutil — só uma seta apontando)

---

## 🚫 EVITAR

- ❌ Visual genérico de WordPress/Elementor
- ❌ Stock photos óbvias de "dentista feliz com paciente fake"
- ❌ Excesso de azul em tudo (teal só pontual)
- ❌ Textos longos — usar bullets, cards e hierarquia
- ❌ Ícones flat genéricos (usar Lucide stroke 1.5)
- ❌ Sombras pesadas/escuras
- ❌ Gradientes saturados — só azul→branco bem suave
- ❌ Carrosséis automáticos sem controle do usuário

---

## 📦 ENTREGÁVEIS

1. Landing page única (one-page scroll) totalmente funcional
2. HTML semântico + CSS moderno (Tailwind se possível)
3. Componentes reutilizáveis (Card, Button, Section)
4. Mobile responsivo completo
5. Mock content em PT-BR onde apropriado
