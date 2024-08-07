package example.com.model

import example.com.model.Job
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object JobRepository {
    private val jobs = mutableListOf(
        Job("cleaning", "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().toString()),
        Job("shopping", "Buy the groceries", "The list is here: ", LocalDateTime.now().minusDays(5).toString()),
        Job("painting", "Paint the fence", "A color red", LocalDateTime.now().minusDays(7).toString()),
        Job("cleaning2", "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().minusHours(2).toString()),
        Job("shopping2", "Buy the groceries", "The list is here: ", LocalDateTime.now().minusDays(15).toString()),
        Job("painting2", "Paint the fence", "A color red", LocalDateTime.now().minusDays(17).toString()),
        Job("cleaning3", "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().minusHours(2).toString()),
        Job("shopping3", "Buy the groceries", "The list is here: ", LocalDateTime.now().minusDays(10).toString()),
        Job("painting3", "Paint the fence", "A color red", LocalDateTime.now().minusDays(11).toString()),
        Job("cleaning4", "Clean the house", "1. Make beds, 2. all rooms", LocalDateTime.now().minusHours(15).toString()),
        Job("shopping4", "Buy the groceries", "The list is here: ", LocalDateTime.now().minusWeeks(5).toString()),
        Job("painting4", "Paint the fence", "A color red", LocalDateTime.now().minusMinutes(24).toString()),
    )

    fun allJobs(): List<Job> = jobs

    fun getRecentJobs(limit: Int): List<Job> {
        val formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME

        val mostRecentJobs = jobs
            .sortedByDescending { LocalDateTime.parse(it.createdAt, formatter) }
            .take(limit)
        return mostRecentJobs
    }
}