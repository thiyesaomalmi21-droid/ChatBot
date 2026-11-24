function chat() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer ");
    

    const raw = JSON.stringify({
        "model": "openai/gpt-oss-120b",
        "input": document.getElementById("txtfield").value
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
            document.getElementById("answerlbl").innerHTML=result.output[1].content[0].text;
        });
}