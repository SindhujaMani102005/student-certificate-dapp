import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

const CONTRACT_ADDRESS =
  "0x56b90064C14CD0595b84E263aF7baC004aF194A1";

const ABI = [
  "function issueCertificate(string,string,string,string,string)",
  "function verifyCertificate(string) view returns (string,string,string,string,string,uint256,bool)",
  "function revokeCertificate(string)",
  "function owner() view returns (address)"
];

function App() {
  const [account, setAccount] = useState("");
  const [certificateId, setCertificateId] = useState("");

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // CONNECT WALLET
  // =========================

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        setMessage("❌ Please install MetaMask.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);

      const accounts = await provider.send(
        "eth_requestAccounts",
        []
      );

      setAccount(accounts[0]);
      setMessage("✅ Wallet connected successfully.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Wallet connection failed.");
    }
  }

  // =========================
  // ISSUE CERTIFICATE
  // =========================

  async function issueCertificate() {
    try {
      if (!account) {
        setMessage("❌ Connect MetaMask first.");
        return;
      }

      if (
        !certificateId.trim() ||
        !studentName.trim() ||
        !rollNumber.trim() ||
        !course.trim() ||
        !grade.trim()
      ) {
        setMessage("❌ Please fill all certificate fields.");
        return;
      }

      setLoading(true);
      setMessage("⏳ Confirm the transaction in MetaMask...");
      setTxHash("");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const tx = await contract.issueCertificate(
        certificateId.trim(),
        studentName.trim(),
        rollNumber.trim(),
        course.trim(),
        grade.trim()
      );

      setTxHash(tx.hash);
      setMessage("⏳ Transaction submitted. Waiting for confirmation...");

      await tx.wait();

      setMessage("✅ Certificate issued successfully.");

      setStudentName("");
      setRollNumber("");
      setCourse("");
      setGrade("");
    } catch (error) {
      console.error(error);

      if (error.code === "ACTION_REJECTED") {
        setMessage("❌ Transaction rejected in MetaMask.");
      } else {
        setMessage(
          error.reason ||
          error.shortMessage ||
          "❌ Failed to issue certificate."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // VERIFY CERTIFICATE
  // =========================

  async function verifyCertificate() {
    try {
      if (!certificateId.trim()) {
        setMessage("❌ Enter a Certificate ID.");
        return;
      }

      setLoading(true);
      setMessage("🔎 Searching blockchain...");
      setResult(null);

      const provider = new BrowserProvider(
        window.ethereum
      );

      const contract = new Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );

      const data =
        await contract.verifyCertificate(
          certificateId.trim()
        );

      setResult({
        certificateId: data[0],
        studentName: data[1],
        rollNumber: data[2],
        course: data[3],
        grade: data[4],
        issueDate: new Date(
          Number(data[5]) * 1000
        ).toLocaleDateString(),
        isValid: data[6]
      });

      setMessage("✅ Certificate found on blockchain.");
    } catch (error) {
      console.error(error);

      setResult(null);

      setMessage(
        "❌ Certificate not found."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // REVOKE CERTIFICATE
  // =========================

  async function revokeCertificate() {
    try {
      if (!account) {
        setMessage("❌ Connect MetaMask first.");
        return;
      }

      if (!certificateId.trim()) {
        setMessage("❌ Enter Certificate ID.");
        return;
      }

      const confirmRevoke = window.confirm(
        `Are you sure you want to revoke ${certificateId}?`
      );

      if (!confirmRevoke) {
        return;
      }

      setLoading(true);
      setMessage(
        "⏳ Confirm the revocation in MetaMask..."
      );
      setTxHash("");

      const provider = new BrowserProvider(
        window.ethereum
      );

      const signer = await provider.getSigner();

      const contract = new Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      const tx =
        await contract.revokeCertificate(
          certificateId.trim()
        );

      setTxHash(tx.hash);

      setMessage(
        "⏳ Revocation transaction submitted..."
      );

      await tx.wait();

      setMessage(
        "✅ Certificate revoked successfully."
      );

      await verifyCertificate();
    } catch (error) {
      console.error(error);

      if (error.code === "ACTION_REJECTED") {
        setMessage(
          "❌ Transaction rejected in MetaMask."
        );
      } else {
        setMessage(
          error.reason ||
          error.shortMessage ||
          "❌ Failed to revoke certificate."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <h1>
          🎓 Student Certificate Verification
        </h1>

        <p>
          Blockchain-Based Certificate
          Verification System
        </p>

        <button
          className="connect-btn"
          onClick={connectWallet}
          disabled={loading}
        >
          {account
            ? "🟢 Wallet Connected"
            : "🦊 Connect MetaMask"}
        </button>

        {account && (
          <p className="account">
            <strong>Wallet:</strong>{" "}
            {account}
          </p>
        )}

      </header>


      {/* ADMIN */}

      <div className="container">

        <section className="card">

          <h2>
            🔐 Admin — Issue Certificate
          </h2>

          <input
            placeholder="Certificate ID"
            value={certificateId}
            onChange={(e) =>
              setCertificateId(e.target.value)
            }
          />

          <input
            placeholder="Student Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
          />

          <input
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) =>
              setRollNumber(e.target.value)
            }
          />

          <input
            placeholder="Course"
            value={course}
            onChange={(e) =>
              setCourse(e.target.value)
            }
          />

          <input
            placeholder="Grade"
            value={grade}
            onChange={(e) =>
              setGrade(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={issueCertificate}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Issue Certificate"}
          </button>

        </section>


        {/* VERIFY */}

        <section className="card">

          <h2>
            🔎 Verify Certificate
          </h2>

          <input
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) =>
              setCertificateId(e.target.value)
            }
          />

          <button
            className="verify-btn"
            onClick={verifyCertificate}
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Verify Certificate"}
          </button>


          {result && (

            <div
              className={
                result.isValid
                  ? "result valid"
                  : "result revoked"
              }
            >

              <h3>
                {result.isValid
                  ? "✅ Certificate Verified"
                  : "❌ Certificate Revoked"}
              </h3>

              <div className="details">

                <p>
                  <strong>Certificate ID:</strong>
                  {" "}
                  {result.certificateId}
                </p>

                <p>
                  <strong>Student:</strong>
                  {" "}
                  {result.studentName}
                </p>

                <p>
                  <strong>Roll Number:</strong>
                  {" "}
                  {result.rollNumber}
                </p>

                <p>
                  <strong>Course:</strong>
                  {" "}
                  {result.course}
                </p>

                <p>
                  <strong>Grade:</strong>
                  {" "}
                  {result.grade}
                </p>

                <p>
                  <strong>Issue Date:</strong>
                  {" "}
                  {result.issueDate}
                </p>

                <p>
                  <strong>Status:</strong>
                  {" "}
                  {result.isValid
                    ? "VALID"
                    : "REVOKED"}
                </p>

              </div>

              <div className="qr-section">

                <h3>📱 Certificate QR Code</h3>

                <QRCodeCanvas
                      value={`${window.location.origin}/?certificate=${result.certificateId}`}
                      size={200}
                      level="H"
                />

                <p>
                      Scan this QR code to verify this certificate.
                </p>

              </div>

            </div>

          )}

        </section>


        {/* REVOKE */}

        <section className="card">

          <h2>
            ⚠️ Admin — Revoke Certificate
          </h2>

          <input
            placeholder="Certificate ID"
            value={certificateId}
            onChange={(e) =>
              setCertificateId(e.target.value)
            }
          />

          <button
            className="danger-btn"
            onClick={revokeCertificate}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Revoke Certificate"}
          </button>

        </section>


        {/* MESSAGE */}

        {message && (
          <div className="message">
            {message}
          </div>
        )}


        {/* TRANSACTION */}

        {txHash && (

          <div className="transaction">

            <h3>
              🔗 Blockchain Transaction
            </h3>

            <p>
              Transaction Hash:
            </p>

            <code>
              {txHash}
            </code>

            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Sepolia Etherscan ↗
            </a>

          </div>

        )}

      </div>

      <footer>
        <p>
          Built with Solidity • React • ethers.js • Sepolia
        </p>
      </footer>

    </div>
  );
}

export default App;