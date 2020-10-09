exports.isValidPassword = (inpass) => {
    var reg = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");//Minimum 8 char, at least 1 letter and 1 number
    return reg.test(inpass);
}

exports.isValidName = (inname) => {
    var reg = new RegExp("^[A-Za-z0-9]{5,20}$"); //Between 5 and 20 char, no special caracters
    return reg.test(inname);
}