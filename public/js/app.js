console.log("javascript file");

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const result = document.querySelector("#result")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchReportForLocation(search.value)
})

function fetchReportForLocation(loc) {
    result.textContent = "Loading..."
    fetch("http://localhost:3000/weather?add=" + loc).then((res) => {
        res.json().then(({ report }) => {
            result.textContent = report + "ºC"
        })
    })
}