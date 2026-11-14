import { useSyncExternalStore } from 'react';
import { getState, subscribe } from '../core/store';

export const useGame = () => useSyncExternalStore(subscribe, getState);
