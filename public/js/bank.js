

function Bank() {
    this.balance = 0;
    this.loanValue = 0; 

    // Gets the balance.
    this.getBalance = function() {
        return this.balance;
    }

    // Gets the loanValue.
    this.getLoanValue = function() {
        return this.loanValue;
    }

    // Function take in amount and add it to the balance, if a loan is taken 10% of the amount is transferred to the outstanding Loan amount.
    this.addToBalance = function(amount) {
        if (this.loanValue > 0) {
            this.loanValue -= amount * 0.1;
            if (this.loanValue < 0) {
                amount = amount * 0.9 - this.loanValue;
                this.loanValue = 0;
            } else {
                amount *= 0.9;
            }            
        } 

        this.balance += amount;
    }
    this.addToBalance = this.addToBalance.bind(this)

    // Function take in amount to pay back to the loan, if more then the loan the rest of amount is added to balance.
    this.payBackLoan = function(amount) {
        this.loanValue -= amount;
        if (this.loanValue < 0) {
            this.balance -= this.loanValue
            this.loanValue = 0;
        }
    }
    this.payBackLoan = this.payBackLoan.bind(this)

    // Function take in amount to loan and if loan is valid the loan is taken.
    this.takeLoan = function(amount) {
        if (this.loanValue !== 0 ) {
            return { loanAccepted: false, message: "You cannot take out a loan because you already have one." };
        }
        if (amount > this.balance * 2) {
            return { loanAccepted: false, message: "You can not take such a large loan." };
        }

        this.loanValue = amount;
        this.balance += amount;
        return { loanAccepted: true };
    }

    // Function takes in a laptop and tries to buy it. returns a success message or a fail message.
    this.buyLaptop = function(laptop) {
        if (laptop.price > this.balance) {
            return "You do not have enough money.";
        }
        this.balance -= laptop.price;
        return `${laptop.title} is purchased`;
    }

}