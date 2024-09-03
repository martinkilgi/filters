import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ScrollingUtilities {
    constructor() { }

    scrollToBottom(): void {
        window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
    } 
}