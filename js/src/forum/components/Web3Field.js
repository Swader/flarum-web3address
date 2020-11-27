import Component from "flarum/Component";

export default class Web3Field extends Component {
  view() {
    return (
      <input
        className="FormControl"
        onblur={this.saveValue.bind(this)}
        placeholder="Your Web3 address"
        value={app.session.user.data.attributes.web3address}
      />
    );
  }

  saveValue(e) {
    const user = app.session.user;
    user
      .save({
        web3address: e.target.value,
      })
      .then(() => console.log("Saved"));
  }
}
