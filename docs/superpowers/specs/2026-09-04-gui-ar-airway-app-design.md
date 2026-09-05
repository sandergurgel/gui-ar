# Gui-Ar: Especificação Técnica e Clínica do Aplicativo mHealth

**Produto**: Gui-Ar — Apoio à Decisão Clínica no Manejo da Via Aérea em Urgência e Emergência  
**Pesquisador**: Silvio F. Tolentino  
**Orientador**: Prof. Dr. Sanderland José Tavares Gurgel  
**Programa**: Mestrado Profissional PRFUG/DMD/CCS/UEM  
**Data da Especificação**: 2026-09-04  
**Status**: Aprovado para Planejamento e Implementação  

---

## 1. Visão Geral e Contexto Acadêmico

O **Gui-Ar** é uma tecnologia mHealth desenvolvida como produto técnico-tecnológico do Mestrado Profissional em Urgência e Emergência da Universidade Estadual de Maringá (UEM). A aplicação foi concebida para atuar como auxílio cognitivo à beira-leito, reduzindo a carga mental, padronizando decisões e aumentando a segurança do paciente em procedimentos de intubação traqueal de urgência.

O protótipo atende a cenários críticos hospitalares e pré-hospitalares (como Hospital São José de Paiçandu, Pronto Atendimento Municipal de Marialva e SAMU Regional), estruturando a transição lógica entre quatro trilhas clínicas:
1. **Via Aérea Crash**
2. **Sequência Rápida de Intubação (SRI)**
3. **Sequência Atrasada de Intubação (DSI / KOBE)**
4. **Intubação Acordado (Awake)**

---

## 2. Identidade Visual e Experiência do Usuário (Mobile-First)

### 2.1 Paleta de Cores em Tons de Azul (Clínica e Hospitalar)
* **Azul Clínico Principal (Primary Navy)**: `#1E3A8A` / `#1E40AF` (Cabeçalhos, botões primários, destaque de autoridade e clareza).
* **Azul Aço e Ciano (Sky & Cyan Accents)**: `#0284C7` / `#38BDF8` (Abas ativas, barras de progresso, botões de ação secundária).
* **Superfícies e Cartões**:
  * *Modo Claro*: Fundo azul-gelo hospitalar suave (`#F8FAFC` / `#F0F4F8`), cartões brancos com bordas sutis (`#E2E8F0`) e sombras suaves.
  * *Modo Escuro (Plantão Noturno)*: Fundo ardósia meia-noite (`#0B1329` / `#0F172A`), cartões em tom marinho profundo (`#1E293B`), otimizado para telas OLED e conforto visual.
* **Cores Semânticas de Risco e Segurança**:
  * 🔴 **Vermelho Emergência (`#DC2626`)**: Trilha **Crash**, botão de pânico **"SOS / Plano de Falha Imediato"** e contraindicações absolutas.
  * 🔵 **Azul Médico (`#2563EB`)**: Trilha **SRI** clássica e dosagens de 1ª linha.
  * 🟡 **Âmbar / Alerta (`#D97706`)**: Trilha **DSI / KOBE**, avisos de instabilidade hemodinâmica e pré-oxigenação crítica.
  * 🟣 **Índigo / Esmeralda (`#4F46E5` / `#0D9488`)**: Trilha **Awake**, topicalização e via aérea anatômica difícil.
  * 🟢 **Verde Sucesso (`#16A34A`)**: Checagem de itens do checklist e confirmação de tubo traqueal posicionado.

### 2.2 Princípios de Ergonomia
* **Toque Rápido e Seguro**: Alvos de toque (botões) com altura mínima de 48px a 56px, evitando disparos acidentais em situações de estresse.
* **Header Fixo (Sticky)**:
  * Identidade Gui-Ar com alternador de tema Claro/Escuro.
  * Botão de emergência permanente **"SOS / Falha"** no canto superior direito para acesso em 0ms ao plano de via aérea difícil.
* **PWA 100% Offline**: Sem dependência de internet para consultas clínicas ou cálculos de doses na sala de emergência ou ambulância.

---

## 3. Arquitetura da Tela Inicial e Motor de Triagem

