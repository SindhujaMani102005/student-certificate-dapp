# 🎓 Student Certificate Verification DApp

A blockchain-based Student Certificate Verification System built using
Solidity, Ethereum Sepolia Testnet, React, Vite, and Ethers.js.

## 🚀 Live Demo

Deployed on Vercel:

[student-certificate-dapp.vercel.app](https://student-certificate-dapp.vercel.app/)

## 🔗 Smart Contract

Network: Ethereum Sepolia Testnet

Contract Address:

0x56b90064C14CD0595b84E263aF7baC004aF194A1

## 📌 Project Overview

Traditional certificate verification systems depend on centralized
databases and manual verification.

This project uses blockchain technology to provide a transparent and
tamper-resistant certificate verification system.

An authorized administrator can issue certificates, while users can
verify certificate details directly from the blockchain.

## ✨ Features

- 🔐 MetaMask wallet connection
- 🎓 Issue student certificates
- 🔎 Verify certificates
- ⚠️ Revoke certificates
- ⛓️ Blockchain-based certificate storage
- 🌐 Sepolia testnet deployment
- 💻 React frontend
- ⚡ Vite development environment
- 🔗 Ethers.js blockchain interaction

## 🛠️ Technologies Used

### Blockchain

- Solidity
- Ethereum
- Sepolia Testnet
- Remix IDE

### Frontend

- React
- Vite
- JavaScript
- Ethers.js
- HTML
- CSS

### Development Tools

- MetaMask
- Git
- GitHub
- Vercel

## 📂 Project Structure

student-certificate-dapp/

├── public/

├── src/

│   ├── App.jsx

│   ├── index.css

│   └── assets/

├── index.html

├── package.json

├── vite.config.js

└── README.md

## 🔄 How It Works

1. Administrator connects MetaMask.
2. Administrator enters certificate details.
3. The certificate is stored on the Sepolia blockchain.
4. A user enters the Certificate ID.
5. The DApp reads the certificate from the smart contract.
6. Certificate details are displayed.
7. If the certificate has been revoked, its status is shown as REVOKED.

## 📜 Certificate Data

Each certificate contains:

- Certificate ID
- Student Name
- Roll Number
- Course
- Grade
- Issue Date
- Validity Status

## ⚙️ Installation

Clone the repository:

git clone https://github.com/SindhujaMani102005/student-certificate-dapp.git

Navigate to the project:

cd student-certificate-dapp

Install dependencies:

npm install

Start the development server:

npm run dev

Build the project:

npm run build

## 🦊 MetaMask

The application requires MetaMask to perform blockchain transactions.

Make sure MetaMask is connected to:

Ethereum Sepolia Testnet

## 🔗 Smart Contract Functions

### issueCertificate()

Creates a new student certificate.

### verifyCertificate()

Retrieves certificate information from the blockchain.

### revokeCertificate()

Changes the certificate status to revoked.

### certificates()

Reads certificate information directly from the contract mapping.

## 🔒 Blockchain Benefits

Using blockchain provides:

- Transparency
- Tamper resistance
- Decentralized verification
- Publicly verifiable records
- Reduced dependence on centralized databases

## 👩‍💻 Author

Sindhuja Mani

GitHub:

https://github.com/SindhujaMani102005

## 📄 License

This project is licensed under the MIT License.