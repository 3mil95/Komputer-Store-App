


function Work() {
    this.payBalance = 0;

    // Gets the payBalance.
    this.getPayBalance = function() {
        return this.payBalance;
    }

    // Tacks a function that takes  
    this.transferPayBalance = function(to) {
        to(this.payBalance);
        this.payBalance = 0;
    }

    // Adds value to the current payBalance.
    this.addToPayBalance = function(value) {
        this.payBalance += value;
    }

}