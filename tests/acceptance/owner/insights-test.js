import { test } from 'qunit';
import moduleForAcceptance from 'travis/tests/helpers/module-for-acceptance';
import insightsPage from 'travis/tests/pages/insights-owner';

moduleForAcceptance('Acceptance | owner insights', {
  beforeEach() {
    server.create('user', {
      name: 'User Name',
      login: 'user-login'
    });
  }
});

test('the owner insights page shows insights components', async function (assert) {
  server.createList('insight-metric', 15);

  await insightsPage.visit({ username: 'user-login' });


  assert.equal(insightsPage.glances.length, 4);
  assert.equal(insightsPage.odysseys.length, 1);

  // Build count component
  insightsPage.glances[0].as(glance => {
    assert.equal(glance.name, 'Builds');
    assert.equal(glance.keyStat, 468);
  });

  // Build minutes component
  insightsPage.glances[1].as(glance => {
    assert.equal(glance.name, 'Total Build Minutes');
    assert.equal(glance.keyStat, '6 mins');
  });

  // Queue times component
  insightsPage.glances[2].as(glance => {
    assert.equal(glance.name, 'Average Queue Time');
    assert.equal(glance.keyStat, '0.58 mins');
  });

  // Active repos component
  insightsPage.glances[3].as(glance => {
    assert.equal(glance.name, 'Active Repositories');
    assert.equal(glance.keyStat, '75');
  });

  // Build statuses component
  insightsPage.odysseys[0].as(odyssey => {
    assert.equal(odyssey.name, 'Build Statuses');
    assert.notEqual(odyssey.chart.trim(), 'No builds this month.');
  });

  // No Build Overlay
  assert.equal(insightsPage.noBuildOverlayIsVisible, false);

  // percySnapshot(assert);
});

test('the owner insights page handles a lack of data', async function (assert) {
  insightsPage.visit({ username: 'user-login' });

  andThen(() => {
    assert.equal(insightsPage.glances.length, 4);
    assert.equal(insightsPage.odysseys.length, 1);

    // Build count component
    insightsPage.glances[0].as(glance => {
      assert.equal(glance.name, 'Builds');
      assert.equal(glance.keyStat, '0');
    });

    // Build minutes component
    insightsPage.glances[1].as(glance => {
      assert.equal(glance.name, 'Total Build Minutes');
      assert.equal(glance.keyStat, '0 mins');
    });

    // Queue times component
    insightsPage.glances[2].as(glance => {
      assert.equal(glance.name, 'Average Queue Time');
      assert.equal(glance.keyStat, '0 mins');
    });

    // Active repos component
    insightsPage.glances[3].as(glance => {
      assert.equal(glance.name, 'Active Repositories');
      assert.equal(glance.keyStat, '0');
    });

    // Build statuses component
    insightsPage.odysseys[0].as(odyssey => {
      assert.equal(odyssey.name, 'Build Statuses');
      assert.equal(odyssey.chart.trim(), 'No builds this month.');
    });

    // No Build Overlay
    assert.equal(insightsPage.noBuildOverlayIsVisible, true);
    assert.equal(insightsPage.noBuildOverlayTitle, 'Looks like you haven\'t triggered any builds');
  });
});