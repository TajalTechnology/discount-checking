exports.randomNumber = () => {
    var digits = '0123456789';
    let number = '';
    for (let i = 0; i < process.env.NUMBER_LENGTH; i++ ) {
        number += digits[Math.floor(Math.random() * 10)];
    }
    return number;
}