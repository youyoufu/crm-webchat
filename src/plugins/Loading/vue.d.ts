import Vue from 'vue';

interface LoadingFunc {
  (state: boolean): () => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $loading: LoadingFunc;
  }
}
