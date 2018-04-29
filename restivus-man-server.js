export class RestivusManServer {
  constructor(api, options) {
    this._api = api;

    this.methods();
  }

  // Meteor methods.
  methods() {
    const self = this;

    return Meteor.methods({
      'restivus-man.routes'() {
        const { _routes, _config } = self._api;

        return _.map(_routes, (route) => {
          return {
            path: route.path,
            url: Meteor.absoluteUrl(`${_config.apiPath}${route.path}`)
          };
        })
      },

      'restivus-man.route'(path) {
        const { _routes } = self._api;
        const route = _.findWhere(_routes, { path });

        return {
          options: route.options,
          endpoints: _.keys(route.endpoints)
        }
      },

      'restivus-man.get'() {

      },

      'restivus-man.post'() {

      }
    })
  }
}
