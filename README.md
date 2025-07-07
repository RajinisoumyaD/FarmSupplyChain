# 🌾 Farm Supply Chain - Hyperledger Fabric

A decentralized application (DApp) that enables **end-to-end traceability** of agricultural products, ensuring **food hygiene, transparency, and trust** from **Producer → Distributor → Retailer → Consumer**.

---

## 🚀 Problem Statement

Food hygiene is a growing global concern. Consumers and retailers often lack visibility into the origins and movement of agricultural products.  
This project leverages **Hyperledger Fabric** to build a transparent, auditable, and immutable supply chain platform to track farm produce efficiently.

---

## 📦 Key Features

- ✅ Add new product by **Producer**
- 🔁 Transfer product to **Distributor**
- 🔁 Transfer product to **Retailer**
- 🔍 Retrieve current product state by **ID**
- 📜 View **complete product history**

---

## 📁 Chaincode Functions

| Function Name                                | Description                                            |
|---------------------------------------------|--------------------------------------------------------|
| `addNewProductByProducer`                   | Adds a new product to the blockchain by a producer     |
| `transferProductFromProducerToDistributer`  | Transfers the product to a distributor                 |
| `transferProductFromDistributorToRetailer`  | Transfers the product to a retailer                    |
| `getProductById`                            | Fetches current product state using its unique ID      |
| `getHistory`                                | Retrieves complete transaction history of the product  |

---

## 💡 Technologies Used

- **Hyperledger Fabric**
- **Node.js**
- `fabric-contract-api`
- `fabric-shim`
- **Docker & Docker Compose**

---

## 🧪 Sample Product History

A sample JSON showing the transaction trail of a product is available:

📄 [`sample-data/productHistorySample.json`](./sample-data/productHistorySample.json)

---

## 📂 Project Directory Structure

farm-supply-chain-tomato/
├── chaincode/ # Chaincode (Smart Contract)
│ ├── index.js
│ ├── start.js
│ ├── package.json
│ ├── Dockerfile
├── sample-data/
│ └── productHistorySample.json
├── .gitignore
├── LICENSE
└── README.md



---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

---

## 🙋‍♀️ Author

Developed with ❤️ by **Rajinisoumya**

🔗 [GitHub](https://github.com/rajinisoumya)  
🔗 [LinkedIn](#) (https://www.linkedin.com/in/rajinisoumya/)

---

## ✨ Contribution

Found a bug or want to contribute?  
Feel free to submit issues or create pull requests. Contributions are welcome!

---

