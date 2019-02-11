import {
  attribute,
  create,
  visitable,
  clickable,
  collection,
  text,
  fillable,
  triggerable,
  hasClass
} from 'ember-cli-page-object';

let repositoryObject = {
  name: text('.tile h2.tile-title span.label-align'),

  duration: {
    scope: '.duration',
    title: attribute('title'),
  },

  finished: {
    scope: '.finished_at',
    title: attribute('title'),
  }
};

export default create({
  visit: visitable('/'),
  repoTitle: text('.repo-header h1.repo-title'),
  clickSidebarMyReposTab: clickable('#tab_owned a'),
  clickSidebarRunningTab: clickable('#tab_running a'),
  runningTabIsActive: hasClass('active', '#tab_running'),
  myReposTabIsActive: hasClass('active', '#tab_owned'),
  navigateToProfilePage: clickable('#profile-page-link'),
  sidebarRepositories: collection('ul.repos-list li.repo', repositoryObject),
  sidebarRunningTabText: text('#tab_running a'),
  sidebarRunningRepositories: collection('.sidebar-list .tile--sidebar', repositoryObject),
  missingReposMessage: text('.loading-container'),
  viewRunningJob: clickable('p.tile-title a'),
  enterSearchQuery: fillable('#travis-search'),
  pressEnter: triggerable('keyup', '#travis-search', { eventProperties: { keyCode: 13 } }),
});
