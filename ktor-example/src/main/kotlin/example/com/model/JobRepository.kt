package example.com.model

import example.com.model.Job
import java.time.LocalDateTime

object JobRepository {
    private val jobs = mutableListOf(
        Job("cleaning", "Clean the house", "1. Make beds, 2. all rooms"),
        Job("gardening", "Mow the lawn", "Front and back yard"),
        Job("shopping", "Buy the groceries", "The list is here: "),
        Job("painting", "Paint the fence", "A color red"),
    )

    fun allJobs(): List<Job> = jobs
}