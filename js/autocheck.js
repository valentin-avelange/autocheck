const Etherscan_api_key = "BPJUERGUSIPES6BCK23ZASHZ6VEU6Y2TJH";

let verificationEnCours = false;
let transactionEnCours = false;

const checkBalance = async () => {
const ethereum_address = document.getElementById("ethereum_address").value;
const seuilValue = document.getElementById("seuilValue").value;

  if (verificationEnCours) {
    document.getElementById("lds-dual-ring").style.visibility = "visible";
    const to_address = document.getElementById("to_address").value;

    try {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${ethereum_address}&tag=latest&apikey=${Etherscan_api_key}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const balance_wei = parseInt(data.result);
      const balance_eth = balance_wei / 10**18;  // Conversion wet pussy en Ether
      console.log(`Solde: ${balance_eth} ETH`);
      document.getElementById("output").style.color = "#23c686";
      document.getElementById("output").innerHTML = (`Solde: ${balance_eth} ETH`);

      if (balance_eth > seuilValue && !transactionEnCours) {
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
  if (document.getElementById("ethereum_address").value == "") {
    document.getElementById("output").innerHTML = ("Veuillez entrer une adresse Ethereum");
    document.getElementById("output").style.color = "red";
    return;
  }else{
    if (!verificationEnCours) {
    verificationEnCours = true;
    document.getElementById("startStopButton").textContent = "Stop";
    checkBalanceInterval = setInterval(checkBalance, 1000);
  } else {
    document.getElementById("lds-dual-ring").style.visibility = "hidden";
    verificationEnCours = false;
    document.getElementById("startStopButton").textContent = "Start";
    clearInterval(checkBalanceInterval);
  }
  }
});