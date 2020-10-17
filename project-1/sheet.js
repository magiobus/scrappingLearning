const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports = class Sheet {
    constructor(sheetId){
        this.doc = new GoogleSpreadsheet(sheetId);
    }

    async load(){
        await this.doc.useServiceAccountAuth(require('./credentials.json'))
        await this.doc.loadInfo();
    }

    async addRows(rows){
        const sheet = this.doc.sheetsByIndex[0];
       await sheet.addRows(rows); //receives an array of objects
    }
}


