import Vue, { VueConstructor, PluginObject } from 'vue';
import Loading from './Loading.vue';

type ShowFunc = (state:boolean) => void;

const plugin: PluginObject<{}> = {
  install(Vue: VueConstructor, options = {}) {
    const CONSTRUCTOR = Vue.extend(Loading);
    let cache: Vue & { show: ShowFunc } | null = null;

    function loading(state:boolean): () => void {
      const loadingComponent = cache || (cache = new CONSTRUCTOR());
      if (!loadingComponent.$el) {
        const vm = loadingComponent.$mount();
        (document.querySelector('body') as HTMLElement).appendChild(vm.$el);
      }
      return loadingComponent.show(state);
    }
    Vue.prototype.$loading = loading;
  },
};

export default plugin;
