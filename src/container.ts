import { Container } from 'inversify';
import symbols from './symbols';
import ArbitragerImpl from './ArbitragerImpl';
import {
  Arbitrager,
  ConfigStore,
  QuoteAggregator,
  PositionService,
  BrokerAdapterRouter,
  SpreadAnalyzer,
  ConfigValidator,
  BrokerAdapter,
  LimitCheckerFactory,
  ActivePairStore
} from './types';
import JsonConfigStore from './JsonConfigStore';
import QuoteAggregatorImpl from './QuoteAggregatorImpl';
import PositionServiceImpl from './PositionServiceImpl';
import BrokerAdapterRouterImpl from './BrokerAdapterRouterImpl';
import SpreadAnalyzerImpl from './SpreadAnalyzerImpl';
import ConfigValidatorImpl from './ConfigValidatorImpl';
import * as bitflyer from './Bitflyer';
import * as coincheck from './Coincheck';
import * as quoine from './Quoine';
import LimitCheckerFactoryImpl from './LimitCheckerFactoryImpl';
import { getActivePairStore } from './ActivePairLevelStore';
import { getChronoDB } from './chrono';

const container = new Container();
container.bind<Arbitrager>(symbols.Arbitrager).to(ArbitragerImpl);
container
  .bind<ConfigStore>(symbols.ConfigStore)
  .to(JsonConfigStore)
  .inSingletonScope();
container
  .bind<QuoteAggregator>(symbols.QuoteAggregator)
  .to(QuoteAggregatorImpl)
  .inSingletonScope();
container
  .bind<PositionService>(symbols.PositionService)
  .to(PositionServiceImpl)
  .inSingletonScope();
container.bind<BrokerAdapterRouter>(symbols.BrokerAdapterRouter).to(BrokerAdapterRouterImpl);
container.bind<SpreadAnalyzer>(symbols.SpreadAnalyzer).to(SpreadAnalyzerImpl);
container.bind<BrokerAdapter>(symbols.BrokerAdapter).to(bitflyer.BrokerAdapterImpl);
container.bind<BrokerAdapter>(symbols.BrokerAdapter).to(coincheck.BrokerAdapterImpl);
container.bind<BrokerAdapter>(symbols.BrokerAdapter).to(quoine.BrokerAdapterImpl);
container.bind<ConfigValidator>(symbols.ConfigValidator).to(ConfigValidatorImpl);
container.bind<LimitCheckerFactory>(symbols.LimitCheckerFactory).to(LimitCheckerFactoryImpl);
container
  .bind<ActivePairStore>(symbols.ActivePairStore)
  .toConstantValue(getActivePairStore(getChronoDB()));

export default container;