### 3.1 Tela Inicial (Dashboard Híbrido)
1. **Destaque Superior**: Cartão de chamada para a **"Triagem Rápida da Via Aérea"** (*"Classifique em 15 segundos"*).
2. **Grade de Acesso Direto às 4 Trilhas (Cards 2x2)**:
   * **CRASH**: Parada cardiorrespiratória (PCR), peri-parada ou inconsciência arreativa.
   * **SRI**: Sequência Rápida convencional com tempo para preparo e risco de aspiração.
   * **DSI / KOBE**: Sequência Atrasada para hipoxemia refratária, agitação ou acidose metabólica grave.
   * **AWAKE**: Intubação acordado para via aérea difícil anatômica prevista com preservação do drive respiratório.
3. **Barra de Ferramentas Rápidas**:
   * Calculadora Farmacológica Express.
   * Checklist dos 7 Ps.
   * Escore LEMON Rápido.

### 3.2 Algoritmo da Triagem Rápida (Árvore Decisória)
* **Passo 1 — PCR ou Peri-parada**:
  * *Pergunta*: "O paciente está em PCR, peri-parada ou inconsciência profunda agônica?"
  * *Se SIM* ➔ Encaminha imediatamente para **CRASH**.
  * *Se NÃO* ➔ Prossegue para o Passo 2.
* **Passo 2 — Otimização Hemodinâmica (Alerta de Choque peri-intubação)**:
  * *Pergunta*: "Apresenta choque / instabilidade hemodinâmica (PAS < 90 mmHg, choque séptico, hemorrágico ou cardiogênico)?"
  * *Se SIM* ➔ Emite alerta visual de **Ressuscitação Fisiológica**:
    * ⚠️ *Risco crítico de colapso cardiovascular peri-intubação! Realizar volume prévio e preparar vasopressor em bolus (Noradrenalina push-dose) antes de sedar. Reduzir dose do indutor.*
    * Salva estado `isShock: true` para aplicar descontos de dose na farmacologia.
* **Passo 3 — Predição de Via Aérea Difícil (VAD) Anatômica + LEMON**:
  * *Pergunta*: "Há preditores graves de VAD anatômica (estridor, massa faríngea/tumoral, hematoma expansivo, trauma maxilofacial grave) com risco de perda da via aérea se paralisar?"
  * *Recurso integrado*: Botão de abertura do checklist **LEMON** rápido:
    * **L** (Look external): trauma facial, barba espessa, obesidade, retrognatismo.
    * **E** (Evaluate 3-3-2): abertura interincisivos (< 3 dedos), distância mento-hióide (< 3 dedos), distância tireo-hióide (< 2 dedos).
    * **M** (Mallampati): classe III ou IV.
    * **O** (Obstruction): estridor, corpo estranho, abscesso periamigdaliano.
    * **N** (Neck mobility): colar cervical, espondilite, rigidez.
  * *Se VAD Anatômica Grave*:
    * Pergunta: "A equipe possui domínio técnico e materiais para intubação acordado (tópico + óptica/videolaringo)?"
      * *SIM* ➔ Trilha **AWAKE**.
      * *NÃO* ➔ Trilha **DSI / KOBE** (sedação dissociativa protetora mantendo drive).
  * *Se NÃO há VAD Grave* ➔ Prossegue para o Passo 4.
* **Passo 4 — Tolerância à Pré-Oxigenação e Agitação**:
  * *Pergunta*: "O paciente apresenta hipoxemia refratária (SpO2 < 93%), agitação psicomotora, delírio ou arranca a máscara?"
  * *Se SIM* ➔ Trilha **DSI / KOBE** (Cetamina dissociativa para pré-oxigenar por 3 minutos antes do bloqueador).
  * *Se NÃO* ➔ Trilha **SRI**.

---

## 4. Estrutura Interna de Cada Trilha Clínica

Cada trilha contém 4 abas superiores de navegação direta:
1. **① Preparo & Checklist**
2. **② Farmacologia & Doses**
3. **③ Execução & Plano de Falha**
4. **④ Pós-Intubação**

---

