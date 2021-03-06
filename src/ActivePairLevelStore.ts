import { OrderPair, ActivePairStore } from './types';
import Order from './Order';
import { revive } from './util';
import { ChronoDB } from '@bitr/chronodb';

export const getActivePairStore = (chronoDB: ChronoDB): ActivePairStore =>
  chronoDB.getTimeSeries<OrderPair>(
    'ActivePair',
    orderPair => orderPair.map(o => revive(Order, o)) as OrderPair
  );
