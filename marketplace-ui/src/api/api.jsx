export async function fetchJobs() {
    const resp = await fetch(
        "http://0.0.0.0:8080/jobs",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return resp.json();
}

export async function fetchRecentJobs() {
    const resp = await fetch(
        "http://0.0.0.0:8080/jobs/recent",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return resp.json();
}

export async function fetchActiveJobs() {
    const resp = await fetch(
        "http://0.0.0.0:8080/jobs/active",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return resp.json();
}

export async function createJob(job) {
    try {
        const resp = await fetch(
            "http://0.0.0.0:8080/jobs",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            }
        );
        if (!resp.ok) {
            const errorText = await resp.text()
            console.error('Error response: ', errorText);
            throw new Error('Failed to create job');
        }

        const responseData = await resp.json(); 
        return responseData;
    } catch (error) {
        console.error('Error in createJob:', error);
        throw error;
    }
}