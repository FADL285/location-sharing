export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
  }

  show() {
    if ('content' in document.createElement('template')) {
      const templateElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = templateElements.querySelector('.modal');
      this.backdropElement = templateElements.querySelector('.backdrop');
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      const fragment = document.createDocumentFragment();
      fragment.appendChild(this.modalElement);
      fragment.appendChild(this.backdropElement);
      document.body.appendChild(fragment);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
