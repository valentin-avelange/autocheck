const axios = require('axios');
const Etherscan_api_key = "BPJUERGUSIPES6BCK23ZASHZ6VEU6Y2TJH";
const ethereum_address = "0x494DE720C57B5240Ed3045e29679FbD283ed7562";

const checkBalance = async () => {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${ethereum_address}&tag=latest&apikey=${Etherscan_api_key}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const balance_wei = parseInt(data.result);
      const balance_eth = balance_wei / 10**18;  // Conversion wei en Ether

      console.log(`Solde: ${balance_eth} ETH`);

      if (balance_eth > 0.0005) {
        console.log("Retirer l'argent");
      }
    } else {
      console.log("Erreur lors de la requête à l'API Etherscan");
    }
  } catch (error) {
    console.log(`Une erreur s'est produite : ${error}`);
  }
};
setInterval(checkBalance, 1000);
