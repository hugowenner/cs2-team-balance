# 🎯 CS2 Team Balancer

Sistema de balanceamento de times 5v5 para Counter-Strike 2 com algoritmo determinístico, seed reproduzível e foco em equilíbrio competitivo.

---

## 🚀 Visão Geral

O **CS2 Team Balancer** foi desenvolvido para gerar partidas equilibradas de forma consistente, evitando partidas desbalanceadas e permitindo reprodução exata dos resultados via seed.

O sistema é pensado como uma ferramenta competitiva — não apenas um sorteador.

---

## ✨ Features

* ⚖️ Balanceamento inteligente (800 tentativas)
* 🎲 Seed reproduzível (mesmo resultado sempre)
* 🧠 Algoritmo determinístico
* 📊 Indicador visual de equilíbrio (diff)
* 👥 Entrada manual de jogadores (nome + nível)
* 📜 Histórico de partidas
* 📋 Copiar seed para reprodução
* 🎮 UI moderna estilo gaming (dark mode)

---

## 🧠 Como funciona

O sistema:

1. Recebe 10 jogadores com nível (1–10)
2. Gera múltiplas combinações de times
3. Calcula o equilíbrio entre CT vs TR
4. Seleciona a melhor distribuição possível
5. Retorna o resultado com seed única

---

## 🏗️ Stack

* **Frontend:** Next.js (App Router)
* **UI:** TailwindCSS + shadcn/ui
* **Animações:** Framer Motion
* **Backend:** API Routes (Next.js)
* **Banco:** Prisma (opcional para histórico)

---

## 📦 Instalação

```bash
git clone https://github.com/hugowenner/cs2-team-balance.git
cd cs2-team-balance
npm install
npm run dev
```

Acesse:

```bash
http://localhost:3000
```

---

## 🎮 Uso

1. Preencha os 10 jogadores
2. Defina o nível de cada jogador
3. Clique em:

👉 **Gerar Match Balanceado**

4. Veja:

   * Times CT vs TR
   * Diferença de pontos
   * Seed da partida

---

## 🔁 Reprodutibilidade

Cada partida possui uma seed única.

Isso permite:

* Recriar partidas
* Auditar resultados
* Garantir consistência

---

## 📊 Métricas

* **Diff (diferença):** mede o equilíbrio
* **Total por time:** soma dos níveis
* **Distribuição percentual:** balanceamento visual

---

## 🧩 Roadmap

* [ ] Ranking de jogadores
* [ ] Histórico por jogador
* [ ] Upload de dados de partidas
* [ ] Integração com estatísticas externas (GamersClub)
* [ ] Sistema de MMR interno
* [ ] Perfis de jogador

---

## ⚠️ Limitações

* Baseado em nível manual (não automático)
* Não considera performance real (ainda)
* Não integrado com APIs externas (por enquanto)

---

## 🧠 Filosofia

Este projeto não é um sorteador aleatório.

É um sistema focado em:

* equilíbrio
* previsibilidade
* competitividade

---

## 🤝 Contribuição

Pull requests são bem-vindos.

Para mudanças maiores:

1. Abra uma issue
2. Discuta a proposta
3. Submeta o PR

---

## 📄 Licença

MIT

---

## 👨‍💻 Autor

**Hugo Wenner**

* GitHub: https://github.com/hugowenner

---

## 🔥 Status

🟢 Em desenvolvimento ativo

---

## 🎯 Objetivo final

Transformar este projeto em uma ferramenta competitiva completa, com ranking, estatísticas e análise de desempenho.

---
