//-------------------------------FRONTEND
var bankAccount;
$(document).ready(function() {

  $("#btn-createAccount").click(function(event) {
    event.preventDefault();
    // debugger;
    var inputtedName = $("#name").val();
    var inputtedDeposit = parseInt($("#initialFunds").val());
    var accountType = $("input:radio[name=accountType]:checked").val();
    bankAccount = new BankAccount(inputtedName, accountType);
    console.log(bankAccount.addMoney(inputtedDeposit));
  });
  $("#btn-math").click(function(event) {
    event.preventDefault();
    // debugger;
    var addDeposit = parseInt($("#deposit").val());
    var subtractWithdraw = parseInt($("#withdraw").val());

    if (addDeposit > 0) {
      bankAccount.addMoney(addDeposit);
    }
    else if (subtractWithdraw > 0) {
      bankAccount.subtractMoney(subtractWithdraw);
    }
    else {
      alert("Please enter an amount")
    }
    console.log(bankAccount.balance)
  });
});

//-------------------------------BACKEND
function BankAccount(accountName, accountType) {
  this.name = accountName;
  this.type = accountType;
  this.balance = 0;
}

BankAccount.prototype.addMoney = function(amount) {
  return this.balance += amount;
}

BankAccount.prototype.subtractMoney = function(amount) {
  return this.balance -= amount;
}

function ClearForm() {
  $("#name").val("");
  $("#deposit").val("");
  $("#deposit").val("");
  $("#withdraw").val("");
}
