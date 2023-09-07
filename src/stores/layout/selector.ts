import { RootState } from '@/stores';
import { LayoutState } from '@/stores/layout/slice';

export const layoutSelector = (state: RootState): LayoutState => state.layout;
