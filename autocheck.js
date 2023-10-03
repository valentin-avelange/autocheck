const Etherscan_api_key = "BPJUERGUSIPES6BCK23ZASHZ6VEU6Y2TJH";

let verificationEnCours = false;

const checkBalance = async () => {
//const ethereum_address = document.getElementById("ethereum_address").value;
const ethereum_address = "0x494DE720C57B5240Ed3045e29679FbD283ed7562";

  if (verificationEnCours) {
    //const to_address = document.getElementById("to_address").value;
    const to_address = "0x4cddb8ae1b95bf7af692fded834345ddeeac8ecc";
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
        // Créer une transaction Ethereum
        const amountToSend = web3.utils.toWei('0.000159136293844104', 'ether'); // Montant à envoyer (1 ETH dans cet exemple)
        const from_address = ethereum_address;

        // Envoi de la transaction
        ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: from_address,
              to: to_address,
              value: amountToSend,
            },
          ],
        })
        .then((txHash) => {
          console.log(`Transaction envoyée : ${txHash}`);
          // Gérer la suite de votre application ici
        })
        .catch((error) => {
          console.error(`Erreur d'envoi de la transaction : ${error.message}`);
        });
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