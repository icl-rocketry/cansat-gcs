import { Menu } from 'electron'
import devMenuTemplate from './dev_menu_template'
import configMenuTemplate from './config_menu_template'
import editMenuTemplate from './edit_menu_template'

export default () => {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const menus = [editMenuTemplate, configMenuTemplate]
  if (isDevelopment) {
    menus.push(devMenuTemplate)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}
