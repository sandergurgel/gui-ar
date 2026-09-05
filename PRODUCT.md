# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Plantonista de urgência e emergência (beira-leito, pronto-atendimento, ambulância/SAMU). Situação: estresse, interrupções, luvas, plantão noturno, sem rede. Job: decidir a trilha da via aérea em <15s, calcular doses em mg+mL, executar checklist 7Ps e ter o resgate CICO sempre à mão.

## Product Purpose

Auxílio cognitivo mHealth para intubação de urgência. Existe para reduzir carga mental, padronizar conduta entre CRASH/SRI/DSI-KOBE/AWAKE e aumentar a segurança do paciente. Sucesso: conduta certa em segundos, dose certa sem cálculo mental, nenhum passo crítico esquecido, resgate acionado sem hesitação — 100% offline.

## Positioning

Árvore de triagem em 4 passos (<15s) acoplada a SOS Planos A–D onipresente: a decisão e o resgate moram na mesma tela, não em manual separado.

## Operating Context

Fluxos: triagem guiada → trilha (Preparo/Doses/Execução/Pós) → ferramentas transversais (LEMON, push-dose). Ambientes: sala de emergência, ambulância, SAMU regional, plantão noturno com luz baixa. Rituais: 7Ps antes de induzir, EtCO2 como padrão-ouro pós-tubo, push-dose pronto no choque. Sem backend; estado do caso em `localStorage` (`gui_ar_session_v1_*`).

## Capabilities and Constraints

Capacidades confirmadas: triagem `runTriage`, calculadora `calculateDrugDose`/`getAllCalculatedDoses` (6 fármacos em apresentações SUS/SAMU), checklist 7Ps (19 itens), LEMON 5 critérios, push-dose noradrenalina/adrenalina, SOS A–D com cricotireoidostomia bisturi-dedo-bougie-tubo, PWA instalável offline (`manifest.json`, `sw.js`).
Restrições: mobile-first com alvos ≥48px, PWA 100% offline, sem backend/BD/auth, SPA estática React 18 + TS strict + Vite 6. Terminologia: CRASH, SRI, DSI/KOBE, AWAKE, 7Ps, LEMON, push-dose, CICO, Bougie, BURP, EtCO2. Indeciso: telemetria/log para a pesquisa da tese (LGPD pendente), destino de deploy.

## Brand Commitments

Nome Gui-Ar, selo mHealth, produto técnico do Mestrado Profissional PRFUG/DMD/CCS/UEM (Silvio F. Tolentino, orient. Sanderland J. T. Gurgel). Tom: calmo, direto, presente (“Respire — um passo de cada vez”). Vinculante: tonalidade azul clínica (navy profundo que contém + sky que orienta; vermelho reservado ao CICO).

## Evidence on Hand

Spec clínica e plano em `docs/superpowers/specs/2026-09-04-gui-ar-airway-app-design.md` e `docs/superpowers/plans/2026-09-04-gui-ar-core-app.md`; motores sob teste em `src/engines/` + `src/test/` (17 testes Vitest verdes); PWA em `public/manifest.json`, `public/sw.js`, `index.html`; `projeto.docx` (367KB) na raiz como fonte bruta — não fabricar depoimentos, benchmarks ou claims além destes.

## Product Principles

1. Quinze segundos primeiro: o caminho mais rápido à conduta certa vence qualquer completude.
2. Dose é segurança: mg e mL co-localizados, com contraindicação e alternativa visíveis — nunca cálculo mental.
3. Resgate antes do orgulho: falhou uma tentativa, o plano B está a um toque, sem culpa.
4. Offline é requisito, não feature: ambulância sem rede é o caso base.
5. Calma opera: um passo por tela, tipo legível de luva, zoom e teclado sempre.

## Accessibility & Inclusion

Mirar WCAG AA. Requisitos do contexto: zoom liberado, alvos ≥48px, foco visível, Esc fecha modais, `aria-live` em resultado/dose, contraste AA inclusive no plantão noturno, operável com luvas e uma mão.
