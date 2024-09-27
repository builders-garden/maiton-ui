import { defineConfig } from 'vocs'

export default defineConfig({
  logoUrl: '/maiton-rounded.png',
  title: 'Maiton UI',
  sidebar: [
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'Example',
      link: '/example',
    },
    { 
      text: 'Components', 
      collapsed: false, 
      items: [ 
        {
          text: 'Address',
          link: '/components/address',
        },
        {
          text: 'Badge',
          link: '/components/badge',
        },
        {
          text: 'Banner',
          link: '/components/banner',
        },
        {
          text: 'Container',
          link: '/components/container',
        },
        {
          text: 'Text',
          link: '/components/text',
        },
        {
          text: 'TransactionResult',
          link: '/components/transaction-result',
        },
        {
          text: 'UserBanner',
          link: '/components/user-banner',
        },
      ], 
    },
  ],
})
