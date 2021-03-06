import Component from "flarum/Component";
import Dropdown from "flarum/components/Dropdown";
import Button from "flarum/components/Button";

import {
  web3Accounts,
  web3Enable,
  isWeb3Injected,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

export default class Web3Dropdown extends Component {
  oninit() {
    this.web3accounts = [];
  }

  view() {
    const items = [];
    if (this.web3accounts.length) {
      for (let i = 0; i < this.web3accounts.length; i++) {
        items.push(
          <Button
            value={this.web3accounts[i].address}
            onclick={this.handleAccountSelect}
          >
            {this.web3accounts[i].address}
            {this.web3accounts[i].meta.name
              ? ` - ${this.web3accounts[i].meta.name}`
              : ""}
          </Button>
        );
      }
    }
    return (
      <Dropdown
        buttonClassName="Button"
        onclick={this.handleClick.bind(this)}
        label="Set Web3 Account"
      >
        {items}
      </Dropdown>
    );
  }

  async handleClick(e) {
    await web3Enable("Flarum Web3 Address Extension");
    if (isWeb3Injected) {
      const accounts = await web3Accounts();
      this.web3accounts = accounts;
      m.redraw();
    } else {
      window.location = "https://github.com/polkadot-js/extension";
    }
  }

  async handleAccountSelect() {
    const address = this.value;
    const web3 = await web3FromAddress(address);
    const signer = web3.signer;
    const hexMessage = stringToHex("Extreme ownership");
    try {
      const signed = await signer.signRaw({
        type: "bytes",
        data: hexMessage,
        address: address,
      });
      console.log(signed);
      const user = app.session.user;
      user
        .save({
          web3address: address,
          signedMessage: signed.signature,
        })
        .then(() => m.redraw());
    } catch (e) {
      console.log("Signing rejected");
      return;
    }
  }
}
