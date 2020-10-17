const fetch = require('node-fetch')
const Sheet = require('./sheet')


const scrapePage = async (index) => {
    // get jobs from github api 
    let url = `https://jobs.github.com/positions.json?page=${index}`
    let res = await fetch(url)
    const data = await res.json()

    //parsed data
    let parsedData = data.map(job => { 
        return {
            id: job.id, 
            company: job.company, 
            title: job.title, 
            location: job.location, 
            date: job.created_at, 
            url: job.url
        }
    })

    return parsedData;
}

// MAIN FUNCTION
const init = async () => {
    let i = 1;
    let results = []
    while(true){
        const newRows = await scrapePage(i);
        if(newRows.length > 0){
            results = [...results, ...newRows]
        } else {
            break;
        }
        i++
    }

    //Writes on google sheets
    const sheet = new Sheet('1o7JmgZsI57PU7n5BIL493HqFF_GuPk0fenY1zPF36Io');
    await sheet.load()
    await sheet.addRows(results)
}


init();


