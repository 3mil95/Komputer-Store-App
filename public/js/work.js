


function Work() {
    this.payBalance = 0;

    // Gets the payBalance.
    this.getPayBalance = () => {
        return this.payBalance;
    }

    // Tacks a function that takes  
    this.transferPayBalance = (to) => {
        to(this.payBalance);
        this.payBalance = 0;
    }

    // Adds value to the current payBalance.
    this.addToPayBalance = (value) => {
        this.payBalance += value;
    }

}