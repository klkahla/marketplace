package example.com

import example.com.model.Job
import example.com.model.Priority
import example.com.model.Task
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.mock.*
import io.ktor.client.request.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import io.ktor.utils.io.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.time.LocalDateTime
import kotlin.test.*

class ApplicationTest {
    @Test
    fun jobsByMostRecent() = testApplication {
        val mockResponseContent = Json.encodeToString(
            listOf(
                Job("Clean Maria's bedroom", "1. change sheets 2. make bed 3. toy rotation 4. put away laundry", LocalDateTime.now().plusDays(1).toString(), LocalDateTime.now().toString()),
                Job( "Buy the groceries", "Apples, oranges, bananas, avocado, bagel, limes, lentils, tofu, black beans, tortillas, pasta", LocalDateTime.now().plusDays(7).toString(), LocalDateTime.now().minusDays(5).toString()),
            )
        )

        val mockEngine = MockEngine { _ ->
            respond(
                content = ByteReadChannel(mockResponseContent),
                status = HttpStatusCode.OK,
                headers = headersOf(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            )
        }

        val client = HttpClient(mockEngine) {
            install(ContentNegotiation) {
                json()
            }
        }

        val response = runBlocking {
            client.get("/jobs/recent")
        }
        val results = response.body<List<Job>>()

        assertEquals(HttpStatusCode.OK, response.status)

        val expectedJobDescriptions = listOf("Clean Maria's bedroom", "Buy the groceries")
        val actualJobDescriptions = results.map(Job::description)
        assertContentEquals(expectedJobDescriptions, actualJobDescriptions)
    }

    @Test
    fun jobsByActive() = testApplication {
        val mockResponseContent = Json.encodeToString(
            listOf(
                Job("Clean Maria's bedroom", "1. change sheets 2. make bed 3. toy rotation 4. put away laundry", LocalDateTime.now().plusDays(1).toString(), LocalDateTime.now().toString()),
                Job( "Update Backyard", "We have always imagine a backyard oasis. Somewhere we can entertain guests and go to unwind after a long day. You will need to design and implement a landscaping wonder", LocalDateTime.now().plusDays(7).toString(), LocalDateTime.now().minusDays(5).toString()),
            )
        )

        val mockEngine = MockEngine { _ ->
            respond(
                content = ByteReadChannel(mockResponseContent),
                status = HttpStatusCode.OK,
                headers = headersOf(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            )
        }

        val client = HttpClient(mockEngine) {
            install(ContentNegotiation) {
                json()
            }
        }

        val response = runBlocking {
            client.get("/jobs/active")
        }
        val results = response.body<List<Job>>()

        assertEquals(HttpStatusCode.OK, response.status)

        val expectedJobDescriptions = listOf("Clean Maria's bedroom", "Update Backyard")
        val actualJobDescriptions = results.map(Job::description)
        assertContentEquals(expectedJobDescriptions, actualJobDescriptions)
    }

    @Test
    fun unusedJobProduces404() = testApplication {
        val response = client.get("/jobs/all")
        assertEquals(HttpStatusCode.NotFound, response.status)
    }
}