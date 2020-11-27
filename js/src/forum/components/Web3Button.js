import Component from "flarum/Component";
import Button from "flarum/components/Button";

export default class Web3Button extends Component {
  view() {
    return (
      <Button
        className="Button"
        loading={this.loading}
        onclick={this.handleClick.bind(this)}
      >
        Connect Web3
      </Button>
    );
  }

  handleClick(e) {
    this.loading = true;
    m.redraw();
    const user = app.session.user;
    user
      .save({
        web3address: "Some value that's buttoned",
      })
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
