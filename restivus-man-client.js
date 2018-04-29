import './templates.html';

export class RestivusManClient {
  constructor() {
    const self = this;

    this.activeRequest = null;

    // templates
    this.uiTemplate = Template['restivus-man'];
    this.requestTemplate = Template['restivus-man-request'];

    // On created, rendered, destroyed.
    this.uiTemplate.onCreated(() => {

    });

    this.uiTemplate.onRendered(() => {

    });

    // events
    this.uiTemplate.events({
      'click li'(event, instance) {
        return self.setActiveRequest(this);
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
      }
    });

    // render.
    this.render();
  }

  setActiveRequest(context) {

    // before active request
    if (this.activeRequest) {
      Blaze.remove(this.activeRequest);
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
