import { configure } from '@storybook/react';
import 'babel-polyfill'
function loadStories() {
  require('../stories');
}

configure(loadStories, module);
