import { setLocation } from '@/stores/layout';
import { Listener } from '@/stores/listenerMiddleware';

const locationListener: Listener = {
  actionCreator: setLocation,
  effect: (action, listenerApi) => {
    // TODO: location 변경 시, layout store 의 title 변경 추가
    console.log(action);
    console.log(listenerApi);
  },
};

export const layoutListeners = [locationListener];
