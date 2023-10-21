async function sendTransaction(toAddress, amountInWei) {

//console.log(`Envoi de ${amountInWei} wei donc ${amountInWei / 1e18} ETH`);
//Vérifiez si MetaMask est installé et actif
if (typeof window.ethereum === 'undefined') {
  throw new Error('Veuillez installer MetaMask et connecter votre compte');
}

// Demande l'autorisation d'accéder au compte MetaMask de l'utilisateur
await window.ethereum.request({ method: 'eth_requestAccounts' });

// Récupère l'adresse Ethereum actuellement sélectionnée par l'utilisateur
const accounts = await window.ethereum.request({ method: 'eth_accounts' });
const fromAddress = accounts[0];

const Fees = (parseInt('0x5250') * parseInt('0x2540be400')); // en wei en string
const reelAmount = (amountInWei - Fees);

// Créez l'objet de transaction
const txObject = {
  from: fromAddress,
  to: toAddress,
  value: reelAmount.toString(16), // Conversion wei en Ether
  gasLimit: '0x5250',
  maxFeePerGas: '0x2540be400',
};

// Envoyez la transaction
try {
  const txHash = await window.ethereum.request({ method: 'eth_sendTransaction', params: [txObject] });
  console.log(`Transaction envoyée : ${txHash}`);

  //confirmer automatiquement la transaction
  const receipt = await window.ethereum.request({ method: 'eth_getTransactionReceipt', params: [txHash] });
  console.log(`Transaction confirmée : ${receipt.transactionHash}`);
  

  transactionEnCours = false;
  console.log("Transaction terminée");
} catch (error) {
    transactionEnCours = false;
    console.log("Transaction échouée");
    throw new Error(`Transaction échouée bloloss : ${error.message}`);
  }
}