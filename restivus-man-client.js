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

      // post data.
      this.postData = new ReactiveArray([]);
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

      'click .restivus-man__paths li'(event, instance) {
        const { url } = instance.data;
        const data = self.parseData(instance.postData.array());
        instance.loading.set(true);

        return Meteor.call(`restivus-man.${this.method}`, url, data, (err, result) => {
          instance.loading.set(false);
          return instance.result.set(result);
        });
      },

      'submit #DataForm'(event, instance) {
        event.preventDefault();
        const key = instance.find('#restivus-man-key').value;
        const value = instance.find('#restivus-man-value').value;

        if (key && value) {
          instance.postData.push({ key, value });

          // reset form
          return event.currentTarget.reset();
        }
      },

      'click .clear'(event, instance) {
        event.preventDefault();
        instance.postData.clear();
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
      },

      postData() {
        const instance = Template.instance();
        return instance.postData.list();
      }
    });

    // render.
    this.render();
  }

  parseData(array) {
    let out = {};
    _.forEach(array, (doc) => {
      out[doc.key] = doc.value;
    });

    return out;
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
