import m from 'mithril';
import { Button, TextField, Modal } from '../../../src/app/components';
import addNewContacts from '../../../src/assets/img/add-new-contacts.png';
import responseMessage from '../../../src/assets/img/response-message.png';
import uploadFile from '../../../src/assets/img/upload-file.png';
import liOne from '../../../src/assets/img/li-one.png';
import liTwo from '../../../src/assets/img/li-two.png';
import liThree from '../../../src/assets/img/li-three.png';
import liFour from '../../../src/assets/img/li-four.png';
import liFive from '../../../src/assets/img/li-five.png';
import wait from '../../../src/assets/img/wait.png';

class ModalCheck {
  constructor() {
    this.currentState = 'ModalChecker';
    this.ModalOpen = true;
  }
  view(vnode) {
    return (
      <>
        <Modal
          isOpen={this.ModalOpen}
          backdropClose={false}
          onClose={() => {
            this.ModalOpen = false;
          }}
          style={{ width: '460px' }}
          header={<h3 class="font-weight--medium">Wait! Did you complete Identity Assurance?</h3>}
          content={
            <>
              <div class="flex flex-align-center flex-justify-center">
                <img style={{ width: '120px', margin: '.5rem 2rem 0 0' }} src={wait} />
                <p
                  class="font-weight--light font-color--battleship"
                  style={{ margin: '2rem 0 2rem 0', lineHeight: '1.38', letterSpacing: '0.15px' }}
                >
                  Verification is a two-step process. Before authenticating, make sure that Identity Assurance is
                  completed.
                </p>
              </div>
            </>
          }
          footer={
            <>
              <div class="flex flex-justify-center" style={{ marginTop: '2rem' }}>
                <Button
                  raised
                  class="button--big button--extraPadding"
                  label="IDENTITY ASSURANCE IS DONE"
                  onclick={() => {
                    this.ModalOpen = false;
                    vnode.attrs.continue();
                  }}
                />
              </div>
            </>
          }
        />
        <h3>Identity Authentication</h3>
        {/* <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} /> */}
        <p class="p-tag">
          This module will take you through the steps of how to authenticate the user's Identity. Below are the steps
          for the process:
          <br />
          <br />
        </p>
        <h3>Steps to Authenticate AVR Identity</h3>
        <div class="flex flex-column">
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Initiate a Video Call</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Use an OOBI protocol to obtain their AID</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Send a Challenge Message</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">User signs and returns Challenge Response Message</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Signature is submitted to you for verification</p>
          </div>
        </div>

        <div class="flex flex-justify-end">
          {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>
    );
  }
}

class IdentityAuth {
  constructor(vnode) {
    this.step = 0;
    this.steps = [
      <>
        <h3>Identity Authentication</h3>
        {/* <img src={approveRequest} style={{ width: '60%', margin: '4rem 0 4rem 4rem' }} /> */}
        <p class="p-tag">
          This module will take you through the steps of how to authenticate the user's Identity. Below are the steps
          for the process:
          <br />
          <br />
        </p>
        <h3>Steps to Authenticate AVR Identity</h3>
        <div class="flex flex-column">
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liOne} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Initiate a Video Call</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liTwo} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Use an OOBI protocol to obtain their AID</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liThree} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Send a Challenge Message</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFour} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">User signs and returns Challenge Response Message</p>
          </div>
          <div class="flex" style={{ alignItems: 'center', margin: '0 0 0 0' }}>
            <img src={liFive} style={{ margin: '1rem 10px 1rem 0' }} />
            <p class="p-tag-bold">Signature is submitted to you for verification</p>
          </div>
        </div>

        <div class="flex flex-justify-end">
          {/* <Button class="button--gray-dk button--big button--no-transform" raised label="Skip" /> */}
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <h3>Initiate a Video Call</h3>
        <p class="p-tag">
          In order to start the authentication process, you will need to complete an real-time OOBI session in which you
          and the user you are verifying are present, You will accept their OOBI on a Video Call so that you can receive
          their identifying information.
          <br />
          <br />
        </p>
        <div class="flex flex-justify-between">
          <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={addNewContacts} style={{ width: '40%', margin: '1.5rem 0 0 0' }} />
        <h3>
          Accept <u>OOBI</u>
        </h3>
        <p class="p-tag">
          While on the Video Call, make sure to obtain the <strong>URL and AID.</strong> When you have both, please
          press continue.
          <br />
          <br />
        </p>
        <h3>AID:</h3>
        <TextField
          filled
          style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          iconTrailing={{ icon: 'content_copy' }}
        />
        <h3>URL:</h3>
        <TextField
          filled
          style={{ height: '3rem', width: '100%', margin: '0 0 4rem 0', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          iconTrailing={{ icon: 'content_copy' }}
        />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Generate Challenge Message</h3>
        <p class="p-tag">
          The Challenge Response Message generated will be sent for verification purposes.
          <br />
          <br />
        </p>

        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={responseMessage} style={{ width: '50%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Copy Challenge Message</h3>
        <p class="p-tag">
          Copy the Challenge Message into the chat box while on the Video Call.
          <br />
          <br />
        </p>
        <TextField textarea filled style={{ height: '5rem', width: '100%', margin: '0 0 4rem 0' }} />
        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button
            class="button--big button--no-transform"
            raised
            label="Continue"
            onclick={() => {
              this.step++;
            }}
          />
        </div>
      </>,
      <>
        <img src={uploadFile} style={{ width: '60%', margin: '1.5rem 0 2rem 0' }} />
        <h3>Challenge Message in Progress</h3>
        <p class="p-tag">
          You will be notified when the QAR signs and returns the Challenge Message.
          <br />
          <br />
        </p>

        <div class="flex flex-justify-between">
          <Button
            class="button--gray-dk button--big button--no-transform"
            raised
            label="Go Back"
            onclick={() => {
              this.step--;
            }}
          />
          <Button class="button--big button--no-transform" raised label="close" onclick={vnode.attrs.end} />
        </div>
      </>,
    ];
  }

  view() {
    return <>{this.steps[this.step]}</>;
  }
}

class IdentityAuthOfQar {
  constructor() {
    this.currentState = 'ModalChecker';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'ModalChecker' && (
          <ModalCheck
            continue={() => {
              this.currentState = 'IdentityAuth';
            }}
          />
        )}
        {this.currentState === 'IdentityAuth' && <IdentityAuth continue={vnode.attrs.end} />}
      </>
    );
  }
}

module.exports = IdentityAuthOfQar;