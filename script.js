async function generate() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");

  output.innerText = "⏳ Generating...";

  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  output.innerText = data.text;
}
