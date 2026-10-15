# LAF Brasil — reconstrução

Página inicial reconstruída a partir do ZIP fornecido. Preserva HTML, estilos, fontes, fotos e vídeos originais, com JavaScript independente para navegação móvel, perguntas frequentes, diferenciais e contato.

Execute `npm run build` e `npm start`, depois abra http://127.0.0.1:4173. Sem dependências externas. A pasta `dist` está pronta para hospedagem estática.

O arquivo recebido não contém as páginas internas nem os arquivos GLB do catálogo. Os links de navegação levam às seções correspondentes e o catálogo usa imagens locais com consulta pelo WhatsApp original. Não há backend de vendas ou envio de formulários. As informações comerciais foram preservadas do material fornecido.

`build.mjs` recompõe o site a partir de `reference/www.lafbrasil.com.br`, extraído do ZIP original. `app.js` e `restored.css` contêm as interações e os ajustes responsivos.
