<script setup lang="ts">
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import Header from '@src/components/Header.vue';

const { note } = defineProps<{ note: UserData.Note }>();

const $style = useCssModule();

const segments = computed(() => {
  const text = note.text;
  if (text === undefined) {
    return [];
  }

  const regexp = /\b(?:[a-zA-Z0-9]{1,3}\.(?:CI1|IC1|AI1|NC1|CI2|NC2))\b/g;
  const result: { text: string; isLink: boolean }[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regexp.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ text: text.substring(lastIndex, match.index), isLink: false });
    }
    result.push({ text: match[0], isLink: true });
    lastIndex = regexp.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.substring(lastIndex), isLink: false });
  } else if (text[text.length - 1] === '\n') {
    // Account for final new line
    result.push({ text: ' ', isLink: false });
  }

  return result;
});

const textbox = useTemplateRef<HTMLTextAreaElement>('textbox');
const overlay = useTemplateRef<HTMLPreElement>('overlay');

onMounted(() => {
  textbox.value!.addEventListener('scroll', () => {
    overlay.value!.scrollTop = textbox.value!.scrollTop;
    overlay.value!.scrollLeft = textbox.value!.scrollLeft;
  });
});

function onLinkClick(text: string) {
  showBuffer(`CXPO ${text}`);
}
</script>

<template>
  <Header v-model="note.name" editable :class="$style.header" />
  <div :class="$style.header">{{ note.name }}</div>
  <div>
    <textarea ref="textbox" v-model="note.text" :class="$style.textarea" spellcheck="false" />
    <pre ref="overlay" :class="$style.overlay">
      <template v-for="(segment, i) in segments" :key="i">
        <span
          v-if="segment.isLink"
          :class="[C.Link.link, $style.link]"
          @click="onLinkClick(segment.text)"
        >{{ segment.text }}</span>
        <template v-else>{{ segment.text }}</template>
      </template>
    </pre>
  </div>
</template>

<style module>
.header {
  padding-top: 5px;
  margin-left: 10px;
  margin-bottom: 2px;
}

.textarea {
  color: transparent;
  background: transparent;
  caret-color: white;
  margin: 10px;
  padding: 10px;
  border: 0;
  width: calc(100% - 20px);
  height: calc(100% - 20px - 20px);
  position: absolute;
  top: 20px;
  left: 0;
  overflow-y: scroll;
  font-family: 'Droid Sans', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  tab-size: 4;
  resize: none;
  z-index: 1;
}

.textarea:focus {
  outline: none;
}

.textarea::-webkit-scrollbar {
  width: 0;
}

.overlay {
  background-color: #42361d;
  color: #cccccc;
  margin: 10px;
  padding: 10px;
  border: 0;
  width: calc(100% - 20px);
  height: calc(100% - 20px - 20px);
  position: absolute;
  top: 20px;
  left: 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  overflow-y: scroll;
  font-family: 'Droid Sans', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  tab-size: 4;
}

.overlay::-webkit-scrollbar {
  width: 0;
}

.link {
  position: relative;
  z-index: 2;
}
</style>
