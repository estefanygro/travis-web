import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | insights-privacy-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('only public available', async function (assert) {
    this.set('isPrivateViewable', false);

    await render(hbs`{{insights-privacy-selector isPrivateViewable=isPrivateViewable}}`);

    assert.equal(this.element.textContent.trim(), 'View:\n  public builds');
  });
});
