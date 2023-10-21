const Etherscan_api_key = "BPJUERGUSIPES6BCK23ZASHZ6VEU6Y2TJH";

let verificationEnCours = false;
let transactionEnCours = false;

const checkBalance = async () => {
const ethereum_address = document.getElementById("ethereum_address").value;

  if (verificationEnCours) {
    const to_address = document.getElementById("to_address").value;
    try {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${ethereum_address}&tag=latest&apikey=${Etherscan_api_key}`;
    const response = await axios.get(url);

    document.getElementById("lds-dual-ring").style.visibility = "visible";

    if (response.status === 200) {
      const data = response.data;
      const balance_wei = parseInt(data.result);
      const balance_eth = balance_wei / 10**18;  // Conversion wet pussy en Ether
      console.log(`Solde: ${balance_eth} ETH`);
      document.getElementById("output").innerHTML = (`Solde: ${balance_eth} ETH`);

      if (balance_eth > 0.0005 && !transactionEnCours) {
        const amountInEther = parseFloat(balance_eth);
        const amountInWei = (amountInEther * 1e18);
        
        transactionEnCours = true;
        sendTransaction(to_address, amountInWei);

        console.log("Transaction en cours...");
      }
    } else {
      console.log("Erreur lors de la requête à l'API Etherscan");
    }
  } catch (error) {
    console.log(`Une erreur s'est produite : ${error} sale merde va`);
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
    document.getElementById("lds-dual-ring").style.visibility = "hidden";
    clearInterval(checkBalanceInterval);
  }
});