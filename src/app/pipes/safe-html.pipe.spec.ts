import { SafeHTMLPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser'

describe('SafeHTMLPipe', () => {
  it('create an instance', () => {
    let san:DomSanitizer;
    const pipe = new SafeHTMLPipe(san);
    expect(pipe).toBeTruthy();
  });
});
