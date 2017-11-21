import { SafeUrlPipePipe } from './safe-url-pipe.pipe';
import { DomSanitizer} from '@angular/platform-browser';

describe('SafeUrlPipePipe', () => {
  it('create an instance', () => {
    let san:DomSanitizer;
    const pipe = new SafeUrlPipePipe(san);
    expect(pipe).toBeTruthy();
  });
});
