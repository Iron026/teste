/**
 * CONFIGURAÇÃO CENTRAL DO PORTFÓLIO
 * ------------------------------------------------------------------
 * Altere aqui o nome, a descrição, os contatos e os links.
 * Os componentes leem tudo deste arquivo — não é preciso editar
 * nenhum outro lugar para trocar essas informações.
 *
 * Contatos vazios ('') NÃO aparecem no site. Preencha apenas com
 * dados reais. Enquanto estiverem vazios, o site informa de forma
 * honesta que os canais de contato ainda serão publicados.
 */

export const siteConfig = {
  /** Nome exibido no cabeçalho, rodapé, títulos e metadados. */
  name: 'Studio Digital',

  /** Iniciais usadas no monograma do logotipo (1 a 2 letras). */
  monogram: 'SD',

  /** Frase curta que acompanha o nome. */
  tagline: 'Desenvolvimento e soluções digitais',

  /** Descrição usada em SEO e no compartilhamento em redes sociais. */
  description:
    'Desenvolvimento de sites, planilhas inteligentes, automações e sistemas web personalizados para pequenos negócios, empreendedores e prestadores de serviços.',

  /**
   * Endereço público do site depois de publicado (sem barra no final).
   * Ex.: 'https://studiodigital.netlify.app'. Usado nos metadados de
   * compartilhamento. Pode ficar vazio até a primeira publicação.
   */
  siteUrl: '',

  /** Idioma e localidade. */
  locale: 'pt-BR',

  hero: {
    eyebrow: 'Profissional independente · Atendimento remoto',
    title: 'Soluções digitais que transformam ideias em resultados.',
    subtitle:
      'Desenvolvimento de sites, planilhas inteligentes, automações e sistemas personalizados para simplificar processos e impulsionar negócios.',
  },

  contact: {
    /**
     * WhatsApp com DDI + DDD + número, apenas dígitos.
     * Ex.: '5511999999999'. Vazio = botão não aparece.
     */
    whatsapp: '',

    /** Mensagem inicial que abre no WhatsApp. */
    whatsappMessage: 'Olá! Vi seu portfólio e gostaria de solicitar um orçamento.',

    /** E-mail profissional. Vazio = e-mail e formulário ficam ocultos/desativados. */
    email: '',

    /** Perfil profissional (99Freelas, LinkedIn, GitHub etc.). */
    profile: {
      label: 'Perfil no 99Freelas',
      url: '',
    },

    /** Links extras opcionais (ex.: GitHub). Itens com url vazia são ignorados. */
    extraLinks: [
      { label: 'GitHub', url: '' },
    ] as { label: string; url: string }[],
  },
} as const

export type SiteConfig = typeof siteConfig
