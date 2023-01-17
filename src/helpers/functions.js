module.exports = {
  verifyPhoneNumber: (phone_number) => {
    let phone = "";
    let phoneValue = phone_number.split("");
    if (phoneValue[0] === "0") {
      let phoneSplit = phone_number.split("");
      phoneSplit.splice(0, 1, "62");
      phone = phoneSplit.join("");
    } else if (phoneValue[0] !== "6" && phoneValue[1] !== "2") {
      let phoneSplit = phone_number.split("");
      phoneSplit.splice(0, 0, "62");
      phone = phoneSplit.join("");
    } else {
      phone = phone;
    }
    return phone;
  },
};
