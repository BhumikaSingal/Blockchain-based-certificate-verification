# Blockchain Certificate Verifier

Verify and issue certificates on the blockchain (Polygon Mumbai/Ethereum testnet).

---

## Quickstart

### 1. Deploy the Smart Contract

- Copy `contracts/CertificateVerifier.sol` to [Remix IDE](https://remix.ethereum.org/)
- Compile and deploy on Polygon Mumbai or Goerli testnet using MetaMask
- Save the deployed contract address

### 2. Backend Setup

```bash
cd server
cp .env.example .env
# Fill in your PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS in .env
npm install
npm start
```

- Place the compiled ABI as `CertificateVerifier.json` in `server/` (from Remix/artifacts).

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

- Open [http://localhost:3000](http://localhost:3000)

---

## Usage

- **Issue**: Enter recipient name and certificate hash, click Issue — keep the Certificate ID shown.
- **Verify**: Enter Certificate ID and hash, click Verify.

---

## Hashing Certificates

To create a hash (e.g., of a PDF):

```js
// hash-cert.js
const fs = require('fs');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
hash.update(fs.readFileSync('certificate.pdf'));
console.log(hash.digest('hex'));
```

---

## Notes

- Never commit your `.env` or private keys.
- For production, use HTTPS and better error handling.
