import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Docs',
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
          text: 'Text',
          link: '/components/text',
        } 
      ], 
    },
  ],
})
