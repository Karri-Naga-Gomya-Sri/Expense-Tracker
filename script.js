const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const balance = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

let transactions = [];

form.addEventListener("submit", function(e){

    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);

    showTransactions();

    updateBalance();

    form.reset();

});
function showTransactions(){

    transactionList.innerHTML = "";

    transactions.forEach(function(transaction){

        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.description} - ₹${transaction.amount} (${transaction.type})
            <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;

        transactionList.appendChild(li);

    });

}
function updateBalance(){

    let total = 0;

    transactions.forEach(function(transaction){

        if(transaction.type === "income"){
            total += transaction.amount;
        }
        else{
            total -= transaction.amount;
        }

    });

    balance.innerText = "₹" + total;

}
function deleteTransaction(id){

    transactions = transactions.filter(function(transaction){
        return transaction.id !== id;
    });

    showTransactions();
    updateBalance();

}