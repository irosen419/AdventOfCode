let fs = require('fs');

fs.readFile('./day4.txt', 'utf8', function (err, data) {
    if (err) throw err;

    let counter = 0
    let passports = data.split("\n\n")
    for (let i = 0; i < passports.length; i++) {
        let fields = passports[i].split(/\s+/)
        if (fields.length === 8) counter++
        else if (fields.length === 7 && passports[i].indexOf('cid') === -1) counter++

    }

    console.log(counter)
});

