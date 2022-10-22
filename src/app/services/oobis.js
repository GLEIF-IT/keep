import { KERI } from './index';

class Participants {
  static instance = undefined;
  static numParticipants = 0;

  constructor(count = 1) {
    this.oobis = new Map();
    this.words = [];
    Participants.instance = this;
    Participants.numParticipants = count;
  }

  get length() {
    return this.oobis.size;
  }

  getIndexForAID(aid) {
    return;
  }

  updateWords(words) {
    this.words.length = 0;
    this.words.push(...words);
  }

  addOOBI(alias, url) {
    let aid = KERI.parseAIDFromUrl(url);
    this.oobis.set(aid, {
      aid: aid,
      alias: alias,
      url: url,
      status: 'none',
      challengeMessage: '',
      signed: false,
      confirmed: false,
    });
  }

  oobisResolved() {
    return (
      this.oobis.size > 0 &&
      Array.from(this.oobis, ([_, v]) => {
        return v;
      }).every((oobi) => {
        return oobi.status === 'resolved';
      })
    );
  }

  oobisVerified() {
    return (
      this.oobis.size > 0 &&
      // eslint-disable-next-line no-unused-vars
      Array.from(this.oobis, ([_, v]) => {
        return v;
      }).every((oobi) => {
        return oobi.verified;
      })
    );
  }

  oobisConfirmed() {
    return (
      this.oobis.size > 0 &&
      // eslint-disable-next-line no-unused-vars
      Array.from(this.oobis, ([_, v]) => {
        return v;
      }).every((oobi) => {
        return oobi.confirmed;
      })
    );
  }
}

module.exports = Participants;
