let fs = require('fs');

fs.readFile('./day4.txt', 'utf8', function (err, data) {
    if (err) throw err;

    let counter = 0
    let passports = data.split("\n\n")
    for (let i = 0; i < passports.length; i++) {
        let fields = passports[i].split(/\s+/)
        if (fields.length === 8 && valid(fields)) counter++
        else if (passports[i].indexOf('cid') === -1 && valid(fields)) counter++

    }

    console.log(counter)
});


const valid = (fields) => {
    let validKeys = 0
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i].split(":")[0]
        let value = fields[i].split(":")[1]

        if (key === 'byr') {
            value.length == 4 && (1920 <= parseInt(value) && parseInt(value) <= 2002) ? validKeys++ : null
        }

        if (key === 'iyr') {
            value.length == 4 && (2010 <= parseInt(value) && parseInt(value) <= 2020) ? validKeys++ : null
        }

        if (key === 'eyr') {
            value.length == 4 && (2020 <= parseInt(value) && parseInt(value) <= 2030) ? validKeys++ : null
        }

        if (key === 'hgt' && value.match(/([0-9]*)(cm|in)/)) {
            let num = parseInt(value.slice(0, -2))
            if (value.slice(-2) === 'cm') {
                num >= 150 && num <= 193 ? validKeys++ : null;
            } else if (value.slice(-2) === 'in') {
                num >= 59 && num <= 76 ? validKeys++ : null;
            }
        }


        if (key === 'hcl' && value.match(/#[0-9a-f]{6}/)) validKeys++


        if (key === 'ecl' && longOrTruthy(value) && value.length === 3) validKeys++

        function longOrTruthy(value) {
            return value === 'amb' ||
                value === 'blu' ||
                value === 'brn' ||
                value === 'gry' ||
                value === 'grn' ||
                value === 'hzl' ||
                value === 'oth'
        }

        if (key === 'pid' && value.match(/([0-9]){9}/)) validKeys++

        if (key === 'cid') validKeys++

    }

    return validKeys === fields.length
}
