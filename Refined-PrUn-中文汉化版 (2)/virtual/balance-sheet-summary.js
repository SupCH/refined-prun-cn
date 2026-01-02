import { map } from './map-values.js';
import { sum } from './sum.js';
function calcSectionTotal(section, ...args) {
  if (section === void 0) {
    return void 0;
  }
  if (section.total !== void 0) {
    return section.total;
  }
  return section.total ?? mapSum(...args.map(x => x(section)));
}
function less(value) {
  return value !== void 0 ? -value : value;
}
function calcTotalDeposits(sheet) {
  return calcSectionTotal(
    sheet.assets?.current?.cashAndCashEquivalents?.deposits,
    x => x.cx,
    x => x.fx,
  );
}
function calcTotalCashAndCashEquivalents(sheet) {
  return calcSectionTotal(
    sheet.assets?.current?.cashAndCashEquivalents,
    x => x.cash,
    () => calcTotalDeposits(sheet),
    x => x.mmMaterials,
  );
}
function calcTotalLoansReceivable(sheet) {
  return calcSectionTotal(
    sheet.assets?.current?.loansReceivable,
    x => x.principal,
    x => x.interest,
  );
}
function calcTotalBaseInventory(sheet) {
  return calcSectionTotal(
    sheet.assets?.current?.inventory?.baseInventory,
    x => x.finishedGoods,
    x => x.workInProgress,
    x => x.rawMaterials,
    x => x.workforceConsumables,
    x => x.otherItems,
  );
}
function calcTotalInventory(sheet) {
  return calcSectionTotal(
    sheet.assets?.current?.inventory,
    x => x.cxListedMaterials,
    x => x.cxInventory,
    x => x.materialsInTransit,
    () => calcTotalBaseInventory(sheet),
    x => x.fuelTanks,
    x => x.materialsReceivable,
  );
}
function calcTotalCurrentAssets(sheet) {
  return calcSectionTotal(
    sheet.assets?.current,
    () => calcTotalCashAndCashEquivalents(sheet),
    x => x.accountsReceivable,
    () => calcTotalLoansReceivable(sheet),
    () => calcTotalInventory(sheet),
  );
}
function calcTotalBuildingsMarketValue(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent?.buildings?.marketValue,
    x => x.infrastructure,
    x => x.resourceExtraction,
    x => x.production,
  );
}
function calcTotalBuildings(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent?.buildings,
    () => calcTotalBuildingsMarketValue(sheet),
    x => less(x.accumulatedDepreciation),
  );
}
function calcTotalShips(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent?.ships,
    x => x.marketValue,
    x => less(x.accumulatedDepreciation),
  );
}
function calcTotalLongTermReceivables(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent?.longTermReceivables,
    x => x.accountsReceivable,
    x => x.materialsInTransit,
    x => x.materialsReceivable,
    x => x.loansPrincipal,
  );
}
function calcTotalIntangibleAssets(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent?.intangibleAssets,
    x => x.hqUpgrades,
    x => x.arc,
  );
}
function calcTotalNonCurrentAssets(sheet) {
  return calcSectionTotal(
    sheet.assets?.nonCurrent,
    () => calcTotalBuildings(sheet),
    () => calcTotalShips(sheet),
    () => calcTotalLongTermReceivables(sheet),
    () => calcTotalIntangibleAssets(sheet),
  );
}
function calcTotalAssets(sheet) {
  return calcSectionTotal(
    sheet.assets,
    () => calcTotalCurrentAssets(sheet),
    () => calcTotalNonCurrentAssets(sheet),
  );
}
function calcTotalLoansPayable(sheet) {
  return calcSectionTotal(
    sheet.liabilities?.current?.loansPayable,
    x => x.principal,
    x => x.interest,
  );
}
function calcTotalCurrentLiabilities(sheet) {
  return calcSectionTotal(
    sheet.liabilities?.current,
    x => x.accountsPayable,
    x => x.materialsPayable,
    () => calcTotalLoansPayable(sheet),
  );
}
function calcTotalLongTermPayables(sheet) {
  return calcSectionTotal(
    sheet.liabilities?.nonCurrent?.longTermPayables,
    x => x.accountsPayable,
    x => x.materialsPayable,
    x => x.loansPrincipal,
  );
}
function calcTotalNonCurrentLiabilities(sheet) {
  return calcSectionTotal(sheet.liabilities?.nonCurrent, () => calcTotalLongTermPayables(sheet));
}
function calcTotalLiabilities(sheet) {
  return calcSectionTotal(
    sheet.liabilities,
    () => calcTotalCurrentLiabilities(sheet),
    () => calcTotalNonCurrentLiabilities(sheet),
  );
}
function calcEquity(sheet) {
  return sheet.equity ?? mapSum(calcTotalAssets(sheet), less(calcTotalLiabilities(sheet)));
}
function calcLiquidationValue(sheet) {
  return mapSum(
    calcEquity(sheet),
    less(calcTotalShips(sheet)),
    less(calcTotalIntangibleAssets(sheet)),
  );
}
function calcQuickAssets(sheet) {
  return mapSum(
    calcTotalCashAndCashEquivalents(sheet),
    calcTotalLoansReceivable(sheet),
    sheet?.assets?.current?.accountsReceivable,
  );
}
function calcQuickLiabilities(sheet) {
  return mapSum(calcTotalLoansPayable(sheet), sheet?.liabilities?.current?.accountsPayable);
}
function calcAcidTestRatio(sheet) {
  return map([calcQuickAssets(sheet), calcQuickLiabilities(sheet)], (x, y) => x / y);
}
function calcDebtRatio(sheet) {
  return map([calcTotalLiabilities(sheet), calcTotalAssets(sheet)], (x, y) => x / y);
}
function mapSum(...args) {
  return map(args, sum);
}
export {
  calcAcidTestRatio,
  calcDebtRatio,
  calcEquity,
  calcLiquidationValue,
  calcQuickAssets,
  calcQuickLiabilities,
  calcTotalAssets,
  calcTotalBaseInventory,
  calcTotalBuildings,
  calcTotalBuildingsMarketValue,
  calcTotalCashAndCashEquivalents,
  calcTotalCurrentAssets,
  calcTotalCurrentLiabilities,
  calcTotalDeposits,
  calcTotalIntangibleAssets,
  calcTotalInventory,
  calcTotalLiabilities,
  calcTotalLoansPayable,
  calcTotalLoansReceivable,
  calcTotalLongTermPayables,
  calcTotalLongTermReceivables,
  calcTotalNonCurrentAssets,
  calcTotalNonCurrentLiabilities,
  calcTotalShips,
};
