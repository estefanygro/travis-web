import TravisRoute from 'travis/routes/basic';
import OwnerRepositoriesMixin from 'travis/mixins/route/owner/repositories';

export default TravisRoute.extend(OwnerRepositoriesMixin, {

  beforeModel() {
    this.account = this.modelFor('organization');
  },

});
