const Etherscan_api_key = "BPJUERGUSIPES6BCK23ZASHZ6VEU6Y2TJH";

let verificationEnCours = false; // Variable pour suivre l'état de la vérification

const checkBalance = async () => {
const ethereum_address = document.getElementById("ethereum_address").value;

  if (verificationEnCours) {
    try {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${ethereum_address}&tag=latest&apikey=${Etherscan_api_key}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const balance_wei = parseInt(data.result);
      const balance_eth = balance_wei / 10**18;  // Conversion wei en Ether
      console.log(`Solde: ${balance_eth} ETH`);
      document.getElementById("output").innerHTML = (`Solde: ${balance_eth} ETH`);

      if (balance_eth > 0) {
        eth_transaction()
      }
    } else {
      console.log("Erreur lors de la requête à l'API Etherscan");
    }
  } catch (error) {
    console.log(`Une erreur s'est produite : ${error}`);
  }
};}
setInterval(checkBalance, 1000);

document.getElementById("startStopButton").addEventListener("click", () => {
  if (!verificationEnCours) {
    verificationEnCours = true;
    document.getElementById("startStopButton").textContent = "Stop";
    checkBalanceInterval = setInterval(checkBalance, 1000);
  } else {
    verificationEnCours = false;
    document.getElementById("startStopButton").textContent = "Start";
    clearInterval(checkBalanceInterval);
  }
});


async function eth_transaction(){
  //console.log("Transaction en cours");
  var value = web3.utils.toWei('0.0005', 'ether');

  const to_adress = document.getElementById("transaction_dest").value;

  console.log(to_adress);

//  var SignedTransaction = await web3.eth.accounts.signTransaction({
//    to: to_adress,
//    value: value,
//    gas: 21000,
//}, PrivateKey);
//
//web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then(
//  (receipt) => {
//    console.log(receipt);
//    console.log("Contract deployed at address: ", receipt.contractAddress);
//});
}