import { extend, override } from "flarum/extend";
import UserCard from "flarum/components/UserCard";
import Model from "flarum/Model";
import User from "flarum/models/User";
import Web3Button from "./components/Web3Button";
import Stream from "flarum/utils/Stream";
import EditUserModal from "flarum/components/EditUserModal";
import Web3Dropdown from "./components/Web3Dropdown";

app.initializers.add("swader/web3address", () => {
  User.prototype.web3address = Model.attribute("web3address");

  extend(EditUserModal.prototype, "oninit", function () {
    this.web3address = Stream(this.attrs.user.web3address());
  });

  extend(EditUserModal.prototype, "fields", function (items) {
    items.add(
      "web3address",
      <div className="Form-group">
        <label>Web3 Address</label>
        <input className="FormControl" bidi={this.web3address} />
      </div>,
      1
    );
  });

  extend(EditUserModal.prototype, "data", function (data) {
    const user = this.attrs.user;
    if (this.web3address() !== user.web3address()) {
      data.web3address = this.web3address();
    }
  });

  extend(UserCard.prototype, "infoItems", function (items) {
    items.add("web3address", <p>{this.attrs.user.web3address()}</p>);
    if (app.session.user === this.attrs.user) {
      let accounts = [];
      items.add("web3address", Web3Button.component({ accounts }));
      items.add("web3dropdown", Web3Dropdown.component({ accounts }));
    }
  });
});
