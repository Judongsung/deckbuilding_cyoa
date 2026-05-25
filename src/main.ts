import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { initLanguage } from './utils/i18n.js'

initLanguage().then(() => {
    const app = mount(App, {
      target: document.getElementById('app'),
    });
});
