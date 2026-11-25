const inputField = document.getElementById("txtfield");

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    chat();
  }
})

function chat() {

    let usertext=document.getElementById("txtfield").value
    let userBox=document.createElement("div")
    userBox.classList.add("userbubble")
    userBox.textContent=usertext

    let chatContainer=document.getElementById("chat-history")
    chatContainer.prepend(userBox)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer ");
    

    const raw = JSON.stringify({
        "model": "openai/gpt-oss-120b",
        "input": usertext
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,  
        body: raw,
        redirect: "follow"
    };

    fetch("https://api.groq.com/openai/v1/responses", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let aiText=result.output[1].content[0].text;
            let aiTextBox=document.createElement("div")
            aiTextBox.classList.add("ai-bubble")
            aiTextBox.innerHTML=marked.parse(aiText);
            chatContainer.prepend(aiTextBox)
        });

        document.getElementById("txtfield").value="";
}