## 5. Módulo Farmacológico (Cálculo em mg e Volume em mL)

### 5.1 Apresentações e Fórmulas Clínicas Padronizadas (SUS/SAMU)

| Fármaco | Apresentação Comercial | Dose Padrão | Ajuste em Choque / Instabilidade | Volume Calculado (mL) | Observações Clínicas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Etomidato** | Ampola 2 mg/mL (10 mL = 20 mg) | 0,3 mg/kg | 0,15 a 0,20 mg/kg | $\text{Dose(mg)} / 2$ | Estabilidade hemodinâmica. 1ª escolha em choque/instabilidade. |
| **Cetamina** | Frasco 50 mg/mL (10 mL = 500 mg) | 1,5 a 2,0 mg/kg (SRI)<br>1,0 a 1,5 mg/kg (DSI) | 1,0 mg/kg | $\text{Dose(mg)} / 50$ | Efeito broncodilatador (ouro na Asma). Mantém drive ventilatório na DSI. |
| **Propofol** | Ampola 10 mg/mL (20 mL = 200 mg) | 1,5 a 2,0 mg/kg | **CONTRAINDICADO RELATIVO** | $\text{Dose(mg)} / 10$ | Risco extremo de vasodilatação e hipotensão no choque. |
| **Midazolam** | Ampola 5 mg/mL (3 mL = 15 mg) | 0,2 mg/kg | 0,1 mg/kg | $\text{Dose(mg)} / 5$ | Alternativa quando faltam Etomidato e Cetamina. |
| **Rocurônio** | Frasco 10 mg/mL (5 mL = 50 mg) | 1,2 mg/kg (dose SRI) | 1,2 mg/kg | $\text{Dose(mg)} / 10$ | 1ª escolha em risco de hipercalemia. Ação em 60s, dura 45-60 min. |
| **Succinilcolina**| Frasco 100 mg pó (diluir p/ 10 mL) | 1,0 a 1,5 mg/kg | 1,0 a 1,5 mg/kg | $\text{Dose(mg)} / 10$ | Rápido início (45s) e término (6-10 min). Bloqueado se hipercalemia/queimadura > 48h. |

### 5.2 Vasopressor em Bolus ("Push-Dose" Pressor)
* **Noradrenalina Push-Dose**:
  * *Preparo*: 1 mL de Noradrenalina (1 mg/mL) diluído em 99 mL de SF 0,9% (concentração = 10 mcg/mL).
  * *Posologia*: 1 a 2 mL (10 a 20 mcg) a cada 2 a 5 minutos para manter PAS > 90 mmHg / PAM > 65 mmHg peri-intubação.

### 5.3 Protocolo de Topicalização da Trilha Awake
* Anestesia de orofaringe com Lidocaína 10% spray (máx. 20 borrifadas / 200 mg).
* Lidocaína 2% gel na base da língua e narina (se nasotraqueal).
* Sedação suave e titulada: Cetamina 0,2 a 0,5 mg/kg IV lento ou Dexmedetomidina 0,5 mcg/kg em 10 min.

---

## 6. Checklist Operacional dos 7 Ps da SRI

1. **P1 — Preparação**:
   * [ ] Laringoscópio / Videolaringoscópio testado com luz forte.
   * [ ] Tubo endotraqueal (TET 7.5 e 8.0) com balonete testado e seringa de 10 mL.
   * [ ] Fio guia lubrificado ou Bougie disponível na mão.
   * [ ] Aspirador rígido (Yankauer) conectado e funcionando na cabeceira.
   * [ ] Dispositivo supraglótico (Máscara Laríngea) separada para plano de resgate.
   * [ ] Acesso venoso pérvio e monitorização completa ligada (SpO2, ECG, PNI, Capnógrafo).
   * [ ] Briefing da equipe: definição clara de funções (Laringoscopista, Assistente, Circulante).
2. **P2 — Pré-Oxigenação**:
   * [ ] 3 a 5 minutos a 100% de O2 (máscara com reservatório a 15 L/min ou VNI/CPAP com PEEP). Meta SpO2 > 95%.
   * [ ] *(Na DSI: dissociação com Cetamina para tolerar oxigenação por 3 minutos).*
