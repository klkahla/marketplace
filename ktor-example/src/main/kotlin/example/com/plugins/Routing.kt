package example.com.plugins

import example.com.model.*
import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        staticResources("static", "static")

        //updated implementation
        route("/jobs") {
            get {
                // get all jobs
//                val jobs = JobsRepository.allJobs()
//                call.respond(jobs)
            }

            get("/recent") {
//                call.respond(recentJobs)
            }
            get("/active") {
                // call.response(activeJobs)
            }

            post {
//                try {
//                    val job = call.receive<Job>()
//                    JobRepository.addJob(job)
//                    call.respond(HttpStatusCode.NoContent)
//                } catch (ex: IllegalStateException) {
//                    call.respond(HttpStatusCode.BadRequest)
//                } catch (ex: JsonConvertException) {
//                    call.respond(HttpStatusCode.BadRequest)
//                }
            }
        }
    }
}
