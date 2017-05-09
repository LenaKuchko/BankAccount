//-------------------------------FRONTEND
$(document).ready(function() {
  var client = new Client();

  $("#client").submit(function(event) {
    event.preventDefault();
    client.fullName = $("#clientName").val();
    $("#invitation").prepend("<h1> Welcome, " +client.fullName + "!</h1>")
    $("#intro").hide();
    $(".main").show();
  });

  $("#newAccount").submit(function(event) {
    event.preventDefault();
    debugger;
    var inputtedName = $("#name").val();
    var inputtedDeposit = parseInt($("#initialFunds").val());
    var accountType = $("input:radio[name=accountType]:checked").val();
    var bankAccount= new BankAccount(inputtedName, accountType, inputtedDeposit);

    client.addAccount(bankAccount);

    $("ul#accountList").append("<li><span class='displayAccounts'>" + bankAccount.name + " " + bankAccount.type + "</span></li>");

    $(".displayAccounts").last().click(function() {
      $("#displayBalance").text(bankAccount.balance);
    });
    $("#chooseAccount").append("<option value='" + (client.clientList.length-1).toString() + "'>" + bankAccount.name +"</option>" )
    console.log(client.clientList.length-1);
  });

  $("#accountFunds").submit(function(event) {
    event.preventDefault();
    // debugger;
    var addDeposit = parseInt($("#deposit").val());
    var subtractWithdraw = parseInt($("#withdraw").val());
    var currentAccount = $("#chooseAccount").val();

    if (addDeposit > 0) {
      client.clientList[currentAccount].addMoney(addDeposit);
    }
    else if (subtractWithdraw > 0) {
      client.clientList[currentAccount].subtractMoney(subtractWithdraw);
    }
    else {
      alert("Please enter an amount")
    }

    $("#displayBalance").text(client.clientList[currentAccount].balance);
  });
});

//-------------------------------BACKEND
function BankAccount(accountName="", accountType="", accountBalance) {
  this.name = accountName;
  this.type = accountType;
  this.balance = accountBalance;
}

function Client(fullName) {
  this.fullName = fullName;
  this.clientList = [];
}

Client.prototype.addAccount = function (account) {
  this.clientList.push(account);
};

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
