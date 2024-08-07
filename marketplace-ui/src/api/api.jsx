export async function fetchJobs() {
    const resp = await fetch(
        "http://0.0.0.0:8080/jobs",
        {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: 'GET'
        }
    );
    return resp.json();
}

export async function fetchRecentJobs() {
    const resp = await fetch(
        "http://0.0.0.0:8080/jobs/recent",
        {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: 'GET'
        }
    );
    return resp.json();
}