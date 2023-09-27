var fs = require('fs');
var data = fs.readFileSync('data.json');
var allPlans = JSON.parse(data);
var today = new Date(),
    validPlans = [];
var plans = allPlans.plans;
function compareLocalidade(localidadeA, localidadeB) {

  return localidadeB.prioridade - localidadeA.prioridade;
}

const plansOrdenados = plans.sort((a, b) => {
  if (a.name !== b.name) {
      return a.name.localeCompare(b.name);
  }
  const localidadeComparison = compareLocalidade(a.localidade, b.localidade);
  if (localidadeComparison !== 0) {
      return localidadeComparison;
  }
  if(a.localidade.name !== b.localidade.name){
    return a.localidade.name.localeCompare(b.localidade.name);
  }
  return new Date(b.schedule.startDate) - new Date(a.schedule.startDate);
});
for (const plan of plansOrdenados) {
    var planDate = new Date(plan.schedule.startDate);
    if(planDate < today){

      validPlans.push(plan);

    }
}
var planAnterior = null,filteredPlans = [];
for (const plan of validPlans) {
  if (!planAnterior || plan.name !== planAnterior.name) {
      filteredPlans.push(plan);
  }

  planAnterior = plan;
}
console.log(filteredPlans);