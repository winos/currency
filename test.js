import test from 'ava';
import nock from 'nock';

import currency from './';

test.beforeEach(t => {
  const exchangeRates = {
    base: 'USD',
    rates: {
      DKK: 5.775516,
      MYR: 3.230421
    }
  };

  nock('https://openexchangerates.org')
    .get('/api/latest.json?app_id=ead040886c774aa5824508a084181ecb')
    .reply(200, exchangeRates);
});

test('convert 10 usd to dkk', async t => {
  var opts = {
    amount: 10,
    from: 'usd',
    to: 'dkk'
  };

  const converted = currency(opts);

  t.is(await converted, 57.755);
});
