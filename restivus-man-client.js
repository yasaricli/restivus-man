import './templates.html';

export class RestivusManClient {
  constructor() {
    const self = this;

    this.activeRequest = null;

    // templates
    this.uiTemplate = Template['restivus-man'];
    this.requestTemplate = Template['restivus-man-request'];

    // On created, rendered, destroyed.
    this.requestTemplate.onCreated(function() {
      this.loading = new ReactiveVar(false);
      this.result = new ReactiveVar(null);
    });

    // events
    this.uiTemplate.onRendered(() => {

    });

    this.uiTemplate.events({
      'click li'(event, instance) {
        return self.setActiveRequest(this);
      }
    });

    this.requestTemplate.events({
      'click .btn-close'(event, instance) {
        return self.closeRequestModal();
      },

      'click li'(event, instance) {
        const { url } = instance.data;
        instance.loading.set(true);

        return Meteor.call(`restivus-man.${this.method}`, url, {}, (err, result) => {
          instance.loading.set(false);
          return instance.result.set(result);
        });
      }
    });

    // helpers.
    this.uiTemplate.helpers({
      paths() {
        return ReactiveMethod.call('restivus-man.routes');
      }
    });

    this.requestTemplate.helpers({
      route() {
        return ReactiveMethod.call('restivus-man.route', this.path);
      },

      loading() {
        const instance = Template.instance();
        return instance.loading.get();
      },

      result() {
        const instance = Template.instance();
        return instance.result.get();
      },

      stringify(data) {
        return JSON.stringify(data, undefined, 2);
      }
    });

    // render.
    this.render();
  }

  closeRequestModal() {
    Blaze.remove(this.activeRequest);

    // set null
    this.activeRequest = null;
  }

  setActiveRequest(context) {

    // before active request
    if (this.activeRequest) {
      this.closeRequestModal();
    }

    // set active request
    this.activeRequest = Blaze.renderWithData(this.requestTemplate,
      context, document.body);
  }

  // Meteor methods.
  render() {
    Blaze.renderWithData(this.uiTemplate, () => {
      return {}
    }, document.body)
  }
}
