import { subscribe } from './subscribe-async-generator.js';
import { _$, $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { productionStore } from './production.js';
import { formatEta } from './format.js';
import { refTextContent, refAttributeValue } from './reactive-dom.js';
import { createReactiveSpan } from './reactive-element.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
import { ref } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const line = computed(() => productionStore.getById(tile.parameter));
  subscribe($$(tile.anchor, C.ProductionLine.form), form => {
    const template = ref();
    const templateField = form.children[5];
    const dropDownItem = _$(templateField, C.DropDownBox.currentItem);
    const templateText = refTextContent(dropDownItem);
    watchEffectWhileNodeAlive(dropDownItem, () => {
      templateText.value;
      const templateElement = _$(dropDownItem, C.ProductionLine.template);
      template.value = parseTemplate(line.value, templateElement);
    });
    const orderSizeField = form.children[6];
    const orderSizeSlider = _$(orderSizeField, 'rc-slider-handle');
    const sliderValue = refAttributeValue(orderSizeSlider, 'aria-valuenow');
    const orderSize = computed(() => Number(sliderValue.value));
    const completion = computed(() => {
      if (!template.value) {
        return void 0;
      }
      return ` (${formatEta(Date.now(), calcCompletionDate(line.value, template.value, orderSize.value))})`;
    });
    const durationField = form.children[8];
    const durationLabel = _$(durationField, C.StaticInput.static);
    durationLabel.append(createReactiveSpan(durationLabel, completion));
  });
}
function getMaterialsFromElements(elements) {
  const result = [];
  for (const material of elements) {
    const ticker = _$(material, C.ColoredIcon.label)?.textContent ?? '';
    const count = Number(_$(material, C.MaterialIcon.indicator)?.textContent ?? 0);
    result.push([ticker, count]);
  }
  return result;
}
function parseTemplate(line, templateElement) {
  if (!templateElement) {
    return void 0;
  }
  const inputsContainer = _$(templateElement, C.ProductionLine.inputs);
  if (!inputsContainer) {
    return void 0;
  }
  const inputMaterials = _$$(inputsContainer, C.MaterialIcon.container);
  const inputs = getMaterialsFromElements(inputMaterials);
  const outputMaterials = _$$(templateElement, C.MaterialIcon.container).filter(
    x => !inputMaterials.includes(x),
  );
  const outputs = getMaterialsFromElements(outputMaterials);
  for (const template of line.productionTemplates) {
    const templateInputs = template.inputFactors;
    const templateOutputs = template.outputFactors;
    if (templateInputs.length !== inputs.length || templateOutputs.length !== outputs.length) {
      continue;
    }
    const inputsMatch = inputs.every(x => findFactor(templateInputs, x[0], x[1]));
    const outputsMatch = outputs.every(x => findFactor(templateOutputs, x[0], x[1]));
    if (inputsMatch && outputsMatch) {
      return template;
    }
  }
  return void 0;
}
function findFactor(factors, ticker, factor) {
  return factors.find(x => x.material.ticker === ticker && x.factor === factor);
}
function calcCompletionDate(line, template, orderSize) {
  const templateDuration = template.duration.millis * orderSize;
  if (line.orders.length < line.capacity) {
    return templateDuration;
  }
  const queue = [];
  for (const lineOrder of line.orders) {
    if (lineOrder.completion) {
      queue.push(lineOrder.completion.timestamp);
    } else if (queue.length < line.capacity) {
      queue.push(Date.now() + lineOrder.duration.millis);
    } else {
      queue.sort();
      queue.push(queue.shift() + lineOrder.duration.millis);
    }
  }
  queue.sort();
  return queue.shift() + templateDuration;
}
function init() {
  tiles.observe('PRODCO', onTileReady);
}
features.add(import.meta.url, init, 'PRODCO: Adds a finish ETA label to orders.');
