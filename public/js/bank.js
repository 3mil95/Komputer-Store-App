

function Bank() {
    this.balance = 0;
    this.loanValue = 0; 

    this.getBalance = () => {
        return this.balance;
    }

    this.getLoanValue = () => {
        return this.loanValue;
    }

    this.addToBalance = (value) => {
        if (this.loanValue > 0) {
            this.loanValue -= value * 0.1;
            if (this.loanValue < 0) {
                value = value * 0.9 - this.loanValue;
                this.loanValue = 0;
            } else {
                value *= 0.9;
            }            
        } 

        this.balance += value;
    }

    this.payBackLoan = (value) => {
        this.loanValue -= value;
        if (this.loanValue < 0) {
            this.balance -= this.loanValue
            this.loanValue = 0;
        }
    }

    this.takeLoan = (amount) => {
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

    this.buyLaptop = (laptop) => {
        if (laptop.price > this.balance) {
            return "You do not have enough money.";
        }
        this.balance -= laptop.price;
        return `${laptop.title} is purchased`;
    }

}