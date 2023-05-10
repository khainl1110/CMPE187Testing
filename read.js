const reader = require('xlsx')

const file = reader.readFile('./temp.xlsx')

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    temp.forEach(row => {
        console.log(row)
        data.push(row)
    })
}

data.forEach(d => d["Actual output"] = "ajajja")

const temp = reader.utils.json_to_sheet(data)

reader.utils.book_append_sheet(file, temp, "TestCases1")

reader.writeFile(file, "./temp.xlsx")