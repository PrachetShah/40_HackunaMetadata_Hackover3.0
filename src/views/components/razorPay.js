import React from "react";
import logo from "../../assets/logo512.png";
import "./razorPay.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function RazorPay() {
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(
      "https://hackover-backend-40.vercel.app/api/v1/pay",
      {
        method: "POST",
      }
    ).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_jsXvpbAIRO5fPn",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

        alert("Transaction successful");
      },
      prefill: {
        name: "John Doe",
        email: "dummy@gmail.com",
        phone_number: "111111111",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          className="App-link"
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </button>
      </header>
    </div>
  );
}

export default RazorPay;
