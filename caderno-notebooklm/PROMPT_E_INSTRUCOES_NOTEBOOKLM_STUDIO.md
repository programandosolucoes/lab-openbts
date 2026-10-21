# INSTRUÇÕES PARA GERAÇÃO DO PODCAST OFICIAL NO GOOGLE NOTEBOOKLM STUDIO

## 1. O que aconteceu na versão anterior (Causa-Raiz)
O script de download (`download_audio`) continha um fallback em disco para o arquivo antigo:
`A_matemática_por_trás_do_sistema_RAG.m4a` (áudio de 11:47 da aula de RAG e bancos vetoriais).
Esse arquivo foi renomeado e inserido na plataforma. O fallback foi completamente erradicado do código e o arquivo antigo foi removido da plataforma.

---

## 2. Passo a Passo para Gerar o Áudio Autêntico do Laboratório Telecom 2026

1. Acesse o seu Google NotebookLM:  
   👉 **https://notebook.google.com/** (ou https://notebooklm.google.com/) com a sua conta ativa (`carlosalberto4ti@gmail.com`).
2. Clique no botão **"+ Novo Caderno"** (New Notebook).
3. Nomeie o caderno como:  
   **"Laboratório MVNO Telecom 5G & EAD 2026"**
4. Adicione como **Fonte** o arquivo consolidado gerado na esteira:  
   📁 `C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\caderno-notebooklm\FONTE_OFICIAL_NOTEBOOKLM_LAB_MVNO_TELECOM_2026.md`  
   *(Basta arrastar o arquivo ou copiar e colar seu conteúdo como texto).*
5. Na barra lateral direita, localize a seção **"Estúdio" (Studio)** e clique no card **"Resumo em Áudio" (Audio Overview)**.
6. Clique no botão **"Personalizar" (Customize)** e cole o seguinte Prompt:

---

### Prompt de Personalização (Copiar e Colar no NotebookLM):

```text
Crie uma conversa aprofundada (Deep Dive) em português do Brasil entre dois especialistas técnicos discutindo a engenharia do Laboratório MVNO Telecom 2026.
Abordem em detalhes:
1. O fragmento tecnológico e a transição da telefonia tradicional TDM/SS7 para o ecossistema All-IP aberto.
2. Os cuidados regulatórios no Brasil: Resolução Anatel nº 777/2025 (MVNO Autorizada vs Credenciada) e a estrita proibição de radiação não outorgada (Art. 183 da LGT), exigindo bancada cabeada com 60 dB de atenuação.
3. A integração dos softwares de código aberto: Open5GS como núcleo 5G Standalone, Yate C++ como gateway de sinalização e tradutor de dialetos, e Asterisk 20 com PJSIP para serviços de voz corporativa e conferência.
4. O anel global de telecomunicações interconectando 6 cidades em 3 países: Brasil (+55: SP 11 e RJ 21), Estados Unidos (+1: Miami 305 e NYC 212) e Portugal (+351: Lisboa 21 e Porto 22), sob o plano E.164 com failover transcontinental.
5. A engenharia de voz e qualidade: negociação do codec Opus em 48 kHz para fidelidade de estúdio, fallback para G.711, e a medição do MOS (Mean Opinion Score) atingindo 4.41 conforme o Modelo E (ITU-T G.107).
Mantenham um tom dinâmico, didático, instigante e de altíssimo nível de engenharia de telecomunicações.
```

---

## 3. Como Publicar o Áudio Gerado no EAD
Assim que o NotebookLM concluir a geração (geralmente leva de 3 a 5 minutos):
1. No player do NotebookLM, clique nos três pontinhos (`...`) e selecione **"Fazer download"** (Download).
2. Salve o arquivo `.m4a` baixado em:  
   `C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\mvno-web-hostinger\ead\audio\nb_telecom_mvno_2026.m4a`
3. A esteira enviará o arquivo diretamente para o servidor Hostinger via SCP, disponibilizando-o instantaneamente no player da plataforma EAD.