3. **P3 — Pré-Otimização**:
   * [ ] Estabilidade hemodinâmica assegurada com volume ou vasopressor em bolus.
4. **P4 — Posicionamento**:
   * [ ] Posição olfativa (*Sniffing*) ou rampa (*Ramped*) para obesos (alinhamento trago-esterno).
5. **P5 — Paralisia com Indução Simultânea**:
   * [ ] Infusão em bolus do indutor seguida imediatamente do bloqueador neuromuscular sem ventilação positiva.
6. **P6 — Passagem do Tubo & Confirmação**:
   * [ ] Passagem orientada do tubo (priorizar videolaringoscopia ou Bougie).
   * [ ] Confirmação padrão-ouro: Capnografia com curva contínua de onda (EtCO2).
   * [ ] Confirmação secundária: ausculta em 5 pontos (epigástrio silencioso + 4 campos pulmonares simétricos).
7. **P7 — Pós-Intubação**:
   * [ ] Encaminhamento imediato para os cuidados pós-intubação.

---

## 7. Plano de Falha e Resgate (Algoritmo VAD - DAS / SBA)

Acessível por botão vermelho de emergência ("SOS") ou pela aba de execução:
* **Plano A — Tentativa de Intubação Traqueal**:
  * Máximo de 3 tentativas (ou 2 por generalista).
  * Otimizar a cada ciclo: reposicionar cabeça/rampa, trocar lâmina, passar Bougie, aplicar manobra BURP.
* **Plano B — Resgate com Dispositivo Supraglótico (DSG / Máscara Laríngea)**:
  * Inserção imediata de Máscara Laríngea de 2ª geração para restabelecer oxigenação.
* **Plano C — Ventilação com Máscara e Bolsa (Ambu)**:
  * Ventilação com 2 operadores (técnica VE-VE), cânula de Guedel e válvula de PEEP.
* **Plano D — Emergência CICO ("Não Intubo, Não Ventilo")**:
  * Chamada de ajuda ("Código Via Aérea").
  * **Cricotireoidostomia Cirúrgica por Técnica Bisturi-Dedo-Bougie-Tubo**:
    1. Palpar membrana cricotireóidea.
    2. Incisão horizontal com bisturi de lâmina 11 ou 20.
    3. Inserir o dedo indicador no orifício para palpar o lúmen traqueal.
    4. Passar o Bougie traqueal em direção aos pulmões.
    5. Deslizar o tubo endotraqueal n.º 6.0 sobre o Bougie e insuflar o cuff.

---

## 8. Cuidados Pós-Intubação

* **Fixação**: Fixar tubo na rima labial (marca padrão: 21 a 23 cm no adulto).
* **Parâmetros da Ventilação Mecânica Protetora Inicial**:
  * Volume Corrente (VC): **6 mL/kg de peso predito/ideal**.
  * PEEP: 5 a 8 cmH2O.
  * Frequência Respiratória: 12 a 16 rpm.
  * FiO2: 100% inicial, reduzindo para manter SpO2 entre 92% e 96%.
* **Sedoanalgesia Contínua**:
  * Início de infusão contínua para evitar despertar agitado com tubo traqueal (Fentanil associado a Midazolam, Cetamina ou Propofol).
* **Vigilância Hemodinâmica**: Monitorar queda de pressão arterial provocada pela pressão positiva intratorácica.
* **Solicitação de Radiografia de Tórax no Leito** (checar tubo a 3-4 cm da carina).

---

## 9. Arquitetura de Software e Tecnologias

* **Linguagem & Framework**: React 19 / 18 com TypeScript, Vite.
* **Estilização**: Tailwind CSS v3/v4 com paleta customizada em tons de azul (`navy`, `royal`, `sky`, `ice`).
* **Componentes & Ícones**: Lucide React.
* **Estado da Aplicação**: React Context + hooks personalizados com persistência em `localStorage` (para manter preferências e estado do paciente atual sem perda em caso de recarregamento).
* **Capacidade Offline / PWA**: Web App Manifest e Service Worker para instalação em tela inicial e execução sem internet.
