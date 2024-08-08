package example.com.model

import example.com.model.Job
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object JobRepository {
    private val jobs = mutableListOf(
        Job("Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().plusDays(1).toString(), LocalDateTime.now().toString()),
        Job( "Buy the groceries", "The list is here: ", LocalDateTime.now().plusDays(7).toString(), LocalDateTime.now().minusDays(5).toString()),
        Job( "Paint the fence", "A color red", LocalDateTime.now().plusHours(4).toString(), LocalDateTime.now().minusDays(7).toString()),
        Job( "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().minusDays(2).toString(), LocalDateTime.now().minusHours(2).toString()),
        Job( "Buy the groceries", "The list is here: ", LocalDateTime.now().minusWeeks(1).toString(), LocalDateTime.now().minusDays(15).toString()),
        Job( "Paint the fence", "A color red", LocalDateTime.now().minusHours(1).toString(), LocalDateTime.now().minusDays(17).toString()),
        Job( "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().plusMonths(1).toString(), LocalDateTime.now().minusHours(2).toString()),
        Job( "Buy the groceries", "The list is here: ", LocalDateTime.now().plusDays(4).toString(), LocalDateTime.now().minusDays(10).toString()),
        Job( "Paint the fence", "A color red", LocalDateTime.now().minusWeeks(4).toString(), LocalDateTime.now().minusDays(11).toString()),
        Job( "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().minusYears(3).toString(), LocalDateTime.now().minusHours(15).toString()),
        Job( "Buy the groceries", "The list is here: ", LocalDateTime.now().plusDays(2).toString(), LocalDateTime.now().minusWeeks(5).toString()),
        Job( "Paint the fence", "A color red", LocalDateTime.now().plusMonths(3).toString(), LocalDateTime.now().minusMinutes(24).toString()),
    )

    fun allJobs(): List<Job> = jobs

    fun getRecentJobs(limit: Int): List<Job> {
        val formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME

        val mostRecentJobs = jobs
            .sortedByDescending { LocalDateTime.parse(it.createdAt, formatter) }
            .take(limit)
        return mostRecentJobs
    }

    fun getActiveJobs(): List<Job> {
        val now = LocalDateTime.now()
        val formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
        return jobs
            .filter { LocalDateTime.parse(it.jobDateTime, formatter).isAfter(now) }
            .sortedBy { LocalDateTime.parse(it.jobDateTime, formatter) }
    }

    fun addJob(job: Job): Job {
        // TODO: Validation
        jobs.add(job)
        return job
    }
}