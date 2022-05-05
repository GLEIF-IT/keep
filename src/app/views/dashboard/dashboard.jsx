import m from 'mithril';

import { Button, Card, Container, IconButton, NavRail } from '../../components';
import { Auth, Contacts, KERI, Mail, Profile, Tasks } from '../../services';
import './dashboard.scss';

class Dashboard {
  constructor() {
    this.aboutDismissed = false;
    Profile.loadIdentifiers();
    Contacts.requestList();
    this.sliceStart = 0;
    this.sliceEnd = 4;
    this.changeSliceNext = () => {
      this.sliceStart += 4;
      this.sliceEnd += 4;
    };
    this.changeSliceBack = () => {
      this.sliceStart -= 4;
      this.sliceEnd -= 4;
    };

    KERI.listIdentifiers()
      .then((ids) => {
        Auth.isLoggedIn = true;
        Mail.initEventSource();
        if (Profile.getDefaultAID() === null) {
          if (ids.length > 0) {
            Profile.setDefaultAID(ids[0]);
          }
        }
      })
      .catch((err) => {
        Auth.isLoggedIn = false;
        Profile.clearDefaultAID();
      });
  }

  get tasksShown() {
    if (!Auth.isLoggedIn) {
      return Tasks.all['create-passcode'];
    }
    if (Profile.identifiers.length === 0) {
      return Tasks.all['create-identifier'];
    } else if (Profile.identifiers.length === 1) {
      return Tasks.all['create-multisig'];
    } else {
      if (sessionStorage.getItem('seenIntro')) {
        return Tasks.all['main'];
      } else {
        return Tasks.all['intro-to-role'];
      }
    }
  }

  view() {
    console.log(this.tasksShown.length);
    return (
      <>
        <div style="position: relative">
          <div class="dashboard">
            {Auth.isLoggedIn && <NavRail selected="dashboard"></NavRail>}
            <Container class="headspace" style={{ padding: '0 4rem' }}>
              <div class="flex flex-justify-between">
                <div class="flex-1" style={{ marginRight: '4rem' }}>
                  {Tasks.active && Tasks.active.lcomponent !== undefined && (
                    <Card
                      class={'card--fluid' + (Tasks.active ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (Tasks.active) {
                            Tasks.active = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {Tasks.active && (
                        <Tasks.active.lcomponent
                          end={() => {
                            Tasks.active = null;
                            Profile.loadIdentifiers();
                            Contacts.requestList();
                          }}
                        />
                      )}
                    </Card>
                  )}
                  {(!Tasks.active || Tasks.active.lcomponent === undefined) && (
                    <Card class="card--fluid" padding="1.5rem">
                      <div class="flex flex-align-center flex-justify-between">
                        <h1>Tasks</h1>
                        {/* <Button raised iconLeading="add" label="New Task" /> */}
                      </div>
                      {this.tasksShown.slice(this.sliceStart, this.sliceEnd).map((task, i) => {
                        return (
                          <Card
                            class={'card--fluid card--hover' + (task === Tasks.active ? ' card--active' : '')}
                            padding="1.5rem"
                            style={{ marginBottom: '2.5rem' }}
                            onclick={() => {
                              Profile.isLead = this.tasksShown[i].lead;
                              Tasks.active = this.tasksShown[i];
                            }}
                          >
                            <div class="flex flex-align-center">
                              <img src={task.imgSrc} alt={task.label} style={{ marginRight: '1rem', width: '72px' }} />
                              <h3>{task.label}</h3>
                            </div>
                          </Card>
                        );
                      })}
                      <div>
                        <div class="flex flex-justify-between" style={{ alignItems: 'center' }}>
                          {this.sliceStart != 0 && (
                            <Button
                              iconTrailing="arrow_back_ios"
                              onclick={() => {
                                this.changeSliceBack();
                              }}
                            >
                              <h3>Previous Tasks</h3>
                            </Button>
                          )}
                          {this.sliceEnd <= this.tasksShown.length && (
                            <Button
                              style={{ float: 'right' }}
                              iconTrailing="arrow_forward_ios"
                              onclick={() => {
                                this.changeSliceNext();
                              }}
                            >
                              <h3>Next Tasks</h3>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
                <div class="flex-1">
                  {(Tasks.active || (Auth.isLoggedIn && !this.aboutDismissed)) && (
                    <Card
                      class={'card--fluid' + (Tasks.active ? ' card--active' : null)}
                      style={{ position: 'relative' }}
                      padding="4rem"
                    >
                      <IconButton
                        class="close-icon"
                        icon="close"
                        onclick={() => {
                          if (Tasks.active) {
                            Tasks.active = null;
                          } else {
                            this.aboutDismissed = true;
                          }
                        }}
                      />
                      {Tasks.active && (
                        <Tasks.active.component
                          end={() => {
                            Tasks.active = null;
                            Profile.loadIdentifiers();
                            Contacts.requestList();
                          }}
                        />
                      )}
                      {!this.aboutDismissed && !Tasks.active && (
                        <>
                          <h3>About Your Tasks</h3>
                          <p
                            class="font-color--battleship"
                            style={{ lineHeight: '1.38', letterSpacing: '0.3px', margin: '3rem 0 4rem 0' }}
                          >
                            This section is designed to help you navigate Keep and learn how to complete tasks required
                            for your role. Click on one of the tasks on the left and this panel will provide more
                            information.
                            <br />
                            <br />
                            If you are already familiar with the software, feel free to select the “Dismiss” button.
                          </p>
                          <div class="flex flex-justify-end">
                            <Button
                              class="button--no-transform button--big"
                              raised
                              label="Dismiss"
                              onclick={() => {
                                this.aboutDismissed = true;
                              }}
                            />
                          </div>
                        </>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

module.exports = Dashboard;
