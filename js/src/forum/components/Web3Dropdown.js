import Component from "flarum/Component";
import Dropdown from "flarum/components/Dropdown";

import {
  web3Accounts,
  web3Enable,
  isWeb3Injected,
} from "@polkadot/extension-dapp";

export default class Web3Dropdown extends Component {
  view() {
    return (
      <Dropdown
        buttonClassName="Button"
        onclick={this.handleClick.bind(this)}
        label="Add Web3 Account"
      >
        {this.items}
      </Dropdown>
    );
  }

  async handleClick(e) {
    await web3Enable("Flarum Web3 Address Extension");
    if (isWeb3Injected) {
      const accounts = await web3Accounts();
      console.log("Accounts from Dropdown");
      console.log(accounts);
      //this.items = accounts;
    } else {
      window.location = "https://github.com/polkadot-js/extension";
    }
  }
}
