# MEMORIA.md — Gui-Ar
**Registro consolidado do desenvolvimento — atualizado em 05/09/2026**

---

## 1. ESSÊNCIA DO PROJETO

**Gui-Ar** — auxílio cognitivo mHealth para intubação de urgência, 100% offline (PWA), produto técnico do Mestrado Profissional PRFUG/DMD/CCS/UEM.
- **Autor:** Silvio F. Tolentino · **Orient.:** Prof. Dr. Sanderland J. T. Gurgel
- **Usuário:** plantonista de urgência (beira-leito, SAMU, ambulância), sob estresse, com luvas, às vezes sem rede
- **Job:** decidir a trilha da via aérea em <15s, dose certa em mg+mL sem cálculo mental, checklist 7Ps, resgate CICO a um toque
- **Fluxo:** triagem em 4 passos → trilha (CRASH / SRI / DSI-KOBE / AWAKE) → Preparo/Doses/Execução/Pós → ferramentas transversais (LEMON, push-dose, SOS Planos A–D)
- **Stack:** React 18 + TypeScript strict + Vite 6 + Tailwind 3 + Vitest. PWA instalável (`manifest.json` + `sw.js`). Sem backend — estado em `localStorage` (`gui_ar_session_v1_*`)
- **Design system:** "Sala Calma" (DESIGN.md) — navy contém, sky orienta, vermelho só no CICO/contraindicação (The Red Silence Rule), alvos ≥48px, Lucide nunca emoji, um passo por tela, sombra só como resposta a estado

## 2. ARQUIVOS-CHAVE

