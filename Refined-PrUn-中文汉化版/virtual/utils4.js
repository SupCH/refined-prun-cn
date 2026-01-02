function isFactionContract(contract) {
  return !!contract.partner.countryCode;
}
function canAcceptContract(contract) {
  return contract.party === 'CUSTOMER' && contract.status === 'OPEN';
}
function canPartnerAcceptContract(contract) {
  return contract.party === 'PROVIDER' && contract.status === 'OPEN';
}
function isSelfCondition(contract, condition) {
  return contract.party === condition.party;
}
function isPartnerCondition(contract, condition) {
  return contract.party !== condition.party;
}
function friendlyConditionText(type) {
  switch (type) {
    case 'BASE_CONSTRUCTION':
      return 'Construct Base';
    case 'COMEX_PURCHASE_PICKUP':
      return 'Material Pickup';
    case 'DELIVERY':
      return 'Delivery';
    case 'DELIVERY_SHIPMENT':
      return 'Deliver Shipment';
    case 'EXPLORATION':
      return 'Exploration';
    case 'FINISH_FLIGHT':
      return 'Finish Flight';
    case 'LOAN_INSTALLMENT':
      return 'Loan Installment';
    case 'LOAN_PAYOUT':
      return 'Loan Payout';
    case 'PAYMENT':
      return 'Payment';
    case 'PICKUP_SHIPMENT':
      return 'Pickup Shipment';
    case 'PLACE_ORDER':
      return 'Place Order';
    case 'PRODUCTION_ORDER_COMPLETED':
      return 'Complete Production Order';
    case 'PRODUCTION_RUN':
      return 'Run Production';
    case 'PROVISION':
      return 'Provision';
    case 'PROVISION_SHIPMENT':
      return 'Provision';
    case 'REPUTATION':
      return 'Reputation';
    case 'START_FLIGHT':
      return 'Start Flight';
    case 'POWER':
      return 'Become Governor';
    case 'HEADQUARTERS_UPGRADE':
      return 'Upgrade HQ';
    case 'REPAIR_SHIP':
      return 'Repair Ship';
    case 'CONTRIBUTION':
      return 'Contribution';
    case 'CONSTRUCT_SHIP':
      return 'Construct Ship';
    default:
      return type;
  }
}
export {
  canAcceptContract,
  canPartnerAcceptContract,
  friendlyConditionText,
  isFactionContract,
  isPartnerCondition,
  isSelfCondition,
};
