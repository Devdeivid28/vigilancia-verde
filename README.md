# vigilancia-verde

🧠 PROMPT PARA IA DE PROTOTIPAGEM FUNCIONAL

Crie um protótipo funcional de um sistema web responsivo e moderno para um hospital, voltado para o registro e gestão de Notificações de Eventos Adversos, Queixas Técnicas e Incidentes Transfusionais, com base nas informações a seguir:

🧭 Contexto Geral

O sistema será usado por diferentes setores de um hospital para preenchimento e acompanhamento de notificações.
Os setores são:

Tecnovigilância

Farmacovigilância

Hemovigilância

👤 Níveis de Acesso

Público (sem login)

Acesso direto à tela inicial.

Pode preencher formulários de notificação para qualquer um dos 3 setores.

Na parte superior da tela, haverá um botão “Login” para usuários internos.

Setores (com login)

Acesso a uma área interna exclusiva, com sidebar para navegação.

Ao logar, o usuário do setor é direcionado para um painel interno.

Pode visualizar notificações recebidas, marcar como “pendente” ou “respondido”, pesquisar notificações antigas, arquivar, e navegar entre abas como:

“Pendentes”

“Respondidas”

“Arquivadas”

“Pesquisa”

Cada setor visualiza apenas suas próprias notificações.

Administrativo

Gerencia todos os setores, acessa todas as notificações, controla cadastros e permissões.

📄 Formulários

Cada setor tem um formulário específico:

Tecnovigilância

Data da ocorrência

Setor de origem

Produto motivo da notificação (Artigo Médico / Equipamento Médico)

Marca

Registro Anvisa

Lote

Descrição detalhada da ocorrência

E-mail para acompanhamento (opcional)

Farmacovigilância

Setor de origem

Nome do paciente

Sexo (Masculino / Feminino)

Data de nascimento

Data do evento adverso

Breve descrição do evento

Medicamento suspeito

Data da notificação

E-mail para acompanhamento (opcional)

Hemovigilância

Nome do paciente

Nº de prontuário

Setor/Leito

Tipo de incidente (Imediato / Tardio)

Data da ocorrência

História de incidentes prévios (Sim / Não)

Hemocomponente administrado

Nº do hemocomponente

Data da administração

Caixa de seleção com múltiplos sintomas (lista fornecida)

E-mail para acompanhamento (opcional)

🌐 Layout & Navegação

Tela inicial clara e simples com botões ou cards grandes direcionando para os 3 formulários (Tecnovigilância, Farmacovigilância e Hemovigilância).

Responsivo para celular e desktop, com experiência fluida.

Sidebar no estilo da imagem enviada (use a imagem “WhatsApp Image 2025-10-07 at 14.05.03.jpeg” como referência direta).

Sidebar tipo “hambúrguer” em telas mobile.

Estilo moderno, com tons neutros de verde como cor principal.

Uso da sidebar para navegar nas áreas internas (Painel, Pendentes, Respondidas, Arquivadas, Pesquisa, Configurações, Logout).

📎 Referência visual da sidebar: use a imagem enviada como base estética para a barra lateral e organização geral da interface.

🔐 Autenticação

Login com usuário e senha.

Sem recuperação de senha por enquanto.

Usuários não logados só têm acesso aos formulários de preenchimento.

Crie também usuários fictícios para teste, com login e senha visíveis no protótipo (por exemplo, em uma área de “Login de Demonstração” ou na tela de login):

Tipo de Usuário	Nome	Login	Senha
Administrador	Adm. Sistema	admin	admin123
Tecnovigilância	Usuário Tecnovigilância	tecnovig	tecno123
Farmacovigilância	Usuário Farmacovig.	farmacovig	farma123
Hemovigilância	Usuário Hemovig.	hemovig	hemo123

Esses acessos devem permitir navegar nas respectivas áreas internas para testar o fluxo completo.

🧭 Fluxo de Uso Típico

Usuário externo acessa a página inicial → escolhe o setor → preenche o formulário → envia.

Setor recebe a notificação → entra no sistema → faz login → acessa painel interno → gerencia as notificações (pendentes, respondidas, pesquisa, etc.) através da sidebar.

Administrador acessa área administrativa completa.

📝 Requisitos adicionais

Não é necessário implementar validações de formulário nesta etapa.

Não há necessidade de envio de e-mail.

Priorize clareza, usabilidade e visual limpo.

Gere o protótipo com telas navegáveis, incluindo:

Tela inicial pública com formulários

Tela de login

Painel de setor com sidebar funcional

Tela de listagem de notificações

Tela de pesquisa de notificações anteriores

Telas dos formulários de cada setor

Área administrativa para o usuário “admin”

📌 Instruções para a IA

Gere um protótipo funcional, responsivo e navegável, com base nas especificações acima.
Inclua os usuários fictícios com login e senha conforme a tabela.
Use a imagem de referência fornecida para o estilo da sidebar e mantenha tons neutros de verde no design.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/72df66e4-d65f-48c7-8cbc-7205e25e5402).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
