const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');

const dateHelper = require('../handlebar/helpers/date.helper.js');
const loudHelper = require('../handlebar/helpers/loud.helper.js');
const urlrefHelper = require('../handlebar/helpers/urlref.helper.js');
const versionHelper = require('../handlebar/helpers/version.helper.js');

const readFile = util.promisify(fs.readFile);

async function generateItemPage() {
    const projectDataContents = await readFile('./data/project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    Handlebars.registerHelper('date', dateHelper);
    Handlebars.registerHelper('loud', loudHelper);
    Handlebars.registerHelper('urlref', urlrefHelper);
    Handlebars.registerHelper('version', versionHelper);

    const template = await readFile('./handlebar/itemDetailPage.hbs', 'utf8');
    const templateFunc = Handlebars.compile(template);

    for (const item of projectData.allItems) {
        const templateData = {
            ...projectData,
            allItems: [],
            data: { ...item }
        };
        const html = templateFunc(templateData)
        fs.writeFile(`../public/link/${item.Id}.html`, html, ['utf8'], () => { });
    }
}

generateItemPage();
