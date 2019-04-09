import { shell } from 'electron'

const template = {
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click() { shell.openExternal('https://github.com/icl-rocketry/cansat-gcs/') },
    },
  ],
}

export default template
