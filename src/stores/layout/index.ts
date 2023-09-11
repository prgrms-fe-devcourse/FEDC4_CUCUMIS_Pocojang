import { layoutSlice } from '@/stores/layout/slice';
import * as selector from '@/stores/layout/selector';

export const layoutReducer = layoutSlice.reducer;
export const { setLocation, setInput } = layoutSlice.actions;
export const { layoutSelector } = selector;
