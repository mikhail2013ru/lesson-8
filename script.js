'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
  //return /[а-яА-ЯеЁ\s,]/g.test(n);
  return /^[a-zа-яё]+$/g.test(n);
};

let money;

let start = function() {
  do {
    money = +prompt('“Ваш месячный доход?”');
  
    } while (!isNumber(parseFloat(money)));
};

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addExpenses: [],
  income: {},
  addIncome: [],
  expenses: {},
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 8,

  asking: function(){ 

    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      } while (!isString(itemIncome)); 

      let cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);

      while (!isNumber(cashIncome)) {
        cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);
      }

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('“Перечислите возможные расходы за рассчитываемый период через запятую”'),
        deposit = confirm('“Есть ли у вас депозит в банке?”');

        //appData.addExpenses.push(addExpenses.split(','));

        // let arrExpenses = appData.addExpenses.map(function(item){
        //   //return item[0].toUpperCase() + item.slice(1).toLowerCase();
        //   return item[0].toUpperCase() + item.slice(1).toLowerCase().toString();
        // });

        // console.log(arrExpenses);

        appData.addExpenses = addExpenses.split(',');
        let arrExpenses = appData.addExpenses.map(function(item){
          return item[0].toUpperCase() + item.slice(1).toString().toLowerCase();
        });

        console.log(arrExpenses);

        // let myArr = ['первый', 'второй'];

        // myArr.map(item => {
        //   console.log(item = item.toString().charAt(0).toUpperCase() + item.slice(1));
        // });

        //console.log(arrExpenses);

        // let arrExpenses = addExpenses.map(function(n){
        //   return n.toLowerCase().split(',');
        // });

        // console.log(arrExpenses);

        //appData.addExpenses.push(arrExpenses);https://github.com/mikhail2013ru/lesson-8

        if (deposit) {
          appData.deposit = true;
        }
            for (let i = 0; i < 2; i++) {

              
              let expenses,
                  amount;
              do {
                expenses = prompt('“Введите обязательную статью расходов?”');
              } while (!isString(expenses));

              do {
                amount = +prompt('“Во сколько это обойдется”');
              } while (!isNumber(amount));

              appData.expenses[expenses] = amount;
            }
          },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function(){
    return (Math.ceil(appData.mission / appData.budgetMonth));
  },

  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      console.log('“У вас высокий уровень дохода”');
    } else if (appData.budgetDay >= 600) {
      console.log('“У вас средний уровень дохода”');
    } else if (appData.budgetDay < 600) {
      console.log('“К сожалению у вас уровень дохода ниже среднего”');
    } else if (appData.budgetDay < 0) {
      console.log('“Что то пошло не так”');
    }
  },
  
  getInfoDeposit: function(){
    if(appData.deposit){

      do {
        let percentDeposit = prompt('Какой годовой процент?', '10');
        let moneyDeposit = prompt('Какая сумма заложена?', 10000);

        appData.percentDeposit = percentDeposit;
        appData.moneyDeposit = moneyDeposit;
        console.log('Условие 3 проходит проверку!');

      } while (!isNumber(appData.percentDeposit) && appData.moneyDeposit !== null)
      
    }
  },

  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

// appData.getAccumulatedMonth();
appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

console.log(appData.budgetMonth);
console.log(appData.budget);
console.log(appData.budgetDay);


console.log(`Расходы за месяц: ${appData.expensesMonth} `);
console.log(`За какой период будет достигнута цель (в месяцах): ${appData.mission / appData.budgetMonth}`);

appData.getStatusIncome();

for (let key in appData) {
  //appData.expensesMonth += appData.expenses[key];
  console.log(`"Наша программа включает в себя данные: " ${appData[key]}`);
}

appData.getInfoDeposit();

console.log(appData.percentDeposit);
console.log(appData.moneyDeposit);

console.log(appData.addExpenses);