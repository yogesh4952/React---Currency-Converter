import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";

function ConvertForm() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NPR");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => getExchangeRate, []);

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    let API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response) {
        console.error("Error while fetching data");
      }

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      //   console.log(rate)
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="min-h-96 w-96 outline-none  px-4	"
      >
        <h1 className="mt-4 text-xl font-bold text-center text-white">
          Currency Converter
        </h1>
        <div className="title mt-4">
          <label htmlFor="amount" className="text-gray-300  text-md left-0">
            Enter Amount
          </label>
          <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount here"
            className="w-[100%] rounded-md px-4 py-2 outline-none backdrop-blur-lg  border-black "
          />
        </div>

        <div className="formGroup flex w-[100%] justify-center ">
          <label htmlFor="flag" className="w-[40%] text-left text-white mt-4">
            From
            <CurrencySelect
              selectedCurrency={fromCurrency}
              handleCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </label>
          <div
            onClick={handleSwap}
            id="exchange "
            className="w-[50px] mt-10 bg-gray-100 rounded-xl border- relative  h-[30px]"
          >
            <svg
              className="w-[100%]  h-[100%] absolute"
              fill="#000000"
              height="800px"
              width="800px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 477.427 477.427"
              xml:space="preserve"
            >
              <g>
                <polygon
                  points="101.82,187.52 57.673,143.372 476.213,143.372 476.213,113.372 57.181,113.372 101.82,68.733 80.607,47.519 
		0,128.126 80.607,208.733 	"
                />
                <polygon
                  points="396.82,268.694 375.607,289.907 420,334.301 1.213,334.301 1.213,364.301 420,364.301 375.607,408.694 
		396.82,429.907 477.427,349.301 	"
                />
              </g>
            </svg>
          </div>

          <label htmlFor="flag" className="w-[40%] text-right text-white mt-4">
            To
            <CurrencySelect
              selectedCurrency={toCurrency}
              handleCurrency={(e) => setToCurrency(e.target.value)}
            />
          </label>
        </div>

        <div className="w-[100%] mt-6 h-[40px] ">
          <button className="text-center w-[100%] h-[100%]  bg-slate-400 rounded-md hover:bg-slate-50 hover:text-black hover:transition-all hover:ease-linear hover:duration-300">
            Get Exchange Rate
          </button>
        </div>

        <p className="W-[100%]  mt-4 text-center p-3  rounded-md bg-green-500 font-bold hover:bg-white hover:transition-all hover:duration-200 outline-none border-none">
          {isLoading ? "Loading...." : result}
        </p>
      </form>
    </>
  );
}

export default ConvertForm;
