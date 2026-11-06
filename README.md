# LAF Brasil — reconstrução

Site reconstruído a partir dos ZIPs fornecidos, com página inicial, Quem Somos, Conceito, Scooters, Bikes, Contato e páginas de produtos. Preserva estilos, fontes, fotos e vídeos originais, com JavaScript independente para navegação móvel, animações, perguntas frequentes e contato.

Execute `npm run build` e `npm start`, depois abra http://127.0.0.1:4173. Sem dependências externas. A pasta `dist` está pronta para hospedagem estática.

O catálogo atual ainda contém os modelos e a identidade LAF da referência. A adaptação para a nova marca e seus nove modelos ainda não foi aplicada. O catálogo usa imagens locais e consulta pelo WhatsApp original. Não há backend de vendas ou envio de formulários. As informações comerciais foram preservadas do material fornecido.

`build.mjs` recompõe o site a partir de `reference/www.lafbrasil.com.br`, extraído do ZIP original. `app.js` e `restored.css` contêm as interações e os ajustes responsivos.

## Quem Somos
Página disponível em `/quem-somos.html`, reconstruída do segundo ZIP. Inclui apresentação, história, missão e valores. O menu é compartilhado com a página inicial. Fonte em `reference-about/www.lafbrasil.com.br/quem-somos.html`.

## Conceito LAF
Página disponível em `/conceito.html`, reconstruída do terceiro ZIP, com origem, Life and Freedom, pilares, galeria e contato. Menus da página inicial e Quem Somos atualizados. O fundo decorativo bg-scooter.png não veio no arquivo; foi usado scooter-dark.webp disponível no material anterior.

## Scooters
Catálogo em `/scooters.html`, com 20 modelos e fichas em `/scooters/*.html`. As fichas usam somente as especificações presentes no ZIP, com foto e consulta via WhatsApp. Fotos recuperadas dos URLs originais e armazenadas localmente em `scooter-assets`; o download não é necessário para executar o site. Fonte: `reference-scooters/www.lafbrasil.com.br/scooters.html`.

## Bikes
Catálogo em `/bikes.html` com sete modelos e fichas em `/bikes/*.html`, usando as especificações do quinto ZIP. Fotos originais recuperadas e armazenadas em `bike-assets`. Navegação compartilhada atualizada. Fonte: `reference-bikes/www.lafbrasil.com.br/bikes.html`.

## Contato
Página em `/contato.html`, reconstruída do sexto ZIP. Formulário valida nome e mensagem, aceita telefone/e-mail opcionais e prepara mensagem no WhatsApp para revisão e envio pelo visitante. Não há envio automático nem backend de e-mail. O mapa e os links da página foram alinhados ao endereço textual do ZIP (Alça da Terceira Ponte, 245); os links originais apontavam para Rua São Paulo, 2050. Mapa depende de conexão com Google Maps.

## Animações
`motion.js` e `motion.css` restauram entradas por rolagem em sequência, transições do menu/FAQ, hover dos cards e máscara de texto do vídeo. Entradas usam IntersectionObserver e executam uma vez por carregamento. Vídeos pausam fora da tela. Respeita prefers-reduced-motion. Efeitos baseados na gravação de 15/10/2026; sem dependências externas. Validação no navegador: entradas da página Quem Somos e reprodução do vídeo mascarado na página inicial.

Animações revisadas: conteúdo inicial estável, entradas únicas ao rolar sem animações aninhadas e clique na página atual sem recarregamento. Preferência de movimento reduzido respeitada.
