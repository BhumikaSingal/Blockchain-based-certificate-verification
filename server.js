import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import contractJSON from './CertificateVerifier.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractJSON.abi, wallet);

app.post('/issue', async (req, res) => {
  const { recipientName, certificateHash } = req.body;
  try {
    const tx = await contract.issueCertificate(recipientName, certificateHash);
    await tx.wait();
    // Derive certId (same as contract)
    const certId = ethers.keccak256(ethers.toUtf8Bytes(
      recipientName + certificateHash + tx.timestamp // block.timestamp not available; frontend should derive or retrieve from contract
    ));
    res.json({ success: true, txHash: tx.hash, certId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/verify', async (req, res) => {
  const { certId, certificateHash } = req.body;
  try {
    const isValid = await contract.verifyCertificate(certId, certificateHash);
    res.json({ valid: isValid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));
