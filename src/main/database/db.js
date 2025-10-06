import { Sequelize } from 'sequelize'
import path from 'path'
import { app } from 'electron'

const dbPath = path.join(app.getPath('userData'), 'app.sqlite')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
})
