const materialGroups = [];
function addMaterialGroup(info) {
  materialGroups.push(info);
}
function getMaterialGroupInfo(type) {
  return materialGroups.find(x => x.type === type);
}
function getMaterialGroupTypes() {
  return materialGroups.map(x => x.type);
}
const actions = [];
function addAction(info) {
  actions.push(info);
}
function getActionInfo(type) {
  return actions.find(x => x.type === type);
}
function getActionTypes() {
  return actions.map(x => x.type);
}
const actionSteps = [];
function addActionStep(info) {
  actionSteps.push(info);
  return data => {
    return {
      ...(info.preProcessData?.(data) ?? data),
      type: info.type,
    };
  };
}
function getActionStepInfo(type) {
  return actionSteps.find(x => x.type === type);
}
const act = {
  addMaterialGroup,
  getMaterialGroupInfo,
  getMaterialGroupTypes,
  addAction,
  getActionInfo,
  getActionTypes,
  addActionStep,
  getActionStepInfo,
};
export { act };
