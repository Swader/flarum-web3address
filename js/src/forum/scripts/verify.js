let util_crypto = require("@polkadot/util-crypto");

util_crypto
  .cryptoWaitReady()
  .then(() => {
    const verification = util_crypto.signatureVerify(
      process.argv[2], // message
      process.argv[3], // signature
      process.argv[4] // address
    );
    if (verification.isValid === true) {
      console.log("OK");
      process.exitCode = 0;
    } else {
      console.error("Verification failed");
      process.exitCode = 1;
    }
  })
  .catch(function (e) {
    console.error(e.message);
    process.exit(1);
  });
