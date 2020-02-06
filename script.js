'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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

      do {
        appData.itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        appData.cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
        console.log('Дополнительный заработок есть!');

      } while (isNumber(appData.itemIncome) && (!isNumber(appData.cashIncome)) && appData.cashIncome !== null);
    }    

    let addExpenses = prompt('“Перечислите возможные расходы за рассчитываемый период через запятую”'),
        deposit = confirm('“Есть ли у вас депозит в банке?”');

        appData.addExpenses = addExpenses.toLowerCase().split(',');

        if (deposit) {
          appData.deposit = true;
        }

          do {

            for (let i = 0; i < 2; i++) {
              let expenses = prompt('“Введите обязательную статью расходов?”'),
                  amount = +prompt('“Во сколько это обойдется?”');
                  appData.expenses[expenses] = amount;
            }
            
          } while (isNumber(appData.amount) && !isNumber(appData.expenses) && appData.amount !== null && appData.expenses !== '');
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