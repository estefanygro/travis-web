import Route from '@ember/routing/route';

export default Route.extend({

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model({ page }) {
    const owner = this.modelFor('account');
    return owner.githubAppsRepositoriesOnOrg.reload({ page });
  }

});

