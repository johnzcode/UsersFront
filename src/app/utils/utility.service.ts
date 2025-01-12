import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  private currentTopPosition = 20;
  private readonly messageOffset = 70;

  showFloatingMessage(msg: string): void {
    const messageElement = document.createElement('div');
    messageElement.className = 'floating-message';
    messageElement.innerText = msg;

    messageElement.style.top = `${this.currentTopPosition}px`;

    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.classList.add('show');
    }, 10);

    this.currentTopPosition += this.messageOffset;

    messageElement.addEventListener('click', () => {
      this.removeMessage(messageElement);
    });

    setTimeout(() => {
      this.removeMessage(messageElement);
    }, 3000);
  }

  private removeMessage(messageElement: HTMLElement): void {

    messageElement.classList.add('hide');

    messageElement.addEventListener('transitionend', () => {
      if (messageElement.parentElement) {
        messageElement.parentElement.removeChild(messageElement);
        this.currentTopPosition -= this.messageOffset;
      }
    });
  }
}
