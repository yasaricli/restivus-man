import request from 'request';
import Future from 'fibers/future';

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
          endpoints: _.map(_.keys(route.endpoints), (key) => {
            return {
              method: key
            }
          })
        }
      },

      'restivus-man.get'(url, data) {
        const future = new Future();

        request.get(url, (error, response, body) => {
          return future.return(JSON.parse(body));
        });

        return future.wait();
      },

      'restivus-man.post'(url, data) {
        const future = new Future();

        request.post({
          url: url,
          form: data
        }, (error, response, body) => {
          try {
            future.return(JSON.parse(body));
          } catch(e) {
            future.return({
              status: 'error',
              data: `${body}`
            });
          }
        });

        return future.wait();
      },

      'restivus-man.put'(url, data) {
        return url
      },

      'restivus-man.options'(url, data) {
        return url
      }
    })
  }
}
