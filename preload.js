let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
window.electron = require('electron');

window.Store = require('electron-store');
window.bitbox = new BITBOXCli();

window.store = new window.Store();
