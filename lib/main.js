//#region import
const {
  setConfig,
  resetConfig,
  getConfig,
} = require('./config');
const Base = require('./class/Base');
const Model = require('./class/Model');
//#endregion

module.exports = {
  Base,
  Model,
  setConfig,
  resetConfig,
  getConfig,
};