| Caminho | Papel |
|---|---|
| `src/engines/triageEngine.ts` | Roteador CRASH→AWAKE/DSI→DSI→SRI + alerta de ressuscitação fisiológica |
| `src/engines/drugCalculator.ts` | Doses mg/mL de 7 fármacos com ajustes choque/broncoespasmo/hipercalemia/**TCE** |
| `src/data/drugs.ts` | Base de fármacos (etomidato, cetamina, propofol, midazolam, **fentanil**, rocurônio, succinilcolina) |
| `src/context/ClinicalContext.tsx` | Estado global + persistência localStorage **validada** |
| `src/utils/stateValidation.ts` | Sanitizadores puros (track, tab, peso, condições, LEMON, checklist) |
| `src/components/home/TriageModal.tsx` | Wizard 4 passos + resultado |
| `public/sw.js` | Network-first navegação / SWR assets, cache v2, escopo /gui-ar/ |
| `.github/workflows/deploy-pages.yml` | Deploy automático a cada push em main |

## 3. O QUE FOI FEITO (SESSÃO 05/09/2026)

### 3.1 Orquestração multi-agente (Hermes = orquestrador)
- **Discussão/auditoria:** Codex CLI `gpt-5.6-sol` (read-only, reasoning medium) — achou o bug crítico do fentanil fixo e o dessincronismo do choque
- **Implementação:** OpenCode `opencode-go/muse-spark-1.3-contributor` (3 rodadas: F1 bugs, F2 ícones, F3 TCE + estilo) — executor cirúrgico fiel com inventário botão-a-botão
- **Regra respeitada:** revisor ≠ executor; toda rodada do Spark foi verificada independentemente (tsc + vitest + build + revisão de diff linha a linha)
- Deploy: Codex preparou arquivos (sandbox dele bloqueia .git/rede) → orquestrador executou commit/push/gh api

### 3.2 F1 — Bugs corrigidos (consenso Hermes + Codex sol)
1. **Peso NaN** — digitar apagava o campo → doses calculadas p/ 10 kg. Agora: `setWeightKg` rejeita não-finitos; inputs mantêm último valor válido quando vazio (Dashboard, PharmacologyTab, altura no PostIntubationTab)
2. **localStorage sem validação** — track/tab/peso/condições/LEMON/checklist/sexo sanitizados na hidratação; valor corrompido não quebra mais a tela nem muda decisão clínica (+6 testes)
3. **Service worker cache-first eterno** — navegação network-first com fallback offline, demais GETs stale-while-revalidate, CACHE v2 → correções publicadas chegam aos dispositivos
4. **Triagem SIM→voltar→NÃO** — "NÃO" no choque agora desliga `isShock` (antes ficava ligado para sempre)
5. **Fentanil da sedoanalgésia** — vazão dinâmica `peso/50 a 2×peso/50 mL/h` (era fixo "1,5–3 mL/h", errado fora de ~70 kg) — achado CRÍTICO do Codex sol
6. **Alvos de toque ≥48px** — SOS 44→48px, links Push-Dose/LEMON, botões AWAKE/DSI do passo 3
7. **Favicon** `/vite.svg` → `/icon-192.svg` (fim do 404)
8. **PBW/VC ocultos** enquanto altura inválida; NaN parcial ("1e") bloqueado

### 3.3 F2 — UI/ícones
- 13 botões de ação ganharam ícones Lucide (aria-hidden, w-4 h-4): opções SIM/NÃO da triagem (AlertTriangle, HeartPulse, Zap, ShieldCheck, Eye, Wind, CheckCircle2), Refazer (RotateCcw), Voltar ao passo atual (Undo2), Limpar/Concluir LEMON, Fechar push-dose
- Planos A–D do SOS: RefreshCw / LifeBuoy / Wind / Scissors (D=cirúrgico)

### 3.4 F3 — TCE real na calculadora (aprovado explicitamente pelo orientor)
- **Fentanil** adicionado à base (50 mcg/mL, ampola 100 mcg/2 mL, categoria `adjuvant`)
- TCE ativo agora: recomenda **Fentanil + Propofol**, contraindica relativo **Cetamina** (eleva PIC)
- Nova seção **"Adjuvantes da Indução"** na aba Doses
- Arredondamento adaptativo no motor (`roundTo`, 2 casas p/ valores <1) — fentanil 70 kg = 0,14 mg / 2,8 mL exatos (+1 teste)

### 3.5 Estilo 3D tátil
- `.btn-3d` no index.css: sombra 4px na base que afunda no `:active` (translateY 3px) — profundidade como resposta ao toque, dentro da regra do DESIGN.md
- Aplicado só em CTAs: Iniciar, 4 cards de trilha, 10 botões SIM/NÃO, Acessar trilha, SOS, Abrir resgate. Links/chips/abas/steppers permanecem planos

### 3.6 Overflow mobile do Header (descoberto por inspeção visual real)
- Em ≤430px, header não cabia (marca + badge mHealth + subtítulo + 3 botões)
- Correção: elementos decorativos `hidden sm:inline` no mobile (badge, subtítulo, palavra "Falha" do SOS com `sr-only` preservando acessibilidade)
- Nota: "badges cortadas" nos screenshots eram artefato do Chrome headless (piso de 500px de layout) — em device real está íntegro

### 3.7 Deploy — GitHub Pages
- **URL:** https://sandergurgel.github.io/gui-ar/ (repo público `sandergurgel/gui-ar`)
- Base path `/gui-ar/` em vite.config, manifest (`start_url`/`scope`/icons), index.html, SW (fallbacks `/gui-ar/`), registro do SW via `import.meta.env.BASE_URL`
- Workflow Actions (npm ci → build → upload-pages-artifact → deploy-pages), Pages habilitado via API com `build_type=workflow`
- Commits: `9f636e5` (rollback Sala Calma) → `1256e73` (F1-F3) → `5360c44` (deploy)
- Verificado: app/SW/manifest todos 200; bundle servido = mesmo hash do build local; screenshot confirma renderização correta

## 4. ESTADO ATUAL

- **Testes:** 24/24 (6 triagem + 6 cenários clínicos + 6 calculadora + 6 validação de estado)
- **Build:** tsc strict limpo, Vite OK (~272 kB JS, gzip 73 kB)
- **Git:** branch `main`, remote `origin = github.com/sandergurgel/gui-ar`, árvore limpa no último commit `5360c44`
- **Deploy:** automático a cada push em main (Actions → Pages)

## 5. PENDÊNCIAS / PRÓXIMOS PASSOS

- [ ] Teste real no celular: instalar PWA (iOS: Adicionar à Tela de Início / Android: Instalar), testar offline avião ligado
- [ ] Validação clínica formal do conteúdo TCE/fentanil pelo orientador (Farmacologia nova — revisão bibliográfica antes da tese)
- [ ] CAAE/ethics e decisão de telemetria (LGPD) — hoje NENHUM dado sai do dispositivo
- [ ] Commit do MEMORY.md
- [ ] Opcional: aprofundar sombra 3D (6-8px) se o teste tátil no celular pedir; modo paisagem/tablet; testes E2E (Playwright) quando estabilizar

## 6. LIÇÕES DE ORQUESTRAÇÃO (registradas também na skill multi-agent-coding)

- Codex CLI com conta ChatGPT: slug curto (`sol`) falha 400 — usar `gpt-5.6-sol`; `reasoning high` em auditoria full-repo >15 min sem 1ª tool call — usar `-c model_reasoning_effort=medium`
- Codex `--sandbox workspace-write` não escreve em `.git` nem usa rede → agente prepara, orquestrador commita/pusha/verifica
- OpenCode muse-spark 1.3: excelente em correção cirúrgica com prompt-inventário (arquivos permitidos nominais + proibições + inserções botão-a-botão); respeita "não mude lógica"
- Sempre: self-report de agente ≠ verdade. Verificação independente (testes + diff + screenshot) pegou 2 resíduos que o executor deixou
- Chrome headless no Mac tem piso de 500px de layout — screenshots "360px" são cortes de 500px, não renderizações reais; para larguras reais usar device emulation de verdade ou device físico

---
*Documento de memória do projeto — manter atualizado a cada marco. Última atualização: 05/09/2026, deploy v1 no ar.*