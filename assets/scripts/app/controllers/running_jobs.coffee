Travis.RunningJobsController = Em.ArrayProxy.extend
  Group: Em.Object.extend
    repo: (-> @get('jobs.firstObject.repo') ).property('jobs.firstObject.repo')

    init: ->
      @set 'jobs', []

    add: (job) ->
      @get('jobs').pushObject(job) unless @get('jobs').contains job
      @attach()

    remove: (job) ->
      @get('jobs').removeObject(job)
      @clean()

    attach: ->
      @get('parent').addGroup(this)

    clean: ->
      @get('parent').removeGroup(this) if @get('isEmpty')

    isEmpty: (->
      @get('jobs.length') == 0
    ).property('jobs.length')

  groups: []
  groupsBySlug: {}

  init: ->
    @_super.apply this, arguments

    @addedJobs @get('content') if @get('content')

  contentArrayWillChange: (array, index, removedCount, addedCount) ->
    @_super.apply this, arguments

    if removedCount
      @removedJobs array.slice(index, index + removedCount)

  contentArrayDidChange: (array, index, removedCount, addedCount) ->
    @_super.apply this, arguments

    if addedCount
      @addedJobs array.slice(index, index + addedCount)

  addedJobs: (jobs) ->
    self = this
    jobs.forEach (job) ->
      slug = job.get('repoSlug')
      group = self.groupForSlug(slug)
      group.add(job)

  removedJobs: (jobs) ->
    self = this
    jobs.forEach (job) ->
      slug = job.get('repoSlug')
      group = self.groupForSlug(slug)
      group.remove(job)

  groupForSlug: (slug) ->
    console.log 'slug', slug
    @groupsBySlug[slug] ||= @Group.create(slug: slug, parent: this)

  addGroup: (group) ->
    @get('groups').pushObject group unless @get('groups').contains group

  removeGroup: (group) ->
    @get('groups').removeObject group
    delete @groupsBySlug[group.get('slug')]
