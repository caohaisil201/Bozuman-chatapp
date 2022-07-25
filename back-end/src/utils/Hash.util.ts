import crypto from 'crypto';
class Hash {
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    this.iv = crypto.randomBytes(16);
    const salt = 'foobar';
    const hash = crypto.createHash('sha1');

    hash.update(salt);

    // `hash.digest()` returns a Buffer by default when no encoding is given
    //TODO: change it to subArray but it did not work
    this.key = hash.digest().slice(0, 16);
  }

  public encode = (data: string) => {
    const myKey = crypto.createCipheriv('aes-128-cbc', this.key, this.iv);
    let myStr = myKey.update(data, 'utf8', 'hex');
    myStr += myKey.final('hex');
    return myStr;
  };

  public decode = (data: string) => {
    try {
      const myKey = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
      let myStr = myKey.update(data, 'hex', 'utf8');
      myStr += myKey.final('utf8');
      return myStr;
    } catch (err) {
      return '@Wrong user token';
    }
  };
}

export const HashClass = new Hash();
