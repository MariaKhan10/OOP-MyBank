#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Make BankAccount Class
class BankAccount {
    balance;
    transactionHistory;
    name;
    age;
    gender;
    mobileNo;
    constructor(name, age, gender, mobileNo) {
        this.balance = 0;
        this.transactionHistory = [];
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.mobileNo = mobileNo;
    }
    // Create Methods (Deposit,withdraw,updateaccountinfo,viewaccountinfo,checkBalance,getTransactionHistory)
    deposit(amount) {
        if (amount <= 100) {
            this.balance += amount;
            this.transactionHistory.push(chalk.bold.yellow(`Deposited ${amount}`));
            console.log(chalk.bold.italic.green(`Deposited ${amount} successfully. Fee Charged : Rs.0`));
        }
        else if (amount > 100) {
            this.balance += amount - 1;
            this.transactionHistory.push(chalk.bold.yellow(`Deposited ${amount}`));
            console.log(chalk.bold.italic.green(`Deposited ${amount} successfully. Fee Charged : Rs.1`));
        }
        else {
            console.log(chalk.bold.italic.red("Invalid Input.."));
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push(chalk.bold.yellow(`Withdrawn ${amount}`));
            console.log(chalk.bold.italic.green(`Withdrawn ${amount} successfully.`));
        }
        else {
            console.log(chalk.bold.italic.red("Insufficient Funds or Invalid Amount."));
        }
    }
    updateAccountInfo(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        console.log(chalk.bold.italic.green("Your Account Information Has Been Updated Successfully."));
    }
    viewAccountInfo() {
        console.log(chalk.bold.italic.cyan(`Name: ${this.name}`));
        console.log(chalk.bold.italic.cyan(`Age: ${this.age}`));
        console.log(chalk.bold.italic.cyan(`Gender: ${this.gender}`));
        console.log(chalk.bold.italic.cyan(`Mobile Number: ${this.mobileNo}`));
        console.log(chalk.bold.italic.cyan(`Balance: ${this.balance}`));
    }
    checkBalance() {
        console.log(chalk.bold.italic.green(`Your balance is: ${this.balance} Rupees.`));
    }
    getTransactionHistory() {
        console.log(chalk.bold.italic.green("Transaction History:"));
        this.transactionHistory.forEach((transaction) => console.log(transaction));
    }
}
// Starting Bank Application
async function startBankManagement() {
    console.log(chalk.bold.magenta.underline("\n\t\t\tWelcome to CLI Bank Application!\n"));
    console.log(chalk.bold.magentaBright.underline("Please Enter Your Details to Continue..\n"));
    const { name, age, gender, mobileNo } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: chalk.italic.bold.yellowBright("Enter Your Full Name:"),
        },
        {
            type: "number",
            name: "age",
            message: chalk.italic.bold.yellowBright("Enter Your Age:"),
        },
        {
            type: "list",
            name: "gender",
            message: chalk.italic.bold.yellowBright("Select your gender:"),
            choices: ["Male", "Female", "Other"],
        },
        {
            type: "number",
            name: "mobileNo",
            message: chalk.italic.bold.yellowBright("Enter Your Mobile Number:"),
        },
    ]);
    const bankAccount = new BankAccount(name, age, gender, mobileNo);
    while (true) {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: chalk.italic.bold.magenta("What would you like to do ?"),
            choices: [
                "Show Profile",
                "Update Account Information",
                "Deposit",
                "Withdraw",
                "Check Balance",
                "View Transaction History",
                "Exit",
            ],
        });
        switch (action) {
            case "Show Profile":
                bankAccount.viewAccountInfo();
                break;
            case "Update Account Information":
                const { newName, newAge, newGender } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "newName",
                        message: chalk.italic.bold.magenta("Enter your new name:"),
                    },
                    {
                        type: "number",
                        name: "newAge",
                        message: chalk.italic.bold.magenta("Enter your new age:"),
                    },
                    {
                        type: "list",
                        name: "newGender",
                        message: chalk.italic.bold.magenta("Select your new gender:"),
                        choices: ["Male", "Female", "Other"],
                    },
                ]);
                bankAccount.updateAccountInfo(newName, newAge, newGender);
                break;
            case "Deposit":
                const { depositAmount } = await inquirer.prompt({
                    type: "number",
                    name: "depositAmount",
                    message: chalk.italic.bold.magenta("Enter the amount to deposit:"),
                });
                bankAccount.deposit(depositAmount);
                break;
            case "Withdraw":
                const { withdrawAmount } = await inquirer.prompt({
                    type: "number",
                    name: "withdrawAmount",
                    message: chalk.italic.bold.magenta("Enter the amount to withdraw:"),
                });
                bankAccount.withdraw(withdrawAmount);
                break;
            case "Check Balance":
                bankAccount.checkBalance();
                break;
            case "View Transaction History":
                bankAccount.getTransactionHistory();
                break;
            case "Exit":
                console.log(chalk.bold.red.underline("Exiting Bank Application..See you Next Time..!!\n"));
                console.log("xx ----------------------------------------- xx\n");
                return;
        }
    }
}
startBankManagement();
