# Adequação dos formulários ao Manual de Referência

## Objetivo
Ajustar os oito formulários públicos para seguir a versão 1.0 do manual anexado, usando provisoriamente a lista de setores indicada no próprio documento.

## Alterações compartilhadas
- Centralizar as opções padronizadas do manual: setores hospitalares, hemocomponentes, sinais e sintomas, tipos de queda, tipos de lesão e eventos cirúrgicos.
- Trocar todos os campos livres de setor por uma lista com os 10 setores do manual.
- Impedir datas futuras em todos os campos de data de evento/ocorrência e aplicar as relações cronológicas específicas da Farmacovigilância.
- Exigir no mínimo 30 caracteres e adicionar orientação nos campos de descrição.
- Manter e validar e-mails opcionais onde o manual os prevê.
- Renomear “Registro” para “Nº do Prontuário” onde aplicável.
- Exibir mensagens claras quando uma regra impedir o envio.
- Ajustar os botões para continuarem utilizáveis em telas pequenas.

## Ajustes por formulário
- **Tecnovigilância:** setor padronizado; data sem futuro; Registro ANVISA numérico ou “Não informado”; descrição mínima; nomenclatura do e-mail.
- **Farmacovigilância:** incluir Nº do Prontuário; setor padronizado; validar nascimento ≤ evento ≤ notificação ≤ hoje; descrição mínima; e-mail padronizado.
- **Hemovigilância:** alinhar os campos ao manual; separar setor e leito; usar lista de hemocomponentes; seleção única do tipo de reação; sintomas múltiplos obrigatórios; exigir especificação de “Outro”; incluir descrição mínima e Servidor Notificante obrigatório.
- **Saneantes:** incluir Data da Ocorrência e Produto Envolvido; tornar Marca e Registro ANVISA obrigatórios; setor padronizado; aceitar registro numérico ou “Não informado”; descrição mínima e e-mail padronizado.
- **Quedas:** tornar Tipo de Queda uma seleção única com a lista oficial; exigir especificação de “Outro”; padronizar prontuário, setor, data e descrição.
- **Identificação:** tornar Evento de Identificação uma seleção única obrigatória; padronizar prontuário, setor, data e descrição.
- **Lesão de Pele:** usar os nomes oficiais dos tipos de lesão; exigir especificação de “Outro”; restringir anexos a JPG, JPEG e PNG; padronizar prontuário, setor, data e descrição.
- **Cirurgia Segura:** tornar Evento Adverso uma seleção única com a lista oficial; exigir especificação de “Outro”; padronizar prontuário, setor, data e descrição.

## Verificação
- Conferir o estado final do projeto sem erros.
- Testar no navegador as principais regras: datas futuras, descrições curtas, escolhas obrigatórias, campos “Outro”, cronologia da Farmacovigilância e formatos de imagem.
- Revisar visualmente os oito formulários em tela ampla e celular.

## Limite deste ajuste
O envio continuará sendo demonstrativo, como no protótipo atual. Persistência real, controle de acesso seguro, trilha de auditoria e proteção de dados clínicos exigem uma etapa própria com Lovable Cloud antes do uso em produção.

## Detalhes técnicos
- Reutilizar os controles e o padrão visual existentes.
- Criar uma fonte única para listas e validações comuns, evitando divergências entre formulários.
- Não alterar as telas de gerenciamento nem o fluxo interno nesta etapa.
