import "./App.css";
import { useState } from "react";

function App() {
  const [uprn, setUprn] = useState("");
  const [binState, setBinState] = useState({ response: [] });

  async function getBinMap(uprn) {
    console.log("uprn input", uprn);
    const response = await fetch(`/bins/${uprn}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getBinMap(uprn)
      .then((res) => setBinState({ response: JSON.parse(res.bins) }))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <p>
            <strong>Enter UPRN:</strong>
          </p>
          <input
            type="text"
            defaultValue={"906700338829"}
            value={uprn}
            onChange={(e) => setUprn(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        <div>
          <h1>July</h1>
        </div>
        <div className="App">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div class="column">Date </div>
              <div style={{ paddingLeft: "50px" }}>Bin Type</div>
            </div>

            {binState.response.map((item) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ minWidth: "50px" }}>{item.date}</div>
                <div style={{ paddingLeft: "100px" }}>{item.binType}</div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
