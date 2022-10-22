import m, { vnode } from 'mithril';
import { Button, Card, CarouselControls, TextField } from '../../../../../src/app/components';
import { KERI, Profile } from '../../../../../src/app/services';

class EnterOOBIsForm {
  constructor(vnode) {
    this.complete = false;
    this.selectedOobi = '';
    this.selfOOBI = false;
  }

  resolveOOBIPromise(oobi) {
    return KERI.resolveOOBI(oobi.alias, oobi.url);
  }

  canVerify(vnode) {
    if (!vnode.attrs.aid && (this.selectedOobi && !this.selfOOBI)) {
      return true;
    }

    return vnode.attrs.aid === this.selectedOobi;
  }

  resolveAllOOBIs(vnode) {

    let promises = Array.from(vnode.attrs.participants.oobis, ([_, v]) => {
      return v;
    }).filter((oobi) => {
        return oobi.alias && oobi.url;
      })
      .map((oobi) => {
        oobi.status = 'started';
        return this.resolveOOBIPromise(oobi);
      });
    return Promise.all(promises)
      .then(() => {
        this.ensureOOBIsResolved(Array.from(vnode.attrs.participants.oobis, ([_, v]) => {
          return v;
        })).then(() => {
          Array.from(vnode.attrs.participants.oobis, ([_, v]) => {
            return v;
          }).filter((oobi) => {
            return oobi.alias && oobi.url;
          });
        });
      })
      .catch((err) => {
        console.log('resolveAllOOBIs', err);
      });
  }

  validateOOBI(aid) {
    this.selfOOBI = Profile.getDefaultAID().prefix === aid;
    if (this.selfOOBI) {
      return "You cannot use your own OOBI";
    }
    return aid;
  }

  ensureOOBIsResolved(oobis) {
    oobis = Array.from(oobis, ([_, v]) => {
      return v;
    });

    let aliases = oobis.map((oobi) => {
      return oobi.alias;
    });

    return new Promise(function (resolve, reject) {
      setTimeout(function waitForOOBI() {
        KERI.getContactsByAliases(aliases)
          .then((contacts) => {
            let done = oobis.every((oobi) => {
              return contacts.some((contact) => {
                if (contact.alias === oobi.alias) {
                  oobi.status = 'resolved';
                  oobi.id = contact.id;
                  oobi.contact = contact;
                  return true;
                }
                return false;
              });
            });
            if (done) return resolve();
            setTimeout(waitForOOBI, 700);
          })
          .catch((err) => {
            reject();
            console.log('getContacts', err);
          });
      }, 700);
    });
  }

  view(vnode) {
    return (
      <>
        <Card class="card--fluid" style={{ margin: '0 0 1.5rem 0' }}>
          <p class="font-color--battleship font-size--12 font-weight--bold">Paste URL from Video Call Chat</p>
          <TextField
            textarea
            outlined
            fluid
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
            value={vnode.attrs.participants.oobis.get(this.selectedOobi).url}
            oninput={(e) => {
              vnode.attrs.participants.oobis.get(this.selectedOobi).url = e.target.value;
            }}
          />
          {vnode.attrs.participants.oobis.get(this.selectedOobi).url && (
            <>
              <p class="font-color--battleship font-size--12 font-weight--bold">OOBI AID:</p>
              <p class="mono-aid text--underline">
                {this.validateOOBI(this.selectedOobi)}
              </p>
            </>
          )}
          {vnode.attrs.aid && (
            <>
              <p class="font-color--battleship font-size--12 font-weight--bold">AID:</p>
              <p class="mono-aid text--underline">{vnode.attrs.aid}</p>
              {vnode.attrs.participants.oobis.get(this.selectedOobi).url && (
                <>
                  {vnode.attrs.aid ===
                  KERI.parseAIDFromUrl(vnode.attrs.participants.oobis.get(this.selectedOobi).url) ? (
                    <div className="flex flex-justify-start flex-align-center" style={{ marginTop: '1.5rem' }}>
                      <span className="material-icons-outlined md-24 matched-label">check_circle</span>
                      <span className="matched-label" style={{ marginTop: '0.2rem', marginLeft: '0.4rem' }}>
                        AIDs Matched!
                      </span>
                    </div>
                  ) : (
                    <div class="flex flex-justify-start flex-align-center" style={{ marginTop: '1.5rem' }}>
                      <span className="material-icons-outlined md-24 missed-label">cancel</span>
                      <span className="missed-label" style={{ marginTop: '0.2rem', marginLeft: '0.4rem' }}>
                        AIDs Do Not Match
                      </span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          <p class="font-color--battleship font-size--12 font-weight--bold">Assign Alias:</p>
          <TextField
            outlined
            fluid
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', height: '44px' }}
            value={vnode.attrs.participants.oobis.get(this.selectedOobi).alias}
            oninput={(e) => {
              if (vnode.attrs.aliasDisabled) {
                return;
              }
              vnode.attrs.participants.oobis.get(this.selectedOobi).alias = e.target.value;
            }}
          />
          <div class="flex flex-align-center flex-justify-end margin-top-1">
            <div class="margin-right-1">
              {vnode.attrs.participants.oobis.get(this.selectedOobi).status === 'started' && (
                <p className="font-color--blue font-weight--medium">In Progress</p>
              )}
              {vnode.attrs.participants.oobis.get(this.selectedOobi).status  === 'resolved' && (
                <p className="font-color--green font-weight--medium">Complete!</p>
              )}
            </div>
            {/* <Button raised  label="Verify OOBI" /> */}
          </div>
        </Card>
        {vnode.attrs.participants.length() > 1 && (
          <CarouselControls
            numItems={vnode.attrs.participants.length()}
            active={this.selectedOobi}
            setActive={(idx) => {
              this.selectedOobi = idx;
            }}
          />
        )}
        <div class="flex flex-justify-end">
          <Button
            outlined
            disabled={!this.canVerify(vnode)}
            label={vnode.attrs.participants.length() > 1 ? 'Verify All' : 'Verify'}
            onclick={() => {
              this.resolveAllOOBIs(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = EnterOOBIsForm;
