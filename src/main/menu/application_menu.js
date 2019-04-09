import { app, Menu } from 'electron'
import devMenuTemplate from './dev_menu_template'
import configMenuTemplate from './config_menu_template'
import editMenuTemplate from './edit_menu_template'
import helpMenuTemplate from './help_menu_template'

export default () => {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const menus = [editMenuTemplate, configMenuTemplate, helpMenuTemplate]

  if (process.platform === 'darwin') {
    menus.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    })
  }

  if (isDevelopment) {
    menus.push(devMenuTemplate)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}
