const crypto = require('crypto');

const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

var aes256 = require('aes256');

const encrypt = (data) => {
    console.log(data);
    var encryp_text = aes256.encrypt(key,data);

    return encryp_text;
};

const decrypt = (data) => {

    var decrypt_text = aes256.decrypt(key,data);

    return decrypt_text;
};

module.exports = {
    encrypt,
    decrypt
};

