---
name: Gui-Ar
description: Apoio calmo à decisão em via aérea — triagem em 15 segundos, 100% offline.
colors:
  navy-950: "#060B18"
  navy-900: "#0B1329"
  navy-800: "#0F172A"
  navy-600: "#1E3A8A"
  sky-500: "#0284C7"
  sky-400: "#38BDF8"
  ice-50: "#F8FAFC"
  ice-100: "#F0F4F8"
  emergency: "#DC2626"
  warning: "#D97706"
  success: "#16A34A"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
rounded:
  xl: "16px"
  xxl: "24px"
  full: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "20px"
components:
  button-primary:
    backgroundColor: "{colors.sky-400}"
    textColor: "{colors.navy-950}"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.sky-400}"
    textColor: "{colors.navy-950}"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  button-danger:
    backgroundColor: "{colors.emergency}"
    textColor: "{colors.ice-50}"
    rounded: "{rounded.xl}"
    padding: "10px 16px"
  chip-active:
    backgroundColor: "{colors.ice-100}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
---

# Design System: Gui-Ar

## Overview

**Creative North Star: "Sala Calma"**

Confiança técnica em plantão noturno: navy profundo contém, sky orienta, hero navy liso sem motivo decorativo. Um passo por tela, tipo legível de luva, nenhum grito fora do CICO. Densidade Operate com respiro entre grupos e ritmo que ancora na triagem de 15 segundos.

**Key Characteristics:**
- Calma que opera: hierarquia por tinta, não por ruído.
- Tátil: tudo tocável tem 48px e foco sky visível.
- Sem enfeite: superfícies lisas, dados clínicos em texto tabular.

## Colors

Azul clínico em dois papéis: navy contém, sky guia; semânticas só onde salvam.

### Primary
- **Navy 900** (#0B1329): hero, header e contenção noturna. Fundo que abraça.
- **Navy 600** (#1E3A8A): ação institucional e SRI preenchido como caminho habitual.
- **Sky 400** (#38BDF8): guia e foco. CTA primário sobre navy-950, anel de foco, traçado EtCO2.

### Secondary
- **Sky 500** (#0284C7): caret, ênfase secundária e estados ativos contidos.

### Tertiary
- **Emergency** (#DC2626): reservado ao CICO/Plano D e contraindicação. Raridade é o ponto.
- **Warning** (#D97706): choque e DSI. Orientação, não pânico.
- **Success** (#16A34A): checklist concluído e confirmação.

### Neutral
- **Ice 50** (#F8FAFC): fundo claro.
- **Ice 100** (#F0F4F8): superfícies claras secundárias.
- **Navy 950** (#060B18) / **Navy 800** (#0F172A): fundo e cartão no plantão noturno.

### Named Rules
**The Red Silence Rule.** Vermelho aparece só no CICO e em contraindicação. Em qualquer outra tela, urgência se diz com sky e tipo.

## Typography

**Display Font:** system sans (with -apple-system fallback)
**Body Font:** system sans (with -apple-system fallback)
**Label/Mono Font:** ui-monospace for EtCO2 and measurements only

**Character:** Confiança técnica: extrabold curto para decisão, corpo relaxado para conduta, tabular para dose.

### Hierarchy
- **Display** (800, clamp 1.5–1.875rem, 1.15): “Triagem da via aérea”. Só no hero e resultado.
- **Headline** (800, 1.125–1.25rem, 1.2): nome da trilha e título de modal.
- **Title** (700, 0.875rem, 1.4): seções (“Sobre o paciente”, “Doses para 70 kg”).
- **Body** (400, 0.875rem, 1.6, 65–75ch): conduta e diluições. Mínimo 14px em Execução/Pós.
- **Label** (700, 0.75rem, wider): badges e abas. Nunca abaixo de 12px em ação.

### Named Rules
**The One Voice Rule.** Controles nomeiam a ação (“Iniciar — 15 segundos”, “Voltar ao passo atual”). Erros nomeiam problema e saída.

## Layout

Contêiner `max-w-5xl`, ritmo `space-y-5`, cartões `p-4/5`, BottomNav 64px com `safe-area`. Mobile-first: CTA full-width no polegar, tabs com scroll horizontal contido, modais `max-w-lg` centralizados. Grupos apertados dentro, separação generosa entre.

## Elevation & Depth

Camadas tonais, não sombras como linguagem. Superfícies planas em repouso; `shadow-xl` só no hero e modais, `shadow-sm` em cartões. Profundidade se lê pela tinta navy/slate.

### Named Rules
**The Flat-By-Calm Rule.** Sombra aparece como resposta a estado (hover, modal), nunca como decoração.

## Shapes

Linguagem redonda e tátil: hero e cartões grandes em 24px (xxl), controles e cartões internos em 16px (xl), pills e badges em full. Sem borda lateral colorida acima de 1px; sem máscara geométrica no lugar de contorno real.

## Components

### Buttons
- **Shape:** 16px (xl), mínimo 48px de altura.
- **Primary:** sky-400 sobre navy-950, extrabold, 16×24px. Ex.: “Iniciar — 15 segundos”.
- **Hover / Focus:** escurece sky / anel sky-400 de 2px com offset 2px. Foco sempre visível.
- **Danger:** emergency sobre ice-50. Só SOS/Plano D.

### Chips
- **Style:** fundo ice/navy por tema, borda 1px, full radius.
- **State:** ativo tinge pela condição (âmbar choque, sky broncoespasmo); `aria-pressed` espelha.

### Cards / Containers
- **Corner Style:** 24px nos grandes, 16px nos internos.
- **Background:** branco/navy-800; tints por trilha (red/amber/teal-50, navy-900 no SRI).
- **Shadow Strategy:** flat em repouso; xl só hero/modal.
- **Border:** 1px slate-200/navy-700; 2px só em seleção (sky-400) e Plano D (red-500).
- **Internal Padding:** 16–20px.

### Inputs / Fields
- **Style:** stepper —/+ 48px + campo tabular central em trilho slate-50/navy-900, 16px radius.
- **Focus:** anel sky-400; caret sky-500. Fonte ≥16px para não disparar zoom iOS.
- **Error / Disabled:** faixa 10–250 kg inline; vazio não salta silencioso.

### Navigation
- **Style:** BottomNav 5×60px, label 12px com ícone Lucide 20px; ativa em navy/sky bold.
- **Mobile treatment:** thumb-zone embaixo; topo só para voltar e SOS.

### Dose Card (Signature Component)
Medida gigante tabular (mg + mL lado a lado), badge 1ª Escolha/Contraindicado, nota clínica com ícone Info. O número manda; o resto colapsa.

## Do's and Don'ts

### Do:
- **Do** reservar vermelho ao CICO e à contraindicação real.
- **Do** manter o hero navy liso, sem motivo gráfico — a hierarquia vem da tinta e do tipo.
- **Do** dar 48px, Esc e `aria-live` a toda decisão crítica.
- **Do** declarar offline no rodapé (“funciona na ambulância”).

### Don't:
- **Don't** usar pulse/bounce fora do CICO.
- **Don't** trocar Lucide por emoji em conduta clínica.
- **Don't** empilhar `bg-*` conflitantes no mesmo banner.
- **Don't** usar texto de ação abaixo de 12px.
